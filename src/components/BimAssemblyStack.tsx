import React, { useState } from 'react';
import { 
  Layers, 
  Wind, 
  Zap, 
  Droplets, 
  Flame, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Box, 
  Sliders, 
  Sparkles,
  CheckCircle,
  Eye
} from 'lucide-react';

interface LayerItem {
  id: string;
  name: string;
  discipline: string;
  lod: string;
  elements: number;
  heightLevel: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  specifications: string[];
}

export const BimAssemblyStack: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'struct',
    'hvac',
    'elec',
    'plumb',
    'fire',
  ]);
  const [selectedLayerId, setSelectedLayerId] = useState<string>('hvac');

  const layers: LayerItem[] = [
    {
      id: 'fire',
      name: 'Life Safety Fire Sprinklers',
      discipline: 'Fire Protection (NFPA 13 / Civil Defense)',
      lod: 'LOD 400',
      elements: 142,
      heightLevel: '+3,450 mm Ceiling Elevation',
      color: '#f43f5e',
      borderColor: 'border-rose-500/40',
      bgColor: 'bg-rose-950/40',
      textColor: 'text-rose-400',
      icon: Flame,
      description:
        'Pendant quick-response fire sprinkler grid, zone control valves, and seamless steel branch piping routed to clear HVAC diffusers and architectural ceiling coves.',
      specifications: [
        'DN50 & DN65 Sch 40 Fire Mains',
        'K-Factor 5.6 Quick Response Pendant Heads',
        'Direct Civil Defense Approval Compliance',
      ],
    },
    {
      id: 'hvac',
      name: 'HVAC Air Distribution & VAVs',
      discipline: 'Mechanical Ventilation',
      lod: 'LOD 400',
      elements: 384,
      heightLevel: '+3,100 mm Ceiling Elevation',
      color: '#06b6d4',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-950/40',
      textColor: 'text-cyan-400',
      icon: Wind,
      description:
        'Primary galvanized steel supply, return, and exhaust ductwork complete with motorized fire-smoke dampers (MFSD), sound attenuators, and linear diffusers.',
      specifications: [
        'Galvanized Sheet Steel (SMACNA 2020)',
        'VAV Terminal Units with DDC Controllers',
        'Acoustic Duct Lining & Flexible Connectors',
      ],
    },
    {
      id: 'elec',
      name: 'Electrical Containment & Busways',
      discipline: 'Power, Lighting & ELV BMS',
      lod: 'LOD 400',
      elements: 260,
      heightLevel: '+2,750 mm Ceiling Elevation',
      color: '#f59e0b',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-950/40',
      textColor: 'text-amber-400',
      icon: Zap,
      description:
        'Perforated heavy-duty cable trays, structured cabling raceways for BMS & Access Control, and lighting busbars aligned with high-low voltage segregation rules.',
      specifications: [
        '400x100mm Hot-Dip Galvanized Trays',
        '300mm Spatial Segregation from Wet Utilities',
        'SEC (Saudi Electricity Co.) Earthing Standards',
      ],
    },
    {
      id: 'plumb',
      name: 'Hydronic CHW & Sanitary Drainage',
      discipline: 'Chilled Water & Public Health',
      lod: 'LOD 400',
      elements: 215,
      heightLevel: '+2,400 mm Ceiling Elevation',
      color: '#0ea5e9',
      borderColor: 'border-teal-500/40',
      bgColor: 'bg-teal-950/40',
      textColor: 'text-teal-400',
      icon: Droplets,
      description:
        'Closed-loop chilled water distribution headers with elastomeric thermal insulation, alongside gradient-checked sanitary drainage and condensate drain lines.',
      specifications: [
        'DN150 Carbon Steel CHW Supply & Return',
        '1:100 Gradient Solvent-Welded Drainage',
        'Vibration Isolators & Balancing Valves',
      ],
    },
    {
      id: 'struct',
      name: 'Structural Slabs & RC Columns',
      discipline: 'Structural Engineering Host',
      lod: 'LOD 350',
      elements: 96,
      heightLevel: 'Level 04 (+0.00 Slab FFL)',
      color: '#94a3b8',
      borderColor: 'border-slate-600/40',
      bgColor: 'bg-slate-900/60',
      textColor: 'text-slate-300',
      icon: Building2,
      description:
        'Post-tensioned concrete floor slabs, primary drop beams, and cast-in-place columns hosting coordinated builder work sleeve penetration models.',
      specifications: [
        'RC Beams with Cast-In MEP Sleeves',
        'Post-Tension Tendon Keep-Out Zones',
        'Floor-to-Floor Height 4,200 mm',
      ],
    },
  ];

  const toggleLayer = (id: string) => {
    if (activeLayers.includes(id)) {
      if (activeLayers.length > 1) {
        setActiveLayers(activeLayers.filter((l) => l !== id));
      }
    } else {
      setActiveLayers([...activeLayers, id]);
    }
  };

  const selectedLayer = layers.find((l) => l.id === selectedLayerId) || layers[1];
  const totalElements = layers
    .filter((l) => activeLayers.includes(l.id))
    .reduce((acc, curr) => acc + curr.elements, 0);

  return (
    <section id="assembly-stack" className="py-20 bg-[#07090E] border-b border-white/[0.08] relative">
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Discipline Isometric Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              BIM Federated Stack Assembly
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              Inspect how multidisciplinary MEP layers assemble within vertical plenum clearances without physical collisions or maintenance access conflicts.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-300 bg-[#0D111A] px-4 py-2 rounded-xl border border-white/[0.08]">
            <span className="text-slate-400">Assembled Objects:</span>
            <span className="text-cyan-300 font-bold text-sm">{totalElements}</span>
            <span className="text-emerald-400 border-l border-white/[0.08] pl-3">100% Coordinated</span>
          </div>
        </div>

        {/* 2-Column Stacking View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Visual Exploded Stack */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 text-xs font-mono text-slate-400">
              <span>VERTICAL PLENUM ELEVATION (+3,450mm to +0.00mm)</span>
              <button
                onClick={() => setActiveLayers(['struct', 'hvac', 'elec', 'plumb', 'fire'])}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Reset All 5 Layers
              </button>
            </div>

            {/* Visual Stack Cards */}
            <div className="space-y-3">
              {layers.map((layer) => {
                const Icon = layer.icon;
                const isActive = activeLayers.includes(layer.id);
                const isSelected = selectedLayerId === layer.id;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-[#141A26] border-cyan-400 ring-2 ring-cyan-500/20 shadow-xl shadow-cyan-950/40'
                        : isActive
                        ? 'bg-[#0D111A] border-white/[0.08] hover:border-white/[0.18]'
                        : 'bg-[#090D15]/60 border-white/[0.04] opacity-40 hover:opacity-60'
                    }`}
                  >
                    {/* Left: Icon & Layer Info */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
                        style={{
                          backgroundColor: `${layer.color}15`,
                          borderColor: `${layer.color}40`,
                          color: layer.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {layer.name}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/[0.08]">
                            {layer.lod}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          {layer.heightLevel} • {layer.elements} BIM Objects
                        </div>
                      </div>
                    </div>

                    {/* Right: Toggle Switch */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLayer(layer.id);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900 text-slate-400 border-white/[0.08]'
                        }`}
                      >
                        {isActive ? 'Stacked' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Layer Inspector */}
          <div className="lg:col-span-5">
            <div className="arch-panel p-6 shadow-2xl space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${selectedLayer.color}15`,
                      borderColor: `${selectedLayer.color}40`,
                      color: selectedLayer.color,
                    }}
                  >
                    <selectedLayer.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {selectedLayer.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono">
                      {selectedLayer.discipline}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-white/[0.08]">
                  {selectedLayer.lod}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                {selectedLayer.description}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <div className="text-[11px] uppercase font-mono text-slate-400 font-semibold">
                  Engineering Specifications:
                </div>
                <div className="space-y-1.5">
                  {selectedLayer.specifications.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric Box */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08]">
                <div className="p-3 rounded-xl bg-[#090D15] border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-slate-400">HEIGHT ZONE</div>
                  <div className="text-xs font-bold text-white font-mono mt-0.5">
                    {selectedLayer.heightLevel.split(' ')[0]}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#090D15] border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-slate-400">MODELED QUANTITY</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                    {selectedLayer.elements} Active Objects
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
