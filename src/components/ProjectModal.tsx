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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-neutral-950 border-b border-white/10 flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white border border-white/20 uppercase tracking-widest">
                {project.lodLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-white/10 uppercase">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                <MapPin className="w-3 h-3" />
                {project.location}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif italic">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-neutral-200">
          
          {/* Key Metadata Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-950 border border-white/10 text-xs">
            <div>
              <span className="text-neutral-500 block font-mono text-[10px] uppercase tracking-wider">CLIENT:</span>
              <span className="font-semibold text-white">{project.client || 'Government / Commercial'}</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-mono text-[10px] uppercase tracking-wider">MY ROLE:</span>
              <span className="font-semibold text-white">{project.role}</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-mono text-[10px] uppercase tracking-wider">TIMELINE:</span>
              <span className="font-semibold text-white">{project.period || 'Completed'}</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-mono text-[10px] uppercase tracking-wider">REGION:</span>
              <span className="font-semibold text-amber-400">{project.country}</span>
            </div>
          </div>

          {/* Full Scope & Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-neutral-400" />
              Project Scope &amp; Executive Summary
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              {project.fullDescription}
            </p>
          </div>

          {/* Systems Covered & Disciplines */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-neutral-400" />
              Engineered MEP Systems &amp; Disciplines
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.systemsCovered.map((sys, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300 font-light">{sys}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-neutral-950 border border-white/10 space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-400" />
                Key Deliverables Produced
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300 font-light">
                {project.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white font-mono font-bold">0{idx + 1}.</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950 border border-white/10 space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Coordination Impact &amp; Results
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300 font-light">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Software &amp; Tools Utilized:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.softwareUsed.map((soft, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-900 text-neutral-300 border border-white/10">
                    {soft}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Standards &amp; Codes Enforced:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.standards.map((std, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/10 text-white border border-white/20">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            Iqbal Hussain • MEP BIM Portfolio
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
