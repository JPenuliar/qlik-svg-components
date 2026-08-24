import React, { useState } from 'react';
import { SAMPLE_DATASETS } from '../data/sampleDatasets';
import { SampleDataset } from '../types';
import { 
  generateSinglePillSvg, 
  generateGroupedPillsSvg, 
  generateProgressBarSvg,
  generateSinglePillSvg as toDataUri
} from '../utils/svgEngine';
import { 
  Table, 
  Search, 
  Copy, 
  Check, 
  Code, 
  Eye, 
  Sparkles, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  Plus, 
  X,
  FileCode2,
  SlidersHorizontal
} from 'lucide-react';

export const QlikTableSimulator: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('devops_pipeline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Qlik Representation Controls
  const [representationMode, setRepresentationMode] = useState<'image' | 'datauri' | 'rawsvg' | 'script'>('image');
  const [rowHeightLines, setRowHeightLines] = useState<number>(3); // 1, 2, 3, 4
  const [copiedScript, setCopiedScript] = useState(false);

  // Dynamic user-added rows per dataset
  const [customRows, setCustomRows] = useState<Record<string, any[]>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Form for adding new row
  const [newRowData, setNewRowData] = useState({
    title: '',
    status: 'ACTIVE',
    val: '50',
    color1: '#dcfce7',
    color2: '#15803d',
    color3: '#22c55e'
  });

  const currentDataset: SampleDataset = SAMPLE_DATASETS.find(d => d.id === selectedDatasetId) || SAMPLE_DATASETS[0];

  const allRows = [
    ...currentDataset.rows,
    ...(customRows[selectedDatasetId] || [])
  ];

  const filteredRows = allRows.filter(row => {
    if (!searchQuery) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCopyScript = () => {
    navigator.clipboard.writeText(currentDataset.sourceQvsSnippet);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleAddCustomRow = () => {
    if (!newRowData.title) return;

    let addedRow: Record<string, any> = {};

    if (currentDataset.mode === 'ROW') {
      addedRow = {
        EnvID: Math.floor(Math.random() * 900) + 100,
        Environment: newRowData.title,
        DeployStatus: newRowData.status,
        BgHex: newRowData.color1,
        TextHex: newRowData.color2,
        StrokeHex: newRowData.color3,
        ServerCount: Math.floor(Math.random() * 20) + 1,
        LastUpdated: new Date().toLocaleTimeString(),
      };
    } else if (currentDataset.mode === 'PROGRESS') {
      addedRow = {
        ProjectID: Math.floor(Math.random() * 9000) + 1000,
        ProjectName: newRowData.title,
        CompletionPercentage: Number(newRowData.val) || 0,
        FillColor: Number(newRowData.val) >= 100 ? '#22c55e' : '#06b6d4',
        TrackColor: '#f1f5f9',
        Lead: 'Engineering Team',
        DueDate: 'Q4 2026',
      };
    } else {
      // GROUPED
      addedRow = {
        Country: newRowData.title,
        HubRegion: newRowData.title,
        CityCount: 2,
        ActiveRoutes: 15,
        TotalVolume: '75,000 req/s',
        EfficiencyRating: '96.0%',
        badges: [
          { id: Date.now(), text: newRowData.status, bgColor: newRowData.color1, textColor: newRowData.color2, strokeColor: newRowData.color3 },
        ],
      };
    }

    setCustomRows({
      ...customRows,
      [selectedDatasetId]: [...(customRows[selectedDatasetId] || []), addedRow]
    });

    setShowAddModal(false);
    setNewRowData({ title: '', status: 'ACTIVE', val: '50', color1: '#dcfce7', color2: '#15803d', color3: '#22c55e' });
  };

  // Helper to render cell content
  const renderCellContent = (row: any, columnKey: string, columnType?: string) => {
    if (columnType === 'svg_pill') {
      const svg = generateSinglePillSvg(
        row.DeployStatus || row.status || 'ACTIVE',
        row.BgHex || '#e0f2fe',
        row.TextHex || '#0369a1',
        row.StrokeHex || '#0284c7'
      );
      const dataUri = toDataUri(
        row.DeployStatus || row.status || 'ACTIVE',
        row.BgHex || '#e0f2fe',
        row.TextHex || '#0369a1',
        row.StrokeHex || '#0284c7',
        undefined,
        { asDataUri: true, qlikEncoded: true }
      );

      if (representationMode === 'image') {
        return (
          <div 
            className="flex items-center h-full min-h-[34px]"
            dangerouslySetInnerHTML={{ __html: svg }} 
          />
        );
      }
      if (representationMode === 'datauri') {
        return <span className="text-[11px] font-mono text-cyan-400 break-all">{dataUri}</span>;
      }
      return <pre className="text-[10px] font-mono text-slate-300 max-h-20 overflow-y-auto">{svg}</pre>;
    }

    if (columnType === 'svg_grouped') {
      const badges = row.badges || [];
      const svg = generateGroupedPillsSvg(badges);
      const dataUri = generateGroupedPillsSvg(badges, undefined, { asDataUri: true, qlikEncoded: true });

      if (representationMode === 'image') {
        return (
          <div 
            className="flex items-center h-full min-h-[34px] overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }} 
          />
        );
      }
      if (representationMode === 'datauri') {
        return <span className="text-[11px] font-mono text-cyan-400 break-all">{dataUri}</span>;
      }
      return <pre className="text-[10px] font-mono text-slate-300 max-h-20 overflow-y-auto">{svg}</pre>;
    }

    if (columnType === 'svg_progress') {
      const pct = Number(row.CompletionPercentage) || 0;
      const svg = generateProgressBarSvg(pct, row.FillColor, row.TrackColor);
      const dataUri = generateProgressBarSvg(pct, row.FillColor, row.TrackColor, undefined, undefined, { asDataUri: true, qlikEncoded: true });

      if (representationMode === 'image') {
        return (
          <div className="w-full max-w-[200px] h-6 flex items-center">
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svg }} 
            />
          </div>
        );
      }
      if (representationMode === 'datauri') {
        return <span className="text-[11px] font-mono text-cyan-400 break-all">{dataUri}</span>;
      }
      return <pre className="text-[10px] font-mono text-slate-300 max-h-20 overflow-y-auto">{svg}</pre>;
    }

    // Default text/number
    return <span className="text-xs text-slate-800 font-medium">{row[columnKey]}</span>;
  };

  // Row height CSS mapping based on Qlik line height parameter
  const getRowPaddingClass = () => {
    switch (rowHeightLines) {
      case 1: return 'py-1';
      case 2: return 'py-2';
      case 4: return 'py-4.5';
      case 3:
      default: return 'py-3';
    }
  };

  return (
    <div className="space-y-6">
      {/* Dataset Picker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAMPLE_DATASETS.map((dataset) => {
          const isSelected = selectedDatasetId === dataset.id;
          const ModeIcon = dataset.mode === 'ROW' ? Sparkles : dataset.mode === 'GROUPED' ? Layers : BarChart3;
          return (
            <button
              key={dataset.id}
              id={`btn-dataset-${dataset.id}`}
              onClick={() => setSelectedDatasetId(dataset.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/40 shadow-md ring-1 ring-cyan-500'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <ModeIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {dataset.mode}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {dataset.qvsFile.split('/')[1]}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{dataset.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{dataset.description}</p>
            </button>
          );
        })}
      </div>

      {/* Main Qlik Sheet Simulator Panel */}
      <div className="rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 overflow-hidden">
        {/* Qlik Header Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
              Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Qlik Sense Enterprise Table Visualization
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                  Live Script Output
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono">
                Source: {currentDataset.qvsFile} • Total Records: {filteredRows.length}
              </p>
            </div>
          </div>

          {/* Table Controls (Representation & Row Height) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search table rows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Representation Switcher */}
            <div className="flex items-center bg-slate-200 p-1 rounded-lg border border-slate-300">
              <button
                onClick={() => setRepresentationMode('image')}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                  representationMode === 'image'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Representation: IMAGE (Standard visual rendering)"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                IMAGE
              </button>
              <button
                onClick={() => setRepresentationMode('datauri')}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                  representationMode === 'datauri'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Representation: Text (Raw Data URI)"
              >
                <Code className="w-3.5 h-3.5 text-cyan-600" />
                DATA URI
              </button>
              <button
                onClick={() => setRepresentationMode('script')}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                  representationMode === 'script'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View Qlik Load Script"
              >
                <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                QVS SCRIPT
              </button>
            </div>

            {/* Row Height Selector */}
            {representationMode !== 'script' && (
              <div className="flex items-center gap-1.5 bg-slate-200 px-2.5 py-1 rounded-lg border border-slate-300">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] font-medium text-slate-700">Row Height:</span>
                <select
                  value={rowHeightLines}
                  onChange={(e) => setRowHeightLines(Number(e.target.value))}
                  className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs text-slate-900 font-semibold focus:outline-none"
                >
                  <option value={1}>1 Line (Compact)</option>
                  <option value={2}>2 Lines</option>
                  <option value={3}>3 Lines (Recommended)</option>
                  <option value={4}>4 Lines (Spacious)</option>
                </select>
              </div>
            )}

            {/* Add Row Button */}
            {representationMode !== 'script' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-medium text-xs shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Record
              </button>
            )}
          </div>
        </div>

        {/* View Mode: Table Grid vs QVS Script */}
        {representationMode === 'script' ? (
          <div className="p-6 bg-slate-950 text-slate-200 font-mono text-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <span className="text-slate-300 font-semibold flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                Qlik Load Script (`{currentDataset.qvsFile}`)
              </span>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 text-xs transition-colors"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript ? 'Copied to Clipboard' : 'Copy Script'}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300 leading-relaxed">
              {currentDataset.sourceQvsSnippet}
            </pre>
          </div>
        ) : (
          /* Realistic Table Grid */
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-300 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  {currentDataset.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 border-r border-slate-200 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span>{col.label}</span>
                        {col.isSvg && (
                          <span className="text-[10px] lowercase px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 border border-cyan-300">
                            SVG Image
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, idx) => (
                    <tr 
                      key={idx}
                      className={`hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                    >
                      {currentDataset.columns.map((col) => (
                        <td 
                          key={col.key} 
                          className={`px-4 ${getRowPaddingClass()} border-r border-slate-200 last:border-r-0 align-middle`}
                        >
                          {renderCellContent(row, col.key, col.type)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={currentDataset.columns.length} className="px-4 py-12 text-center text-slate-400">
                      No records matched your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Qlik Sense Presentation Checklist Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Qlik Table Properties Guide:</strong> Set Column Representation to <strong>IMAGE</strong>, Image Sizing to <strong>STRETCH</strong>, and Row Height to <strong>3-4 lines</strong>.
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            Rendered with zero client-side latency via pure data URI stream
          </span>
        </div>
      </div>

      {/* Add Custom Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add Test Row to `{currentDataset.name}`
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  {currentDataset.mode === 'PROGRESS' ? 'Project / Task Name' : 'Title / Environment'}
                </label>
                <input
                  type="text"
                  value={newRowData.title}
                  onChange={(e) => setNewRowData({ ...newRowData, title: e.target.value })}
                  placeholder="e.g. EU Production Gateway"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {currentDataset.mode === 'PROGRESS' ? (
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Completion Percentage (0 - 100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newRowData.val}
                    onChange={(e) => setNewRowData({ ...newRowData, val: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Status Badge Text</label>
                  <select
                    value={newRowData.status}
                    onChange={(e) => {
                      const s = e.target.value;
                      if (s === 'ACTIVE') setNewRowData({ ...newRowData, status: s, color1: '#dcfce7', color2: '#15803d', color3: '#22c55e' });
                      else if (s === 'CRITICAL') setNewRowData({ ...newRowData, status: s, color1: '#fee2e2', color2: '#991b1b', color3: '#ef4444' });
                      else if (s === 'PENDING') setNewRowData({ ...newRowData, status: s, color1: '#fef3c7', color2: '#92400e', color3: '#f59e0b' });
                      else setNewRowData({ ...newRowData, status: s, color1: '#f1f5f9', color2: '#334155', color3: '#cbd5e1' });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="ACTIVE">ACTIVE (Green Shimmer)</option>
                    <option value="PENDING">PENDING (Amber Shimmer + Dot)</option>
                    <option value="CRITICAL">CRITICAL (Red Pulsing Dot)</option>
                    <option value="COMPLETE">COMPLETE (Static Slate)</option>
                    <option value="BLOCKED">BLOCKED (Alert Pulse)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomRow}
                disabled={!newRowData.title}
                className="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg disabled:opacity-40"
              >
                Insert Row
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
