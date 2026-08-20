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
  Building
} from 'lucide-react';
import { clashDemoCases, lodDefinitions } from '../data/portfolioData';
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
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#10b981', '#06b6d4']
    });
  };

  const selectedLod = lodDefinitions.find((l) => l.level === activeLodTab) || lodDefinitions[2];

  return (
    <section id="bim-explorer" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          CLASH
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase mb-4">
              <Cpu className="w-3.5 h-3.5 text-neutral-400" />
              <span>Interactive BIM Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              NAVISWORKS CLASH LAB.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                LOD 200–400 RESOLUTION.
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-2xl font-light">
              Experience the multidisciplinary coordination workflow used to resolve spatial collisions across KSA mega-developments before physical site construction.
            </p>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400 bg-[#0a0a0a] p-2 rounded-xl border border-white/10 self-start md:self-auto">
            <span className="px-3 py-1 bg-white/10 text-white rounded-lg border border-white/20 font-bold">
              ISO 19650
            </span>
            <span className="px-2 py-1 text-neutral-400">
              Navisworks + Revit
            </span>
          </div>
        </div>

        {/* Feature Grid: Left Side Clash Simulator, Right Side LOD & CDE Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Navisworks Clash Detective Simulator */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              
              {/* Top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/15 flex items-center justify-center text-white">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Navisworks Clash Detective Matrix
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-light">Live Spatial Intersection Analyzer</p>
                  </div>
                </div>

                {/* State Indicator */}
                <div className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                  isResolvedView
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-950/80 text-rose-300 border border-rose-500/30 animate-pulse'
                }`}>
                  {isResolvedView ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COORDINATION APPROVED</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>HARD CLASH DETECTED</span>
                    </>
                  )}
                </div>
              </div>

              {/* Clash Case Tabs */}
              <div className="py-4">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2.5">
                  Select Project Clash Scenario:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {clashDemoCases.map((clash, idx) => (
                    <button
                      key={clash.id}
                      onClick={() => {
                        setSelectedClashIndex(idx);
                        setIsResolvedView(false);
                      }}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        selectedClashIndex === idx
                          ? 'bg-white text-black border-white shadow-lg'
                          : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <div className={`font-mono text-[9px] uppercase tracking-widest ${selectedClashIndex === idx ? 'text-neutral-600' : 'text-neutral-500'}`}>
                        CASE #0{idx + 1}
                      </div>
                      <div className={`text-xs font-semibold line-clamp-1 mt-0.5 ${selectedClashIndex === idx ? 'text-black' : 'text-white'}`}>
                        {clash.disciplines}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Spatial Diagram / Canvas Visualizer */}
              <div className="relative h-60 bg-[#050505] rounded-xl border border-white/10 overflow-hidden p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-cad-dots opacity-20" />
                
                {/* SVG Visual Demonstration */}
                <svg className="w-full h-44 relative z-10" viewBox="0 0 420 180" fill="none">
                  {/* Grid Lines */}
                  <line x1="20" y1="90" x2="400" y2="90" stroke="#262626" strokeDasharray="3 3" />
                  <line x1="210" y1="10" x2="210" y2="170" stroke="#262626" strokeDasharray="3 3" />

                  {/* Case 1: Duct vs Concrete Beam */}
                  {selectedClashIndex === 0 && (
                    <g>
                      <rect x="180" y="20" width="60" height="140" fill="#141414" stroke="#333333" strokeWidth="2" rx="2" />
                      <text x="185" y="40" fill="#737373" fontSize="8" fontFamily="monospace" transform="rotate(90, 185, 40)">
                        STRUCTURAL BEAM 600x900
                      </text>

                      {!isResolvedView ? (
                        <g>
                          <rect x="40" y="70" width="340" height="40" fill="#083344" stroke="#06b6d4" strokeWidth="2" rx="2" />
                          <rect x="180" y="70" width="60" height="40" fill="#e11d48" fillOpacity="0.8" stroke="#fda4af" strokeWidth="2" className="animate-pulse" />
                          <circle cx="210" cy="90" r="14" fill="none" stroke="#ffe4e6" strokeWidth="2" strokeDasharray="3 3" className="animate-spin" />
                          <text x="70" y="95" fill="#e0f2fe" fontSize="10" fontWeight="bold" fontFamily="monospace">
                            MAIN DUCT 600x400 (INTERSECTING BEAM)
                          </text>
                        </g>
                      ) : (
                        <g>
                          <path d="M 40 70 L 140 70 L 170 30 L 250 30 L 280 70 L 380 70 L 380 90 L 285 90 L 255 50 L 165 50 L 135 90 L 40 90 Z" fill="#083344" stroke="#10b981" strokeWidth="2" />
                          <path d="M 40 100 L 140 100 L 170 140 L 250 140 L 280 100 L 380 100 L 380 120 L 285 120 L 255 160 L 165 160 L 135 120 L 40 120 Z" fill="#083344" stroke="#10b981" strokeWidth="2" />
                          <text x="60" y="83" fill="#6ee7b7" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            SPLIT RUN A (450x200)
                          </text>
                          <text x="60" y="113" fill="#6ee7b7" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            SPLIT RUN B (450x200)
                          </text>
                          <circle cx="210" cy="90" r="6" fill="#10b981" />
                          <text x="290" y="145" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">
                            CLEARED (0mm Hard Clash)
                          </text>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Case 2: Plumbing Stack vs High-Voltage Tray */}
                  {selectedClashIndex === 1 && (
                    <g>
                      <rect x="50" y="65" width="320" height="24" fill="#451a03" stroke="#f59e0b" strokeWidth="2" rx="2" />
                      <text x="60" y="80" fill="#fde68a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        LV MAIN CABLE TRAY (400mm)
                      </text>

                      {!isResolvedView ? (
                        <g>
                          <line x1="210" y1="10" x2="210" y2="170" stroke="#0d9488" strokeWidth="12" strokeLinecap="round" />
                          <rect x="195" y="60" width="30" height="34" fill="#e11d48" fillOpacity="0.8" stroke="#f43f5e" strokeWidth="2" className="animate-pulse" />
                          <text x="230" y="55" fill="#fda4af" fontSize="9" fontWeight="bold" fontFamily="monospace">
                            PROHIBITED WET/DRY OVERLAP
                          </text>
                        </g>
                      ) : (
                        <g>
                          <path d="M 120 10 L 120 40 L 30 40 L 30 140 L 120 140 L 120 170" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                          <text x="135" y="30" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            REROUTED TO WET SHAFT RISER (380mm OFFSET)
                          </text>
                          <rect x="25" y="35" width="105" height="110" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* Case 3: Fire Sprinkler vs Architectural Troffer */}
                  {selectedClashIndex === 2 && (
                    <g>
                      <rect x="130" y="40" width="160" height="40" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" rx="3" />
                      <text x="145" y="62" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                        ARCHITECTURAL LIGHTING COVE
                      </text>

                      {!isResolvedView ? (
                        <g>
                          <line x1="50" y1="60" x2="370" y2="60" stroke="#f43f5e" strokeWidth="6" />
                          <circle cx="210" cy="60" r="12" fill="#e11d48" fillOpacity="0.8" stroke="#ffe4e6" strokeWidth="2" className="animate-pulse" />
                          <text x="150" y="110" fill="#fda4af" fontSize="9" fontWeight="bold" fontFamily="monospace">
                            FIRE PIPE COLLIDING WITH LUMINAIRE
                          </text>
                        </g>
                      ) : (
                        <g>
                          <path d="M 50 60 L 110 60 L 130 110 L 290 110 L 310 60 L 370 60" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="210" cy="115" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                          <text x="140" y="145" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            45° OFFSET APPLIED • NFPA-13 RADIUS COMPLIANT
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </svg>

                {/* Bottom Canvas Controls */}
                <div className="flex items-center justify-between text-xs font-mono relative z-10 pt-2 border-t border-white/10">
                  <div className="text-neutral-400 text-[10px]">
                    COORDS: <span className="text-white">{currentClash.coordinates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isResolvedView ? (
                      <button
                        onClick={handleResolveAction}
                        className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Apply Resolution</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsResolvedView(false)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 border border-white/15"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Show Clash</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Clash Technical Details Card */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                    {currentClash.title}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 uppercase tracking-widest">
                    {currentClash.software}
                  </span>
                </div>
                <div className="text-xs text-neutral-400">
                  <strong className="text-rose-400 font-mono">Conflict:</strong> {currentClash.problem}
                </div>
                <div className="text-xs text-neutral-300 pt-2 border-t border-white/10">
                  <strong className="text-emerald-400 font-mono">BIM Solution Applied:</strong> {currentClash.solution}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: LOD 200–400 Inspector & ISO 19650 CDE Flow */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* LOD Selector & Details */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white" />
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Level of Development (LOD)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">AIA Standards</span>
              </div>

              {/* LOD Switcher Pills */}
              <div className="grid grid-cols-3 gap-2">
                {(['LOD 200', 'LOD 300', 'LOD 400'] as const).map((lod) => (
                  <button
                    key={lod}
                    onClick={() => setActiveLodTab(lod)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                      activeLodTab === lod
                        ? 'bg-white text-black shadow-md'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {lod}
                  </button>
                ))}
              </div>

              {/* LOD Detail Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-mono">{selectedLod.name}</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 uppercase tracking-wider">
                    {selectedLod.accuracy}
                  </span>
                </div>
                
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {selectedLod.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider">MEP Modeling Elements:</div>
                  {selectedLod.mepElements.map((el, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs text-neutral-400">
                  <strong className="text-white">Delivery Outcome:</strong> {selectedLod.useCase}
                </div>
              </div>
            </div>

            {/* ISO 19650 CDE Information Container Governance */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    ISO 19650 CDE Workflow
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 uppercase tracking-wider">
                  Level 3 Certified
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono font-semibold">
                {(['WIP', 'SHARED', 'PUBLISHED', 'ARCHIVED'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setActiveCdeStage(stage)}
                    className={`py-1.5 rounded-lg border transition-all ${
                      activeCdeStage === stage
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-neutral-900 text-neutral-500 border-white/10 hover:text-white'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-neutral-300 space-y-1">
                {activeCdeStage === 'WIP' && (
                  <p>
                    <strong className="text-white font-mono">Work In Progress:</strong> Task team modeling within Revit &amp; AutoCAD. Unverified internal drafting container before interdisciplinary check.
                  </p>
                )}
                {activeCdeStage === 'SHARED' && (
                  <p>
                    <strong className="text-emerald-400 font-mono">Shared Container (Active Stage):</strong> Coordinated MEP models federated in Navisworks Manage for interdisciplinary clash detection with Architecture &amp; Structure.
                  </p>
                )}
                {activeCdeStage === 'PUBLISHED' && (
                  <p>
                    <strong className="text-white font-mono">Published Container:</strong> Approved MEP shop drawings and submittals issued for construction (IFC) and authority approval (SBC/SEC/Civil Defense).
                  </p>
                )}
                {activeCdeStage === 'ARCHIVED' && (
                  <p>
                    <strong className="text-amber-400 font-mono">Archived Container:</strong> Final As-Built BIM models, Asset Information Models (AIM), and project handover registers.
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
