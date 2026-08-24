import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Building2, 
  Layers, 
  CheckCircle2
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#07090E] border-b border-white/[0.08] relative">
      
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>10+ Years Career Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Professional Work History
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              Progressive career delivering 3D BIM modeling, clash coordination, and MEP shop drawing packages across leading consultancies in Saudi Arabia and the UAE.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-800/40 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active in Riyadh (Transferable Iqama)</span>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-[2px] before:bg-white/[0.08] before:z-0">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative z-10 pl-10 sm:pl-16 group"
            >
              {/* Timeline Node Point */}
              <div className={`absolute left-2 sm:left-6 -translate-x-1/2 top-7 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                exp.isCurrent
                  ? 'bg-cyan-500 border-cyan-300 ring-4 ring-cyan-500/20 shadow-md shadow-cyan-500/50'
                  : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400'
              }`}>
                {exp.isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
              </div>

              {/* Experience Card */}
              <div className="arch-card p-6 sm:p-7 group">
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-display">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Active Role
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.company}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D15] border border-white/[0.08] text-xs font-mono text-slate-300 self-start md:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3.5 font-normal">
                  {exp.summary}
                </p>

                {/* Bullet Highlights */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-[11px] uppercase font-mono text-slate-400 font-semibold tracking-wider">
                    Key Deliverables &amp; Achievements:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {exp.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software Used in this role */}
                <div className="pt-4 mt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-400 mr-1 font-semibold">STACK:</span>
                    {exp.software.map((sw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#090D15] text-slate-300 border border-white/[0.08]"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {exp.disciplines.map((disc, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
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
