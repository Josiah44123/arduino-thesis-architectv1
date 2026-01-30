import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { generateArduinoProjects } from './services/geminiService';
import { ProjectProposal, GenerationStatus } from './types';
import { Search, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [projects, setProjects] = useState<ProjectProposal[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setStatus(GenerationStatus.LOADING);
    setProjects([]);
    setErrorMsg('');

    try {
      const generatedProjects = await generateArduinoProjects(inputText);
      setProjects(generatedProjects);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err) {
      setStatus(GenerationStatus.ERROR);
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  const suggestions = [
    "Smart irrigation system for dry climates",
    "Assistive device for visually impaired",
    "Home energy monitoring and optimization",
    "Automated pet feeder with health tracking"
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-arduino-teal selection:text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Build your <span className="text-arduino-teal">Thesis</span> with Confidence
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Describe a problem you want to solve. Our AI engineer will architect a complete Arduino-based solution, from circuit logic to code.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-2xl mb-12 backdrop-blur-sm">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g., I want to create a system that detects forest fires early..."
                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-arduino-teal/50 focus:border-arduino-teal transition-all resize-none text-lg"
                disabled={status === GenerationStatus.LOADING}
              />
              <div className="absolute bottom-4 right-4">
                <button
                  type="submit"
                  disabled={!inputText.trim() || status === GenerationStatus.LOADING}
                  className="bg-arduino-teal hover:bg-arduino-dark text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-arduino-teal/20"
                >
                  {status === GenerationStatus.LOADING ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Architecting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Generate Proposal
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Suggestions */}
          {status === GenerationStatus.IDLE && (
             <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-slate-500 w-full text-center mb-1">Try these ideas:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInputText(s)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs text-slate-300 transition-colors"
                >
                  {s}
                </button>
              ))}
             </div>
          )}
        </div>

        {/* Status Messages */}
        {status === GenerationStatus.ERROR && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-8 animate-fadeIn">
            <AlertCircle className="w-5 h-5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Results */}
        {projects.length > 0 && (
          <div className="animate-slideUp">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Generated Proposals</h3>
                <span className="text-sm text-slate-400">{projects.length} options found</span>
             </div>
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="text-center py-8 text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Arduino Thesis Architect. Thesis projects generated by AI may require validation.</p>
      </footer>
    </div>
  );
};

export default App;