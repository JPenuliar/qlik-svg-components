export type StatusAnimationType = 'ACTIVE_BLUE' | 'ACTIVE_GREEN' | 'CRITICAL_RED' | 'PENDING_AMBER' | 'STATIC_SLATE' | 'CUSTOM';

export type OutputMode = 'ROW' | 'GROUPED' | 'SINGLE';

export interface PillStyleConfig {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  pillHeight: number;
  pillGap: number;
  charMultiplier: number;
  strokeWidth: number;
  strokeDashArray: string; // '' | '4, 3' | '2, 2' | '8, 4' | custom
}

export interface SinglePillItem {
  id: string | number;
  text: string;
  bgColor: string;
  textColor: string;
  strokeColor: string;
  statusType?: string;
  groupKey?: string;
}

export interface ProgressBarItem {
  id: string | number;
  label: string;
  percentage: number;
  fillColor: string;
  trackColor: string;
}

export interface PresetTheme {
  name: string;
  key: string;
  bg: string;
  text: string;
  stroke: string;
  statusType: StatusAnimationType;
  description: string;
}

export interface DatasetColumn {
  key: string;
  label: string;
  isSvg?: boolean;
  type?: 'text' | 'number' | 'status' | 'svg_pill' | 'svg_grouped' | 'svg_progress';
}

export interface SampleDataset {
  id: string;
  name: string;
  qvsFile: string;
  description: string;
  mode: 'ROW' | 'GROUPED' | 'PROGRESS';
  columns: DatasetColumn[];
  rows: Record<string, any>[];
  sourceQvsSnippet: string;
}
