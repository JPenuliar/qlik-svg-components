import { SampleDataset } from '../types';

export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    id: 'devops_pipeline',
    name: 'DevOps CI/CD Pipeline Tracker',
    qvsFile: 'examples/sample_devops_pipeline.qvs',
    description: 'ROW Layout Profile: Standalone animated status capsules per server environment record.',
    mode: 'ROW',
    columns: [
      { key: 'EnvID', label: 'Env ID', type: 'number' },
      { key: 'Environment', label: 'Environment', type: 'text' },
      { key: 'DeployStatus', label: 'Deploy Status', type: 'text' },
      { key: 'AnimatedPillField', label: 'Status Badge (SVG)', type: 'svg_pill', isSvg: true },
      { key: 'ServerCount', label: 'Servers', type: 'number' },
      { key: 'LastUpdated', label: 'Last Sync', type: 'text' },
    ],
    rows: [
      {
        EnvID: 501,
        Environment: 'Production US-East',
        DeployStatus: 'ACTIVE',
        BgHex: '#e0f2fe',
        TextHex: '#0369a1',
        StrokeHex: '#0284c7',
        ServerCount: 24,
        LastUpdated: '14:22:05',
      },
      {
        EnvID: 502,
        Environment: 'Staging Sandbox',
        DeployStatus: 'PENDING',
        BgHex: '#fef3c7',
        TextHex: '#92400e',
        StrokeHex: '#f59e0b',
        ServerCount: 8,
        LastUpdated: '14:18:12',
      },
      {
        EnvID: 503,
        Environment: 'UAT Testing Cluster',
        DeployStatus: 'CRITICAL',
        BgHex: '#fee2e2',
        TextHex: '#991b1b',
        StrokeHex: '#ef4444',
        ServerCount: 12,
        LastUpdated: '14:01:59',
      },
      {
        EnvID: 504,
        Environment: 'Local Dev Box',
        DeployStatus: 'Syncing',
        BgHex: '#f1f5f9',
        TextHex: '#334155',
        StrokeHex: '#cbd5e1',
        ServerCount: 2,
        LastUpdated: '13:44:10',
      },
      {
        EnvID: 505,
        Environment: 'Disaster Recovery Warm Site',
        DeployStatus: 'ACTIVE',
        BgHex: '#dcfce7',
        TextHex: '#15803d',
        StrokeHex: '#22c55e',
        ServerCount: 16,
        LastUpdated: '14:30:00',
      },
    ],
    sourceQvsSnippet: `$(Include=../src/SVG_Main_Core.qvs);

LET vStrokeDashArray = ''; // Solid border for crisp outlines

DevOpsStaging:
LOAD * INLINE [
    EnvID, Environment,     DeployStatus, ServerCount, LastUpdated,   BgHex,       TextHex,     StrokeHex
    501,   Production,      ACTIVE,       24,          '14:22:05',    '%23e0f2fe', '%230369a1', '%230284c7' 
    502,   Staging Sandbox, PENDING,      8,           '14:18:12',    '%23fef3c7', '%2392400e', '%23f59e0b' 
    503,   UAT Testing,     CRITICAL,     12,          '14:01:59',    '%23fee2e2', '%23991b1b', '%23ef4444' 
    504,   Local Dev Box,   Syncing,      2,           '13:44:10',    '%23f1f5f9', '%23334155', '%23cbd5e1' 
];

CALL CreateSVGPills('DevOpsStaging', '', 'DeployStatus', 'EnvID', 'AnimatedPillField', 'BgHex', 'TextHex', 'StrokeHex', 'ROW');

Left Join(DevOpsStaging)
LOAD EnvID, AnimatedPillField RESIDENT DevOpsStaging_SVG_Output;
DROP TABLE DevOpsStaging_SVG_Output;`,
  },
  {
    id: 'grouped_cities',
    name: 'Grouped Regional Hubs & Cities',
    qvsFile: 'examples/sample_grouped_cities.qvs',
    description: 'GROUPED Layout Profile: Bundles child location badges side-by-side inside country dimension cells.',
    mode: 'GROUPED',
    columns: [
      { key: 'Country', label: 'Country / Region', type: 'text' },
      { key: 'CountryBadgeStrip', label: 'Active Hubs (Grouped SVG)', type: 'svg_grouped', isSvg: true },
      { key: 'CityCount', label: 'Hub Count', type: 'number' },
      { key: 'TotalVolume', label: 'Daily Traffic', type: 'text' },
    ],
    rows: [
      {
        Country: 'Germany',
        CityCount: 2,
        TotalVolume: '142,500 req/s',
        badges: [
          { id: 4, text: 'Berlin', bgColor: '#fef3c7', textColor: '#92400e', strokeColor: '#f59e0b' },
          { id: 5, text: 'Munich', bgColor: '#dcfce7', textColor: '#166534', strokeColor: '#22c55e' },
        ],
      },
      {
        Country: 'United Kingdom',
        CityCount: 2,
        TotalVolume: '98,200 req/s',
        badges: [
          { id: 1, text: 'London', bgColor: '#e0f2fe', textColor: '#0369a1', strokeColor: '#0284c7' },
          { id: 6, text: 'Manchester', bgColor: '#f1f5f9', textColor: '#334155', strokeColor: '#cbd5e1' },
        ],
      },
      {
        Country: 'United States',
        CityCount: 3,
        TotalVolume: '320,000 req/s',
        badges: [
          { id: 2, text: 'New York', bgColor: '#f1f5f9', textColor: '#334155', strokeColor: '#cbd5e1' },
          { id: 7, text: 'San Francisco', bgColor: '#cffafe', textColor: '#0e7490', strokeColor: '#06b6d4' },
          { id: 8, text: 'Austin', bgColor: '#f3e8ff', textColor: '#6b21a8', strokeColor: '#a855f7' },
        ],
      },
      {
        Country: 'Japan',
        CityCount: 2,
        TotalVolume: '185,400 req/s',
        badges: [
          { id: 3, text: 'Tokyo', bgColor: '#fce7f3', textColor: '#9d174d', strokeColor: '#f472b6' },
          { id: 9, text: 'Osaka', bgColor: '#dcfce7', textColor: '#166534', strokeColor: '#22c55e' },
        ],
      },
    ],
    sourceQvsSnippet: `$(Include=../src/SVG_Main_Core.qvs);

CityThemesMatrix:
LOAD * INLINE [
    TargetCity, BgHex,       TextHex,     BorderHex
    London,     '%23e0f2fe', '%230369a1', '%230284c7'  
    New York,   '%23f1f5f9', '%23334155', '%23cbd5e1'  
    Tokyo,      '%23fce7f3', '%239d174d', '%23f472b6'  
    Berlin,     '%23fef3c7', '%2392400e', '%23f59e0b'  
    Munich,     '%23dcfce7', '%23166534', '%2322c55e'  
];

CALL CreateSVGPills('ProcessedCitiesTable', 'Country', 'CityName', 'CityID', 'CountryBadgeStrip', 'PillarBg', 'PillarText', 'PillarBorder', 'GROUPED');`,
  },
  {
    id: 'metrics_tracker',
    name: 'Project Milestones & Progress Gauges',
    qvsFile: 'examples/sample_metrics_tracker.qvs',
    description: 'Progress Gauge Profile: High-density linear percentage tracks with ease-in wipe & 100% completion glow.',
    mode: 'PROGRESS',
    columns: [
      { key: 'ProjectID', label: 'Project ID', type: 'number' },
      { key: 'ProjectName', label: 'Project Name', type: 'text' },
      { key: 'CompletionPercentage', label: 'Progress (%)', type: 'number' },
      { key: 'VisualProgressTrack', label: 'Gauge Visual (SVG)', type: 'svg_progress', isSvg: true },
      { key: 'Lead', label: 'Lead Architect', type: 'text' },
      { key: 'DueDate', label: 'Target Milestone', type: 'text' },
    ],
    rows: [
      {
        ProjectID: 1001,
        ProjectName: 'Cloud Infrastructure Migration',
        CompletionPercentage: 88.5,
        FillColor: '#06b6d4',
        TrackColor: '#f1f5f9',
        Lead: 'Sarah Jenkins',
        DueDate: 'Q3 2026',
      },
      {
        ProjectID: 1002,
        ProjectName: 'Database Tuning & Sharding',
        CompletionPercentage: 14.0,
        FillColor: '#06b6d4',
        TrackColor: '#f1f5f9',
        Lead: 'Alex Chen',
        DueDate: 'Q4 2026',
      },
      {
        ProjectID: 1003,
        ProjectName: 'SOC2 Security Audit Compliance',
        CompletionPercentage: 100.0,
        FillColor: '#22c55e',
        TrackColor: '#f1f5f9',
        Lead: 'Elena Rostova',
        DueDate: 'Completed',
      },
      {
        ProjectID: 1004,
        ProjectName: 'UI/UX Design System Overhaul',
        CompletionPercentage: 0.0,
        FillColor: '#06b6d4',
        TrackColor: '#f1f5f9',
        Lead: 'Marcus Vance',
        DueDate: 'Q1 2027',
      },
      {
        ProjectID: 1005,
        ProjectName: 'Unified API Gateway V2 Release',
        CompletionPercentage: 52.3,
        FillColor: '#06b6d4',
        TrackColor: '#f1f5f9',
        Lead: 'Priya Sharma',
        DueDate: 'Q3 2026',
      },
      {
        ProjectID: 1006,
        ProjectName: 'Real-time WebSocket Push Engine',
        CompletionPercentage: 100.0,
        FillColor: '#22c55e',
        TrackColor: '#f1f5f9',
        Lead: 'David Miller',
        DueDate: 'Completed',
      },
    ],
    sourceQvsSnippet: `$(Include=../src/SVG_Main_Core.qvs);

ProjectMilestones:
LOAD * INLINE [
    ProjectID, ProjectName,       CompletionPercentage
    1001,      Cloud Migration,   88.5
    1002,      Database Tuning,   14.0
    1003,      Security Audit,    100.0
    1004,      UI/UX Overhaul,    0.0
    1005,      API Gateway V2,    52.3
];

CALL CreateSVGProgressBars('ProjectMilestones', 'ProjectID', 'CompletionPercentage', 'VisualProgressTrack', '%2306b6d4', '%23f1f5f9');

Left Join(ProjectMilestones)
LOAD * RESIDENT ProjectMilestones_Progress_Output;
DROP TABLE ProjectMilestones_Progress_Output;`,
  },
  {
    id: 'supply_logistics',
    name: 'Supply Chain Logistics Strips',
    qvsFile: 'examples/sample_supply_logistics.qvs',
    description: 'Regional multi-status cargo tracking with combined Active, Blocked, and Pending status tags.',
    mode: 'GROUPED',
    columns: [
      { key: 'HubRegion', label: 'Logistics Hub', type: 'text' },
      { key: 'HubStatusStrips', label: 'Cargo Status Strips (SVG)', type: 'svg_grouped', isSvg: true },
      { key: 'ActiveRoutes', label: 'Active Routes', type: 'number' },
      { key: 'EfficiencyRating', label: 'SLA Score', type: 'text' },
    ],
    rows: [
      {
        HubRegion: 'North America Central',
        ActiveRoutes: 48,
        EfficiencyRating: '94.2%',
        badges: [
          { id: 901, text: 'ACTIVE', bgColor: '#dcfce7', textColor: '#166534', strokeColor: '#22c55e' },
          { id: 902, text: 'BLOCKED', bgColor: '#fee2e2', textColor: '#991b1b', strokeColor: '#ef4444' },
        ],
      },
      {
        HubRegion: 'EuroHub Gateway',
        ActiveRoutes: 36,
        EfficiencyRating: '91.8%',
        badges: [
          { id: 903, text: 'PENDING', bgColor: '#fef3c7', textColor: '#92400e', strokeColor: '#f59e0b' },
          { id: 904, text: 'ACTIVE', bgColor: '#e0f2fe', textColor: '#0369a1', strokeColor: '#0284c7' },
        ],
      },
      {
        HubRegion: 'APAC Logistics Port',
        ActiveRoutes: 62,
        EfficiencyRating: '98.5%',
        badges: [
          { id: 905, text: 'In Transit', bgColor: '#f1f5f9', textColor: '#334155', strokeColor: '#cbd5e1' },
          { id: 906, text: 'ACTIVE', bgColor: '#dcfce7', textColor: '#166534', strokeColor: '#22c55e' },
        ],
      },
      {
        HubRegion: 'LATAM Distribution Center',
        ActiveRoutes: 22,
        EfficiencyRating: '89.0%',
        badges: [
          { id: 907, text: 'ALERT', bgColor: '#fee2e2', textColor: '#991b1b', strokeColor: '#ef4444' },
        ],
      },
    ],
    sourceQvsSnippet: `$(Include=../src/SVG_Main_Core.qvs);

LogisticsStaging:
LOAD * INLINE [
    ShipID, HubRegion,       CargoStatus, BgHex,       TextHex,     StrokeHex
    901,    North America,   ACTIVE,      '%23dcfce7', '%23166534', '%2322c55e' // Green Shimmer
    902,    North America,   BLOCKED,     '%23fee2e2', '%23991b1b', '%23ef4444' // Red Pulsing Dot Alert
    903,    EuroHub Central, PENDING,     '%23fef3c7', '%2392400e', '%23f59e0b' // Amber Shimmer + Alert Dot
    904,    EuroHub Central, ACTIVE,      '%23e0f2fe', '%230369a1', '%230284c7' // Blue Shimmer
    905,    APAC Logistics,  In Transit,  '%23f1f5f9', '%23334155', '%23cbd5e1' // Slate Gray Static
];

CALL CreateSVGPills('LogisticsStaging', 'HubRegion', 'CargoStatus', 'ShipID', 'HubStatusStrips', 'BgHex', 'TextHex', 'StrokeHex', 'GROUPED');`,
  },
];
