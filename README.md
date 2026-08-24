# 🚀 Elevate Your Qlik Tables with Native SVG UI Components!

Stop choosing between boring text grids and clunky, slow chart extensions. 

**`qlik-svg-components`** injects lightweight, stunning, animated vector graphics **directly into your native Qlik Sense tables** via the backend load script. No extensions. No security risks. Zero client-side slowdowns.

---

### 🔥 Killer Visual Features

Bring your data grids to life with graphics processed directly on the client's GPU for maximum speed:

*   **🌊 Shimmering Backgrounds**: Active items (`ACTIVE` / `PENDING`) automatically cycle a smooth, elegant loading shimmer completely behind your text.
*   **🚨 Pulsing Radar Alerts**: Critical bottlenecks (`CRITICAL` / `BLOCKED`) embed an ambient pulsing dot that catches the user's eye instantly.
*   **📊 Fluid Progress Bars**: KPI gauges slide seamlessly into place with premium Ease-In-Out motion curves when dashboard filters change.
*   **📐 Auto-Sizing Badges**: The engine calculates string lengths in real-time and stretches capsules symmetrically so your text never overflows or clips.
*   **🌗 Contrast Text Flipping**: Text labels inside progress tracks dynamically flip from slate-gray to white once the bar passes 45% width, ensuring perfect legibility.

---

### 📦 Powerfully Reusable & Highly Adaptive

Run the custom subroutines in **3 flexible deployment modes** to fit any dashboard UI layout:

1.  **`ROW`**: Gives every single record row its own standalone, animated status badge.
2.  **`GROUPED`**: Clusters child values horizontally side-by-side inside a single cell (e.g., displaying `[ Completed ] [ In Progress ] [ Blocked ]` inside one project row).
3.  **`SINGLE`**: Compresses an entire dataset array into a beautiful horizontal status legend ribbon to lock at the top of your sheets.

---

## 💾 Clean Copy-Paste Implementation

### 1. Text Badges & Pills (`CreateSVGPills`)
Isolates infrastructure deployment environments row-by-row, triggering background animations and flashing alert dots on critical steps.

```qlik
// 1. Initialize the master core engine variables
\$(Include=../src/SVG_Main_Core.qvs);

// Force borders solid for crisp, distinct outlines
LET vStrokeDashArray = ''; 

DevOpsStaging:
LOAD * INLINE [
    EnvID, Environment,     DeployStatus, BgHex,       TextHex,     StrokeHex
    501,   Production,      ACTIVE,       '%23e0f2fe', '%230369a1', '%230284c7' // Blue Shimmer
    502,   Staging Sandbox, PENDING,      '%23fef3c7', '%2392400e', '%23f59e0b' // Amber Shimmer + Dot
    503,   UAT Testing,     CRITICAL,     '%23fee2e2', '%23991b1b', '%23ef4444' // Red Pulsing Radar Dot
    504,   Local Dev Box,   Syncing,      '%23f1f5f9', '%23334155', '%23cbd5e1' // Static Baseline
];

CALL CreateSVGPills('DevOpsStaging', '', 'DeployStatus', 'EnvID', 'EnvBadgeField', 'BgHex', 'TextHex', 'StrokeHex', 'ROW');
DROP TABLE DevOpsStaging;
```

### 2. Animated Progress Bars (`CreateSVGProgressBars`)
Maps completion rates linearly over a clean tracking track, complete with smooth entry transitions.

```qlik
\$(Include=../src/SVG_Main_Core.qvs);

ProjectMilestones:
LOAD * INLINE [
    ProjectID, ProjectName,       CompletionPercentage
    1001,      Cloud Migration,   88.5
    1002,      Database Tuning,   14.0
    1003,      Security Audit,    100.0
];

CALL CreateSVGProgressBars('ProjectMilestones', 'ProjectID', 'CompletionPercentage', 'VisualProgressTrack', '%2306b6d4', '%23f1f5f9');
DROP TABLE ProjectMilestones;
```

> ⚠️ **Important Color Note**: All hex color codes passed into these scripts **must use `%23` instead of `#`** (for example: `'%2306b6d4'`). Using a standard `#` breaks the HTML string structure and forces images to appear blank.

---

## 🎨 Ready for Qlik Tables in 4 Steps

Turn raw text strings into visual UI elements inside your sheet properties panel instantly:

1.  Click your output field column (e.g., `VisualProgressTrack` or `EnvBadgeField`) in the data pane.
2.  Set column **Representation** to **IMAGE**.
3.  Set **Image Sizing** to **STRETCH** *(Our layout code locks the badges into proportion automatically to prevent distortion, while letting the progress bars stretch linearly)*.
4.  Go to the right-hand **Appearance Panel** -> **Presentation** -> **Row Height (in lines)** and set the spacing value to **3** or **4** lines for premium padding.

**Enjoy stunning, animated, responsive tables under peak corporate data loads!**
