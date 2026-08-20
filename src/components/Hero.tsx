import React, { useState } from 'react';
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
  ShieldAlert,
  Flame,
  Zap,
  Droplets,
  Wind
} from 'lucide-react';
import { personalInfo, coreMetrics } from '../data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const [activeMepLayer, setActiveMepLayer] = useState<'all' | 'mechanical' | 'electrical' | 'plumbing' | 'fire'>('all');

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050505] border-b border-white/10">
      {/* Gigantic Background Watermark Typography */}
      <div className="absolute -top-12 -left-4 opacity-[0.025] select-none pointer-events-none">
        <h1 className="text-[320px] sm:text-[460px] font-black leading-none tracking-tighter text-white">
          MEP
        </h1>
      </div>

      {/* Decorative Technical Crosshair Motif */}
      <div className="absolute top-16 right-8 opacity-20 pointer-events-none hidden md:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="58" stroke="white" strokeWidth="0.75" strokeDasharray="4 4"/>
          <circle cx="60" cy="60" r="28" stroke="white" strokeWidth="0.5"/>
          <path d="M60 10V110M10 60H110" stroke="white" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Radial atmospheric glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Monumental Headline & Narrative */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Top Micro Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ISO 19650 Certified • Level 1-3</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/10 text-neutral-400 text-[10px] font-mono tracking-[0.2em] uppercase">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Riyadh, KSA • GCC Ready</span>
              </div>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.35em] font-mono text-neutral-400 font-semibold">
                Multidisciplinary BIM &amp; Construction Engineering
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase leading-[0.92]">
                PRECISION MEP.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                  BIM MASTERY.
                </span>
              </h1>
            </div>

            {/* Value Description */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              10+ years coordinating mega-hospitality, high-density residential, and infrastructure assets across Saudi Arabia &amp; UAE. 
              Converting architectural complexity into clash-free <span className="text-white font-medium">LOD 200–400 federated models</span>, 
              delivering <span className="text-white font-medium">550+ approved shop drawings</span>, and reducing site design rework by <span className="text-emerald-400 font-medium font-mono">~20%</span>.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                id="hero-explore-projects-cta"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                id="hero-cv-modal-cta"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-white/15 text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4 text-neutral-300" />
                <span>View Full CV</span>
              </button>

              <a
                href="#bim-explorer"
                id="hero-clash-lab-cta"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-neutral-400 hover:text-white text-[11px] font-mono tracking-wider transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Clash Lab &rarr;</span>
              </a>
            </div>

            {/* Quick Contact & Verification Badges */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-neutral-300">Transferable Iqama (Immediate Mobilization)</span>
              </div>
              <a href="tel:+966558652603" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>{personalInfo.phone}</span>
              </a>
              <a href="mailto:iqbalbimmep@gmail.com" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D/Isometric MEP BIM Model HUD Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 p-5 shadow-2xl">
              
              {/* Header inside HUD */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <span className="text-[10px] font-mono text-neutral-400 ml-2 tracking-wider">FEDERATED_MEP_VIEWER.rvt</span>
                </div>
                <div className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 uppercase tracking-widest">
                  LOD 400 ACTIVE
                </div>
              </div>

              {/* Interactive Discipline Layer Filter Bar */}
              <div className="pt-3 pb-2">
                <div className="text-[9px] uppercase font-mono text-neutral-400 mb-1.5 flex items-center justify-between tracking-widest">
                  <span>DISCIPLINE LAYER:</span>
                  <span className="text-white capitalize font-semibold">{activeMepLayer}</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-[10px] font-mono">
                  <button
                    onClick={() => setActiveMepLayer('all')}
                    className={`py-1 rounded border transition-all ${
                      activeMepLayer === 'all'
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-neutral-900 text-neutral-400 border-white/5 hover:bg-neutral-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('mechanical')}
                    className={`py-1 rounded border transition-all flex items-center justify-center gap-1 ${
                      activeMepLayer === 'mechanical'
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                        : 'bg-neutral-900 text-neutral-400 border-white/5 hover:bg-neutral-800'
                    }`}
                  >
                    <Wind className="w-3 h-3 text-cyan-400" />
                    HVAC
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('electrical')}
                    className={`py-1 rounded border transition-all flex items-center justify-center gap-1 ${
                      activeMepLayer === 'electrical'
                        ? 'bg-amber-950 text-amber-300 border-amber-500'
                        : 'bg-neutral-900 text-neutral-400 border-white/5 hover:bg-neutral-800'
                    }`}
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    ELEC
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('plumbing')}
                    className={`py-1 rounded border transition-all flex items-center justify-center gap-1 ${
                      activeMepLayer === 'plumbing'
                        ? 'bg-teal-950 text-teal-300 border-teal-500'
                        : 'bg-neutral-900 text-neutral-400 border-white/5 hover:bg-neutral-800'
                    }`}
                  >
                    <Droplets className="w-3 h-3 text-teal-400" />
                    PLUMB
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('fire')}
                    className={`py-1 rounded border transition-all flex items-center justify-center gap-1 ${
                      activeMepLayer === 'fire'
                        ? 'bg-rose-950 text-rose-300 border-rose-500'
                        : 'bg-neutral-900 text-neutral-400 border-white/5 hover:bg-neutral-800'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-rose-400" />
                    FIRE
                  </button>
                </div>
              </div>

              {/* Simulated Visual Isometric Blueprint Canvas */}
              <div className="relative h-64 bg-[#050505] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
                {/* CAD Grid Lines */}
                <div className="absolute inset-0 bg-cad-grid opacity-30" />

                {/* SVG Isometric Wireframe Simulation */}
                <svg className="w-full h-full relative z-10" viewBox="0 0 400 240" fill="none">
                  {/* Structural Grid Columns & Slab Slices */}
                  <g stroke="#333333" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
                    <line x1="40" y1="60" x2="360" y2="60" />
                    <line x1="40" y1="180" x2="360" y2="180" />
                    <line x1="80" y1="20" x2="80" y2="220" />
                    <line x1="200" y1="20" x2="200" y2="220" />
                    <line x1="320" y1="20" x2="320" y2="220" />
                  </g>

                  {/* Concrete Beam Profile */}
                  <rect x="50" y="55" width="300" height="18" fill="#141414" stroke="#2a2a2a" strokeWidth="1.5" rx="2" />
                  <text x="56" y="68" fill="#737373" fontSize="8" fontFamily="monospace">STRUCTURE: RC BEAM 600x750</text>

                  {/* MECHANICAL / HVAC DUCTING (Cyan) */}
                  {(activeMepLayer === 'all' || activeMepLayer === 'mechanical') && (
                    <g className="transition-all duration-300">
                      <rect x="70" y="90" width="260" height="34" fill="#083344" fillOpacity="0.8" stroke="#06b6d4" strokeWidth="2" rx="3" />
                      <rect x="140" y="80" width="40" height="10" fill="#0e7490" stroke="#22d3ee" strokeWidth="1.5" />
                      <line x1="160" y1="80" x2="160" y2="40" stroke="#06b6d4" strokeWidth="2" strokeDasharray="2 2" />
                      <rect x="145" y="32" width="30" height="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" rx="1" />
                      <text x="76" y="112" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">HVAC DUCT 650x450 (VAV-02)</text>
                      <line x1="110" y1="90" x2="110" y2="124" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                      <line x1="210" y1="90" x2="210" y2="124" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                      <line x1="280" y1="90" x2="280" y2="124" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                    </g>
                  )}

                  {/* ELECTRICAL CABLE TRAY (Amber) */}
                  {(activeMepLayer === 'all' || activeMepLayer === 'electrical') && (
                    <g className="transition-all duration-300">
                      <rect x="60" y="138" width="280" height="14" fill="#451a03" fillOpacity="0.75" stroke="#f59e0b" strokeWidth="1.8" rx="2" />
                      {[80, 110, 140, 170, 200, 230, 260, 290, 320].map((rx, idx) => (
                        <line key={idx} x1={rx} y1="138" x2={rx} y2="152" stroke="#fbbf24" strokeWidth="1" />
                      ))}
                      <text x="66" y="149" fill="#fde68a" fontSize="8" fontWeight="bold" fontFamily="monospace">LV CABLE TRAY 300mm</text>
                    </g>
                  )}

                  {/* PLUMBING CHILLED WATER & DRAINAGE (Teal/Blue) */}
                  {(activeMepLayer === 'all' || activeMepLayer === 'plumbing') && (
                    <g className="transition-all duration-300">
                      <line x1="45" y1="165" x2="355" y2="165" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
                      <line x1="45" y1="176" x2="355" y2="176" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" />
                      <polygon points="190,162 200,165 190,168" fill="#5eead4" />
                      <polygon points="210,162 200,165 210,168" fill="#5eead4" />
                      <text x="215" y="167" fill="#5eead4" fontSize="7" fontFamily="monospace">CHW-S DN100</text>
                    </g>
                  )}

                  {/* FIRE FIGHTING SPRINKLERS (Crimson/Rose) */}
                  {(activeMepLayer === 'all' || activeMepLayer === 'fire') && (
                    <g className="transition-all duration-300">
                      <line x1="50" y1="78" x2="350" y2="78" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                      {[100, 180, 265, 330].map((sx, idx) => (
                        <g key={idx}>
                          <line x1={sx} y1="78" x2={sx} y2="88" stroke="#fb7185" strokeWidth="2" />
                          <circle cx={sx} cy="90" r="3" fill="#e11d48" stroke="#ffe4e6" strokeWidth="1" />
                        </g>
                      ))}
                      <text x="270" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" fontFamily="monospace">FIRE SPRINKLER DN50</text>
                    </g>
                  )}

                  {/* Status Overlay Tag */}
                  <g>
                    <rect x="230" y="198" width="155" height="28" fill="#050505" stroke="white" strokeOpacity="0.2" strokeWidth="1" rx="4" />
                    <circle cx="242" cy="212" r="3.5" fill="#10b981" />
                    <text x="252" y="215" fill="#f8fafc" fontSize="9" fontFamily="monospace" fontWeight="600">
                      ZERO CLASHES • 100% PASS
                    </text>
                  </g>
                </svg>

                {/* Spatial Grid Legend Indicator */}
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-neutral-400">
                  REF: AMANSAMAR-Z1-L2-COORD
                </div>
              </div>

              {/* HUD Footer Information */}
              <div className="pt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ISO 19650 Naming Compliant
                </span>
                <span className="text-neutral-500">Revit 2025 • Navisworks</span>
              </div>
            </div>
          </div>

        </div>

        {/* Core Metrics Banner Strip with Monumental Numerals */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {coreMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/25 transition-all group"
              >
                <div className="text-3xl sm:text-5xl font-black text-white font-mono group-hover:scale-105 transition-transform duration-300 inline-block tracking-tighter">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-widest font-mono text-neutral-300 mt-2">
                  {metric.label}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 font-light">
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
