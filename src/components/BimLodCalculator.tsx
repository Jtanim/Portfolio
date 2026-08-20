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
  ArrowRight,
  CheckCircle
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

  return (
    <section id="estimator" className="py-20 bg-[#0B0F19] border-b border-slate-800/80 relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive MEP BIM Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Drawings &amp; Clash Scope Calculator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Simulate shop drawing sheet counts, clash detection cycles, and coordination schedules based on project built-up area and target LOD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Box */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 p-6 sm:p-7 shadow-xl space-y-5 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                Project Parameters
              </h3>
              <span className="text-xs text-cyan-300 font-mono">BEP Engine</span>
            </div>

            {/* Building Typology */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                Asset Typology:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'hotel', label: 'Luxury Hotel' },
                  { key: 'residential', label: 'Residential' },
                  { key: 'commercial', label: 'Commercial' },
                  { key: 'compound', label: 'Compound' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setBuildingType(item.key as any)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center cursor-pointer ${
                      buildingType === item.key
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gross Floor Area Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-medium">Gross Floor Area (GFA):</span>
                <span className="text-cyan-300 font-bold text-base">{areaGfa.toLocaleString()} m²</span>
              </div>
              <input
                type="range"
                min="5000"
                max="120000"
                step="2500"
                value={areaGfa}
                onChange={(e) => setAreaGfa(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-700"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>5k m² (Villa/Clubhouse)</span>
                <span>50k m² (Tower)</span>
                <span>120k m² (Resort Complex)</span>
              </div>
            </div>

            {/* Target LOD */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                Target Level of Development:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTargetLod('LOD 300')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    targetLod === 'LOD 300'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-white">LOD 300 Coordinated</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Design &amp; Authority Submittals</div>
                </button>

                <button
                  onClick={() => setTargetLod('LOD 400')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    targetLod === 'LOD 400'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-white">LOD 400 Fabrication</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Shop Drawings &amp; Spool Sheets</div>
                </button>
              </div>
            </div>

            {/* Fire & ELV Inclusion Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFireAndElv}
                  onChange={(e) => setIncludeFireAndElv(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 bg-slate-900 border-slate-700"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Include Fire Protection &amp; ELV Containment</div>
                  <div className="text-[11px] text-slate-400">Sprinklers, fire alarm loop, CCTV, and BMS containment</div>
                </div>
              </label>
            </div>

          </div>

          {/* Results Metric Output Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Metric 1 */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
                  <span className="text-[10px] font-mono uppercase text-slate-400">Sheets</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">{estimatedSheets}</div>
                <div className="text-xs font-semibold text-slate-200">MEP Coordinated Shop Drawings</div>
                <div className="text-[11px] text-slate-400 leading-snug">Plans, risers &amp; builders work</div>
              </div>

              {/* Metric 2 */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-mono uppercase text-slate-400">Clashes</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">~{estimatedClashResolutions}</div>
                <div className="text-xs font-semibold text-slate-200">Virtual Clashes Cleared</div>
                <div className="text-[11px] text-slate-400 leading-snug">Resolved in Navisworks federated</div>
              </div>

              {/* Metric 3 */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase text-slate-400">Schedule</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">~{estimatedCoordWeeks} Wks</div>
                <div className="text-xs font-semibold text-slate-200">BIM Coordination Timeline</div>
                <div className="text-[11px] text-slate-400 leading-snug">Iterative clash cycle duration</div>
              </div>

              {/* Metric 4 */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-5 h-5 text-cyan-300" />
                  <span className="text-[10px] font-mono uppercase text-slate-400">Benefit</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">~20%</div>
                <div className="text-xs font-semibold text-slate-200">Site Rework &amp; RFI Reduction</div>
                <div className="text-[11px] text-slate-400 leading-snug">First-time-right on site install</div>
              </div>

            </div>

            {/* Quick Contact CTA */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 flex items-center justify-between">
              <div className="text-xs text-slate-300">
                Need an accurate BIM Execution Plan (BEP) for this scope?
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
