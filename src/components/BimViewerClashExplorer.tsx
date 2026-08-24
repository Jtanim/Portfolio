import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Sliders, 
  Check, 
  Info,
  Sparkles,
  Zap,
  Wind,
  Droplets,
  Flame,
  Building,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { clashDemoCases, lodDefinitions } from '../data/portfolioData';
import { ClashDetectorThreeScene } from './ClashDetectorThreeScene';
import confetti from 'canvas-confetti';

export const BimViewerClashExplorer: React.FC = () => {
  const [selectedClashIndex, setSelectedClashIndex] = useState<number>(0);
  const [isResolvedView, setIsResolvedView] = useState<boolean>(true);
  const [activeLodTab, setActiveLodTab] = useState<'LOD 200' | 'LOD 300' | 'LOD 400'>('LOD 400');
  const [activeCdeStage, setActiveCdeStage] = useState<'WIP' | 'SHARED' | 'PUBLISHED' | 'ARCHIVED'>('SHARED');

  const currentClash = clashDemoCases[selectedClashIndex];

  const handleResolveAction = () => {
    setIsResolvedView(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#10b981', '#3b82f6']
    });
  };

  const selectedLod = lodDefinitions.find((l) => l.level === activeLodTab) || lodDefinitions[2];

  return (
    <section id="bim-explorer" className="py-20 bg-[#07090E] border-b border-white/[0.08] relative">
      
      {/* Background Subtle CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[320px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[320px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with High Typographic Contrast */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive 3D BIM Clash Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Navisworks Clash Resolution Lab
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              Inspect and resolve spatial collisions in 3D prior to shop drawing release: primary supply ducts vs. chilled water headers, wet/dry shaft containment, and ceiling sprinkler lines.
            </p>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-[#0D111A] px-3.5 py-2 rounded-xl border border-white/[0.08]">
            <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg font-semibold border border-cyan-500/30">
              Three.js 3D Lab
            </span>
            <span className="text-slate-400">
              Tolerance: 0.0mm Hard Collision
            </span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive 3D Clash Detective Viewport */}
          <div className="lg:col-span-7 space-y-6">
            <div className="arch-panel p-5 sm:p-6 shadow-xl">
              
              {/* Top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      3D Clash Detective Spatial Inspector
                    </h3>
                    <p className="text-xs text-slate-400">Interactive 3D mesh • Test real-time rerouting</p>
                  </div>
                </div>

                {/* State Indicator */}
                <div className={`px-3 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 ${
                  isResolvedView
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950/80 text-rose-300 border border-rose-500/40 animate-pulse'
                }`}>
                  {isResolvedView ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COORDINATION APPROVED</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>HARD CLASH ACTIVE</span>
                    </>
                  )}
                </div>
              </div>

              {/* Clash Case Tabs */}
              <div className="py-4">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                  Select Clash Scenario:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {clashDemoCases.map((clash, idx) => (
                    <button
                      key={clash.id}
                      onClick={() => {
                        setSelectedClashIndex(idx);
                        setIsResolvedView(false);
                      }}
                      className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                        selectedClashIndex === idx
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-900/80 border-white/[0.08] text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase text-cyan-400 font-semibold">
                        Case #0{idx + 1}
                      </div>
                      <div className="text-xs font-medium line-clamp-1 mt-0.5 text-slate-200">
                        {clash.disciplines}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive 3D Three.js Clash Canvas */}
              <div className="relative bg-[#05070B] rounded-xl border border-white/[0.08] overflow-hidden">
                <ClashDetectorThreeScene
                  selectedCaseIndex={selectedClashIndex}
                  isResolved={isResolvedView}
                  onToggleResolved={(resolved) => setIsResolvedView(resolved)}
                />
              </div>

              {/* Clash Technical Details Card */}
              <div className="mt-4 p-4 rounded-xl bg-[#090D15] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {currentClash.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-white/[0.08]">
                    {currentClash.software}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  <strong className="text-rose-400 font-semibold">Conflict:</strong> {currentClash.problem}
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-white/[0.08]">
                  <strong className="text-emerald-400 font-semibold">BIM Solution:</strong> {currentClash.solution}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: LOD 200–400 Inspector & ISO 19650 CDE Flow */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* LOD Selector & Details */}
            <div className="arch-panel p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">
                    Level of Development (LOD)
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">AIA &amp; BIMForum</span>
              </div>

              {/* LOD Switcher Pills */}
              <div className="grid grid-cols-3 gap-2">
                {(['LOD 200', 'LOD 300', 'LOD 400'] as const).map((lod) => (
                  <button
                    key={lod}
                    onClick={() => setActiveLodTab(lod)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeLodTab === lod
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-white/[0.08]'
                    }`}
                  >
                    {lod}
                  </button>
                ))}
              </div>

              {/* LOD Detail Box */}
              <div className="p-4 rounded-xl bg-[#090D15] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{selectedLod.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-white/[0.08]">
                    {selectedLod.accuracy}
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {selectedLod.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">MEP Elements Included:</div>
                  {selectedLod.mepElements.map((el, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs text-slate-400">
                  <strong className="text-slate-200">Contractor Outcome:</strong> {selectedLod.useCase}
                </div>
              </div>
            </div>

            {/* ISO 19650 CDE Information Container Governance */}
            <div className="arch-panel p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    ISO 19650 CDE Workflow
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                  Level 3 Certified
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono font-semibold">
                {(['WIP', 'SHARED', 'PUBLISHED', 'ARCHIVED'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setActiveCdeStage(stage)}
                    className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                      activeCdeStage === stage
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm shadow-cyan-500/30'
                        : 'bg-slate-900/90 text-slate-400 border-white/[0.08] hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-[#090D15] border border-white/[0.08] text-xs text-slate-300 space-y-1">
                {activeCdeStage === 'WIP' && (
                  <p>
                    <strong className="text-cyan-400">Work In Progress:</strong> Task team modeling within Revit &amp; AutoCAD. Unverified internal drafting container before interdisciplinary check.
                  </p>
                )}
                {activeCdeStage === 'SHARED' && (
                  <p>
                    <strong className="text-emerald-400">Shared Container (Active Stage):</strong> Coordinated MEP models federated in Navisworks Manage for interdisciplinary clash detection with Architecture &amp; Structure.
                  </p>
                )}
                {activeCdeStage === 'PUBLISHED' && (
                  <p>
                    <strong className="text-cyan-300">Published Container:</strong> Approved MEP shop drawings and submittals issued for construction (IFC) and authority approval (SBC/SEC/Civil Defense).
                  </p>
                )}
                {activeCdeStage === 'ARCHIVED' && (
                  <p>
                    <strong className="text-amber-400">Archived Container:</strong> Final As-Built BIM models, Asset Information Models (AIM), and project handover registers.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
