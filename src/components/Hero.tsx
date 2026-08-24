import React from 'react';
import { 
  Building2, 
  Layers, 
  FileCheck2, 
  Cpu, 
  MapPin, 
  Download, 
  ExternalLink, 
  ArrowRight, 
  Activity, 
  CheckCircle, 
  Phone, 
  Mail, 
  Sparkles, 
  Eye, 
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { personalInfo, coreMetrics } from '../data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#07090E] border-b border-white/[0.08] bg-blueprint-radial">
      
      {/* Background Architectural Grid & Subtle Laser Rules */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto text-center space-y-7">
          
          {/* Status Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-semibold">TRANSFERABLE IQAMA • RIYADH</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] text-slate-300 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Saudi Arabia &amp; UAE</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>ISO 19650 Level 3 Certified</span>
            </div>
          </div>

          {/* Headline with High Typographic Contrast */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-cyan-400 font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Senior MEP BIM Coordinator &amp; Modeling Specialist</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
                Clash-Free MEP Models
              </span>{' '}
              for Giga-Projects.
            </h1>
          </div>

          {/* Concise Value Narrative */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            10+ years coordinating complex multi-trade MEP systems across high-profile Saudi Arabian mega-developments (DGDA Wadi Safar, Amansamar Resort) and UAE residential high-rises. Specialist in <span className="text-white font-semibold">Revit MEP (LOD 200–400)</span>, zero-tolerance <span className="text-white font-semibold">Navisworks Manage</span> clash detection, ISO 19650 CDE workflows, and <span className="text-white font-semibold">550+ approved contractor shop drawings</span>.
          </p>

          {/* Capability Spec Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-mono max-w-3xl mx-auto">
            {[
              'Revit MEP (LOD 400)',
              'Navisworks Manage',
              'BIM 360 / ACC',
              'ISO 19650 CDE',
              'SBC / SEC Code Compliance',
              '550+ Approved Sheets'
            ].map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-white/[0.08] shadow-sm hover:border-cyan-500/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* High-Contrast CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a
              href="#projects"
              id="hero-explore-projects-cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
            >
              <span>Explore Mega-Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCvModal}
              id="hero-cv-modal-cta"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>ATS Resume (PDF)</span>
            </button>

            <a
              href="#bim-explorer"
              id="hero-clash-lab-cta"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/[0.08] hover:border-slate-700 text-xs font-medium transition-all"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>3D Clash Lab &rarr;</span>
            </a>

            <a
              href="#contact"
              id="hero-contact-cta"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Directly</span>
            </a>
          </div>

          {/* Direct Contact Links */}
          <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <a href={`tel:${personalInfo.phone}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{personalInfo.phone}</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{personalInfo.email}</span>
            </a>
            <a href={`https://${personalInfo.linkedIn}`} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn Profile</span>
            </a>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Notice Period: Immediate
            </span>
          </div>

        </div>

        {/* Executive Core Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {coreMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="arch-card p-5 sm:p-6 text-center group"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-display group-hover:text-cyan-300 transition-colors tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1.5 uppercase tracking-wider font-mono">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

