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
  Building,
  Zap,
  Wind,
  Droplets,
  Flame,
  CheckCircle
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
      accentColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      icon: Layers,
      title: 'LOD 200–400 BIM Modeling',
      category: 'Parametric 3D Modeling',
      description:
        'High-fidelity parametric modeling of mechanical ductwork, chilled water piping, sanitary drainage, cable containment, and fire protection systems.',
      metrics: 'LOD 200, 300 & 400 Precision',
      tools: ['Revit MEP', 'Parametric Families', 'IFC OpenBIM'],
      accentColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    },
    {
      icon: FileText,
      title: 'MEP Shop Drawing Production',
      category: 'Contractor Submittals',
      description:
        'Authoring fully detailed, dimensioned, and annotated 2D/3D shop drawings, riser diagrams, builder work openings, and installation layouts.',
      metrics: '550+ Shop Drawings Delivered',
      tools: ['AutoCAD MEP', 'Revit Drafting', 'Sheet Automation'],
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      icon: ShieldCheck,
      title: 'ISO 19650 & CDE Management',
      category: 'Information Governance',
      description:
        'Implementation of BIM Execution Plans (BEP), information container workflows (WIP, Shared, Published, Archived), and standard naming conventions.',
      metrics: 'Level 3 Expert Certified',
      tools: ['Autodesk BIM 360', 'ACC', 'Plannerly BEP'],
      accentColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      icon: Building,
      title: 'Authority & Code Compliance',
      category: 'SBC, SEC & Civil Defense',
      description:
        'Preparation of technical submission packages compliant with Saudi Building Code (SBC), Saudi Electricity Company (SEC), and Saudi Civil Defense.',
      metrics: '15–25% Faster Approval Cycles',
      tools: ['SBC Codes', 'SEC Rules', 'Saudi Civil Defense'],
      accentColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    },
    {
      icon: Calculator,
      title: 'BOQ, Take-Offs & As-Built Records',
      category: 'Procurement & Handover',
      description:
        'Extracting automated material take-offs (MTOs) and Bills of Quantities directly from coordinated 3D BIM models, eliminating manual calculation errors.',
      metrics: 'Direct Extraction from Model',
      tools: ['Revit Schedules', 'Excel Automation', 'As-Built CAD'],
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  return (
    <section id="capabilities" className="py-20 bg-[#0E131F] border-b border-slate-800/80 relative">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[300px] bg-cyan-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5" />
            <span>Technical Disciplines &amp; Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Core MEP BIM Disciplines
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Providing end-to-end MEP BIM execution from schematic spatial zoning and clash resolution to authority approvals and As-Built handover.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/40 p-6 sm:p-7 shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cap.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${cap.badgeColor}`}>
                      {cap.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                      {cap.description}
                    </p>
                  </div>

                  {/* Tools List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cap.tools.map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Measurable Metric Footer */}
                <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Outcome:</span>
                  <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {cap.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
