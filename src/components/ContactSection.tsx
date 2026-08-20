import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('Full-Time Senior Role (KSA)');
  const [locationTarget, setLocationTarget] = useState('Riyadh / KSA');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#10b981', '#737373']
    });

    const subject = encodeURIComponent(`[BIM Inquiry - ${inquiryType}] from ${name} (${company || 'Company'})`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nProject Location: ${locationTarget}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Iqbal, I reviewed your MEP BIM Coordinator portfolio. We have an opportunity/project in ${locationTarget} and would like to connect.`
    );
    window.open(`https://wa.me/966558652603?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          ENGAGE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>Direct Inquiry &amp; Mobilization</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
            INITIATE ENGAGEMENT.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              RIYADH &amp; GCC EXPANSION.
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Available immediately in Riyadh with a Transferable Iqama for Senior MEP BIM Coordination, Project Consulting, and Large-Scale Shop Drawing Authoring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Iqama Notice */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Banner */}
            <div className="p-7 rounded-2xl bg-[#0a0a0a] border border-white/15 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Transferable Iqama (Immediate)
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">🇸🇦 KSA Active</span>
              </div>

              <h3 className="text-xl font-bold text-white font-serif italic">
                Ready for Immediate Mobilization
              </h3>
              
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Legally eligible for direct transfer within Saudi Arabia. Equipped for lead coordination roles on Tier-1 giga-projects, hospitality resorts, and complex infrastructure developments.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>Notice Period: Immediate / Available</span>
              </div>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3">
              
              {/* Phone / WhatsApp */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="p-4 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Direct Phone (KSA)</div>
                    <div className="text-sm font-bold text-white font-mono">{personalInfo.phone}</div>
                  </div>
                </div>
                <span className="text-[10px] text-white font-mono uppercase tracking-widest">Call &rarr;</span>
              </a>

              {/* Direct WhatsApp Quick Chat */}
              <button
                onClick={handleDirectWhatsApp}
                className="w-full p-4 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Direct WhatsApp</div>
                    <div className="text-sm font-bold text-white font-mono">Chat on WhatsApp</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest font-bold">Message &rarr;</span>
              </button>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-4 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Official Email</div>
                    <div className="text-sm font-bold text-white font-mono">{personalInfo.email}</div>
                  </div>
                </div>
                <span className="text-[10px] text-white font-mono uppercase tracking-widest">Email &rarr;</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/t4nim07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Professional Profile</div>
                    <div className="text-sm font-bold text-white font-mono">{personalInfo.linkedIn}</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
              </a>

              {/* Location */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Riyadh, Kingdom of Saudi Arabia (Available for UAE &amp; GCC Travel)</span>
              </div>

            </div>

          </div>

          {/* Right Column: Hiring & Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 p-7 sm:p-8 shadow-2xl space-y-6">
              
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Project Inquiry &amp; Hiring Form
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-light">Direct response within 24 hours</p>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white px-2 py-0.5 rounded bg-white/10 border border-white/20">
                  Riyadh Hub
                </span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white font-serif italic">Inquiry Sent Successfully</h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto font-light">
                    Thank you for reaching out. An email client draft has been prepared, and Iqbal will get back to you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-white text-black font-bold text-xs font-mono uppercase tracking-wider"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eng. Khalid Al-Otaibi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. DGDA, Red Sea Global, Contractor"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="khalid@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+966 5X XXX XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Inquiry Purpose</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white outline-none font-mono"
                      >
                        <option>Full-Time Senior Role (KSA)</option>
                        <option>BIM Coordination Package</option>
                        <option>Shop Drawing Authoring (Revit/CAD)</option>
                        <option>Clash Detection &amp; BEP Setup</option>
                        <option>Consulting &amp; ISO 19650 Audit</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Project Region</label>
                      <select
                        value={locationTarget}
                        onChange={(e) => setLocationTarget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white outline-none font-mono"
                      >
                        <option>Riyadh / Diriyah (KSA)</option>
                        <option>Jeddah / Red Sea (KSA)</option>
                        <option>NEOM / Sindalah (KSA)</option>
                        <option>Dubai / Abu Dhabi (UAE)</option>
                        <option>Other GCC Location</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Project Details or Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Briefly describe the project scope, required LOD (e.g. LOD 300/400), timeline, or position details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-xl text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold font-mono text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Hiring &amp; Project Inquiry</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
