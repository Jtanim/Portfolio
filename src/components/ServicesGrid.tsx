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
        'Zero-tolerance clash detection, spatial interference resolution, and live multi-trade coordination across MEP, Architecture, and Structure to eliminate field rework.',
      metrics: '~20% Site Rework Reduction',
      tools: ['Navisworks Manage', 'Revit MEP', 'Clash Matrix'],
      accentColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      icon: Layers,
      title: 'LOD 200–400 Parametric Modeling',
      category: '3D BIM Authoring',
      description:
        'High-fidelity parametric modeling of complex mechanical ductwork, chilled water piping, sanitary drainage, cable containment, and fire protection systems.',
      metrics: 'LOD 200 to LOD 400 Precision',
      tools: ['Revit MEP', 'Custom Families', 'IFC OpenBIM'],
      accentColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    },
    {
      icon: FileText,
      title: 'MEP Shop Drawing Production',
      category: 'Contractor Submittals',
      description:
        'Authoring fully dimensioned, annotated 2D/3D shop drawings, riser schematics, builder work openings (BWIC), and equipment plant room layout plans.',
      metrics: '550+ Shop Drawings Delivered',
      tools: ['AutoCAD MEP', 'Revit Sheets', 'Drafting Standards'],
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      icon: ShieldCheck,
      title: 'ISO 19650 & CDE Governance',
      category: 'Information Management',
      description:
        'Implementation of BIM Execution Plans (BEP), information container workflows (WIP, Shared, Published, Archived), and standard project naming conventions.',
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
        'Preparation and submission of technical engineering packages fully compliant with Saudi Building Code (SBC), Saudi Electricity Company (SEC), and Saudi Civil Defense.',
      metrics: '15–25% Faster Approval Cycles',
      tools: ['SBC Codes', 'SEC Rules', 'Saudi Civil Defense'],
      accentColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    },
    {
      icon: Calculator,
      title: 'BOQ, Take-Offs & As-Built Records',
      category: 'Handover & Commercials',
      description:
        'Extracting automated material take-offs (MTOs) and Bills of Quantities directly from coordinated 3D BIM models, eliminating manual calculation discrepancies.',
      metrics: 'Direct Model Extraction',
      tools: ['Revit Schedules', 'Excel Automation', 'As-Built CAD'],
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  return (
    <section id="capabilities" className="py-20 bg-[#07090E] border-b border-white/[0.08] relative">
      
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[300px] bg-cyan-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5" />
            <span>Technical Disciplines &amp; Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
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
                className="arch-card p-6 sm:p-7 flex flex-col justify-between group"
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
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight font-display">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                      {cap.description}
                    </p>
                  </div>

                  {/* Tools List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cap.tools.map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#090D15] text-slate-300 border border-white/[0.08]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Measurable Metric Footer */}
                <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs">
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
