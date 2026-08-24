import React from 'react';
import { Wind, Zap, Droplets, Flame, Layers, Box, Cpu } from 'lucide-react';

interface SectionDividerProps {
  type: 'hvac' | 'electrical' | 'plumbing' | 'fire' | 'bim';
  label: string;
  tag?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ type, label, tag }) => {
  return (
    <div className="relative py-7 bg-[#07090E] flex items-center justify-center overflow-hidden">
      {/* Background blueprint grid hairline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      </div>

      {/* Center Architectural Node */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D111A]/90 border border-white/[0.09] shadow-xl backdrop-blur-xl group hover:border-cyan-500/40 transition-all">
        {/* Discipline Icon */}
        <div className="w-6 h-6 rounded-lg bg-slate-900 border border-white/[0.08] flex items-center justify-center">
          {type === 'hvac' && (
            <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 14h16v6H4zM4 4h16v6H4zM9 10v4M15 10v4" />
            </svg>
          )}
          {type === 'electrical' && (
            <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16M7 7v10M12 7v10M17 7v10" />
            </svg>
          )}
          {type === 'plumbing' && (
            <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="7" />
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
          {type === 'fire' && (
            <svg className="w-3.5 h-3.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v8M8 10h8M12 10v8M9 22h6" />
              <circle cx="12" cy="14" r="3" />
            </svg>
          )}
          {type === 'bim' && (
            <svg className="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )}
        </div>

        {/* Technical Label & Spec */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-200 font-bold tracking-wider uppercase text-[11px]">{label}</span>
          {tag && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
