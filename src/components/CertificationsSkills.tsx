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
  FileCheck,
  CheckCircle
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
    <section id="certifications" className="py-20 bg-[#07090E] border-b border-white/[0.08] relative">
      
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Credentials &amp; Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Certifications &amp; Technical Stack
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              Accredited ISO 19650 Information Management expertise combined with Mechanical Engineering foundations and Autodesk mastery.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0D111A] p-1.5 rounded-xl border border-white/[0.08] text-xs font-mono self-start md:self-auto">
            <button
              onClick={() => setCertFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${certFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All ({certifications.length})
            </button>
            <button
              onClick={() => setCertFilter('iso')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${certFilter === 'iso' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              ISO 19650
            </button>
            <button
              onClick={() => setCertFilter('cad')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${certFilter === 'cad' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Revit/CAD
            </button>
            <button
              onClick={() => setCertFilter('pm')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${certFilter === 'pm' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              P6 &amp; PM
            </button>
          </div>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="arch-card p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug font-display">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{cert.issuer}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                  {cert.skills.map((sk, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-white/[0.08] text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
                <span>{cert.category}</span>
                <span className="text-cyan-300 font-semibold">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Columns: Software & Standards, Education & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Software Proficiency Bars & Standards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Software Proficiency Stack */}
            <div className="arch-panel p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    Core Software Mastery
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">10+ Years Daily Execution</span>
              </div>

              <div className="space-y-3.5">
                {softwareSkills.map((sw, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{sw.name}</span>
                      <span className="font-mono text-cyan-300 font-bold">{sw.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                        style={{ width: `${sw.level}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{sw.category}</span>
                      <span>{sw.lod}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards & Regional Codes */}
            <div className="arch-panel p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    Codes, Standards &amp; Authorities
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-300 font-semibold">SBC &amp; NFPA Compliant</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {standardsAndCodes.map((code, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#090D15] border border-white/[0.08] space-y-1">
                    <div className="text-xs font-bold text-white font-mono">{code.code}</div>
                    <div className="text-[11px] text-slate-400 leading-snug">{code.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Education & Languages */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Academic Degrees */}
            <div className="arch-panel p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    Academic Background
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Higher Education</span>
              </div>

              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#090D15] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-display">{edu.degree}</h4>
                      <span className="text-xs font-mono text-slate-400">{edu.period}</span>
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">{edu.institution} • {edu.location}</div>
                    <p className="text-xs text-slate-400 font-normal leading-relaxed">{edu.field}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Fluency */}
            <div className="arch-panel p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    Languages
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Multilingual</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#090D15] border border-white/[0.08] text-center">
                  <div className="text-xs font-bold text-white font-display">English</div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-0.5">Professional Working</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090D15] border border-white/[0.08] text-center">
                  <div className="text-xs font-bold text-white font-display">Arabic</div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-0.5">Working Technical</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090D15] border border-white/[0.08] text-center">
                  <div className="text-xs font-bold text-white font-display">Urdu / Hindi</div>
                  <div className="text-[10px] font-mono text-amber-400 mt-0.5">Native / Fluent</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
