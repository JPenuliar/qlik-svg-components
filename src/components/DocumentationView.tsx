import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sliders, 
  Sparkles, 
  Boxes,
  Code
} from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-200">
      {/* Header */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Qlik SVG Components — Technical Manual & Architecture Guide</h1>
            <p className="text-xs text-slate-400">Zero-extension, high-performance vector rendering engine for Qlik Sense tables.</p>
          </div>
        </div>
      </div>

      {/* Critical Architecture Rule: %23 URL Encoding */}
      <div className="p-5 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h3 className="font-bold text-amber-200 text-sm">Critical URL Hex Encoding Rule (`%23` vs `#`)</h3>
          <p className="text-amber-300/90 leading-relaxed">
            All hex color codes passed into Qlik SVG subroutines <strong>MUST be encoded using <code>%23</code> instead of a standard hash <code>#</code></strong> (e.g. <code>'%2306b6d4'</code>, <code>'%23e0f2fe'</code>). 
            Passing a literal <code>#</code> breaks Qlik's HTML string parser in data URIs, causing vector images to render blank.
          </p>
        </div>
      </div>

      {/* Presentation Table Checklist */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Qlik Sense Table Presentation Checklist
        </h2>
        <p className="text-xs text-slate-400">
          To ensure inline text strings convert to visual components instantly inside Qlik Sense sheet properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 font-bold flex items-center justify-center text-[10px]">1</span>
            <h4 className="font-semibold text-white">Select Column</h4>
            <p className="text-slate-400 text-[11px]">Select your output SVG column in the table chart data pane.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 font-bold flex items-center justify-center text-[10px]">2</span>
            <h4 className="font-semibold text-white">Set Representation</h4>
            <p className="text-slate-400 text-[11px]">Switch column <strong>Representation</strong> from <em>Text</em> to <strong>IMAGE</strong>.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 font-bold flex items-center justify-center text-[10px]">3</span>
            <h4 className="font-semibold text-white">Set Sizing</h4>
            <p className="text-slate-400 text-[11px]">Switch <strong>Image Sizing</strong> from <em>Keep Aspect Ratio</em> to <strong>STRETCH</strong>.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 font-bold flex items-center justify-center text-[10px]">4</span>
            <h4 className="font-semibold text-white">Row Height</h4>
            <p className="text-slate-400 text-[11px]">Set <strong>Appearance &gt; Presentation &gt; Row Height</strong> to <strong>3 or 4 lines</strong>.</p>
          </div>
        </div>
      </div>

      {/* Subroutines Reference */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Code className="w-5 h-5 text-cyan-400" />
          Subroutines API Reference
        </h2>

        {/* 1. CreateSVGPills */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">1. The Pill & Status Badge Module (`CreateSVGPills`)</h3>
            <span className="text-xs px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800 font-mono">
              src/components/sub_pill_generator.qvs
            </span>
          </div>

          <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
            CALL CreateSVGPills(SourceTable, GroupField, TextField, IdField, OutputField, BgColorField, TextColorField, StrokeColorField, OutputType);
          </pre>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-2 px-3">Parameter</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                <tr>
                  <td className="py-2 px-3 text-cyan-300">vSourceTable</td>
                  <td className="py-2 px-3 text-slate-400">String</td>
                  <td className="py-2 px-3 text-slate-300 font-sans">Name of the resident staging table containing raw records.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-cyan-300">vGroupField</td>
                  <td className="py-2 px-3 text-slate-400">String</td>
                  <td className="py-2 px-3 text-slate-300 font-sans">Dimension field to aggregate around in GROUPED mode (e.g. Country).</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-cyan-300">vTextField</td>
                  <td className="py-2 px-3 text-slate-400">String</td>
                  <td className="py-2 px-3 text-slate-300 font-sans">Text string rendered inside the pill (triggers animations).</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-cyan-300">vIdField</td>
                  <td className="py-2 px-3 text-slate-400">String</td>
                  <td className="py-2 px-3 text-slate-300 font-sans">Primary key ID field for row-level joins.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-cyan-300">vOutputField</td>
                  <td className="py-2 px-3 text-slate-400">String</td>
                  <td className="py-2 px-3 text-slate-300 font-sans">Name of the generated SVG data URI column.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-cyan-300">vOutputType</td>
                  <td className="py-2 px-3 text-slate-400">Enum</td>
                  <td className="py-2 px-3 text-slate-300 font-sans"><code>'ROW'</code>, <code>'GROUPED'</code>, or <code>'SINGLE'</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. CreateSVGProgressBars */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">2. Linear Progressive Tracking Gauges (`CreateSVGProgressBars`)</h3>
            <span className="text-xs px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800 font-mono">
              src/components/sub_progress_bars.qvs
            </span>
          </div>

          <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
            CALL CreateSVGProgressBars(SourceTable, IdField, PercentField, OutputField, FillColorBlock, TrackColorBlock);
          </pre>

          <p className="text-xs text-slate-300 leading-relaxed">
            Features hardware-accelerated ease-in CSS width wipe loading (<code>@keyframes qlikFillWipe</code>), smart contrast text switching (white for &gt;= 45%, dark slate for &lt; 45%), and an ambient green breathing cycle on 100% completed milestone rows.
          </p>
        </div>
      </div>
    </div>
  );
};
