# 🚀 Elevate Your Qlik Tables with Native SVG UI Components!

Stop choosing between boring text grids and clunky, slow chart extensions. 

**`qlik-svg-components`** injects lightweight, stunning, animated vector graphics **directly into your native Qlik Sense tables** via the backend load script. No extensions. No security risks. Zero client-side slowdowns.

---

### 👨‍💻 Author & Maintainer
*   **Project Creator**: [JPenuliar](https://github.com)
*   **Repository Home**: [://github.com](https://github.com/qlik-svg-components)

---

### 🎬 Live Animation Profiles & Core Color Themes

Below are the live-rendering animation profiles handled natively by our framework's backend script loops, fully optimized to bypass GitHub's Camo security caching filters:

| Status Key | Live Component Showcase | Profile Description |
| :--- | :--- | :--- |
| **ACTIVE (Green)** | <img src="https://githubusercontent.com" width="106" height="28" alt="Green Shimmer" /> | **Green Shimmer**: Continuous `1.8s` loading sweep running horizontally behind the text label. |
| **BLOCKED / CRITICAL** | <img src="https://githubusercontent.com" width="114" height="28" alt="Red Pulse" /> | **Red Pulsing Dot**: Infuses a flashing radar alert ring on the left with a slow opacity breathing cycle. |
| **PENDING** | <img src="https://githubusercontent.com" width="112" height="28" alt="Amber Combo" /> | **Amber Combo**: Dual-action animation combining a full background loader bar with a pulsing alert dot. |
| **ACTIVE (Blue)** | <img src="https://githubusercontent.com" width="106" height="28" alt="Blue Shimmer" /> | **Blue Shimmer**: Elegant wave shimmer, perfect for active background syncs or data pipeline states. |
| **DEFAULT (Static)** | <img src="https://githubusercontent.com" width="98" height="28" alt="Slate Static" /> | **Slate Static**: Disables all movement to keep completed or historical elements clean and legible. |

---

## 🛠️ Global Design System Configuration Panel

Typography, sizing padding offsets, and outline profiles are fully decoupled from individual component code. To change the styling across your entire application dashboard suite, simply adjust these variables at the top of your master configuration asset file (`src/SVG_Main_Core.qvs`):

```qlik
LET vFontSize       = '11px';        // Font size height inside components
LET vFontFamily     = 'sans-serif';  // Typography family profile
LET vFontWeight     = 'bold';        // Design text weight profile (bold/normal)
LET vPillHeight     = 28;            // Physical capsule thickness in pixels
LET vPillGap        = 6;             // Horizontal space left between grouped badges
LET vCharMultiplier = 7.5;           // Width padding tracking multiplier element

// Border Outline Frame Design Settings
LET vStrokeWidth     = 1.5;          // Border line thickness in pixels
LET vStrokeDashArray = '4, 3';       // Core dash layout sequence loop token
```

### 🔀 Premium Bounding Outline Dash Profiles
By adjusting the `vStrokeDashArray` numeric sequence token variables, the engine dynamically repaints your capsule outline frames. Use these professional copy-paste design patterns:

*   **💤 Solid Bounding Edge (Default Classic Baseline)**:
    *   `LET vStrokeDashArray = '';` 
    *   *Visual Style*: Continuous, unbroken solid border outline. Ideal for enterprise data grids.
*   **📋 Standard Balanced Dashed Border**:
    *   `LET vStrokeDashArray = '4, 3';`
    *   *Visual Style*: Alternating 4px dashes and 3px empty gaps for a modular, clean dashboard feel.
*   **⚡ Dense Dotted Process Track Border**:
    *   `LET vStrokeDashArray = '2, 2';`
    *   *Visual Style*: Tight, high-density 2px dots that work flawlessly on compact table rows.
*   **🏁 Wide Accent Long-Dash Border**:
    *   `LET vStrokeDashArray = '8, 4';`
    *   *Visual Style*: Elongated 8px dashes that draw clear separation boundaries on pipeline elements.

---

## 💾 Subroutine Parameters & Integration

### 1. The Pill & Status Badge Module (`CreateSVGPills`)
```qlik
CALL CreateSVGPills(SourceTable, GroupField, TextField, IdField, OutputField, BgColorField, TextColorField, StrokeColorField, OutputType);
```
*   **`vOutputType` Deploy Profiles**: 
    *   `'ROW'`: Keeps records independent, outputting a standalone single badge line-for-line. Perfect for retaining individual row attributes.
    *   `'GROUPED'`: Automatically clusters matching elements side-by-side inside a single cell mapped to your category dimension, dropping row-level keys to prevent horizontal overlapping or raw row splitting anomalies.
    *   `'SINGLE'`: Squeezes your entire dataset horizontally into a single-row status legend ribbon widget.

### 2. Linear Progressive Tracking Gauges (`CreateSVGProgressBars`)
```qlik
CALL CreateSVGProgressBars(SourceTable, IdField, PercentField, OutputField, FillColorBlock, TrackColorBlock);
```
*   Features a custom, mathematically un-collapsible SVG animation matrix. Active rows slide smoothly into their target position via an Ease-In-Out physics curve, while `100%` achieved milestones automatically switch to an ambient green breathing cycle.

> ⚠️ **Critical URL Hex Note**: All hex color codes passed into these modules **must be encoded using `%23` instead of a hash `#`** (for example: `'%2306b6d4'`). Passing a raw `#` breaks the HTML string structure, causing images to appear blank.

---

## 💾 Clean Copy-Paste Implementation Guide

### Retaining Extra Business Fields (`ROW` Mode Example)
To pass descriptive data fields (like `Environment` or `ServerCount`) through to your final model alongside your badges, execute the subroutine macro and join the resulting SVG column back via a native `Left Join` before dropping the temporary tracking layouts:

```qlik
\$(Include=../src/SVG_Main_Core.qvs);

LET vStrokeDashArray = ''; 

// 1. Load base data with ALL required descriptive business fields
DevOpsStaging:
NoConcatenate
LOAD * INLINE [
    EnvID, Environment,     DeployStatus, ServerCount, LastUpdated,   BgHex,       TextHex,     StrokeHex
    501,   Production,      ACTIVE,       24,          '14:22:05',    '%23e0f2fe', '%230369a1', '%230284c7' 
    502,   Staging Sandbox, PENDING,      8,           '14:18:12',    '%23fef3c7', '%2392400e', '%23f59e0b' 
    503,   UAT Testing,     CRITICAL,     12,          '14:01:59',    '%23fee2e2', '%23991b1b', '%23ef4444' 
    504,   Local Dev Box,   Syncing,      2,           '13:44:10',    '%23f1f5f9', '%23334155', '%23cbd5e1' 
];

// 2. Call the subroutine. It handles styling internally and builds 'DevOpsStaging_SVG_Output'
CALL CreateSVGPills('DevOpsStaging', '', 'DeployStatus', 'EnvID', 'AnimatedPillField', 'BgHex', 'TextHex', 'StrokeHex', 'ROW');

// 3. Merging the component column directly back using your row key identifier
Left Join(DevOpsStaging)
LOAD 
    EnvID, 
    AnimatedPillField 
RESIDENT DevOpsStaging_SVG_Output;

// 4. Drop the macro tracking layout table
DROP TABLE DevOpsStaging_SVG_Output;

// Final table remaining in your associative model: 'DevOpsStaging'
// Completely loaded with columns: [EnvID], [Environment], [DeployStatus], [ServerCount], [LastUpdated], [AnimatedPillField]
```

---

## 🎨 Presentation Table Layout Checklist

To make sure your inline text strings convert to visual components instantly inside your sheet panel properties:
1.  Select your output field column (`OutputField` / `AnimatedPillField`) inside the table chart's data pane.
2.  Switch column **Representation** from *Text* to **IMAGE**.
3.  Switch **Image Sizing** from *Keep Aspect Ratio* to **STRETCH**. *(Our layout code blocks Qlik from warping your badges, while allowing progress bars to expand linearly across the grid width).*
4.  Go to **Appearance Panel** -> **Presentation** -> **Row Height (in lines)** and increase the padding height parameter to **3** or **4** lines to give your animated layouts premium breathing room.

**Enjoy stunning, animated, responsive tables under peak corporate data loads!**
