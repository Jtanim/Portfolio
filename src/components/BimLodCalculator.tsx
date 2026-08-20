import React, { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  FileSpreadsheet, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  FileCheck2,
  ArrowRight
} from 'lucide-react';

export const BimLodCalculator: React.FC = () => {
  const [buildingType, setBuildingType] = useState<'hotel' | 'residential' | 'commercial' | 'compound'>('hotel');
  const [areaGfa, setAreaGfa] = useState<number>(25000);
  const [targetLod, setTargetLod] = useState<'LOD 300' | 'LOD 400'>('LOD 400');
  const [includeFireAndElv, setIncludeFireAndElv] = useState<boolean>(true);

  // Estimation Formulas
  const multiplier = buildingType === 'hotel' ? 1.4 : buildingType === 'commercial' ? 1.2 : buildingType === 'compound' ? 0.9 : 1.0;
  const lodMultiplier = targetLod === 'LOD 400' ? 1.5 : 1.0;
  const disciplineFactor = includeFireAndElv ? 1.3 : 1.0;

  // Approximate calculations
  const estimatedSheets = Math.round((areaGfa / 350) * multiplier * lodMultiplier * disciplineFactor);
  const estimatedClashResolutions = Math.round((areaGfa / 100) * multiplier * (targetLod === 'LOD 400' ? 1.2 : 0.8));
  const estimatedCoordWeeks = Math.max(4, Math.round((estimatedSheets / 25) * 1.1));
  const estimatedRfiReductionPercent = 20;

  return (
    <section id="estimator" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 left-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          ESTIMATE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase">
            <Calculator className="w-3.5 h-3.5 text-neutral-400" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
            MEP BIM ESTIMATOR.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              DRAWINGS &amp; CLASH CYCLES.
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Simulate shop drawing sheet counts, clash detection cycles, and ISO 19650 container requirements based on project typologies and target LOD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Box */}
          <div className="lg:col-span-6 rounded-2xl bg-[#0a0a0a] border border-white/10 p-7 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Project Parameters
              </h3>
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">BEP Engine</span>
            </div>

            {/* Building Typology */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Asset Typology:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'hotel', label: 'Luxury Hotel' },
                  { key: 'residential', label: 'Residential' },
                  { key: 'commercial', label: 'Commercial' },
                  { key: 'compound', label: 'Villa Compound' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setBuildingType(item.key as any)}
                    className={`py-2 px-2 text-xs font-mono uppercase tracking-wider rounded-xl border transition-all text-center ${
                      buildingType === item.key
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-neutral-900 text-neutral-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gross Floor Area Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider text-[11px]">Gross Floor Area (GFA):</span>
                <span className="text-white font-bold text-base">{areaGfa.toLocaleString()} m²</span>
              </div>
              <input
                type="range"
                min="5000"
                max="120000"
                step="2500"
                value={areaGfa}
                onChange={(e) => setAreaGfa(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-white border border-white/10"
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                <span>5k m² (Villa)</span>
                <span>50k m²</span>
                <span>120k m² (Resort)</span>
              </div>
            </div>

            {/* Target LOD */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Target Level of Development:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTargetLod('LOD 300')}
                  className={`p-3.5 rounded-xl border text-xs font-mono text-left transition-all ${
                    targetLod === 'LOD 300'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-neutral-900 border-white/10 text-neutral-400'
                  }`}
                >
                  <div className={`font-bold ${targetLod === 'LOD 300' ? 'text-black' : 'text-white'}`}>LOD 300 Coordinated</div>
                  <div className={`text-[10px] mt-0.5 ${targetLod === 'LOD 300' ? 'text-neutral-600' : 'text-neutral-400'}`}>Design &amp; Authority Submittals</div>
                </button>

                <button
                  onClick={() => setTargetLod('LOD 400')}
                  className={`p-3.5 rounded-xl border text-xs font-mono text-left transition-all ${
                    targetLod === 'LOD 400'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-neutral-900 border-white/10 text-neutral-400'
                  }`}
                >
                  <div className={`font-bold ${targetLod === 'LOD 400' ? 'text-black' : 'text-white'}`}>LOD 400 Fabrication</div>
                  <div className={`text-[10px] mt-0.5 ${targetLod === 'LOD 400' ? 'text-neutral-600' : 'text-neutral-400'}`}>Shop Drawings &amp; Installation</div>
                </button>
              </div>
            </div>

            {/* Disciplines Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-white/10">
              <div>
                <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">Include Fire &amp; ELV Systems</div>
                <div className="text-[11px] text-neutral-400 font-light">Sprinkler, fire alarm, CCTV &amp; BMS packages</div>
              </div>
              <button
                onClick={() => setIncludeFireAndElv(!includeFireAndElv)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  includeFireAndElv ? 'bg-white' : 'bg-neutral-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${
                    includeFireAndElv ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Estimation Output Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/15 p-7 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-neutral-400" />
                  <span>Calculated BIM Delivery Output</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 uppercase tracking-widest">
                  ISO 19650 READY
                </span>
              </div>

              {/* 4 Output Metrics */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">SHOP DRAWINGS</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ~{estimatedSheets} <span className="text-xs font-normal text-neutral-400">Sheets</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-light">AutoCAD / Revit Layouts</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">CLASHES MITIGATED</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                    ~{estimatedClashResolutions} <span className="text-xs font-normal text-neutral-400">Pts</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-light">Pre-construction resolved</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">COORDINATION CYCLE</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                    ~{estimatedCoordWeeks} <span className="text-xs font-normal text-neutral-400">Wks</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-light">Federated model cycle</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">RFI REDUCTION</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ~{estimatedRfiReductionPercent}%
                  </div>
                  <div className="text-[10px] text-neutral-500 font-light">Proven track record</div>
                </div>

              </div>

              {/* Information Container Workflow for this configuration */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-semibold text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard ISO 19650 Submittal Structure:</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono space-y-1">
                  <div>• Model: <span className="text-white">KSA-PRJ-MEP-MOD-001 (Rev P01)</span></div>
                  <div>• Drawings: <span className="text-white">KSA-PRJ-MEP-DRW-M-201 (Rev C01)</span></div>
                  <div>• Authority: <span className="text-neutral-300">SBC 201 / SEC / Saudi Civil Defense</span></div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-neutral-400 font-light">Need tailored BIM coordination?</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold font-mono text-[10px] uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <span>Request Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
