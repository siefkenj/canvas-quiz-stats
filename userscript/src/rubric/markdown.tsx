/**
 * A small renderer for Gradescope's rubric markdown: paragraphs, line breaks, bullet lists,
 * **bold**, *italic*, `code`, and math ($$inline$$, $$$display$$$). Math is shown as readable
 * Unicode (bundling a real TeX renderer and its fonts would make the userscript much larger);
 * hovering shows the LaTeX source. Builds React elements, never HTML strings.
 */
import React from "react";

const SYMBOLS: Record<string, string> = {
    in: "∈", notin: "∉", ni: "∋", subseteq: "⊆", subset: "⊂", supseteq: "⊇", supset: "⊃",
    subsetneq: "⊊", cup: "∪", cap: "∩", setminus: "∖", emptyset: "∅", varnothing: "∅",
    bigcup: "⋃", bigcap: "⋂", forall: "∀", exists: "∃", nexists: "∄", neg: "¬", lnot: "¬",
    land: "∧", wedge: "∧", lor: "∨", vee: "∨", Rightarrow: "⇒", implies: "⟹", Leftarrow: "⇐",
    impliedby: "⟸", Longleftarrow: "⟸", Longrightarrow: "⟹", iff: "⟺", Leftrightarrow: "⇔",
    to: "→", rightarrow: "→", leftarrow: "←", mapsto: "↦", leftrightarrow: "↔",
    le: "≤", leq: "≤", ge: "≥", geq: "≥", neq: "≠", ne: "≠", approx: "≈", equiv: "≡",
    cong: "≅", sim: "∼", infty: "∞", cdot: "·", times: "×", div: "÷", pm: "±", mp: "∓",
    circ: "∘", dots: "…", ldots: "…", cdots: "⋯", vdots: "⋮", mid: "∣", nmid: "∤",
    langle: "⟨", rangle: "⟩", lfloor: "⌊", rfloor: "⌋", lceil: "⌈", rceil: "⌉",
    sum: "∑", prod: "∏", int: "∫", partial: "∂", nabla: "∇", prime: "′", ell: "ℓ",
    alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ϵ", varepsilon: "ε", zeta: "ζ",
    eta: "η", theta: "θ", iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ",
    pi: "π", rho: "ρ", sigma: "σ", tau: "τ", phi: "ϕ", varphi: "φ", chi: "χ", psi: "ψ",
    omega: "ω", Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Pi: "Π", Sigma: "Σ",
    Phi: "Φ", Psi: "Ψ", Omega: "Ω", gcd: "gcd", lcm: "lcm", max: "max", min: "min",
    log: "log", ln: "ln", sin: "sin", cos: "cos", tan: "tan", exp: "exp", lim: "lim",
    sup: "sup", inf: "inf", deg: "deg", det: "det", mod: "mod", bmod: "mod", qed: "∎",
    square: "□", checkmark: "✓",
};
const BLACKBOARD: Record<string, string> = { R: "ℝ", Z: "ℤ", N: "ℕ", Q: "ℚ", C: "ℂ", P: "ℙ", F: "𝔽" };
const SUPER: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸",
    "9": "⁹", "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", n: "ⁿ", i: "ⁱ", k: "ᵏ",
    "*": "*", "′": "′",
};
const SUB: Record<string, string> = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈",
    "9": "₉", "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎", a: "ₐ", e: "ₑ", i: "ᵢ",
    j: "ⱼ", k: "ₖ", n: "ₙ", m: "ₘ", o: "ₒ", x: "ₓ", t: "ₜ",
};

function script(text: string, table: Record<string, string>, marker: string) {
    const chars = [...text];
    if (chars.length && chars.every((c) => c in table)) {
        return chars.map((c) => table[c]).join("");
    }
    return chars.length === 1 ? `${marker}${text}` : `${marker}(${text})`;
}

