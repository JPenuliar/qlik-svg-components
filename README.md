# Qlik Sense Dynamic SVG Component Library (`qlik-svg-components`)

A modular, server-side data prep framework for Qlik Sense developers to dynamically compile, shape, and embed pixel-perfect vector graphics natively inside standard dashboard tables. 

By manipulating XML text blocks during the load script execution phase, this library generates lightweight vector graphics that scale and render within standard table objects—**completely eliminating the need for custom visualizations, extensions, or security-compromising plug-ins.**

---

## 🚀 Visual Features & Animation Engines

The library bypasses Qlik Sense's aggressive client-side HTML sanitizer by injecting hardware-accelerated CSS animations inside encapsulated `<style>` blocks. This grants access to fluid visual effects:

*   **100% Full-Background Shimmer Crawler**: Active states (like `ACTIVE` or `PENDING`) automatically render a subtle, continuous wave background shimmer (`1.8s` ease-in-out cycle) that sweeps horizontally entirely behind the text layer.
*   **Breathing Radar Glow**: Bottleneck indicators (such as `CRITICAL` or `BLOCKED`) embed a pulsing circle vector that loops its opacity between `0.4` and `1.0` every 2 seconds to draw immediate visual attention.
*   **Proportional Text Scaling Math**: Evaluates character lengths via `Len(Trim())` script expressions to extend background paths symmetrically, preventing word overlap collisions (`[ Rome ]` vs `[ San Francisco ]`).
*   **Linear KPI Progress Gauges**: Maps numeric percentages (0-100%) to a vector canvas using a smooth entry width-wipe animation (`1.2s` `cubic-bezier` physics track) that cushions gracefully into place.
*   **Smart Contrast Color Flipping**: Text labels floating over progress tracks dynamically flip to white once the filling bar passes 45% width, ensuring high legibility over dark fills and light backgrounds alike.
*   **Anti-Clipping Spatial Layouts**: Every capsule and line container tracks integrated pixel padding offsets (`x="2" y="2"`) to guarantee thick borders or dashed lines never get shaved off at the cell boundaries.

---

## 📦 Component Parameter Signatures

### 1. The Pill & Status Badge Module (`CreateSVGPills`)
```qlik
CALL CreateSVGPills(SourceTable, GroupField, TextField, IdField, OutputField, BgColorField, TextColorField, StrokeColorField, OutputType);
```
*   **`SourceTable`**: The target staging table resident in your script memory.
*   **`GroupField`**: Column used to partition records when running grouped profiles (pass an empty string `''` if executing standalone single row maps).
*   **`TextField`**: The structural text string to print inside the capsules. Keywords like `ACTIVE`, `PENDING`, `BLOCKED`, `ALERT`, or `CRITICAL` automatically wake up background shimmers and pulse dots.
*   **`IdField` / `OutputField`**: Staging primary key reference and the resulting SVG column name destination.
*   **`BgColorField` / `TextColorField` / `StrokeColorField`**: Table columns containing **URL-encoded** hex strings (`%23` instead of `#`). 

### 2. The Progressive Tracking Gauge Module (`CreateSVGProgressBars`)
```qlik
CALL CreateSVGProgressBars(SourceTable, IdField, PercentField, OutputField, FillColorBlock, TrackColorBlock);
```
*   **`PercentField`**: Existing database numeric column (0 to 100). Trailing decimal values (e.g. `100.00`) are truncated inside the engine via a `Floor()` statement to protect browser CSS keyframe formatting rules.
*   **`FillColorBlock` / `TrackColorBlock`**: Raw asset colors passed into the progress bar tracker canvas model.

---

## 💾 Implementation Examples

### Scenario A: DevOps CI/CD Deployment Pipeline (`'ROW'` Mode)
Isolates infrastructure deployment environments row-by-row, producing an identical line item output count where each record row carries its own standalone animated capsule badge.

