# 🚀 Elevate Your Qlik Tables with Native SVG UI Components!

**`qlik-svg-components`** injects lightweight, stunning, animated vector graphics directly into native Qlik Sense tables via the backend load script. No extensions. No security risks. Zero client-side slowdowns.

---

### 👨‍💻 Author & Maintainer
*   **Project Creator**: [JPenuliar](https://github.com)
*   **Repository Home**: [://github.com](https://github.com/qlik-svg-components)

---

### 🎬 Live Animation Profiles & Core Color Themes

Below are the live-rendering animation profiles handled natively by our framework's backend script loops:

| Status Key | Live Component Showcase | Profile Description |
| :--- | :--- | :--- |
| **ACTIVE (Green)** | <img src="https://githubusercontent.com" width="106" height="28" alt="Green Shimmer" /> | **Green Shimmer**: Continuous `1.8s` loading sweep running horizontally behind the text label. |
| **BLOCKED / CRITICAL** | <img src="https://githubusercontent.com" width="114" height="28" alt="Red Pulse" /> | **Red Pulsing Dot**: Infuses a flashing radar alert ring on the left with a slow opacity breathing cycle. |
| **PENDING** | <img src="https://githubusercontent.com" width="112" height="28" alt="Amber Combo" /> | **Amber Combo**: Dual-action animation combining a full background loader bar with a pulsing alert dot. |
| **ACTIVE (Blue)** | <img src="https://githubusercontent.com" width="106" height="28" alt="Blue Shimmer" /> | **Blue Shimmer**: Elegant wave shimmer, perfect for active background syncs or data pipeline states. |
| **DEFAULT (Static)** | <img src="https://githubusercontent.com" width="98" height="28" alt="Slate Static" /> | **Slate Static**: Disables all movement to keep completed or historical elements clean and legible. |

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
