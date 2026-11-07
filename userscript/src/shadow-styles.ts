/**
 * Styles for the tools' shadow roots.
 */

/** A custom property that the tools' CSS sets on `:host` (see rubric/rubric-tool.css). */
export const STYLED_MARKER = "--canvas-quiz-stats-styled";

/** Whether the shadow root's styles reach its host, i.e. its CSS is in effect. */
function isStyled(shadow: ShadowRoot) {
    return getComputedStyle(shadow.host).getPropertyValue(STYLED_MARKER).trim() === "1";
}

/**
 * Give `shadow` (whose host is in the document) the stylesheet `css`, which must set
 * {@link STYLED_MARKER} to 1 on `:host`.
 *
 * A constructed stylesheet also works where a page's Content-Security-Policy blocks <style>. But
 * some browsers (older Firefox, for a script run by a userscript manager) take it without applying
 * it and without an error, which leaves the tool unstyled and its button out of sight. So check
 * that it applies, and add a <style> if it does not.
 */
export function styleShadowRoot(shadow: ShadowRoot, css: string) {
    try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        shadow.adoptedStyleSheets = [sheet];
        if (isStyled(shadow)) {
            return;
        }
    } catch {
        // No constructed stylesheets: use <style>
    }
    const style = document.createElement("style");
    style.textContent = css;
    shadow.prepend(style);
}
