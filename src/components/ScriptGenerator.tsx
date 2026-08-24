import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  FileText, 
  Settings, 
  Sliders, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { toQlikHex } from '../utils/svgEngine';

export const ScriptGenerator: React.FC = () => {
  const [moduleType, setModuleType] = useState<'pills' | 'progress'>('pills');
  
  // Script Variables for Pills
  const [sourceTable, setSourceTable] = useState('DevOpsStaging');
  const [groupField, setGroupField] = useState('');
  const [textField, setTextField] = useState('DeployStatus');
  const [idField, setIdField] = useState('EnvID');
  const [outputField, setOutputField] = useState('AnimatedPillBadge');
  const [bgColorField, setBgColorField] = useState('BgHex');
  const [textColorField, setTextColorField] = useState('TextHex');
  const [strokeColorField, setStrokeColorField] = useState('StrokeHex');
  const [outputType, setOutputType] = useState<'ROW' | 'GROUPED' | 'SINGLE'>('ROW');

  // Script Variables for Progress
  const [progressSourceTable, setProgressSourceTable] = useState('ProjectMilestones');
  const [progressIdField, setProgressIdField] = useState('ProjectID');
  const [percentField, setPercentField] = useState('CompletionPercentage');
  const [progressOutputField, setProgressOutputField] = useState('VisualProgressTrack');
  const [fillColor, setFillColor] = useState('#06b6d4');
  const [trackColor, setTrackColor] = useState('#f1f5f9');

  // Global Config Settings
  const [dashProfile, setDashProfile] = useState<'solid' | 'dashed' | 'dotted' | 'longdash'>('dashed');
  const [includeLeftJoin, setIncludeLeftJoin] = useState(true);
  const [copiedScript, setCopiedScript] = useState(false);

  const getDashArrayString = () => {
    switch (dashProfile) {
      case 'solid': return "''";
      case 'dashed': return "'4, 3'";
      case 'dotted': return "'2, 2'";
      case 'longdash': return "'8, 4'";
      default: return "''";
    }
  };

  const generateFullScript = () => {
    if (moduleType === 'pills') {
      const isGrouped = outputType === 'GROUPED';
      const actualGroupField = isGrouped ? (groupField || 'CategoryDimension') : "''";

      return `// ============================================================================
// QLIK SVG COMPONENTS SCRIPT - STATUS PILLS (${outputType} MODE)
// ============================================================================

// 1. Load the Core Vector Engine Library
$(Include=../src/SVG_Main_Core.qvs);

// 2. Configure Global Theme Engine Constants
LET vFontSize        = '11px';
LET vFontFamily      = 'sans-serif';
LET vFontWeight      = 'bold';
LET vPillHeight      = 28;
LET vStrokeWidth      = 1.5;
LET vStrokeDashArray = ${getDashArrayString()}; // Border outline styling profile

// 3. Execute Subroutine Macro
CALL CreateSVGPills(
    '${sourceTable}', 
    ${actualGroupField.startsWith("'") ? actualGroupField : `'${actualGroupField}'`}, 
    '${textField}', 
    '${idField}', 
    '${outputField}', 
    '${bgColorField}', 
    '${textColorField}', 
    '${strokeColorField}', 
    '${outputType}'
);

${includeLeftJoin ? (
isGrouped ? `// 4. Grouped Mode automatically produces '${sourceTable}_SVG_Output' table indexed by [${groupField || 'CategoryDimension'}]
// No further join needed as it deduplicates unique ID keys.` : `// 4. Join the resulting SVG column back to your primary data model
Left Join(${sourceTable})
LOAD 
    ${idField}, 
    ${outputField} 
RESIDENT ${sourceTable}_SVG_Output;

// 5. Clean up temporary tracking table
DROP TABLE ${sourceTable}_SVG_Output;`
) : `// Result available in: '${sourceTable}_SVG_Output'`}
`;
    } else {
      return `// ============================================================================
// QLIK SVG COMPONENTS SCRIPT - PROGRESS TRACKING GAUGES
// ============================================================================

// 1. Load the Core Vector Engine Library
$(Include=../src/SVG_Main_Core.qvs);

// 2. Execute Progressive Graphics Engine Subroutine
CALL CreateSVGProgressBars(
    '${progressSourceTable}', 
    '${progressIdField}', 
    '${percentField}', 
    '${progressOutputField}', 
    '${toQlikHex(fillColor)}', 
    '${toQlikHex(trackColor)}'
);

${includeLeftJoin ? `// 3. Join the visual gauge column back to your source business table
Left Join(${progressSourceTable})
LOAD 
    ${progressIdField}, 
    ${progressOutputField} 
RESIDENT ${progressSourceTable}_Progress_Output;

// 4. Drop intermediate macro layout table
DROP TABLE ${progressSourceTable}_Progress_Output;` : `// Result available in: '${progressSourceTable}_Progress_Output'`}
`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFullScript());
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            QVS Load Script Generator
          </h2>
          <p className="text-sm text-slate-400">
            Build syntax-verified Qlik Sense backend load script blocks with Left Join merging and memory clean-up.
          </p>
        </div>

        {/* Module Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setModuleType('pills')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              moduleType === 'pills'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CreateSVGPills Macro
          </button>
          <button
            onClick={() => setModuleType('progress')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              moduleType === 'progress'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CreateSVGProgressBars Macro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {moduleType === 'pills' ? (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Subroutine Parameter Config
              </h3>

              {/* Output Mode */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">OutputType Parameter</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ROW', 'GROUPED', 'SINGLE'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setOutputType(m)}
                      className={`py-1.5 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                        outputType === m
                          ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 ring-1 ring-cyan-500'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">SourceTable (Qlik resident table name)</label>
                  <input
                    type="text"
                    value={sourceTable}
                    onChange={(e) => setSourceTable(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {outputType === 'GROUPED' && (
                  <div>
                    <label className="block text-slate-400 mb-1">GroupField (e.g. Country, Department)</label>
                    <input
                      type="text"
                      value={groupField}
                      onChange={(e) => setGroupField(e.target.value)}
                      placeholder="e.g. Region, Country"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">TextField (Status label)</label>
                    <input
                      type="text"
                      value={textField}
                      onChange={(e) => setTextField(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">IdField (Primary row key)</label>
                    <input
                      type="text"
                      value={idField}
                      onChange={(e) => setIdField(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">OutputField (Target column name)</label>
                  <input
                    type="text"
                    value={outputField}
                    onChange={(e) => setOutputField(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">BgColorField</label>
                    <input
                      type="text"
                      value={bgColorField}
                      onChange={(e) => setBgColorField(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">TextColorField</label>
                    <input
                      type="text"
                      value={textColorField}
                      onChange={(e) => setTextColorField(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">StrokeColorField</label>
                    <input
                      type="text"
                      value={strokeColorField}
                      onChange={(e) => setStrokeColorField(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Stroke Dash Array */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="block text-xs text-slate-400">Outline Dash Profile (`vStrokeDashArray`)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDashProfile('solid')}
                    className={`p-2 rounded border text-xs font-mono text-center ${
                      dashProfile === 'solid' ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Solid Line ('')
                  </button>
                  <button
                    onClick={() => setDashProfile('dashed')}
                    className={`p-2 rounded border text-xs font-mono text-center ${
                      dashProfile === 'dashed' ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Dashed ('4, 3')
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Progress Subroutine Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">SourceTable (Qlik resident table)</label>
                  <input
                    type="text"
                    value={progressSourceTable}
                    onChange={(e) => setProgressSourceTable(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">IdField (Primary Key)</label>
                    <input
                      type="text"
                      value={progressIdField}
                      onChange={(e) => setProgressIdField(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">PercentField (0 - 100 column)</label>
                    <input
                      type="text"
                      value={percentField}
                      onChange={(e) => setPercentField(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">OutputField (Target column)</label>
                  <input
                    type="text"
                    value={progressOutputField}
                    onChange={(e) => setProgressOutputField(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-slate-400 mb-1">Fill Color Code</label>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2">
                      <input
                        type="color"
                        value={fillColor}
                        onChange={(e) => setFillColor(e.target.value)}
                        className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-slate-300">{toQlikHex(fillColor)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Track Color Code</label>
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2">
                      <input
                        type="color"
                        value={trackColor}
                        onChange={(e) => setTrackColor(e.target.value)}
                        className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-slate-300">{toQlikHex(trackColor)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Options Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLeftJoin}
                onChange={(e) => setIncludeLeftJoin(e.target.checked)}
                className="rounded text-cyan-600 focus:ring-cyan-500"
              />
              <span>Include Left Join & Temporary Table Drop cleanup logic</span>
            </label>
          </div>
        </div>

        {/* Right Column: Code Display (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-200">
                  Ready-to-Paste Qlik Sense Load Script
                </h3>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                {copiedScript ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                {copiedScript ? 'Copied to Clipboard!' : 'Copy Entire Script'}
              </button>
            </div>

            {/* Code View */}
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300/90 leading-relaxed overflow-x-auto max-h-[500px]">
              {generateFullScript()}
            </pre>

            {/* Implementation Notes */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Qlik Engine Integration Best Practices
              </div>
              <p>
                1. Ensure all color hex tokens passed to the subroutine use <code>'%23'</code> URL-safe encoding instead of raw <code>'#'</code>.
              </p>
              <p>
                2. In the Qlik Sheet visualization properties pane, configure the column Representation as <strong>IMAGE</strong> and Image Sizing as <strong>STRETCH</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
