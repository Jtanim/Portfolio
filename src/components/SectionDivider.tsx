import React from 'react';
import { Wind, Zap, Droplets, Flame, Layers, Box, Cpu } from 'lucide-react';

interface SectionDividerProps {
  type: 'hvac' | 'electrical' | 'plumbing' | 'fire' | 'bim';
  label: string;
  tag?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ type, label, tag }) => {
  return (
    <div className="relative py-8 bg-[#090B10] flex items-center justify-center overflow-hidden">
      {/* Background blueprint grid line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      </div>

      {/* Center 3D Isometric Engineering Node */}
      <div className="relative z-10 flex items-center gap-3 px-5 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl group hover:border-cyan-500/50 transition-all">
        {/* Left Mini Isometric Icon */}
        <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cad-grid opacity-30" />
          {type === 'hvac' && (
            <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 14h16v6H4zM4 4h16v6H4zM9 10v4M15 10v4" />
            </svg>
          )}
          {type === 'electrical' && (
            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16M7 7v10M12 7v10M17 7v10" />
            </svg>
          )}
          {type === 'plumbing' && (
            <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="7" />
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
          {type === 'fire' && (
            <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v8M8 10h8M12 10v8M9 22h6" />
              <circle cx="12" cy="14" r="3" />
            </svg>
          )}
          {type === 'bim' && (
            <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )}
        </div>

        {/* Technical Label & ISO Spec */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-200 font-bold tracking-wider uppercase">{label}</span>
          {tag && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
