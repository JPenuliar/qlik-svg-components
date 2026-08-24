# Qlik Sense Dynamic SVG Component Library (`qlik-svg-components`)

A modular, server-side data prep framework for Qlik Sense developers to dynamically compile, shape, and embed pixel-perfect vector graphics natively inside standard dashboard tables. 

By manipulating XML text blocks during the load script execution phase, this library generates lightweight vector graphics that scale and render within standard table objects—**completely eliminating the need for custom visualizations, extensions, or security-compromising plug-ins.**

---

## 🚀 Core Capabilities & Use Cases

*   **`GROUPED` Dimension Multi-Pill Strips**: Clusters rows of child items horizontally inside a single field cell mapped to a dimension category (e.g., displaying `[ Completed ] [ In Progress ] [ Blocked ]` inside a project line item).
*   **`ROW` Isolated Badges**: Creates standalone status icons or color-coded metric caps mapped directly to individual record rows while preserving original link relationships.
*   **Linear KPI Progress Tracks**: Draws highly responsive, proportional progress bars inside cells using clean tracking frameworks that adjust dynamically when columns are resized.
*   **Adaptive String Tracking**: Evaluates word lengths in real-time via `Len(Trim())` text formulas to stretch or contract capsule containers symmetrically so your text never overflows its boundaries.
*   **Fixed Edge Alignment Mapping**: Forces elements to stay tightly left-anchored (`preserveAspectRatio="xMinYMid meet"`) or dynamically fill linear tracks (`preserveAspectRatio="none"`) across all modern browser engines.

---

## 📂 Repository Directory Architecture

```text
qlik-svg-components/
│
├── README.md               <-- Library configuration & implementation manifest
├── CHANGELOG.md            <-- Versioning, upgrades, and fix logs
│
├── src/                    <-- Production code distribution modules
│   ├── SVG_Main_Core.qvs   <-- System core entry point (Variable tokens & loops)
│   └── components/
│       ├── sub_pill_generator.qvs    # Module: Standalone & Grouped Badge Pill Strips
│       └── sub_progress_bars.qvs     # Module: Horizontal Linear KPI Tracking Gauges
│
└── examples/               <-- Copy-paste test scripts for application validation
    ├── sample_grouped_cities.qvs     # Scenario template: Grouped pill clustering
    └── sample_metrics_tracker.qvs    # Scenario template: Multi-row progress bars
```

---

## 🛠️ Global Theme Tokens Panel (`src/SVG_Main_Core.qvs`)

Typography, spacing rules, and layout dimensions are fully decoupled from individual logic engines. To adapt the components to your corporate brand styling, update these variables at the top of your master script file:

```qlik
// ============================================================================
// GLOBAL STYLING VARIABLES CONFIGURATION PANEL
// ============================================================================
LET vXmlns          = 'xmlns="http://w3.org"'; // Strict XML Namespace url
LET vFontSize       = '11px';                             // Text label render font height
LET vFontFamily     = 'sans-serif';                       // Corporate typography configuration
LET vFontWeight     = 'bold';                             // Typography design weight profile
LET vPillHeight     = 28;                                 // Base physical capsule thickness (pixels)
LET vPillGap        = 6;                                  // Horizontal space margin gap between pills
LET vCharMultiplier = 7.5;                                // Character width scaling tracker element

// Border Outline Stroke Property Settings
LET vStrokeWidth     = 1.5;                                // Border trace line thickness in pixels
LET vStrokeDashArray = '4, 3';                            // Set to '' for solid line frames

// Mathematical Spatial Coordinate Mapping Variables
LET vPillRadius     = \$(vPillHeight) / 2;                 
LET vCanvasHeight   = \$(vPillHeight) + 4;                 
LET vTextCenterY    = (\$(vPillHeight) / 2) + 2;           
```

---

## 📦 Component Parameter Signatures & Reference Guide

