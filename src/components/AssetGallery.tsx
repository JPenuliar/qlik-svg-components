import React, { useState } from 'react';
import { 
  FolderDown, 
  Copy, 
  Check, 
  Download, 
  Eye, 
  Code, 
  Sparkles, 
  FileText
} from 'lucide-react';

interface AssetDetail {
  filename: string;
  name: string;
  badgeText: string;
  bgHex: string;
  strokeHex: string;
  textHex: string;
  description: string;
  animationProfile: string;
  svgContent: string;
}

export const ASSET_LIBRARY: AssetDetail[] = [
  {
    filename: 'active_blue.svg',
    name: 'Active Blue Shimmer',
    badgeText: 'ACTIVE',
    bgHex: '#e0f2fe',
    strokeHex: '#0284c7',
    textHex: '#0369a1',
    description: 'Elegant horizontal wave shimmer running continuously behind the badge label.',
    animationProfile: '1.8s ease-in wipe loader (repeat: infinite)',
    svgContent: `<svg width="106" height="28" viewBox="0 0 106 28" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="102" height="24" rx="12" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" />
  <rect x="2" y="2" height="24" rx="12" fill="#0284c7" opacity="0.12" width="0">
    <animate attributeName="width" values="0;102" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
  </rect>
  <text x="53" y="14" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11px" fill="#0369a1">ACTIVE</text>
</svg>`,
  },
  {
    filename: 'active_green.svg',
    name: 'Active Green Shimmer',
    badgeText: 'ACTIVE',
    bgHex: '#dcfce7',
    strokeHex: '#22c55e',
    textHex: '#15803d',
    description: 'Fresh emerald wave shimmer for live background synchronization or active server clusters.',
    animationProfile: '1.8s loading sweep running horizontally',
    svgContent: `<svg width="106" height="28" viewBox="0 0 106 28" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="102" height="24" rx="12" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
  <rect x="2" y="2" height="24" rx="12" fill="#22c55e" opacity="0.12" width="0">
    <animate attributeName="width" values="0;102" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
  </rect>
  <text x="53" y="14" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11px" fill="#15803d">ACTIVE</text>
</svg>`,
  },
  {
    filename: 'critical_red.svg',
    name: 'Critical Red Radar Pulse',
    badgeText: 'CRITICAL',
    bgHex: '#fee2e2',
    strokeHex: '#ef4444',
    textHex: '#991b1b',
    description: 'Flashing radar alert ring with a slow opacity breathing cycle for blocker issues.',
    animationProfile: '1.5s radar ring expansion (r: 4->8px) + opacity fade',
    svgContent: `<svg width="114" height="28" viewBox="0 0 114 28" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="110" height="24" rx="12" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
  <circle cx="10" cy="14" r="4" fill="#ef4444" opacity="0.4">
    <animate attributeName="r" values="4;8" dur="1.5s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
  </circle>
  <circle cx="10" cy="14" r="3" fill="#dc2626" />
  <text x="57" y="14" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11px" fill="#991b1b">CRITICAL</text>
</svg>`,
  },
  {
    filename: 'pending_amber.svg',
    name: 'Pending Amber Combo',
    badgeText: 'PENDING',
    bgHex: '#fef3c7',
    strokeHex: '#f59e0b',
    textHex: '#92400e',
    description: 'Dual-action animation combining a full background loader bar with a pulsing alert dot.',
    animationProfile: '2.0s loader wipe + 1.2s dot opacity breathing',
    svgContent: `<svg width="112" height="28" viewBox="0 0 112 28" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="108" height="24" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
  <rect x="2" y="2" height="24" rx="12" fill="#f59e0b" opacity="0.15" width="0">
    <animate attributeName="width" values="0;108" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
  </rect>
  <circle cx="10" cy="14" r="3.5" fill="#d97706" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1" dur="1.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="10" cy="14" r="2" fill="#b45309" />
  <text x="56" y="14" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11px" fill="#92400e">PENDING</text>
</svg>`,
  },
  {
    filename: 'static_slate.svg',
    name: 'Static Slate Baseline',
    badgeText: 'COMPLETE',
    bgHex: '#f1f5f9',
    strokeHex: '#cbd5e1',
    textHex: '#64748b',
    description: 'Clean static baseline to keep completed or historical elements crisp and legible.',
    animationProfile: 'Static (zero movement)',
    svgContent: `<svg width="98" height="28" viewBox="0 0 98 28" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="94" height="24" rx="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="49" y="14" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11px" fill="#64748b">COMPLETE</text>
</svg>`,
  },
];

export const AssetGallery: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetDetail | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (asset: AssetDetail) => {
    const blob = new Blob([asset.svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = asset.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderDown className="w-5 h-5 text-cyan-400" />
            Core Repository Vector Asset Gallery
          </h2>
          <p className="text-sm text-slate-400">
            Showcasing the 5 standalone SVG vector assets pre-packaged in `examples/assets/`.
          </p>
        </div>
      </div>

      {/* Grid of 5 SVGs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ASSET_LIBRARY.map((asset) => {
          const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(asset.svgContent)}`;
          return (
            <div
              key={asset.filename}
              className="rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <span className="font-bold text-sm text-white">{asset.name}</span>
                  <code className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono border border-slate-800">
                    {asset.filename}
                  </code>
                </div>

                {/* Stage */}
                <div className="rounded-xl bg-white p-6 flex items-center justify-center min-h-[100px] mb-4 shadow-inner">
                  <div 
                    className="transform transition-transform group-hover:scale-110"
                    dangerouslySetInnerHTML={{ __html: asset.svgContent }} 
                  />
                </div>

                {/* Description & Animation Note */}
                <p className="text-xs text-slate-300 mb-2">{asset.description}</p>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 font-mono mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{asset.animationProfile}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  View XML
                </button>
                <button
                  onClick={() => handleCopy(dataUri, `uri-${asset.filename}`)}
                  className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center transition-colors"
                  title="Copy Qlik Data URI"
                >
                  {copiedKey === `uri-${asset.filename}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDownload(asset)}
                  className="py-1.5 px-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center transition-colors"
                  title="Download .SVG File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* XML Code Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  {selectedAsset.name} (`{selectedAsset.filename}`)
                </h3>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-white text-sm">
                Close
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto max-h-96">
              {selectedAsset.svgContent}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleCopy(selectedAsset.svgContent, 'modal_xml')}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedKey === 'modal_xml' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                {copiedKey === 'modal_xml' ? 'Copied XML' : 'Copy SVG XML'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
