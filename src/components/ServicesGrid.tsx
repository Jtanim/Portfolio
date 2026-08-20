import React from 'react';
import { 
  Layers, 
  Cpu, 
  FileText, 
  ShieldCheck, 
  Calculator, 
  CheckCircle2, 
  Compass, 
  FileSpreadsheet,
  Workflow,
  Sparkles,
  SearchCheck,
  Building,
  Zap,
  Wind,
  Droplets,
  Flame
} from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const capabilities = [
    {
      icon: Cpu,
      title: 'Multidisciplinary BIM Coordination',
      category: 'Navisworks & Revit',
      description:
        'Clash detection, interference resolution, and spatial coordination between MEP, Architectural, and Structural models to prevent costly on-site rebuilds.',
      metrics: '~20% Reduction in Site Revisions',
      tools: ['Navisworks Manage', 'Revit MEP', 'Clash Matrix'],
      color: 'cyan',
    },
    {
      icon: Layers,
      title: 'LOD 200–400 BIM Modeling',
      category: 'Detailed 3D Modeling',
      description:
        'High-fidelity parametric modeling of mechanical ductwork, chilled water piping, sanitary drainage, cable containment, and fire protection systems.',
      metrics: 'LOD 200, 300 & 400 Precision',
      tools: ['Revit MEP', 'Parametric Families', 'IFC OpenBIM'],
      color: 'amber',
    },
    {
      icon: FileText,
      title: 'MEP Shop Drawing Production',
      category: 'Contractor Submittals',
      description:
        'Authoring fully detailed, dimensioned, and annotated 2D/3D shop drawings, riser diagrams, builder work openings, and installation layouts.',
      metrics: '550+ Shop Drawings Delivered',
      tools: ['AutoCAD MEP', 'Revit Drafting', 'Sheet Automation'],
      color: 'emerald',
    },
    {
      icon: ShieldCheck,
      title: 'ISO 19650 & CDE Management',
      category: 'Certified Information Manager',
      description:
        'Implementation of BIM Execution Plans (BEP), information container workflows (WIP, Shared, Published, Archived), and standard naming conventions.',
      metrics: 'Level 3 Expert Certified',
      tools: ['Autodesk BIM 360', 'ACC', 'Plannerly BEP'],
      color: 'cyan',
    },
    {
      icon: Building,
      title: 'Authority & Code Compliance',
      category: 'SBC, SEC & Civil Defense',
      description:
        'Preparation of technical submission packages compliant with Saudi Building Code (SBC), Saudi Electricity Company (SEC), and Saudi Civil Defense.',
      metrics: '15–25% Faster Approval Cycles',
      tools: ['SBC Codes', 'SEC Rules', 'Saudi Civil Defense'],
      color: 'amber',
    },
    {
      icon: Calculator,
      title: 'BOQ, Take-Offs & As-Built Records',
      category: 'Procurement & Handover',
      description:
        'Extracting automated material take-offs (MTOs) and Bills of Quantities directly from coordinated 3D BIM models, eliminating manual calculation errors.',
      metrics: 'Direct Extraction from Model',
      tools: ['Revit Schedules', 'Excel Automation', 'As-Built CAD'],
      color: 'emerald',
    },
  ];

  return (
    <section id="capabilities" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          EXPERTISE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase">
            <Workflow className="w-3.5 h-3.5 text-neutral-400" />
            <span>Engineering Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
            CORE CAPABILITIES.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              TECHNICAL EXECUTION.
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Providing full lifecycle MEP BIM solutions from early schematic spatial zoning to final authority handover dossiers.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 p-7 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Index & Category */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif italic text-xl text-neutral-500 group-hover:text-white transition-colors">
                      0{idx + 1}.
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-neutral-900 text-neutral-400 border border-white/10">
                      {cap.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors font-mono tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">
                      {cap.description}
                    </p>
                  </div>

                  {/* Key Metric Indicator */}
                  <div className="px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cap.metrics}</span>
                  </div>
                </div>

                {/* Software tags */}
                <div className="pt-4 mt-5 border-t border-white/10 flex flex-wrap gap-1.5">
                  {cap.tools.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
