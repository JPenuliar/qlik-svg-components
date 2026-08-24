import React from 'react';
import { 
  Table, 
  Sparkles, 
  BarChart3, 
  Code2, 
  FolderDown, 
  BookOpen,
  Boxes
} from 'lucide-react';

export type TabType = 'table' | 'pill_designer' | 'progress_designer' | 'script_gen' | 'assets' | 'docs';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'table' as TabType, label: 'Qlik Table Simulator', icon: Table, badge: 'Live Grid' },
    { id: 'pill_designer' as TabType, label: 'Status Pill Designer', icon: Sparkles, badge: 'Animated' },
    { id: 'progress_designer' as TabType, label: 'Progress Gauge Designer', icon: BarChart3, badge: 'Gauges' },
    { id: 'script_gen' as TabType, label: 'QVS Script Generator', icon: Code2, badge: 'QVS' },
    { id: 'assets' as TabType, label: 'Asset Gallery', icon: FolderDown, badge: '5 Core SVGs' },
    { id: 'docs' as TabType, label: 'Documentation & Guide', icon: BookOpen, badge: 'Reference' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">qlik-svg-components</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  v1.2.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Native Animated Vector UI Components for Qlik Sense</p>
            </div>
          </div>

          {/* Core Feature Badges */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-medium">
              ⚡ Zero Extension
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-medium">
              🚀 Native Script Load
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/40 font-medium">
              🎨 Inline Data URIs
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-cyan-700/80 text-cyan-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
