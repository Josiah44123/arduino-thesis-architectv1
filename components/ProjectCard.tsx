import React, { useState } from 'react';
import { ProjectProposal } from '../types';
import { Copy, Check, ExternalLink, Microchip, FileCode, Lightbulb, GraduationCap, ArrowRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProjectCardProps {
  project: ProjectProposal;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'hardware' | 'code'>('overview');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl mb-8 flex flex-col transition-all hover:border-arduino-teal/40">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-700 bg-slate-900/30">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-arduino-teal font-mono text-sm">#{String(index + 1).padStart(2, '0')}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">{project.title}</h2>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'overview' ? 'bg-arduino-teal text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <Lightbulb className="w-4 h-4" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'hardware' ? 'bg-arduino-teal text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <Microchip className="w-4 h-4" /> Hardware
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'bg-arduino-teal text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <FileCode className="w-4 h-4" /> Code Logic
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                  Problem Statement
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {project.problemStatement}
                </p>
              </div>
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                  Solution Overview
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {project.solutionOverview}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                Research Significance
              </h3>
               <p className="text-slate-300 leading-relaxed italic">
                  "{project.researchSignificance}"
                </p>
            </div>
            
             <div className="bg-slate-900/30 p-5 rounded-xl border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-3">Circuit Logic</h3>
                <p className="text-slate-300 text-sm font-mono whitespace-pre-wrap">
                  {project.circuitLogic}
                </p>
              </div>
          </div>
        )}

        {activeTab === 'hardware' && (
          <div className="animate-fadeIn">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.hardwareList.map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-2 hover:border-arduino-teal/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-white">{item.name}</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{item.quantity}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.purpose}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm flex items-start gap-3">
               <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5" />
               <p>Note: Always verify component voltage levels (3.3V vs 5V) before connecting. Some sensors may require logic level converters.</p>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="relative group animate-fadeIn">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleCopyCode}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-all shadow-lg border border-slate-600"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e]">
              <SyntaxHighlighter
                language="cpp"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.85rem' }}
                showLineNumbers={true}
              >
                {project.codeSnippet}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-slate-950/30 p-4 border-t border-slate-700 flex justify-end">
        <button className="text-arduino-teal text-sm font-medium hover:text-white transition-colors flex items-center gap-1">
            See Arduino docs <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};