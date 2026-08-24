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
    <footer className="bg-[#05070B] border-t border-white/[0.08] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Banner Strip */}
        <div className="pb-12 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider block">Senior MEP BIM Coordinator</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Iqbal Hussain
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Transferable Iqama
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-white/[0.08] font-medium">
              Riyadh, Saudi Arabia
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-white/[0.08]">
          
          {/* Col 1: Identity & Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Profile Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              10+ years engineering precision MEP models, Navisworks clash resolution, and ISO 19650 compliant shop drawings across Saudi Arabia and the UAE.
            </p>
            <div className="text-xs font-mono text-cyan-300">
              Notice: <span className="text-emerald-400 font-semibold">Immediate Mobilization</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Sections
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#hero" className="text-slate-300 hover:text-cyan-300 transition-colors">Overview &amp; Live BIM HUD</a></li>
              <li><a href="#bim-explorer" className="text-slate-300 hover:text-cyan-300 transition-colors">Navisworks Clash Lab</a></li>
              <li><a href="#assembly-stack" className="text-slate-300 hover:text-cyan-300 transition-colors">Federated 3D Stack</a></li>
              <li><a href="#projects" className="text-slate-300 hover:text-cyan-300 transition-colors">Mega-Project Portfolio</a></li>
              <li><a href="#capabilities" className="text-slate-300 hover:text-cyan-300 transition-colors">Core MEP Disciplines</a></li>
              <li><a href="#experience" className="text-slate-300 hover:text-cyan-300 transition-colors">Professional Work History</a></li>
              <li><a href="#certifications" className="text-slate-300 hover:text-cyan-300 transition-colors">Certifications &amp; Software Stack</a></li>
              <li><a href="#estimator" className="text-slate-300 hover:text-cyan-300 transition-colors">LOD &amp; Drawing Estimator</a></li>
            </ul>
          </div>

          {/* Col 3: Key Mega-Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Key Projects
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Amansamar Hotel – Wadi Safar (DGDA)</li>
              <li>• Mohammed Bin Zayed City – Fujairah</li>
              <li>• Aloft 4-Star Hotel – Palm Jumeirah</li>
              <li>• La Palma Residential Compound – Riyadh</li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenCvModal}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full ATS Resume &rarr;</span>
              </button>
            </div>
          </div>

          {/* Col 4: Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-slate-300 hover:text-white block font-mono">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white block font-mono">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
              <a href={`https://${personalInfo.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white block">
                <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>linkedin.com/in/t4nim07</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Iqbal Hussain. Senior MEP BIM Coordinator &amp; Draftsman.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">REVIT • NAVISWORKS • ISO 19650 • AUTOCAD</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
