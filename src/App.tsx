import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { QlikTableSimulator } from './components/QlikTableSimulator';
import { PillDesigner } from './components/PillDesigner';
import { ProgressBarDesigner } from './components/ProgressBarDesigner';
import { ScriptGenerator } from './components/ScriptGenerator';
import { AssetGallery } from './components/AssetGallery';
import { DocumentationView } from './components/DocumentationView';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('table');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'table' && <QlikTableSimulator />}
        {activeTab === 'pill_designer' && <PillDesigner />}
        {activeTab === 'progress_designer' && <ProgressBarDesigner />}
        {activeTab === 'script_gen' && <ScriptGenerator />}
        {activeTab === 'assets' && <AssetGallery />}
        {activeTab === 'docs' && <DocumentationView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">qlik-svg-components</span>
            <span>•</span>
            <span>Native Animated SVG UI Components for Qlik Sense</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Author: JPenuliar</span>
            <span>•</span>
            <span>Zero-Extension Native Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