### 1. The Pill & Status Badge Module (`CreateSVGPills`)
```qlik
CALL CreateSVGPills(SourceTable, GroupField, TextField, IdField, OutputField, BgColorField, TextColorField, StrokeColorField, OutputType);
```
*   **`SourceTable`**: The target staging table resident in your script memory.
*   **`GroupField`**: Column used to segregate records when running grouped profiles (pass an empty string `''` if executing on individual row maps).
*   **`TextField`**: The actual text value to print inside the background capsules.
*   **`IdField`**: Row row tracker ID index used for sequential sorting execution.
*   **`OutputField`**: Naming convention applied to the completed data column.
*   **`BgColorField` / `TextColorField` / `StrokeColorField`**: Technical script paths pointing to fields containing **URL-encoded** hex strings (`%23` instead of `#`). Pass text color column into stroke property to dynamically map a matching border color.
*   **`OutputType` Layout Modes**:
    *   `'GROUPED'`: Combines multi-row child line sets horizontally into a single layout row per matching parent dimension column.
    *   `'ROW'`: Keeps every record isolated, yielding standalone pills matching your source table layout count row-for-row.
    *   `'SINGLE'`: Condenses an entire table's column arrays into a single row global string asset (perfect for header KPI filters or status legends).

### 2. The Progressive Tracking Gauge Module (`CreateSVGProgressBars`)
```qlik
CALL CreateSVGProgressBars(SourceTable, IdField, PercentField, OutputField, FillColorBlock, TrackColorBlock);
```
*   **`SourceTable` / `IdField` / `OutputField`**: Standard module routing pointers.
*   **`PercentField`**: Existing database numeric percentage column (0 to 100).
*   **`FillColorBlock` / `TrackColorBlock`**: Raw color blocks (e.g., `'%2322c55e'` for active fill progress and `'%23e2e8f0'` for the back empty track structure).

---

## 🎨 Frontend Presentation Sheet Setup Checklist

To activate vector graphic rendering within Qlik Sense native sheet dashboard table grids, you **must apply these manual overrides** inside the chart's properties panel:

```markdown
### 📋 Visual Object Settings Blueprint

1. 🎯 [DATA PANE] -> Select your output field column (e.g., `CountryPillStrips` or `ProgressBar`).
2. 🖼️ [REPRESENTATION] -> Change drop-down property setting from 'Text' to **IMAGE**.
3. 📐 [IMAGE SIZING] -> Change parameter configuration from 'Keep Aspect Ratio' to **STRETCH**.
   
   👉 *NOTE ON STRETCHING: For Progress Bars, this allows the linear gauge to fill the column space dynamically. For Pill Badges, our embedded `preserveAspectRatio` code overrides Qlik's stretch engine, protecting capsule proportions from distorting while pinning them securely to the left grid border lines.*

4. ↕️ [APPEARANCE PANE] -> Presentation -> Row Height (in lines) -> Set to custom height **3** or **4**.
   
   👉 *This provides adequate top and bottom viewport buffer workspace so borders render crisply without clipping.*
```

---

## 💾 Implementation Examples

### Deploying the Complete Library to an Application Script
```qlik
// 1. Core library initialization (Pulls component subs automatically)
\$(Include=[lib://MyServerFolder/src/SVG_Main_Core.qvs]);

// 2. Setup Staging Tables
SprintMetrics:
LOAD * INLINE [
    SprintID, SprintName,   CompletionRate
    1,        Q1 Launch,    85
    2,        Data Sync,    32
    3,        API Patch,    100
];

ProjectTeams:
LOAD * INLINE [
    RowKey, TeamRegion,     MemberName, Bg,          Txt,         Border
    101,    EMEA Operations, Anna,       '%23e0f2fe', '%230369a1', '%230284c7'
    102,    EMEA Operations, David,      '%23fce7f3', '%239d174d', '%23f472b6'
    103,    APAC Sales,      Ken,        '%23dcfce7', '%23166534', '%2322c55e'
];

// 3. Fire Component Subroutines 
CALL CreateSVGProgressBars('SprintMetrics', 'SprintID', 'CompletionRate', 'ProgressBarTrack', '%233b82f6', '%23f1f5f9');

CALL CreateSVGPills('ProjectTeams', 'TeamRegion', 'MemberName', 'RowKey', 'TeamBadgeStrip', 'Bg', 'Txt', 'Border', 'GROUPED');

// 4. Drop intermediate staging data tables to prevent schema duplication loop loops
DROP TABLES SprintMetrics, ProjectTeams;
```

---

## ⚠️ Known Technical Constraints

*   **URL Hex Encoding Required**: Browsers interpret raw `#` tags inside data URIs as HTML fragment identifiers, which breaks color rendering. All hex values passed through the variables or database layers **must match the `%23` format**.
*   **Variable Extraction Guard**: When referencing script styling variables, use the split quote syntax method embedded within our code blocks (e.g. `font-size="' & '$(vFontSize)' & '"`) to bypass premature Qlik expression evaluation loops.
