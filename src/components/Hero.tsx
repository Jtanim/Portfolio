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
  ShieldCheck,
  Flame,
  Zap,
  Droplets,
  Wind,
  CheckCircle2,
  Box,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { personalInfo, coreMetrics } from '../data/portfolioData';
import { HeroThreeScene } from './HeroThreeScene';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const [activeMepLayer, setActiveMepLayer] = useState<'all' | 'mechanical' | 'electrical' | 'plumbing' | 'fire'>('all');

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#090B10] border-b border-slate-800/80">
      
      {/* Subtle Background Glows & Ambient Lighting */}
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[380px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Executive Title, Narrative & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Transferable Iqama • Immediate Mobilization</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>

            {/* Main Headline & Identity */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-cyan-400 font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MEP BIM Coordinator &amp; Senior Draftsman</span>
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Coordinating MEP Systems Across{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  350+ Projects.
                </span>
              </h1>
            </div>

            {/* Concise Value Narrative */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              10+ years engineering clash-free MEP federated models across high-profile Saudi giga-projects (DGDA Wadi Safar, Amansamar Hotel), and UAE residential towers. Expert in <span className="text-white font-semibold">Revit MEP (LOD 200–400)</span>, <span className="text-white font-semibold">Navisworks Manage</span> clash detection, ISO 19650 CDE standards, and delivering <span className="text-white font-semibold">550+ approved shop drawings</span> that reduce site rework by ~20%.
            </p>

            {/* Quick Capability Tags */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
              {['Revit MEP (LOD 400)', 'Navisworks Manage', 'BIM 360 / ACC', 'ISO 19650', 'SBC & Civil Defense', 'AutoCAD MEP'].map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800/70 text-slate-300 border border-slate-700/80">
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                id="hero-explore-projects-cta"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <span>View Mega-Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                id="hero-cv-modal-cta"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>ATS Resume (PDF)</span>
              </button>

              <a
                href="#bim-explorer"
                id="hero-clash-lab-cta"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700 text-xs font-medium transition-all"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Clash Lab &rarr;</span>
              </a>
            </div>

            {/* Contact Quick Links */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-5 text-xs text-slate-400 font-mono">
              <a href={`tel:${personalInfo.phone}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalInfo.phone}</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalInfo.email}</span>
              </a>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Ready in Riyadh
              </span>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Axonometric Model Viewport */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-4 sm:p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              
              {/* Header inside HUD */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-300 ml-2 font-medium">AMANSAMAR_LOD400.rvt</span>
                </div>
                <div className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider font-semibold">
                  Three.js 3D Viewport
                </div>
              </div>

              {/* Layer Toggles */}
              <div className="pt-3 pb-2.5">
                <div className="text-[10px] uppercase font-mono text-slate-400 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                    DISCIPLINE ISOLATION:
                  </span>
                  <span className="text-cyan-300 font-bold uppercase">{activeMepLayer}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
                  <button
                    onClick={() => setActiveMepLayer('all')}
                    className={`py-1.5 rounded-lg border transition-all text-center font-medium cursor-pointer ${
                      activeMepLayer === 'all'
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm shadow-cyan-500/40'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('mechanical')}
                    className={`py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1 font-medium cursor-pointer ${
                      activeMepLayer === 'mechanical'
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-500/30'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Wind className="w-3 h-3 text-cyan-400" />
                    HVAC
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('electrical')}
                    className={`py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1 font-medium cursor-pointer ${
                      activeMepLayer === 'electrical'
                        ? 'bg-amber-950 text-amber-300 border-amber-400 shadow-sm shadow-amber-500/30'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    ELEC
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('plumbing')}
                    className={`py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1 font-medium cursor-pointer ${
                      activeMepLayer === 'plumbing'
                        ? 'bg-teal-950 text-teal-300 border-teal-400 shadow-sm shadow-teal-500/30'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Droplets className="w-3 h-3 text-teal-400" />
                    PLUMB
                  </button>
                  <button
                    onClick={() => setActiveMepLayer('fire')}
                    className={`py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1 font-medium cursor-pointer ${
                      activeMepLayer === 'fire'
                        ? 'bg-rose-950 text-rose-300 border-rose-400 shadow-sm shadow-rose-500/30'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-rose-400" />
                    FIRE
                  </button>
                </div>
              </div>

              {/* Three.js Interactive 3D Model Component */}
              <div className="relative bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden">
                <HeroThreeScene
                  activeLayer={activeMepLayer}
                  onLayerChange={(layer) => setActiveMepLayer(layer)}
                />
              </div>

              {/* HUD Footer Status */}
              <div className="pt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ISO 19650 Naming &amp; CDE Compliant
                </span>
                <span className="text-cyan-400 font-medium">Three.js WebGL • 60 FPS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Core Metrics Banner Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {coreMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg shadow-black/20"
              >
                <div className="text-3xl sm:text-4xl font-black text-white font-mono group-hover:text-cyan-300 transition-colors tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1.5 uppercase tracking-wider">
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