/** LaTeX math as readable Unicode text, e.g. `\{x \in \mathbb{Z}\}` → `{x ∈ ℤ}`. */
export function latexToText(tex: string): string {
    const OPEN = "";
    const CLOSE = "";
    let s = tex
        .replace(/\\\\/g, " ")
        .replace(/\\\{/g, OPEN)
        .replace(/\\\}/g, CLOSE)
        .replace(/\\(?:left|right|big|Big|bigg|Bigg)(?![a-zA-Z])\s*\.?/g, "")
        .replace(/\\mathbb\s*\{\s*([A-Z])\s*\}/g, (_, c) => BLACKBOARD[c] ?? c)
        .replace(/\\mathbb\s*([A-Z])/g, (_, c) => BLACKBOARD[c] ?? c)
        .replace(/\\(?:text|mathrm|mathbf|mathit|mathsf|mathcal|operatorname|textbf|textit|boldsymbol)\s*\{([^{}]*)\}/g, "$1");
    for (let k = 0; k < 4; k++) {
        s = s
            .replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (_, a, b) => {
                // Parenthesize anything but a number or a single letter: (2m)/3, but a/b
                const wrap = (x: string) =>
                    /^(\d+(\.\d+)?|[A-Za-z]′*)$/.test(x.trim()) ? x.trim() : `(${x.trim()})`;
                return `${wrap(a)}/${wrap(b)}`;
            })
            .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)")
            .replace(/\\(?:overline|bar)\s*\{([^{}]*)\}/g, "$1̅");
    }
    s = s
        .replace(/\\[,;:! ]|\\q?quad(?![a-zA-Z])/g, " ")
        .replace(/\\([a-zA-Z]+)/g, (m, name) => SYMBOLS[name] ?? m)
        .replace(/\^\{([^{}]*)\}|\^(\S)/g, (_, a, b) => script(a ?? b, SUPER, "^"))
        .replace(/_\{([^{}]*)\}|_(\S)/g, (_, a, b) => script(a ?? b, SUB, "_"))
        .replace(/\\([%$&#_])/g, "$1")
        .replace(/[{}]/g, "")
        .replace(new RegExp(OPEN, "g"), "{")
        .replace(new RegExp(CLOSE, "g"), "}")
        .replace(/'/g, "′");
    return s.replace(/\s+/g, " ").trim();
}

function MathSpan({ tex, display }: { tex: string; display?: boolean }) {
    return (
        <span className={display ? "math display" : "math"} title={`LaTeX: ${tex.trim()}`}>
            {latexToText(tex)}
        </span>
    );
}

/** Inline markdown without math: **bold**, *italic*, `code`. */
function inlineText(text: string, key: string): React.ReactNode[] {
    const out: React.ReactNode[] = [];
    const re = /\*\*([^*]+)\*\*|(?<![\w*])\*(?!\s)([^*]+?)\*(?![\w*])|`([^`]+)`/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let n = 0;
    while ((m = re.exec(text))) {
        if (m.index > last) {
            out.push(text.slice(last, m.index));
        }
        const k = `${key}-${n++}`;
        if (m[1] !== undefined) {
            out.push(<strong key={k}>{inlineText(m[1], k)}</strong>);
        } else if (m[2] !== undefined) {
            out.push(<em key={k}>{inlineText(m[2], k)}</em>);
        } else {
            out.push(<code key={k}>{m[3]}</code>);
        }
        last = m.index + m[0].length;
    }
    if (last < text.length) {
        out.push(text.slice(last));
    }
    return out.map((x) => (typeof x === "string" ? x.replace(/\\\$/g, "$") : x));
}

/**
 * Inline markdown with math. Math is extracted first so that `*` or `_` inside it isn't read
 * as emphasis; emphasis that spans math (`**Claim $$x$$**`) is handled by protecting math with
 * placeholders while parsing emphasis.
 */
function inline(text: string, key: string): React.ReactNode[] {
    const maths: { tex: string; display: boolean }[] = [];
    const protectedText = text.replace(/(?<!\\)\$\$\$([\s\S]+?)\$\$\$|(?<!\\)\$\$([\s\S]+?)\$\$/g, (_, d, i) => {
        maths.push({ tex: d ?? i, display: d !== undefined });
        return `${maths.length - 1}`;
    });
    const restore = (nodes: React.ReactNode[], k: string): React.ReactNode[] =>
        nodes.flatMap((node, idx) => {
            if (typeof node !== "string") {
                if (React.isValidElement(node)) {
                    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
                    const children = React.Children.toArray(el.props.children);
                    return [React.cloneElement(el, {}, ...restore(children, `${k}-${idx}`))];
                }
                return [node];
            }
            return node.split(/(\d+)/).map((part, j) =>
                j % 2 === 1 ? <MathSpan key={`${k}-${idx}-m${j}`} {...maths[Number(part)]} /> : part
            );
        });
    return restore(inlineText(protectedText, key), key);
}

/** Render a rubric description. */
export function GsMarkdown({ text }: { text: string }) {
    const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
    return (
        <>
            {blocks.map((block, b) => {
                const lines = block.split("\n");
                const out: React.ReactNode[] = [];
                let list: string[] = [];
                let para: string[] = [];
                const flushList = () => {
                    if (list.length) {
                        out.push(
                            <ul key={`l${out.length}`}>
                                {list.map((item, k) => (
                                    <li key={k}>{inline(item, `${b}-l${out.length}-${k}`)}</li>
                                ))}
                            </ul>
                        );
                        list = [];
                    }
                };
                const flushPara = () => {
                    if (para.length) {
                        out.push(
                            <p key={`p${out.length}`}>
                                {para.flatMap((line, k) => [
                                    ...(k ? [<br key={`br${k}`} />] : []),
                                    ...inline(line, `${b}-p${out.length}-${k}`),
                                ])}
                            </p>
                        );
                        para = [];
                    }
                };
                for (const line of lines) {
                    const m = line.match(/^\s*[*-]\s+(.*)$/);
                    if (m) {
                        flushPara();
                        list.push(m[1]);
                    } else {
                        flushList();
                        para.push(line);
                    }
                }
                flushPara();
                flushList();
                return <React.Fragment key={b}>{out}</React.Fragment>;
            })}
        </>
    );
}
