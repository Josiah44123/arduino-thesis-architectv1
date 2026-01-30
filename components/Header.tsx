import React from 'react';
import { Cpu, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-arduino-teal p-2 rounded-lg shadow-lg shadow-arduino-teal/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Arduino Thesis Architect</h1>
            <p className="text-xs text-slate-400">Powered by Google Gemini</p>
          </div>
        </div>
        <a href="https://docs.arduino.cc/" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-arduino-teal transition-colors">
          <BookOpen className="w-4 h-4" />
          <span>Documentation</span>
        </a>
      </div>
    </header>
  );
};