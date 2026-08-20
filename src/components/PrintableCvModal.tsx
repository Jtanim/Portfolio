import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Award, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { 
  personalInfo, 
  experiences, 
  selectedProjects, 
  certifications, 
  educationList, 
  softwareSkills, 
  standardsAndCodes 
} from '../data/portfolioData';

interface PrintableCvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableCvModal: React.FC<PrintableCvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const cvText = `
IQBAL HUSSAIN
SENIOR MEP BIM COORDINATOR & DRAFTSMAN
Location: ${personalInfo.location} | Phone: ${personalInfo.phone} | Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedIn} | Nationality: ${personalInfo.nationality} | Status: ${personalInfo.iqamaStatus}

PROFESSIONAL SUMMARY:
${personalInfo.summary}

PROFESSIONAL EXPERIENCE:
${experiences.map(e => `
${e.role} | ${e.company} | ${e.location} (${e.period})
${e.highlights.map(h => `• ${h}`).join('\n')}
`).join('\n')}

SELECTED PROJECTS:
${selectedProjects.map(p => `
• ${p.title} (${p.location}) - Role: ${p.role}
  Scope: ${p.scope}
`).join('\n')}

CERTIFICATIONS:
${certifications.map(c => `• ${c.title} — ${c.issuer}`).join('\n')}

EDUCATION:
${educationList.map(edu => `• ${edu.degree} — ${edu.institution} (${edu.period})`).join('\n')}

SOFTWARE:
Revit MEP, AutoCAD, Navisworks Manage, Autodesk BIM 360, Autodesk Construction Cloud (ACC), Primavera P6, Microsoft Office.
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static print:overflow-visible">
      <div 
        className="relative w-full max-w-5xl bg-[#0F1626] text-slate-100 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar (Hidden during actual print) */}
        <div className="p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold font-mono text-sm">
              IH
            </div>
            <div>
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Executive CV — Iqbal Hussain</span>
              <span className="block text-[11px] text-emerald-400 font-medium">Transferable Iqama • Riyadh, Saudi Arabia</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono uppercase tracking-wider text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Copy plain text CV to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              aria-label="Close CV preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-[#0B0F19] text-slate-200 print:p-8 print:bg-white print:text-black font-sans">
          
          {/* CV Header */}
          <div className="border-b-2 border-slate-700/80 pb-5 text-center space-y-2 print:border-black">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
              IQBAL HUSSAIN
            </h1>
            <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wider print:text-gray-800">
              SENIOR MEP BIM COORDINATOR &amp; DRAFTSMAN
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-slate-300 print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {personalInfo.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.email}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold print:text-emerald-800">
                Transferable Iqama
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal print:text-gray-800">
              {personalInfo.summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              Professional Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <div>
                      <strong className="text-white font-bold print:text-black">{exp.role}</strong>
                      <span className="text-cyan-300 font-medium print:text-gray-800"> — {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 print:text-gray-600">
                      {exp.location} | {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 print:text-black shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
              Flagship Project Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProjects.map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 print:bg-gray-50 print:border-gray-200 text-xs space-y-1">
                  <div className="font-bold text-white print:text-black">{p.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono print:text-gray-600">{p.location} • {p.role}</div>
                  <div className="text-slate-300 print:text-gray-800">{p.scope}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
                Accreditations &amp; Certifications
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-gray-800">
                {certifications.map((c) => (
                  <li key={c.id} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 print:text-black">✓</span>
                    <span><strong>{c.title}</strong> — {c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-slate-800 print:border-gray-300 pb-1">
                Education &amp; Technical Skills
              </h2>
              <div className="space-y-2 text-xs text-slate-300 print:text-gray-800">
                {educationList.map((edu, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-white print:text-black">{edu.degree}</div>
                    <div className="text-slate-400 print:text-gray-600">{edu.institution} ({edu.period})</div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-800 print:border-gray-200">
                  <strong className="text-white print:text-black">Core Stack:</strong> Revit MEP (LOD 400), AutoCAD MEP, Navisworks Manage, BIM 360 / ACC, ISO 19650 CDE, SBC/NFPA Codes.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Print Notice Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-center text-[11px] text-slate-400 font-mono print:hidden flex items-center justify-center gap-2">
          <span>Formatted for direct ATS scanning and A4/Letter printer output</span>
        </div>
      </div>
    </div>
  );
};
