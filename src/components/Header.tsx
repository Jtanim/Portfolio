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
  ShieldCheck
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
    { label: 'Projects', href: '#projects' },
    { label: 'Clash Lab', href: '#bim-explorer' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Timeline', href: '#experience' },
    { label: 'Credentials', href: '#certifications' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity / Bold Typography */}
          <a href="#hero" className="flex items-center gap-3.5 group" id="header-brand-logo">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/20 flex items-center justify-center text-white font-mono font-bold text-base shadow-sm group-hover:border-white transition-colors">
              IH
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                  IQBAL.
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                  KSA Iqama
                </span>
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
                MEP BIM Direction
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Bold High-Tracking Minimalist) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] tracking-[0.25em] uppercase font-mono text-neutral-400 hover:text-white transition-opacity"
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
              className="inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-mono font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/10 hover:border-white/30 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>Resume</span>
            </button>
            <a
              id="header-hire-button"
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-mono font-bold rounded-lg bg-white hover:bg-neutral-200 text-black transition-all shadow-md active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire in KSA</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="header-cv-btn-mobile-quick"
              onClick={onOpenCvModal}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 rounded-lg border border-white/10"
              title="View CV"
            >
              <FileText className="w-4 h-4 text-white" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-3 border-t border-white/10 bg-[#0a0a0a]/98 backdrop-blur-xl rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg flex items-center gap-2 text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Riyadh, KSA • Transferable Iqama Available</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full py-2.5 px-4 text-xs uppercase tracking-widest font-mono font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center gap-2 border border-white/15"
              >
                <FileText className="w-4 h-4 text-neutral-300" />
                View &amp; Print Full CV
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-xs uppercase tracking-widest font-mono font-bold rounded-lg bg-white text-black flex items-center justify-center gap-2 shadow-md"
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
