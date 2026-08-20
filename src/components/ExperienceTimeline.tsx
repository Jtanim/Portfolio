import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  Building2, 
  Layers, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 left-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          CAREER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase mb-4">
              <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
              <span>10+ Years Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              CAREER TIMELINE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                LEADERSHIP HISTORY.
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-2xl font-light">
              Progressive leadership in MEP drafting, 3D BIM modeling, and multidisciplinary coordination across premier engineering consultancies in Riyadh &amp; Dubai.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-4 py-2.5 rounded-xl border border-emerald-800/40 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active in Riyadh (Transferable Iqama)</span>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-[1px] before:bg-white/10 before:z-0">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="relative z-10 pl-10 sm:pl-16 group"
            >
              {/* Timeline Node Point */}
              <div className={`absolute left-2 sm:left-6 -translate-x-1/2 top-7 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                exp.isCurrent
                  ? 'bg-white border-white ring-4 ring-white/20'
                  : 'bg-neutral-900 border-neutral-700 group-hover:border-white'
              }`}>
                {exp.isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </div>

              {/* Experience Card */}
              <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 p-7 sm:p-8 shadow-xl transition-all">
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-serif italic text-lg text-neutral-500">0{idx + 1}.</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif italic">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/40 uppercase tracking-widest">
                          Active Role
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-neutral-300">
                      <span className="font-semibold text-white flex items-center gap-1 font-mono uppercase tracking-wider text-[11px]">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        {exp.company}
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span className="flex items-center gap-1 text-neutral-400 font-mono text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300 self-start md:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-4 font-light">
                  {exp.summary}
                </p>

                {/* Bullet Highlights */}
                <div className="mt-5 space-y-2.5">
                  <h4 className="text-[10px] uppercase font-mono text-neutral-500 font-bold tracking-widest">
                    Key Deliverables &amp; Impact:
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {exp.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed font-light">
                        <span className="text-white font-bold shrink-0 mt-0.5">›</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software Used in this role */}
                <div className="pt-5 mt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[9px] font-mono text-neutral-500 mr-1 tracking-widest">STACK:</span>
                    {exp.software.map((sw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-white border border-white/10"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {exp.disciplines.map((disc, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 text-neutral-400 border border-white/5"
                      >
                        {disc}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
