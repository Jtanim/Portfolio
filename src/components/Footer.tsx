import React from 'react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  ArrowUp, 
  ShieldCheck, 
  Cpu, 
  FileText 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onOpenCvModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCvModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Bold Logo / Name Headline */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-2">MEP BIM COORDINATOR</span>
            <h2 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              IQBAL HUSSAIN.
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Transferable Iqama
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 font-bold">
              Riyadh, KSA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/10">
          
          {/* Col 1: Identity & Status */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-white font-bold tracking-[0.25em]">
              Executive Profile
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              10+ years engineering precision MEP models, Navisworks clash resolution, and ISO 19650 compliant shop drawings across Saudi Arabia and the UAE.
            </p>
            <div className="text-[11px] font-mono text-neutral-400">
              Notice: <span className="text-white font-bold">Immediate Mobilization</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono uppercase text-white font-bold tracking-[0.25em]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              <li><a href="#hero" className="hover:text-white transition-colors">01. Overview</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">02. Selected Projects</a></li>
              <li><a href="#bim-explorer" className="hover:text-white transition-colors">03. Clash Simulation Lab</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">04. Core Disciplines</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">05. Career Timeline</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">06. Certifications &amp; Stack</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">07. LOD Estimator</a></li>
            </ul>
          </div>

          {/* Col 3: Key Mega-Projects */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono uppercase text-white font-bold tracking-[0.25em]">
              Featured Portfolios
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>Amansamar Hotel – Wadi Safar, Diriyah (DGDA)</li>
              <li>Mohammed Bin Zayed City – Fujairah, UAE</li>
              <li>Aloft 4-Star Hotel – Palm Jumeirah, Dubai</li>
              <li>La Palma Compound – Riyadh, KSA</li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenCvModal}
                className="text-xs text-white hover:text-neutral-300 flex items-center gap-1 font-mono uppercase tracking-wider font-bold"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Full ATS Resume &rarr;</span>
              </button>
            </div>
          </div>

          {/* Col 4: Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono uppercase text-white font-bold tracking-[0.25em]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-neutral-300 hover:text-white block">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.phone}</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-neutral-300 hover:text-white block">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.email}</span>
              </a>
              <a href="https://linkedin.com/in/t4nim07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-300 hover:text-white block">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/t4nim07</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} IQBAL HUSSAIN. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span>REVIT • NAVISWORKS • ISO 19650 • AUTOCAD</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
