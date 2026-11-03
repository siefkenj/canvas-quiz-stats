/**
 * Read the files attached to a PDF (as Typst's `pdf.attach` writes them, e.g. by gradescope.typ):
 * no PDF library, just the file specifications and their streams. Handles PDFs as Typst writes
 * them, and as programs that save them again often do: with objects packed into (Flate
 * compressed) object streams, names as hex or escaped strings, and incremental updates (the last
 * copy of an object wins).
 */

/** Inflate zlib data (a PDF's `/FlateDecode`). */
async function inflate(data: Uint8Array): Promise<Uint8Array> {
    const stream = new Blob([data as Uint8Array<ArrayBuffer>]).stream().pipeThrough(new DecompressionStream("deflate"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** One character per byte, so that positions in the text are positions in the bytes. */
const latin1 = (bytes: Uint8Array) => new TextDecoder("latin1").decode(bytes);

/**
 * The PDF string starting at `s[i]` (`(..)` or `<..>`), as text: escapes undone, and UTF-16 (with
 * its byte order mark) or UTF-8 decoded. Null if there is no string there.
 */
export function pdfString(s: string, i: number): string | null {
    let bytes = "";
    if (s[i] === "(") {
        let depth = 0;
        for (let k = i; k < s.length; k++) {
            const c = s[k];
            if (c === "\\") {
                const n = s[++k];
                const escaped: Record<string, string> = { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f" };
                if (n in escaped) {
                    bytes += escaped[n];
                } else if (/[0-7]/.test(n)) {
                    const oct = /^[0-7]{1,3}/.exec(s.slice(k, k + 3))![0];
                    bytes += String.fromCharCode(parseInt(oct, 8) & 0xff);
                    k += oct.length - 1;
                } else if (n === "\r") {
                    k += s[k + 1] === "\n" ? 1 : 0; // a line continuation
                } else if (n !== "\n") {
                    bytes += n; // \( \) \\
                }
                continue;
            }
            if (c === "(") {
                if (depth++ === 0) {
                    continue;
                }
            } else if (c === ")" && --depth === 0) {
                return decodeText(bytes);
            }
            bytes += c;
        }
        return null;
    }
    if (s[i] === "<" && s[i + 1] !== "<") {
        const end = s.indexOf(">", i);
        if (end < 0) {
            return null;
        }
        const hex = s.slice(i + 1, end).replace(/\s+/g, "");
        for (let k = 0; k < hex.length; k += 2) {
            bytes += String.fromCharCode(parseInt(hex.slice(k, k + 2).padEnd(2, "0"), 16));
        }
        return decodeText(bytes);
    }
    return null;
}

/** A PDF text string's bytes (one per character) as text. */
function decodeText(bytes: string) {
    const raw = Uint8Array.from(bytes, (c) => c.charCodeAt(0));
    if (bytes.startsWith("\xfe\xff")) {
        return new TextDecoder("utf-16be").decode(raw.slice(2));
    }
    if (bytes.startsWith("\xef\xbb\xbf")) {
        return new TextDecoder().decode(raw.slice(3));
    }
    return bytes; // PDFDocEncoding, which is Latin-1 for the characters of file names
}

/** Where the literal string starting at `s[i]` (`(`) ends (its `)`). */
function skipString(s: string, i: number) {
    let depth = 0;
    for (let k = i; k < s.length; k++) {
        if (s[k] === "\\") {
            k++;
        } else if (s[k] === "(") {
            depth++;
        } else if (s[k] === ")" && --depth === 0) {
            return k;
        }
    }
    return s.length;
}

/** The dictionary (`<<..>>`) that holds position `i` of `s`, from its `<<` to its `>>`. */
function enclosingDict(s: string, i: number): string | null {
    let depth = 0;
    let start = -1;
    for (let k = i; k >= 1; k--) {
        if (s[k - 1] === ">" && s[k] === ">") {
            depth++;
            k--;
        } else if (s[k - 1] === "<" && s[k] === "<") {
            if (depth-- === 0) {
                start = k - 1;
                break;
            }
            k--;
        }
    }
    if (start < 0) {
        return null;
    }
    depth = 0;
    for (let k = start; k < s.length - 1; k++) {
        if (s[k] === "(") {
            k = skipString(s, k);
        } else if (s[k] === "<" && s[k + 1] !== "<") {
            k = s.indexOf(">", k);
            if (k < 0) {
                return null;
            }
        } else if (s[k] === "<" && s[k + 1] === "<") {
            depth++;
            k++;
        } else if (s[k] === ">" && s[k + 1] === ">") {
            if (--depth === 0) {
                return s.slice(start, k + 2);
            }
            k++;
        }
    }
    return null;
}

const FLATE = /\/Filter\s*(?:\/FlateDecode|\[\s*\/FlateDecode\s*\])/;
const ANY_FILTER = /\/Filter\b/;

/** The files attached to the PDF `data`, by name, as text. Empty if it has none. */
export async function pdfAttachments(data: ArrayBuffer | Uint8Array): Promise<Map<string, string>> {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    const text = latin1(bytes);

    // Where each object's body starts (after `n g obj`); the last copy wins.
    const objects = new Map<number, number>();
    for (const m of text.matchAll(/(?:^|[\s>\]])(\d+)\s+\d+\s+obj\b/g)) {
        objects.set(Number(m[1]), m.index + m[0].length);
    }
    /** The objects packed into object streams, by number: their text. */
    const packed = new Map<number, string>();

    /** The dictionary of the object at `start`, up to its stream or its end. */
    const head = (start: number) => {
        // Look no further than the object's end (or, for a stream, its data's first `endobj`).
        const endAt = text.indexOf("endobj", start);
        const own = text.slice(start, endAt < 0 ? undefined : endAt);
        const m = /(>>\s*)stream(\r\n|\n|\r)/.exec(own);
        return m ? { dict: own.slice(0, m.index + m[1].length), dataAt: start + m.index + m[0].length } : { dict: own, dataAt: -1 };
    };
    /** Object `n`'s text (without its stream). */
    const body = (n: number) => {
        const at = objects.get(n);
        return at !== undefined ? head(at).dict : packed.get(n) ?? null;
    };
    /** The stream of the object at `start`, decoded; null if it has none, or a filter other than Flate. */
    const stream = async (start: number): Promise<Uint8Array | null> => {
        // The data starts after the end of line that follows `stream`.
        const { dict, dataAt: from } = head(start);
        if (from < 0) {
            return null;
        }
        const ref = /\/Length\s+(\d+)\s+\d+\s+R/.exec(dict);
        const length = Number(ref ? /^\s*(\d+)/.exec(body(Number(ref[1])) ?? "")?.[1] : /\/Length\s+(\d+)/.exec(dict)?.[1]);
        let to = from + length;
        // Trust `/Length` only if `endstream` follows it; else find `endstream`.
        if (!Number.isFinite(length) || !/^\s*endstream/.test(text.slice(to, to + 20))) {
            to = text.indexOf("endstream", from);
            if (to < 0) {
                return null;
            }
            to -= text[to - 2] === "\r" && text[to - 1] === "\n" ? 2 : /[\r\n]/.test(text[to - 1]) ? 1 : 0;
        }
        const raw = bytes.slice(from, to);
        if (FLATE.test(dict)) {
            return inflate(raw);
        }
        return ANY_FILTER.test(dict) ? null : raw;
    };

    // Unpack the object streams.
    for (const [, start] of objects) {
        const { dict } = head(start);
        if (!/\/Type\s*\/ObjStm\b/.test(dict) || /\/DecodeParms\b/.test(dict)) {
            continue;
        }
        const n = Number(/\/N\s+(\d+)/.exec(dict)?.[1]);
        const first = Number(/\/First\s+(\d+)/.exec(dict)?.[1]);
        let content: Uint8Array | null = null;
        try {
            content = await stream(start);
        } catch {
            // not readable; its objects stay unknown
        }
        if (!content || !Number.isFinite(n) || !Number.isFinite(first)) {
            continue;
        }
        const s = latin1(content);
        const numbers = s.slice(0, first).trim().split(/\s+/).map(Number);
        for (let k = 0; k < n; k++) {
            const [num, offset] = [numbers[2 * k], numbers[2 * k + 1]];
            const next = k + 1 < n ? numbers[2 * k + 3] : s.length - first;
            if (!objects.has(num)) {
                packed.set(num, s.slice(first + offset, first + next));
            }
        }
    }

    // The file specifications: dictionaries with an `/EF` (embedded file) entry, in any object.
    const files = new Map<string, string>();
    const sources = [...[...objects.keys()].map((n) => body(n) ?? ""), ...packed.values()];
    for (const source of sources) {
        for (const ef of source.matchAll(/\/EF\s*<</g)) {
            const spec = enclosingDict(source, ef.index);
            const refs = /\/EF\s*<<([\s\S]*?)>>/.exec(spec ?? "")?.[1] ?? "";
            const ref = /\/(?:UF|F)\s+(\d+)\s+\d+\s+R/.exec(refs);
            // Its name: `/UF` (Unicode) or `/F`, a string (not the `/F` reference inside `/EF`).
            const outside = (spec ?? "").replace(/\/EF\s*<<[\s\S]*?>>/, "");
            const nameAt = /\/UF\s*[(<]/.exec(outside) ?? /\/F\s*[(<]/.exec(outside);
            const name = nameAt ? pdfString(outside, nameAt.index + nameAt[0].length - 1) : null;
            const start = ref ? objects.get(Number(ref[1])) : undefined;
            if (!name || start === undefined || files.has(name)) {
                continue;
            }
            try {
                const content = await stream(start);
                if (content) {
                    files.set(name, new TextDecoder().decode(content));
                }
            } catch {
                // not readable: as if it were not there
            }
        }
    }
    return files;
}

/** Whether `data` is a PDF (`%PDF-` in its first 1024 bytes, where the format allows it). */
export function isPdf(data: ArrayBuffer | Uint8Array) {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    return latin1(bytes.slice(0, 1024)).includes("%PDF-");
}

/** A kind of file attached to an exam's PDF: what it may be called, and how to tell it by its contents. */
export interface AttachmentKind {
    /** What it holds, for messages: "regions". */
    what: string;
    /** The name gradescope.typ gives it. */
    name: string;
    /** The names it may have, e.g. /regions\.json$/i. */
    pattern: RegExp;
    /** Whether `text` is one. */
    is: (text: string) => boolean;
}

export interface FoundAttachment {
    name: string;
    text: string;
    /** The other attachments whose names fit, in order of priority. */
    others: string[];
}

/**
 * The attachment of kind `kind` among `attachments`, of those whose names fit, by priority: one
 * whose contents are of the kind; then the name gradescope.typ gives it; then one named after the
 * PDF (`pdfName` "midterm.pdf": "midterm-regions.json"); then the first in the PDF. Null if no
 * name fits.
 */
export function findAttachment(attachments: Map<string, string>, kind: AttachmentKind, pdfName?: string): FoundAttachment | null {
    const base = (pdfName ?? "").replace(/\.pdf$/i, "").toLowerCase();
    const ranked = [...attachments.entries()]
        .map(([name, text], order) => ({ name, text, order }))
        .filter(({ name }) => kind.pattern.test(name))
        .map((a) => ({
            ...a,
            rank: [kind.is(a.text) ? 0 : 1, a.name === kind.name ? 0 : 1, base && a.name.toLowerCase().startsWith(base) ? 0 : 1, a.order],
        }))
        // By the first criterion in which they differ.
        .sort((a, b) => a.rank.reduce((d, r, k) => d || r - b.rank[k], 0));
    const [best, ...rest] = ranked;
    return best ? { name: best.name, text: best.text, others: rest.map((a) => a.name) } : null;
}

/**
 * A chosen file's text: a text file's own, or, for a PDF, that of its attachment of kind `kind`
 * (see `findAttachment`), with all its attachments. Throws if a PDF has none.
 */
export async function readFileOrAttachment(file: Blob & { name?: string }, kind: AttachmentKind) {
    const data = new Uint8Array(await file.arrayBuffer());
    if (!isPdf(data)) {
        return { text: new TextDecoder().decode(data), attachments: null, attached: null };
    }
    const attachments = await pdfAttachments(data);
    const attached = findAttachment(attachments, kind, file.name);
    if (!attached) {
        throw new Error(
            `${file.name ?? "The PDF"} has no ${kind.what} attached (a file named like ${kind.name}). Compile the exam with gradescope.typ (\`#show: gradescope(e, answer-box)\`) to attach it, and use the PDF Typst makes (a program that saves the PDF again may drop it).`
        );
    }
    return { text: attached.text, attachments, attached };
}
