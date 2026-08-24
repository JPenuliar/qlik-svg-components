import { PillStyleConfig, PresetTheme, SinglePillItem } from '../types';

export const DEFAULT_PILL_CONFIG: PillStyleConfig = {
  fontSize: '11px',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  pillHeight: 28,
  pillGap: 6,
  charMultiplier: 7.5,
  strokeWidth: 1.5,
  strokeDashArray: '4, 3', // '' for solid, '4, 3' for dashed, '2, 2' for dotted, '8, 4' for long dash
};

export const PRESET_THEMES: PresetTheme[] = [
  {
    name: 'Active Green',
    key: 'active_green',
    bg: '#dcfce7',
    text: '#15803d',
    stroke: '#22c55e',
    statusType: 'ACTIVE_GREEN',
    description: 'Continuous 1.8s loading sweep running horizontally behind the text label.',
  },
  {
    name: 'Active Blue',
    key: 'active_blue',
    bg: '#e0f2fe',
    text: '#0369a1',
    stroke: '#0284c7',
    statusType: 'ACTIVE_BLUE',
    description: 'Elegant wave shimmer, perfect for active background syncs or data pipeline states.',
  },
  {
    name: 'Critical Red',
    key: 'critical_red',
    bg: '#fee2e2',
    text: '#991b1b',
    stroke: '#ef4444',
    statusType: 'CRITICAL_RED',
    description: 'Flashing radar alert ring on the left with a slow opacity breathing cycle.',
  },
  {
    name: 'Pending Amber',
    key: 'pending_amber',
    bg: '#fef3c7',
    text: '#92400e',
    stroke: '#f59e0b',
    statusType: 'PENDING_AMBER',
    description: 'Dual-action animation combining a full background loader bar with a pulsing alert dot.',
  },
  {
    name: 'Static Slate',
    key: 'static_slate',
    bg: '#f1f5f9',
    text: '#64748b',
    stroke: '#cbd5e1',
    statusType: 'STATIC_SLATE',
    description: 'Disables all movement to keep completed or historical elements clean and legible.',
  },
  {
    name: 'Purple Accent',
    key: 'purple_accent',
    bg: '#f3e8ff',
    text: '#6b21a8',
    stroke: '#a855f7',
    statusType: 'CUSTOM',
    description: 'Vibrant violet outline theme for intermediate state tracking or staging.',
  },
  {
    name: 'Cyan Tracker',
    key: 'cyan_tracker',
    bg: '#cffafe',
    text: '#0e7490',
    stroke: '#06b6d4',
    statusType: 'CUSTOM',
    description: 'High-visibility telemetry cyan accent for active API pipelines.',
  },
];

export const BORDER_PROFILES = [
  { name: 'Solid Outline (Classic)', value: '', description: 'Continuous unbroken line (LET vStrokeDashArray = "")' },
  { name: 'Standard Dashed', value: '4, 3', description: 'Alternating 4px dashes & 3px gaps (LET vStrokeDashArray = "4, 3")' },
  { name: 'Dense Dotted', value: '2, 2', description: 'Tight 2px dots for compact rows (LET vStrokeDashArray = "2, 2")' },
  { name: 'Wide Long-Dash', value: '8, 4', description: 'Elongated 8px dashes for high contrast (LET vStrokeDashArray = "8, 4")' },
];

/**
 * Ensures color starts with # for CSS rendering
 */
export function normalizeHex(color: string): string {
  if (!color) return '#000000';
  if (color.startsWith('%23')) {
    return '#' + color.substring(3);
  }
  if (!color.startsWith('#')) {
    return '#' + color;
  }
  return color;
}

/**
 * Encodes hex for Qlik data:image URI (%23)
 */
export function toQlikHex(color: string): string {
  if (!color) return '%23000000';
  if (color.startsWith('#')) {
    return '%23' + color.substring(1);
  }
  if (!color.startsWith('%23')) {
    return '%23' + color;
  }
  return color;
}

export function isStatusText(text: string): boolean {
  const upper = (text || '').trim().toUpperCase();
  return ['BLOCKED', 'CRITICAL', 'ALERT', 'PENDING', 'ACTIVE'].includes(upper);
}

export function calculatePillWidth(text: string, config: PillStyleConfig = DEFAULT_PILL_CONFIG): number {
  const isStatus = isStatusText(text);
  const textLen = (text || '').trim().length;
  return Math.round((textLen * config.charMultiplier) + config.pillHeight + 8 + (isStatus ? 14 : 0));
}