```qlik
// Initialize the master configuration panel variables
\$(Include=../src/SVG_Main_Core.qvs);

// Force borders solid for crisp, distinct technical outlines
LET vStrokeDashArray = ''; 

DevOpsStaging:
NoConcatenate
LOAD * INLINE [
    EnvID, Environment,     DeployStatus, BgHex,       TextHex,     StrokeHex
    501,   Production,      ACTIVE,       '%23e0f2fe', '%230369a1', '%230284c7' // Blue + Full Background Crawler
    502,   Staging Sandbox, PENDING,      '%23fef3c7', '%2392400e', '%23f59e0b' // Amber + Background Crawler + Dot
    503,   UAT Testing,     CRITICAL,     '%23fee2e2', '%23991b1b', '%23ef4444' // Red + Breathing Pulsing Radar Dot
    504,   Local Dev Box,   Syncing,      '%23f1f5f9', '%23334155', '%23cbd5e1' // Gray Static Component
];

// Generates 'DevOpsStaging_SVG_Output' table carrying [EnvID] and [EnvBadgeField] (4 rows)
CALL CreateSVGPills('DevOpsStaging', '', 'DeployStatus', 'EnvID', 'EnvBadgeField', 'BgHex', 'TextHex', 'StrokeHex', 'ROW');

DROP TABLE DevOpsStaging;
```

### Scenario B: Global Supply Chain Hub Logistics (`'GROUPED'` Mode)
Groups multiple shipment items horizontally side-by-side inside their shared parent region dimension cell.

```qlik
\$(Include=../src/SVG_Main_Core.qvs);

LogisticsStaging:
NoConcatenate
LOAD * INLINE [
    ShipID, HubRegion,       CargoStatus, BgHex,       TextHex,     StrokeHex
    901,    North America,   ACTIVE,      '%23dcfce7', '%23166534', '%2322c55e' // Green Shimmer
    902,    North America,   BLOCKED,     '%23fee2e2', '%23991b1b', '%23ef4444' // Red Pulsing Dot Alert
    903,    EuroHub Central, PENDING,     '%23fef3c7', '%2392400e', '%23f59e0b' // Amber Shimmer + Alert Dot
    904,    EuroHub Central, ACTIVE,      '%23e0f2fe', '%230369a1', '%230284c7' // Blue Shimmer
    905,    APAC Logistics,  In Transit,  '%23f1f5f9', '%23334155', '%23cbd5e1' // Slate Gray Static
];

// Generates 'LogisticsStaging_SVG_Output' table indexed uniquely by the [HubRegion] category column
CALL CreateSVGPills('LogisticsStaging', 'HubRegion', 'CargoStatus', 'ShipID', 'HubStatusStrips', 'BgHex', 'TextHex', 'StrokeHex', 'GROUPED');

DROP TABLE LogisticsStaging;
```

### Scenario C: Executive Metric Status Legend Ribbon (`'SINGLE'` Mode)
Collapses an entire table data array into **one single combined ribbon text string row** (ideal for building dashboard legends or high-utility header widgets).

```qlik
\$(Include=../src/SVG_Main_Core.qvs);

// Apply a dotted outline profile configuration for tracking badges
LET vStrokeDashArray = '2, 2'; 

KPILegendStaging:
NoConcatenate
LOAD * INLINE [
    MatrixKey, MetricNode,  ThemeBg,     ThemeTxt,    ThemeStroke
    1,         ACTIVE,      '%23e0f2fe', '%230369a1', '%230284c7' // Shimmer
    2,         PENDING,     '%23fef3c7', '%2392400e', '%23f59e0b' // Shimmer + Dot
    3,         BLOCKED,     '%23fee2e2', '%23991b1b', '%23ef4444' // Breathing Pulse Alert Dot
];

// Generates 'KPILegendStaging_SVG_Output' table carrying a single cell row named [GlobalStatusRibbon]
CALL CreateSVGPills('KPILegendStaging', '', 'MetricNode', 'MatrixKey', 'GlobalStatusRibbon', 'ThemeBg', 'ThemeTxt', 'ThemeStroke', 'SINGLE');

DROP TABLE KPILegendStaging;
```

### Scenario D: Linear KPI Progress Tracks & Gauges
Maps completion rates linearly over an optimized 102px width safety track container.

```qlik
\$(Include=../src/SVG_Main_Core.qvs);

ProjectMilestones:
NoConcatenate
LOAD * INLINE [
    ProjectID, ProjectName,       CompletionPercentage
    1001,      Cloud Migration,   88.5
    1002,      Database Tuning,   14.0
    1003,      Security Audit,    100.0
    1004,      UI/UX Overhaul,    0.0
];

// Generates 'ProjectMilestones_Progress_Output' table containing [ProjectID] and [VisualProgressTrack]
CALL CreateSVGProgressBars('ProjectMilestones', 'ProjectID', 'CompletionPercentage', 'VisualProgressTrack', '%2306b6d4', '%23f1f5f9');

DROP TABLE ProjectMilestones;
```
