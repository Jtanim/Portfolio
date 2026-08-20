import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Layers, 
  Briefcase, 
  Award, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  CheckCircle2, 
  Compass, 
  Calculator,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Boxes
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeaderProps {
  onOpenCvModal: () => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCvModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Clash Lab', href: '#bim-explorer' },
    { label: 'Projects', href: '#projects' },
    { label: 'Disciplines', href: '#capabilities' },
    { label: 'Experience', href: '#experience' },
    { label: 'Credentials', href: '#certifications' },
    { label: 'LOD Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 py-3.5 shadow-xl shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <a href="#hero" className="flex items-center gap-3.5 group" id="header-brand-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm shadow-inner group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
              IH
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  Iqbal Hussain
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  KSA Iqama
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Senior MEP BIM Coordinator
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800/70 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-cv-button"
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Resume / CV</span>
            </button>
            <a
              id="header-hire-button"
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Hire in KSA</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="header-cv-btn-mobile-quick"
              onClick={onOpenCvModal}
              className="p-2 text-slate-200 hover:text-white bg-slate-800/80 rounded-xl border border-slate-700"
              title="View CV"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-slate-800/80 border border-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-3 border border-slate-800 bg-slate-900/95 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl space-y-3 animate-fadeIn">
            <div className="px-3 py-2 bg-emerald-950/30 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Riyadh, KSA • Transferable Iqama (Immediate Mobilization)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 border border-slate-700"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                View &amp; Print Full CV
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center gap-2 shadow-md"
              >
                <Mail className="w-4 h-4" />
                Contact &amp; Hiring Inquiry
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
