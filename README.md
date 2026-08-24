# 🚀 Elevate Your Qlik Tables with Native SVG UI Components!

**`qlik-svg-components`** injects lightweight, stunning, animated vector graphics directly into native Qlik Sense tables via the backend load script. No extensions. No security risks. Zero client-side slowdowns.

---

### 👨‍💻 Author & Maintainer
*   **Project Creator**: [JPenuliar](https://github.com)
*   **Repository Home**: [://github.com](https://github.com/qlik-svg-components)

---

### 🎬 Animated System Profiles & Core Color Themes

Our framework maps text triggers (like `ACTIVE`, `PENDING`, `BLOCKED`, or `CRITICAL`) directly to hardware-accelerated CSS animation effects. Below is the complete visual design reference:

*   **🌊 Green Shimmer (`ACTIVE` Overrides)**:
    *   *Visual Effect*: A full-height, continuous color wave loading sweep (`1.8s` loop duration) running smoothly from left to right behind the label text.
    *   *Theme Colors*: Soft Green background (`%23dcfce7`) paired with a vivid Green filling wave (`%2322c55e`).
*   **🚨 Red Pulsing Dot Alert (`BLOCKED` / `CRITICAL` Overrides)**:
    *   *Visual Effect*: Appends an ambient, breathing "radar-glow" circle vector on the left side of the text that loops its opacity gracefully from `0.4` to `1.0` every 2 seconds.
    *   *Theme Colors*: Soft Red background (`%23fee2e2`), Dark Red text (`%23991b1b`), and an energetic Red warning pulse element (`%23ef4444`).
*   **⚡ Amber Shimmer + Alert Dot (`PENDING` Overrides)**:
    *   *Visual Effect*: The ultimate combined alarm badge. It simultaneously triggers a full background width-wipe horizontal loading track *and* pins a slow-pulsing warning circle next to the label.
    *   *Theme Colors*: Soft Amber background (`%23fef3c7`), Dark Amber text (`%2392400e`), and an Amber warning stroke (`%23f59e0b`).
*   **🌊 Blue Shimmer (`ACTIVE` Default)**:
    *   *Visual Effect*: A clean background shimmer sweep that moves fluidly over a 1.8-second cycle, perfect for showing an active background workflow process without text clipping.
    *   *Theme Colors*: Soft Blue background (`%23e0f2fe`) combined with a Dark Blue shifting wave layer (`%230284c7`).
*   **💤 Slate Gray Static (Standard Default Fallback)**:
    *   *Visual Effect*: Completely static. Disables all animations and background loaders for completed, historical, or idle elements to keep your table view clean and readable.
    *   *Theme Colors*: Neutral Gray background (`%23f1f5f9`), Slate Gray text (`%23334155`), and an elegant bounding frame outline (`%23cbd5e1`).

---

## 💾 Subroutine Parameters & Integration

### 1. The Pill & Status Badge Module (`CreateSVGPills`)
```qlik
CALL CreateSVGPills(SourceTable, GroupField, TextField, IdField, OutputField, BgColorField, TextColorField, StrokeColorField, OutputType);
```
*   **`vOutputType` Deploy Profiles**: 
    *   `'ROW'`: Keeps records independent, outputting a standalone single badge line-for-line.
    *   `'GROUPED'`: Automatically stacks matching elements side-by-side inside a single cell mapped to your category dimension, dropping row-level keys to prevent row splitting anomalies.
    *   `'SINGLE'`: Squeezes your entire dataset horizontally into a single-row status legend ribbon widget.

### 2. Linear Progressive Tracking Gauges (`CreateSVGProgressBars`)
```qlik
CALL CreateSVGProgressBars(SourceTable, IdField, PercentField, OutputField, FillColorBlock, TrackColorBlock);
```
*   Features a custom, mathematically un-collapsible SVG animation matrix. Active rows slide smoothly into their target position via an Ease-In-Out physics curve, while `100%` achieved milestones automatically switch to an ambient green breathing cycle.

> ⚠️ **Critical URL Hex Note**: All hex color codes passed into these modules **must be encoded using `%23` instead of a hash `#`** (for example: `'%2306b6d4'`). Passing a raw `#` breaks the HTML string structure, causing images to appear blank.

---

## 🎨 Presentation Table Layout Checklist

To make sure your inline text strings convert to visual components instantly inside your sheet panel properties:
1.  Select your output field column (`OutputField`) inside the table chart's data pane.
2.  Switch column **Representation** from *Text* to **IMAGE**.
3.  Switch **Image Sizing** from *Keep Aspect Ratio* to **STRETCH**. *(Our layout code blocks Qlik from warping your badges, while allowing progress bars to expand linearly across the grid width).*
4.  Go to **Appearance Panel** -> **Presentation** -> **Row Height (in lines)** and increase the padding height parameter to **3** or **4** lines to give your animated layouts premium breathing room.
