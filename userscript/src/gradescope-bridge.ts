/**
 * Make Gradescope links usable when Gradescope is embedded in Canvas.
 *
 * When Gradescope is opened through Canvas, it lives in an iframe, and opening a Gradescope
 * link in a new tab escapes that iframe. This code runs on both sites and the two halves
 * talk via `postMessage`:
 *
 *  - Rerouting: a Canvas URL of the form `<canvas page>#gs=<encoded Gradescope URL>` performs
 *    the usual LTI launch, then the Canvas side tells the iframe to navigate to the Gradescope
 *    URL. While browsing, the Canvas address bar is kept in this form, so reloading or
 *    bookmarking returns to the same Gradescope page.
 *
 *  - Link rewriting: inside the iframe, Gradescope links have their `href` replaced by the
 *    equivalent Canvas URL, so the browser's own Ctrl+click, middle-click, context menu, and
 *    drag-to-tab all use it. A plain left click temporarily restores the original `href`, so
 *    navigation inside the iframe (and Gradescope's own click handlers) are unaffected.
 */

const CANVAS_ORIGINS = ["https://q.utoronto.ca"];
const GRADESCOPE_ORIGINS = [
    "https://www.gradescope.ca",
    "https://www.gradescope.com",
];
const HASH_KEY = "gs";

type BridgeMessage =
    // Gradescope -> Canvas: a page finished loading in the iframe
    | { type: "loaded"; url: string }
    // Canvas -> Gradescope: please send "loaded" again (Canvas may have missed it)
    | { type: "ping" }
    // Canvas -> Gradescope: go to this page
    | { type: "navigate"; url: string }
    // Canvas -> Gradescope: the Canvas page that links should point to
    | { type: "canvasUrl"; url: string };

function bridgeMessage(e: MessageEvent): BridgeMessage | null {
    return e.data?.gsBridge ? e.data : null;
}

/**
 * The Canvas URL that launches Gradescope from `canvasUrl` and then shows `gradescopeUrl`.
 */
function canvasLinkFor(canvasUrl: string, gradescopeUrl: string) {
    return `${canvasUrl}#${HASH_KEY}=${encodeURIComponent(gradescopeUrl)}`;
}

function whenReady(callback: () => void) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
        callback();
    }
}

export function isGradescope() {
    return GRADESCOPE_ORIGINS.includes(window.location.origin);
}

/**
 * Run on the Canvas page that embeds Gradescope.
 */
export function runInCanvas() {
    if (window.top !== window) {
        return;
    }
    const canvasUrl = () => window.location.href.split("#")[0];
    let pending = new URLSearchParams(window.location.hash.slice(1)).get(
        HASH_KEY
    );

    window.addEventListener("message", (e) => {
        const msg = bridgeMessage(e);
        if (!GRADESCOPE_ORIGINS.includes(e.origin) || msg?.type !== "loaded") {
            return;
        }
        const source = e.source as Window;
        const reply = (reply: BridgeMessage) =>
            source.postMessage({ gsBridge: true, ...reply }, e.origin);

        if (pending) {
            // The LTI launch has finished, so Gradescope has a session; show the requested page.
            reply({ type: "navigate", url: pending });
            pending = null;
            return;
        }
        history.replaceState(
            history.state,
            "",
            canvasLinkFor(canvasUrl(), msg.url)
        );
        reply({ type: "canvasUrl", url: canvasUrl() });
    });

    // Gradescope may have loaded before this script started listening.
    for (const frame of document.querySelectorAll("iframe")) {
        frame.contentWindow?.postMessage({ gsBridge: true, type: "ping" }, "*");
    }
}

/**
 * Run on Gradescope pages. Only does anything when Gradescope is embedded in Canvas.
 */
export function runInGradescope() {
    // Only act in the tool frame Canvas embeds directly, not in top-level tabs or nested frames.
    if (window.top === window || window.parent !== window.top) {
        return;
    }
    const post = (msg: BridgeMessage) => {
        for (const origin of CANVAS_ORIGINS) {
            window.parent.postMessage({ gsBridge: true, ...msg }, origin);
        }
    };
    // Login/launch pages are part of the LTI handshake; Gradescope isn't ready to navigate yet.
    const isLaunchPage = /^\/(auth|lti)\b/.test(window.location.pathname);
    const announce = () => {
        if (!isLaunchPage) {
            post({ type: "loaded", url: window.location.href });
        }
    };
    let canvasUrl: string | null = null;
    // Links whose original href is restored while a plain click is being handled.
    const suspended = new WeakSet<HTMLAnchorElement>();

    window.addEventListener("message", (e) => {
        const msg = bridgeMessage(e);
        if (
            e.source !== window.parent ||
            !CANVAS_ORIGINS.includes(e.origin) ||
            !msg
        ) {
            return;
        }
        if (msg.type === "ping") {
            announce();
        } else if (msg.type === "navigate") {
            const url = new URL(msg.url);
            if (url.origin === window.location.origin) {
                window.location.replace(url.href);
            }
        } else if (msg.type === "canvasUrl" && !canvasUrl) {
            canvasUrl = msg.url;
            whenReady(startRewriting);
        }
    });
    announce();

    function shouldRewrite(a: HTMLAnchorElement) {
        const raw = a.getAttribute("href");
        if (!raw || raw.startsWith("#") || raw.startsWith("javascript:")) {
            return false;
        }
        if (a.target && a.target !== "_self") {
            return false;
        }
        // Downloads and Rails UJS links (non-GET or AJAX) aren't page navigations.
        if (a.hasAttribute("download") || a.dataset.method || a.dataset.remote) {
            return false;
        }
        return new URL(a.href).origin === window.location.origin;
    }

    function rewrite(a: HTMLAnchorElement) {
        if (
            !canvasUrl ||
            suspended.has(a) ||
            a.getAttribute("href") === a.dataset.gsCanvasHref
        ) {
            return;
        }
        delete a.dataset.gsOriginalHref;
        delete a.dataset.gsCanvasHref;
        if (!shouldRewrite(a)) {
            return;
        }
        const original = a.href;
        const rewritten = canvasLinkFor(canvasUrl, original);
        a.dataset.gsOriginalHref = original;
        a.dataset.gsCanvasHref = rewritten;
        a.setAttribute("href", rewritten);
    }

    function startRewriting() {
        document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(rewrite);
        new MutationObserver((records) => {
            for (const record of records) {
                if (record.type === "attributes") {
                    if (record.target instanceof HTMLAnchorElement) {
                        rewrite(record.target);
                    }
                    continue;
                }
                for (const node of record.addedNodes) {
                    if (!(node instanceof Element)) {
                        continue;
                    }
                    if (node instanceof HTMLAnchorElement) {
                        rewrite(node);
                    }
                    node.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(rewrite);
                }
            }
        }).observe(document.documentElement, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["href"],
        });

        // A plain left click (or Enter) should navigate within the iframe as usual. Restore the
        // original href for the duration of the click so the default action and Gradescope's
        // own handlers see it. Alt is allowed through so Alt+click downloads the real page.
        window.addEventListener(
            "click",
            (e) => {
                if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) {
                    return;
                }
                const a = (e.target as Element).closest<HTMLAnchorElement>(
                    "a[data-gs-original-href]"
                );
                if (!a || a.getAttribute("href") !== a.dataset.gsCanvasHref) {
                    return;
                }
                suspended.add(a);
                a.setAttribute("href", a.dataset.gsOriginalHref!);
                window.setTimeout(() => {
                    suspended.delete(a);
                    rewrite(a);
                }, 0);
            },
            true
        );
    }
}
