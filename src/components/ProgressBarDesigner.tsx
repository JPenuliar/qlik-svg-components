import React, { useState } from 'react';
import { 
  generateProgressBarSvg, 
  toQlikHex 
} from '../utils/svgEngine';
import { 
  BarChart3, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const ProgressBarDesigner: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(68);
  const [fillColor, setFillColor] = useState<string>('#06b6d4');
  const [trackColor, setTrackColor] = useState<string>('#f1f5f9');
  const [fontFamily, setFontFamily] = useState<string>('sans-serif');
  const [fontWeight, setFontWeight] = useState<string>('bold');

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light'>('light');

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

  const currentSvg = generateProgressBarSvg(percentage, fillColor, trackColor, fontFamily, fontWeight);
  const currentDataUri = generateProgressBarSvg(percentage, fillColor, trackColor, fontFamily, fontWeight, { asDataUri: true });
  const currentQlikDataUri = generateProgressBarSvg(percentage, fillColor, trackColor, fontFamily, fontWeight, { asDataUri: true, qlikEncoded: true });

  const presets = [
    { label: '0% Start', value: 0, desc: 'Empty baseline' },
    { label: '25% Early', value: 25, desc: 'Quarter progress' },
    { label: '52.3% Active', value: 52.3, desc: 'Mid-point' },
    { label: '88.5% Near Finish', value: 88.5, desc: 'Late stage' },
    { label: '100% Completed', value: 100, desc: 'Glow pulse engine' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Linear Progress Tracking Gauge Designer
          </h2>
          <p className="text-sm text-slate-400">
            Hardware-accelerated linear gauges with ease-in wipe loading, contrast flipping, and 100% completion glow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Percentage & Presets */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Completion Value & Presets
            </h3>

            {/* Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-300">Milestone Progress</span>
                <span className="text-base font-bold font-mono text-cyan-400">{percentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* Quick Presets Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 pt-1">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setPercentage(preset.value)}
                  className={`p-2 rounded-lg border text-center transition-all text-xs font-medium ${
                    percentage === preset.value
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="block font-bold">{preset.value}%</span>
                  <span className="text-[10px] text-slate-500 truncate">{preset.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Progress Fill & Track Colors
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Fill Bar Color</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2">
                  <input
                    type="color"
                    value={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <div>
                    <span className="text-xs font-mono text-slate-200 block">{fillColor}</span>
                    <span className="text-[10px] font-mono text-slate-500">{toQlikHex(fillColor)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Track Background</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2">
                  <input
                    type="color"
                    value={trackColor}
                    onChange={(e) => setTrackColor(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <div>
                    <span className="text-xs font-mono text-slate-200 block">{trackColor}</span>
                    <span className="text-[10px] font-mono text-slate-500">{toQlikHex(trackColor)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography config */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="sans-serif">sans-serif (Standard)</option>
                  <option value="system-ui">system-ui (Modern)</option>
                  <option value="monospace">monospace (Technical)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Font Weight</label>
                <select
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="bold">bold (Recommended)</option>
                  <option value="600">600 (Semi-bold)</option>
                  <option value="normal">normal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Engine Highlights */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs text-slate-300">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Subroutine Features in `CreateSVGProgressBars`
            </h4>
            <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-200">Wipe Animation:</strong> Smooth 1.2s cubic-bezier ease-in width transition.</li>
              <li><strong className="text-slate-200">100% Glow Pulse:</strong> Automatically switches to green glow pulse cycle on full milestone completion.</li>
              <li><strong className="text-slate-200">Smart Text Contrast:</strong> Switches from dark gray (`#475569`) to white (`#ffffff`) at &gt;= 45% threshold.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Live Visuals & Code (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Stage */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Live Gauge Render (102 × 20 px ViewBox)
              </h3>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800 text-xs">
                <button
                  onClick={() => setPreviewBg('light')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    previewBg === 'light' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  Qlik Table Light
                </button>
                <button
                  onClick={() => setPreviewBg('dark')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    previewBg === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  Dark Canvas
                </button>
              </div>
            </div>

            {/* Gauge Preview Container */}
            <div 
              className={`rounded-xl p-8 transition-colors border flex flex-col items-center justify-center gap-4 ${
                previewBg === 'light' 
                  ? 'bg-white border-slate-200 shadow-inner' 
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              {/* Scaled Render */}
              <div className="w-full max-w-md h-10 flex items-center justify-center shadow-sm">
                <div 
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: currentSvg }} 
                />
              </div>

              <div className="text-center">
                <span className={`text-xs font-mono font-medium ${previewBg === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Simulated Qlik Table Column (Representation: IMAGE, Sizing: STRETCH)
                </span>
              </div>
            </div>

            {/* Feature Status Badges */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Text Contrast Mode</span>
                <span className={`font-mono font-semibold ${percentage >= 45 ? 'text-white' : 'text-slate-400'}`}>
                  {percentage >= 45 ? 'White (#ffffff)' : 'Slate (#475569)'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Animation State</span>
                <span className="font-mono font-semibold text-cyan-400">
                  {percentage >= 100 ? '2.5s Ambient Glow' : '1.2s Ease-in Wipe'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Active Pixel Width</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {Math.floor(percentage)} / 102 px
                </span>
              </div>
            </div>
          </div>

          {/* Code Output & Export */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Copy Ready-to-Use Artifacts</h3>
              <button
                onClick={() => handleDownloadSvg(currentSvg, `progress_${Math.floor(percentage)}pct.svg`)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                Download .SVG File
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="btn-copy-progress-qlik-uri"
                onClick={() => handleCopy(currentQlikDataUri, 'progress_qlik_uri')}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-950/20 text-left transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-cyan-300">
                    Qlik Data URI String
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Encoded `%23` string for Qlik formulas
                  </span>
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-300">
                  {copiedType === 'progress_qlik_uri' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  )}
                </div>
              </button>

              <button
                id="btn-copy-progress-raw-svg"
                onClick={() => handleCopy(currentSvg, 'progress_raw_svg')}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:bg-cyan-950/20 text-left transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-cyan-300">
                    Raw SVG XML Markup
                  </span>
                  <span className="text-[11px] text-slate-400">
                    With `@keyframes qlikFillWipe`
                  </span>
                </div>
                <div className="p-1.5 rounded bg-slate-900 text-slate-300">
                  {copiedType === 'progress_raw_svg' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  )}
                </div>
              </button>
            </div>

            {/* QVS Subroutine Call */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-300">
                  Qlik Subroutine Call (`CreateSVGProgressBars`)
                </span>
                <button
                  onClick={() => handleCopy(
                    `CALL CreateSVGProgressBars('MyTable', 'IdField', 'PercentageField', 'VisualProgressTrack', '${toQlikHex(fillColor)}', '${toQlikHex(trackColor)}');`,
                    'qvs_progress_call'
                  )}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  {copiedType === 'qvs_progress_call' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Call
                </button>
              </div>
              <pre className="text-[11px] font-mono text-cyan-300/80 overflow-x-auto bg-slate-900/80 p-2.5 rounded border border-slate-800">
                {`CALL CreateSVGProgressBars('MyTable', 'IdField', 'PercentageField', 'VisualProgressTrack', '${toQlikHex(fillColor)}', '${toQlikHex(trackColor)}');`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
