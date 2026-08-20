import React from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  FileText, 
  Award, 
  ShieldCheck, 
  ExternalLink,
  Wind,
  Zap,
  Droplets,
  Flame,
  Briefcase
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0F1626] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-slate-900/90 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {project.lodLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-mono font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300">
          
          {/* Key Metadata Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase font-semibold">CLIENT:</span>
              <span className="font-semibold text-white">{project.client || 'Government / Commercial'}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase font-semibold">MY ROLE:</span>
              <span className="font-semibold text-white">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase font-semibold">TIMELINE:</span>
              <span className="font-semibold text-white">{project.period || 'Completed'}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase font-semibold">REGION:</span>
              <span className="font-semibold text-amber-400">{project.country}</span>
            </div>
          </div>

          {/* Full Scope & Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Project Scope &amp; Executive Summary
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {project.fullDescription}
            </p>
          </div>

          {/* Systems Covered & Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Engineered MEP Systems &amp; Disciplines
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.systemsCovered.map((sys, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 font-normal">{sys}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Key Deliverables Produced
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold">0{idx + 1}.</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Coordination Impact &amp; Results
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.keyAchievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold">✓</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Software Stack & Standards */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">SOFTWARE EMPLOYED:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.softwareUsed.map((sw, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">STANDARDS:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.standards.map((st, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800 text-amber-300 border border-slate-700">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            Reference ID: <span className="text-slate-200 font-semibold">{project.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            Close Scope
          </button>
        </div>
      </div>
    </div>
  );
};
