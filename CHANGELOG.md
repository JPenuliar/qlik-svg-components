# Changelog

All notable changes to the `qlik-svg-components` library will be documented in this file.

The project adheres to [Semantic Versioning](https://semver.org).

---

## - 2026-08-24

### Added
* **Dynamic Core Subroutine (`CreateSVGPills`)**: A production-ready script macro that converts rows of text fields into styled SVG components.
* **Layout Modes (`vOutputType`)**: Built out explicit engine routing supporting three major dashboard formatting profiles:
  * `GROUPED`: Automatically groups and strings child badges side-by-side inside a single cell mapped to a category dimension (e.g., matching cities per country row).
  * `ROW`: Skips concatenation math to output clean, single standalone pills for every single record, maintaining the original source row count.
  * `SINGLE`: Merges an entire table’s data horizontally into a single-row canvas ribbon (ideal for global status bars or master filters).
* **Centralised Style Tokens Panel**: Created a global layout variable configurations system using `LET` statements to handle styling properties like font sizes, families, weights, capsule heights, and padding margins.
* **Adaptive String Length Sizing**: Integrated `Len(Trim())` text tracking math directly into the load compiler. Capsules now stretch or contract dynamically to perfectly frame words (`[ Rome ]` vs `[ San Francisco ]`).
* **XML Namespace & Grid Alignment Rules**: Implemented verified W3C configurations (`xmlns="http://w3.org"`) paired with aspect ratio overrides (`preserveAspectRatio="xMinYMid meet"`). This locks the generated graphics tightly to the left margin edge of columns even when Qlik cells stretch.
* **Vector Border Stroke Modifiers**: Added `vStrokeWidth` and `vStrokeDashArray` script features to paint solid, dotted, or custom dashed borders (`stroke-dasharray="4, 3"`) around capsules without clipping.

### Fixed
* **Hex Color String Collisions**: Resolved an issue where browsers completely ignored inline color rendering profiles by forcing a `Replace()` loop to URL-encode `#` prefixes into browser-safe `%23` codes.
* **Hidden Staging Auto-Concatenation Errors**: Fixed runtime `Table not found` schema crashes by explicitly wrapping intermediate transformation loops inside `NoConcatenate` headers.
* **String Evaluation Crashes**: Corrected a crash where Qlik interpreted static data block placeholders as nonexistent physical database columns by converting double quotes (`"GlobalCanvas"`) into explicitly masked single quotes (`Chr(39)` macro calls).
* **Text Center Offset Drift**: Repositioned text center points from raw percentages (`x="50%"`, `y="50%"`) to fixed geometric baseline locations (`x` width fractions, `y` mid-lines). Text labels no longer drift outside capsule borders inside wide viewports.
* **W3C Schema Typos**: Cleaned up internal string rendering typos where incorrect trailing quotes appended to the root namespace string.

---

## - 2026-08-21

### Added
* Initial prototype script designed to stitch static-width SVG strings from basic INLINE tables.
* Proof-of-concept horizontal position tracking mapping using global row counters.