/**
 * Generates the SVG XML code for a single pill badge
 */
export function generateSinglePillSvg(
  text: string,
  bgColor: string,
  textColor: string,
  strokeColor: string,
  config: PillStyleConfig = DEFAULT_PILL_CONFIG,
  options: { asDataUri?: boolean; qlikEncoded?: boolean } = {}
): string {
  const isStatus = isStatusText(text);
  const pillWidth = calculatePillWidth(text, config);
  const pillRadius = config.pillHeight / 2;
  const canvasHeight = config.pillHeight + 4;
  const textCenterY = (config.pillHeight / 2) + 2;
  const textX = isStatus ? (pillWidth / 2) + 6 : pillWidth / 2;
  const upper = (text || '').trim().toUpperCase();
  const isAnimatedWipe = ['PENDING', 'ACTIVE'].includes(upper);

  const bg = options.qlikEncoded ? toQlikHex(bgColor) : normalizeHex(bgColor);
  const stroke = options.qlikEncoded ? toQlikHex(strokeColor) : normalizeHex(strokeColor);
  const textCol = options.qlikEncoded ? toQlikHex(textColor) : normalizeHex(textColor);

  const styleBlock = `<style>
    @keyframes pillFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes indicatorGlow { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
    @keyframes qlikPillWipe { from { width: 0px; } to { width: ${pillWidth - 4}px; } }
    .pill-g-wrap { animation: pillFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .pill-pulse-dot { animation: indicatorGlow 2s ease-in-out infinite; }
    .pill-anim-loader { animation: qlikPillWipe 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  </style>`;

  const dashAttr = config.strokeDashArray ? ` stroke-dasharray="${config.strokeDashArray}"` : '';

  const loaderRect = isAnimatedWipe
    ? `<rect class="pill-anim-loader" x="2" y="2" height="${config.pillHeight}" rx="${pillRadius}" fill="${stroke}" opacity="0.12" />`
    : '';

  const pulseDot = isStatus
    ? `<circle class="pill-pulse-dot" cx="16" cy="${(config.pillHeight / 2) + 2}" r="4" fill="${stroke}" />`
    : '';

  const innerContent = `${styleBlock}
    <rect x="2" y="2" width="${pillWidth - 4}" height="${config.pillHeight}" rx="${pillRadius}" fill="${bg}" stroke="${stroke}" stroke-width="${config.strokeWidth}"${dashAttr} />
    ${loaderRect}
    ${pulseDot}
    <text x="${textX}" y="${textCenterY}" dominant-baseline="central" text-anchor="middle" font-family="${config.fontFamily}" font-weight="${config.fontWeight}" font-size="${config.fontSize}" fill="${textCol}">${text}</text>`;

  const svgXml = `<svg width="100%" height="100%" viewBox="0 0 ${pillWidth} ${canvasHeight}" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg">
    <g class="pill-g-wrap">
      ${innerContent}
    </g>
  </svg>`;

  if (options.asDataUri) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgXml).replace(/'/g, '%27')}`;
  }

  return svgXml;
}

/**
 * Generates a Grouped Pill Ribbon (Multiple badges side-by-side in 1 SVG)
 */
