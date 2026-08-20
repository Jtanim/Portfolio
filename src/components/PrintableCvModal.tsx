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
  ShieldCheck
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
MEP BIM COORDINATOR | SENIOR MEP DRAFTSMAN
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/90 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static print:overflow-visible">
      <div 
        className="relative w-full max-w-5xl bg-[#0a0a0a] text-neutral-100 border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar (Hidden during actual print) */}
        <div className="p-4 bg-neutral-950 border-b border-white/10 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold font-mono text-sm">
              IH
            </div>
            <div>
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Curriculum Vitae — Iqbal Hussain</span>
              <span className="block text-[10px] text-emerald-400 font-mono uppercase tracking-widest">Transferable Iqama • KSA Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-300 border border-white/10 transition-colors cursor-pointer"
              title="Copy plain text CV to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider text-black transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close CV preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Paper Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#050505] text-neutral-200 print:p-8 print:bg-white print:text-black font-sans">
          
          {/* CV Header */}
          <div className="border-b-2 border-white/20 pb-6 text-center space-y-2 print:border-black">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase print:text-black">
              {personalInfo.name}
            </h1>
            <p className="text-xs sm:text-sm font-bold font-mono text-neutral-300 uppercase tracking-[0.2em] print:text-gray-800">
              {personalInfo.title}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 text-xs font-mono text-neutral-400 pt-2 print:text-gray-700">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-400 print:hidden" /> {personalInfo.location}</span>
              <span>•</span>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-white"><Phone className="w-3 h-3 text-neutral-400 print:hidden" /> {personalInfo.phone}</a>
              <span>•</span>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-white"><Mail className="w-3 h-3 text-neutral-400 print:hidden" /> {personalInfo.email}</a>
              <span>•</span>
              <span className="text-neutral-300 print:text-black">LinkedIn: {personalInfo.linkedIn}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-neutral-400 print:text-gray-600">
              <span>Nationality: <strong className="text-white print:text-black">{personalInfo.nationality}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold print:text-black">Status: <strong>Transferable Iqama</strong></span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light print:text-black">
              {personalInfo.summary}
            </p>
          </div>

          {/* Core Skills Matrix (3 Columns) */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
              CORE SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-xs text-neutral-300 print:text-black font-light">
              {[
                'MEP BIM Coordination & Modeling',
                'Revit MEP (LOD 200, 300 & 400)',
                'AutoCAD MEP Drafting',
                'Navisworks Manage & Clash Detection',
                'Autodesk BIM 360 & ACC',
                'BIM Level 2 Workflows',
                'BIM Execution Plan (BEP)',
                'ISO 19650 Information Management',
                'Common Data Environment (CDE)',
                'HVAC Ducting & Chilled Water Piping',
                'Plumbing & Drainage Systems',
                'Electrical Power, Lighting & Distribution',
                'Fire Fighting & Fire Alarm Systems',
                'ELV / Low Current Systems',
                'IFC Standards & Drawing Interpretation',
                'As-Built Drawings',
                'BOQ & Material Take-Offs',
                'RFI Preparation & Resolution',
                'Shop Drawing Submission & Approval',
                'Architectural & Structural Coordination',
                'SBC, SEC & Civil Defense Compliance',
                'Microsoft Office Suite',
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-white font-bold print:text-black">•</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
              PROFESSIONAL EXPERIENCE
            </h2>

            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <strong className="text-white text-sm font-serif italic print:text-black">{exp.role}</strong>
                    <span className="text-neutral-300 font-semibold ml-2 font-mono uppercase text-[11px] print:text-gray-800">| {exp.company}</span>
                    <span className="text-neutral-500 ml-1 font-mono text-[11px] print:text-gray-600">| {exp.location}</span>
                  </div>
                  <span className="font-mono text-neutral-400 text-[11px] print:text-gray-700">{exp.period}</span>
                </div>

                <ul className="space-y-1 text-xs text-neutral-300 pl-3 list-disc print:text-black font-light">
                  {exp.highlights.map((hl, i) => (
                    <li key={i} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
              SELECTED PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {selectedProjects.map((prj) => (
                <div key={prj.id} className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 space-y-1 print:border print:border-gray-300 print:bg-white">
                  <div className="font-bold text-white font-serif italic print:text-black">{prj.title}</div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider print:text-gray-700">
                    {prj.client ? `Client: ${prj.client} | ` : ''}{prj.location}
                  </div>
                  <div className="text-[11px] text-neutral-300 print:text-gray-800 font-medium font-mono">
                    {prj.category} | Role: {prj.role}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-light print:text-black">
                    <strong className="text-neutral-200">Scope:</strong> {prj.scope}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 print:text-black font-light">
              {certifications.map((c) => (
                <div key={c.id} className="flex items-start gap-2">
                  <span className="text-white font-bold print:text-black">•</span>
                  <div>
                    <strong className="text-white print:text-black">{c.title}</strong> — <span className="text-neutral-400 print:text-gray-700 font-mono text-[11px]">{c.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
                EDUCATION
              </h2>
              {educationList.map((edu, idx) => (
                <div key={idx} className="text-xs space-y-0.5">
                  <strong className="text-white block font-serif italic print:text-black">{edu.degree}</strong>
                  <div className="text-neutral-400 print:text-gray-700 font-mono text-[11px]">
                    {edu.institution} | {edu.period}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase font-bold text-white tracking-[0.25em] border-b border-white/10 pb-1 print:text-black print:border-black">
                SOFTWARE &amp; LANGUAGES
              </h2>
              <div className="text-xs space-y-1.5 text-neutral-300 print:text-black font-light">
                <div>
                  <strong className="text-white print:text-black">Software:</strong> Revit MEP, AutoCAD, Navisworks Manage, Autodesk BIM 360, Autodesk Construction Cloud (ACC), Primavera P6, Microsoft Word, Microsoft Excel, Microsoft Outlook.
                </div>
                <div>
                  <strong className="text-white print:text-black">Languages:</strong> English (Professional Working Proficiency) | Arabic (Conversational / Working Level) | Urdu (Native).
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-white/10 flex items-center justify-between print:hidden">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            Iqbal Hussain • Verified Resume (Transferable Iqama)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
