# Changelog

## 1.5.0 (2026-10-05)

### Added

-   Gradescope links work inside Canvas. When Gradescope is opened through Canvas, links in
    Gradescope now point back to Canvas, so Ctrl+click, middle-click, and "Copy link" open the
    page inside Canvas instead of on bare Gradescope. Plain clicks work as before.
-   The Canvas address bar follows the Gradescope page you are on, so reloading or bookmarking
    returns to the same Gradescope page.
-   The script now also runs on `www.gradescope.ca` and `www.gradescope.com`. On Gradescope, it
    only does the link rewriting above, and only when Gradescope is embedded in Canvas.

### Development

-   The source is TypeScript built with Vite. The source files missing after the Vite
    conversion have been restored.
-   A GitHub Actions workflow checks that the source builds and that `dist/` is up to date.
-   The development userscript (`dist/react-userscripts-dev.user.js`) also
    runs on Gradescope.

Changes before 1.5.0 were not recorded.