export function generateGroupedPillsSvg(
  items: SinglePillItem[],
  config: PillStyleConfig = DEFAULT_PILL_CONFIG,
  options: { asDataUri?: boolean; qlikEncoded?: boolean } = {}
): string {
  if (!items || items.length === 0) {
    return `<svg width="100%" height="100%" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"></svg>`;
  }

  let runningOffset = 0;
  const pillRadius = config.pillHeight / 2;
  const canvasHeight = config.pillHeight + 4;
  const textCenterY = (config.pillHeight / 2) + 2;

  const styleBlock = `<style>
    @keyframes pillFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes indicatorGlow { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
    @keyframes qlikPillWipe { from { width: 0px; } to { width: 100%; } }
    .pill-g-wrap { animation: pillFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .pill-pulse-dot { animation: indicatorGlow 2s ease-in-out infinite; }
    .pill-anim-loader { animation: qlikPillWipe 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  </style>`;

  const dashAttr = config.strokeDashArray ? ` stroke-dasharray="${config.strokeDashArray}"` : '';

  const pillElements: string[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.text || '';
    const isStatus = isStatusText(text);
    const pillWidth = calculatePillWidth(text, config);
    const textX = isStatus ? (pillWidth / 2) + 6 : pillWidth / 2;
    const upper = text.trim().toUpperCase();
    const isAnimatedWipe = ['PENDING', 'ACTIVE'].includes(upper);

    const bg = options.qlikEncoded ? toQlikHex(item.bgColor) : normalizeHex(item.bgColor);
    const stroke = options.qlikEncoded ? toQlikHex(item.strokeColor) : normalizeHex(item.strokeColor);
    const textCol = options.qlikEncoded ? toQlikHex(item.textColor) : normalizeHex(item.textColor);

    const loaderRect = isAnimatedWipe
      ? `<rect class="pill-anim-loader" x="2" y="2" height="${config.pillHeight}" rx="${pillRadius}" fill="${stroke}" opacity="0.12" />`
      : '';

    const pulseDot = isStatus
      ? `<circle class="pill-pulse-dot" cx="16" cy="${(config.pillHeight / 2) + 2}" r="4" fill="${stroke}" />`
      : '';

    const pillInner = `<rect x="2" y="2" width="${pillWidth - 4}" height="${config.pillHeight}" rx="${pillRadius}" fill="${bg}" stroke="${stroke}" stroke-width="${config.strokeWidth}"${dashAttr} />
      ${loaderRect}
      ${pulseDot}
      <text x="${textX}" y="${textCenterY}" dominant-baseline="central" text-anchor="middle" font-family="${config.fontFamily}" font-weight="${config.fontWeight}" font-size="${config.fontSize}" fill="${textCol}">${text}</text>`;

    pillElements.push(`<g class="pill-g-wrap" transform="translate(${runningOffset}, 0)">
      ${pillInner}
    </g>`);

    runningOffset += pillWidth + config.pillGap;
  }

  const totalWidth = Math.max(runningOffset - config.pillGap, 50);

  const svgXml = `<svg width="100%" height="100%" viewBox="0 0 ${totalWidth} ${canvasHeight}" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg">
    ${styleBlock}
    ${pillElements.join('\n    ')}
  </svg>`;

  if (options.asDataUri) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgXml).replace(/'/g, '%27')}`;
  }

  return svgXml;
}

/**
 * Generates a Linear Progress Bar SVG according to CreateSVGProgressBars in QVS
 */
export function generateProgressBarSvg(
  percentage: number,
  fillColor = '#06b6d4',
  trackColor = '#f1f5f9',
  fontFamily = 'sans-serif',
  fontWeight = 'bold',
  options: { asDataUri?: boolean; qlikEncoded?: boolean } = {}
): string {
  const barPercent = Math.floor(Math.max(0, Math.min(100, percentage || 0)));
  const fill = options.qlikEncoded ? toQlikHex(fillColor) : normalizeHex(fillColor);
  const track = options.qlikEncoded ? toQlikHex(trackColor) : normalizeHex(trackColor);
  const strokeColor = options.qlikEncoded ? '%23e2e8f0' : '#e2e8f0';

  const textColor = barPercent >= 45 
    ? (options.qlikEncoded ? '%23ffffff' : '#ffffff') 
    : (options.qlikEncoded ? '%23475569' : '#475569');

  const completeFill = options.qlikEncoded ? '%2322c55e' : '#22c55e';

  const styleBlock = `<style>
    @keyframes qlikFillWipe { from { width: 1px; } to { width: ${barPercent}px; } }
    @keyframes qlikGlowPulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
    .bar-fill-wipe { animation: qlikFillWipe 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    .bar-complete-glow { animation: qlikGlowPulse 2.5s ease-in-out infinite; }
  </style>`;

  const fillLayer = barPercent >= 100
    ? `<rect class="bar-complete-glow" x="0" y="2.5" width="102" height="15" rx="7.5" fill="${completeFill}" />`
    : `<rect class="bar-fill-wipe" x="0" y="2.5" height="15" rx="7.5" fill="${fill}" />`;

  const svgXml = `<svg width="100%" height="100%" viewBox="0 0 102 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    ${styleBlock}
    <rect x="0" y="2.5" width="102" height="15" rx="7.5" fill="${track}" stroke="${strokeColor}" stroke-width="0.5" />
    ${fillLayer}
    <text x="51" y="10.5" dominant-baseline="central" text-anchor="middle" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="9px" fill="${textColor}">${barPercent}%</text>
  </svg>`;

  if (options.asDataUri) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgXml).replace(/'/g, '%27')}`;
  }

  return svgXml;
}
