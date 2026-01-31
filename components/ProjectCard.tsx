import React, { useState } from 'react';
import { ProjectProposal } from '../types';
import { 
  Copy, Check, ExternalLink, Microchip, FileCode, 
  Lightbulb, GraduationCap, ArrowRight, Terminal 
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProjectCardProps {
  project: ProjectProposal;
  index: number;
}

// Configuration for difficulty badges
const DIFFICULTY_CONFIG: Record<string, string> = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'hardware' | 'code'>('overview');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const difficultyClass = DIFFICULTY_CONFIG[project.difficulty] || 'bg-slate-700 text-slate-300';

  return (
    <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm transition-all hover:border-arduino-teal/50 mb-8 flex flex-col">
      
      {/* --- Card Header --- */}
      <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-arduino-teal font-mono text-sm tracking-widest opacity-80">
                PROJ-{String(index + 1).padStart(3, '0')}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyClass}`}>
                {project.difficulty}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h2>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-slate-800">
          {[
            { id: 'overview', icon: Lightbulb, label: 'Overview' },
            { id: 'hardware', icon: Microchip, label: 'Hardware' },
            { id: 'code', icon: FileCode, label: 'Code Logic' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-4 py-3 text-sm font-medium transition-all flex items-center gap-2 border-b-2
                ${activeTab === tab.id 
                  ? 'border-arduino-teal text-arduino-teal bg-slate-800/50' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}
              `}
            >
              <tab.icon className="w-4 h-4" /> 
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="p-6 min-h-[400px] bg-slate-900/20">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  Problem Statement
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {project.problemStatement}
                </p>
              </div>
              
              {/* Solution */}
              <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  Solution
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {project.solutionOverview}
                </p>
              </div>
            </div>

            {/* Research Significance */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 p-5 rounded-xl border border-indigo-500/20 flex gap-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg h-fit">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 mb-1">Research Significance</h3>
                <p className="text-slate-400 text-sm italic">"{project.researchSignificance}"</p>
              </div>
            </div>

            {/* Circuit Logic (Terminal Style) */}
            <div className="bg-[#0d1117] p-0 rounded-xl border border-slate-700 overflow-hidden">
               <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                 <Terminal className="w-3 h-3 text-slate-500" />
                 <span className="text-xs text-slate-400 font-mono">circuit_logic.txt</span>
               </div>
               <div className="p-4 font-mono text-sm text-green-400/90 whitespace-pre-wrap leading-relaxed">
                 {project.circuitLogic}
               </div>
            </div>
          </div>
        )}

        {/* TAB: HARDWARE */}
        {activeTab === 'hardware' && (
          <div className="animate-fadeIn">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.hardwareList.map((item, idx) => (
                <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 hover:border-arduino-teal/40 hover:bg-slate-800/60 transition-all group/item">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-white group-hover/item:text-arduino-teal transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800">
                      x{item.quantity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal border-t border-slate-700/50 pt-2 mt-2">
                    {item.purpose}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 text-blue-200/80 text-sm">
              <ExternalLink className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
              <p>Verify component voltage levels (3.3V vs 5V) before connecting. Use logic level converters for mixed-voltage systems.</p>
            </div>
          </div>
        )}

        {/* TAB: CODE */}
        {activeTab === 'code' && (
          <div className="relative group animate-fadeIn">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={handleCopyCode}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-lg border
                  ${copied 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}
                `}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e] shadow-inner">
              <SyntaxHighlighter
                language="cpp"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.8rem', lineHeight: '1.5' }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {project.codeSnippet}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <div className="bg-slate-950/50 px-6 py-4 border-t border-slate-800 flex justify-between items-center">
        <span className="text-xs text-slate-600 font-mono hidden sm:inline-block">
          ID: {Date.now().toString().slice(-6)}
        </span>
        
        {/* Conditional rendering if a URL exists in your type, otherwise generic */}
        <a 
          href="https://docs.arduino.cc/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-arduino-teal transition-colors"
        >
          View Documentation
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};a