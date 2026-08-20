import React, { useState } from 'react';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Languages, 
  Cpu, 
  ExternalLink, 
  Check, 
  BookOpen,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { 
  certifications, 
  educationList, 
  softwareSkills, 
  standardsAndCodes 
} from '../data/portfolioData';

export const CertificationsSkills: React.FC = () => {
  const [certFilter, setCertFilter] = useState<'all' | 'iso' | 'cad' | 'pm'>('all');

  const filteredCerts = certifications.filter((cert) => {
    if (certFilter === 'iso') return cert.category === 'ISO 19650 / BIM Management';
    if (certFilter === 'cad') return cert.category === 'BIM & CAD Technical';
    if (certFilter === 'pm') return cert.category === 'Project Management';
    return true;
  });

  return (
    <section id="certifications" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          CREDS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase mb-4">
              <Award className="w-3.5 h-3.5 text-neutral-400" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              CERTIFICATIONS &amp; STACK.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                EDUCATION &amp; STANDARDS.
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-2xl font-light">
              Accredited ISO 19650 Information Management expertise combined with Mechanical Engineering foundations and Autodesk mastery.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0a0a0a] p-1.5 rounded-xl border border-white/10 text-xs font-mono self-start md:self-auto">
            <button
              onClick={() => setCertFilter('all')}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider ${certFilter === 'all' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
            >
              All (8)
            </button>
            <button
              onClick={() => setCertFilter('iso')}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider ${certFilter === 'iso' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
            >
              ISO 19650
            </button>
            <button
              onClick={() => setCertFilter('cad')}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider ${certFilter === 'cad' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
            >
              Revit/CAD
            </button>
            <button
              onClick={() => setCertFilter('pm')}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider ${certFilter === 'pm' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
            >
              P6 &amp; PM
            </button>
          </div>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 p-6 shadow-lg flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    ACCREDITED
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-neutral-200 transition-colors leading-snug font-serif italic">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 font-mono uppercase tracking-wider">{cert.issuer}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {cert.skills.map((sk, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-light">
                      <span className="text-white text-xs">✓</span>
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-white/10 text-[9px] font-mono uppercase tracking-widest text-neutral-500 flex items-center justify-between">
                <span>{cert.category}</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Columns: Left Software & Standards, Right Education & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Software Proficiency Bars & Standards */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Software Proficiency Stack */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-white" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Software Stack &amp; BIM Capability
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">10+ Years Practice</span>
              </div>

              <div className="space-y-4">
                {softwareSkills.map((sw, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono">{sw.name}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-white/10 uppercase">
                          {sw.lod}
                        </span>
                      </div>
                      <span className="font-mono text-white font-bold">{sw.level}%</span>
                    </div>
                    
                    {/* Progress Track */}
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${sw.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards & Authority Codes Compliance Box */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Regulatory Codes &amp; Drawing Standards
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {standardsAndCodes.map((std, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                    <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      {std.code}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      {std.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Academic Degrees & Language Proficiencies */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Education Box */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-7 shadow-xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <GraduationCap className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Academic Education
                </h3>
              </div>

              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white uppercase tracking-wider">
                        {edu.period}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">{edu.location}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug font-serif italic">
                      {edu.degree}
                    </h4>
                    
                    <p className="text-xs text-neutral-400 font-mono">
                      {edu.institution}
                    </p>

                    <p className="text-[11px] text-neutral-400 pt-2 border-t border-white/10 font-light">
                      <strong className="text-neutral-200">Focus:</strong> {edu.field}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Card */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Languages className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Language Proficiencies
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">English</span>
                    <span className="text-[11px] text-neutral-400 font-light">Professional Working Proficiency</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                    Fluent Technical
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Arabic</span>
                    <span className="text-[11px] text-neutral-400 font-light">Conversational / Working Level</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                    KSA &amp; UAE Site
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Urdu</span>
                    <span className="text-[11px] text-neutral-400 font-light">Native Proficiency</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    Native
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
