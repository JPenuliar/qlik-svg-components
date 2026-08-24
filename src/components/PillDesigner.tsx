import React, { useState } from 'react';
import { 
  PillStyleConfig, 
  SinglePillItem 
} from '../types';
import { 
  DEFAULT_PILL_CONFIG, 
  PRESET_THEMES, 
  BORDER_PROFILES, 
  generateSinglePillSvg, 
  generateGroupedPillsSvg, 
  calculatePillWidth, 
  isStatusText,
  toQlikHex 
} from '../utils/svgEngine';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Sliders, 
  Layers, 
  Plus, 
  Trash2, 
  Info,
  Palette,
  Eye
} from 'lucide-react';

export const PillDesigner: React.FC = () => {
  // Mode: Single vs Grouped
  const [designerMode, setDesignerMode] = useState<'single' | 'grouped'>('single');

  // Single Pill State
  const [singleText, setSingleText] = useState('ACTIVE');
  const [selectedThemeKey, setSelectedThemeKey] = useState('active_green');
  const [bgColor, setBgColor] = useState('#dcfce7');
  const [textColor, setTextColor] = useState('#15803d');
  const [strokeColor, setStrokeColor] = useState('#22c55e');

  // Global Style Configuration
  const [config, setConfig] = useState<PillStyleConfig>(DEFAULT_PILL_CONFIG);

  // Grouped Pills State
  const [groupedItems, setGroupedItems] = useState<SinglePillItem[]>([
    { id: 1, text: 'ACTIVE', bgColor: '#dcfce7', textColor: '#166534', strokeColor: '#22c55e' },
    { id: 2, text: 'PENDING', bgColor: '#fef3c7', textColor: '#92400e', strokeColor: '#f59e0b' },
    { id: 3, text: 'CRITICAL', bgColor: '#fee2e2', textColor: '#991b1b', strokeColor: '#ef4444' },
  ]);

  // Preview Background
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'grid'>('dark');

  // Copy feedback state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const applyPresetTheme = (key: string) => {
    setSelectedThemeKey(key);
    const theme = PRESET_THEMES.find(t => t.key === key);
    if (theme) {
      setBgColor(theme.bg);
      setTextColor(theme.text);
      setStrokeColor(theme.stroke);
      if (theme.statusType === 'CRITICAL_RED') {
        setSingleText('CRITICAL');
      } else if (theme.statusType === 'PENDING_AMBER') {
        setSingleText('PENDING');
      } else if (theme.statusType === 'STATIC_SLATE') {
        setSingleText('COMPLETE');
      } else {
        setSingleText('ACTIVE');
      }
    }
  };

  const handleCopy = (textToCopy: string, typeKey: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadSvg = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate Current SVGs
  const currentSingleSvg = generateSinglePillSvg(singleText, bgColor, textColor, strokeColor, config);
  const currentSingleDataUri = generateSinglePillSvg(singleText, bgColor, textColor, strokeColor, config, { asDataUri: true });
  const currentSingleQlikDataUri = generateSinglePillSvg(singleText, bgColor, textColor, strokeColor, config, { asDataUri: true, qlikEncoded: true });

  const currentGroupedSvg = generateGroupedPillsSvg(groupedItems, config);
  const currentGroupedDataUri = generateGroupedPillsSvg(groupedItems, config, { asDataUri: true });
  const currentGroupedQlikDataUri = generateGroupedPillsSvg(groupedItems, config, { asDataUri: true, qlikEncoded: true });

  // Calculated dimension metrics
  const singlePillWidth = calculatePillWidth(singleText, config);
  const isStatus = isStatusText(singleText);

  const addGroupedItem = () => {
    const newId = Date.now();
    const presets = [
      { text: 'ACTIVE', bgColor: '#e0f2fe', textColor: '#0369a1', strokeColor: '#0284c7' },
      { text: 'BLOCKED', bgColor: '#fee2e2', textColor: '#991b1b', strokeColor: '#ef4444' },
      { text: 'STAGING', bgColor: '#f3e8ff', textColor: '#6b21a8', strokeColor: '#a855f7' },
      { text: 'VERIFIED', bgColor: '#dcfce7', textColor: '#15803d', strokeColor: '#22c55e' },
    ];
    const picked = presets[groupedItems.length % presets.length];
    setGroupedItems([...groupedItems, { id: newId, ...picked }]);
  };

  const removeGroupedItem = (id: string | number) => {
    if (groupedItems.length > 1) {
      setGroupedItems(groupedItems.filter(item => item.id !== id));
    }
  };

  const updateGroupedItem = (id: string | number, field: keyof SinglePillItem, val: string) => {
    setGroupedItems(groupedItems.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Status Pill & Badge Component Designer
          </h2>
          <p className="text-sm text-slate-400">
            Generate pixel-perfect animated vector status pills with exact Qlik load script formulas.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            id="btn-mode-single"
            onClick={() => setDesignerMode('single')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              designerMode === 'single'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standalone Pill (ROW)
          </button>
          <button
            id="btn-mode-grouped"
            onClick={() => setDesignerMode('grouped')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              designerMode === 'grouped'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Grouped Ribbon (GROUPED)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls & Styling (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Themes Selector */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              Pre-Engineered Theme Presets
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_THEMES.map((theme) => (
                <button
                  key={theme.key}
                  id={`btn-theme-${theme.key}`}
                  onClick={() => applyPresetTheme(theme.key)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedThemeKey === theme.key
                      ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span 
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: theme.stroke }}
                    />
                    <span className="text-xs font-medium text-slate-200 truncate">{theme.name}</span>
                  </div>
                  <div 
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold text-center border"
                    style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.stroke }}
                  >
                    {theme.key.replace('_', ' ').toUpperCase()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Component Content & Colors */}
          {designerMode === 'single' ? (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Badge Label & Custom Color Matrix
              </h3>

              {/* Text Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Text Label <span className="text-slate-500 font-normal">(Triggers animations: ACTIVE, PENDING, CRITICAL, BLOCKED, ALERT)</span>
                </label>
                <input
                  type="text"
                  value={singleText}
                  onChange={(e) => setSingleText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  placeholder="e.g. ACTIVE, PENDING, CRITICAL"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Background</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1.5">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => { setBgColor(e.target.value); setSelectedThemeKey('custom'); }}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{bgColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Text Color</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1.5">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => { setTextColor(e.target.value); setSelectedThemeKey('custom'); }}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{textColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Stroke / Accent</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1.5">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => { setStrokeColor(e.target.value); setSelectedThemeKey('custom'); }}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{strokeColor}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Grouped Badges List ({groupedItems.length} items)
                </h3>
                <button
                  onClick={addGroupedItem}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Pill
                </button>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {groupedItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs"
                  >
                    <span className="text-slate-500 font-mono text-[10px]">#{index + 1}</span>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateGroupedItem(item.id, 'text', e.target.value)}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono flex-1 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="color"
                      title="Background"
                      value={item.bgColor}
                      onChange={(e) => updateGroupedItem(item.id, 'bgColor', e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent shrink-0"
                    />
                    <input
                      type="color"
                      title="Stroke"
                      value={item.strokeColor}
                      onChange={(e) => updateGroupedItem(item.id, 'strokeColor', e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent shrink-0"
                    />
                    <input
                      type="color"
                      title="Text"
                      value={item.textColor}
                      onChange={(e) => updateGroupedItem(item.id, 'textColor', e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent shrink-0"
                    />
                    <button
                      onClick={() => removeGroupedItem(item.id)}
                      disabled={groupedItems.length <= 1}
                      className="text-slate-500 hover:text-red-400 p-1 disabled:opacity-30 disabled:hover:text-slate-500"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outline Frame & Dash Profile Settings */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Bounding Outline Dash Profiles (`vStrokeDashArray`)
            </h3>

            <div className="space-y-2">
              {BORDER_PROFILES.map((profile) => (
                <label
                  key={profile.value}
                  className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                    config.strokeDashArray === profile.value
                      ? 'border-cyan-500 bg-cyan-950/20 text-cyan-200'
                      : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="dashArray"
                      checked={config.strokeDashArray === profile.value}
                      onChange={() => setConfig({ ...config, strokeDashArray: profile.value })}
                      className="text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-xs font-medium">{profile.name}</span>
                  </div>
                  <code className="text-[11px] px-1.5 py-0.5 rounded bg-slate-900 font-mono text-slate-400">
                    {profile.value ? `'${profile.value}'` : "'' (solid)"}
                  </code>
                </label>
              ))}
            </div>

            {/* Global Design Variables Fine-tuning */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Pill Height: <span className="font-mono text-slate-200">{config.pillHeight}px</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="40"
                  value={config.pillHeight}
                  onChange={(e) => setConfig({ ...config, pillHeight: Number(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Stroke Width: <span className="font-mono text-slate-200">{config.strokeWidth}px</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={config.strokeWidth}
                  onChange={(e) => setConfig({ ...config, strokeWidth: Number(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Char Multiplier: <span className="font-mono text-slate-200">{config.charMultiplier}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="11"
                  step="0.5"
                  value={config.charMultiplier}
                  onChange={(e) => setConfig({ ...config, charMultiplier: Number(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Pill Gap: <span className="font-mono text-slate-200">{config.pillGap}px</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="16"
                  value={config.pillGap}
                  onChange={(e) => setConfig({ ...config, pillGap: Number(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Render & Output Code (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Component Stage */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-200">
                  Live Animated Vector Render ({designerMode.toUpperCase()})
                </h3>
              </div>

              {/* Background Toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800 text-xs">
                <button
                  onClick={() => setPreviewBg('dark')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    previewBg === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  Dark Canvas
                </button>
                <button
                  onClick={() => setPreviewBg('light')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    previewBg === 'light' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  Qlik Table Light
                </button>
                <button
                  onClick={() => setPreviewBg('grid')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    previewBg === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  Checker Grid
                </button>
              </div>
            </div>

            {/* Stage Canvas Box */}
            <div 
              className={`min-h-[160px] rounded-xl flex items-center justify-center p-8 transition-colors border ${
                previewBg === 'dark' 
                  ? 'bg-slate-950 border-slate-800' 
                  : previewBg === 'light' 
                  ? 'bg-white border-slate-200 shadow-inner' 
                  : 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 border-slate-800'
              }`}
            >
              {designerMode === 'single' ? (
                <div 
                  className="transition-all transform hover:scale-105 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: currentSingleSvg }} 
                />
              ) : (
                <div 
                  className="transition-all transform hover:scale-105 flex items-center justify-center w-full overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: currentGroupedSvg }} 
                />
              )}
            </div>

            {/* Math & Spatial Dimension Readout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Computed Width</span>
                <span className="font-mono font-semibold text-cyan-400">
                  {designerMode === 'single' ? `${singlePillWidth}px` : 'Dynamic Offset Sum'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Canvas Height</span>
                <span className="font-mono font-semibold text-slate-200">{config.pillHeight + 4}px</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Status Radar Dot</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {designerMode === 'single' ? (isStatus ? 'Enabled (4px)' : 'None') : 'Per-Item'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Animation Profile</span>
                <span className="font-mono font-semibold text-blue-400">
                  {designerMode === 'single' ? (['ACTIVE', 'PENDING'].includes(singleText.toUpperCase()) ? '1.8s Shimmer Wipe' : 'Fade + Pulse') : 'Multi-threaded'}
                </span>
              </div>
            </div>

            {/* Dimension Formula Breakdown Card */}
            {designerMode === 'single' && (
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 font-mono flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-medium">QVS Mathematical Spatial Offset Formula:</span>
                  <div className="text-cyan-300/90 mt-0.5">
                    _svg_width = ({singleText.length} chars × {config.charMultiplier}) + {config.pillHeight}px + 8px + {isStatus ? '14px (dot)' : '0px'} = <strong className="text-white">{singlePillWidth}px</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code Output & Export Actions */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Copy Ready-to-Use Artifacts</h3>
              <button
                onClick={() => handleDownloadSvg(
                  designerMode === 'single' ? currentSingleSvg : currentGroupedSvg,
                  designerMode === 'single' ? `pill_${singleText.toLowerCase()}.svg` : 'grouped_pills.svg'
                )}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                Download .SVG File
              </button>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Qlik Data URI Button */}
              <button
                id="btn-copy-qlik-datauri"
                onClick={() => handleCopy(
                  designerMode === 'single' ? currentSingleQlikDataUri : currentGroupedQlikDataUri,
                  'qlik_uri'
                )}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-950/20 text-left transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-cyan-300">
                    Qlik Data URI String
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Encoded with `%23` for Qlik Sense tables
                  </span>
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-300">
                  {copiedType === 'qlik_uri' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  )}
                </div>
              </button>

              {/* Raw SVG XML Button */}
              <button
                id="btn-copy-raw-svg"
                onClick={() => handleCopy(
                  designerMode === 'single' ? currentSingleSvg : currentGroupedSvg,
                  'raw_svg'
                )}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-950/20 text-left transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-cyan-300">
                    Raw SVG XML Markup
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Standard W3C SVG vector with CSS keyframes
                  </span>
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-300">
                  {copiedType === 'raw_svg' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  )}
                </div>
              </button>
            </div>

            {/* Qlik Inline LOAD snippet */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-300">
                  Copy Qlik Table INLINE Load Syntax
                </span>
                <button
                  onClick={() => handleCopy(
                    `CALL CreateSVGPills('MyTable', '${designerMode === 'grouped' ? 'CategoryField' : ''}', 'StatusField', 'IdField', 'MyPillField', '${toQlikHex(bgColor)}', '${toQlikHex(textColor)}', '${toQlikHex(strokeColor)}', '${designerMode.toUpperCase()}');`,
                    'qvs_call'
                  )}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  {copiedType === 'qvs_call' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Macro Call
                </button>
              </div>
              <pre className="text-[11px] font-mono text-cyan-300/80 overflow-x-auto bg-slate-900/80 p-2.5 rounded border border-slate-800">
                {`CALL CreateSVGPills('MyTable', '${designerMode === 'grouped' ? 'CategoryField' : ''}', 'StatusField', 'IdField', 'MyPillField', '${toQlikHex(bgColor)}', '${toQlikHex(textColor)}', '${toQlikHex(strokeColor)}', '${designerMode.toUpperCase()}');`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
