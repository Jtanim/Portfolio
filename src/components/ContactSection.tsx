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
  Clock,
  CheckCircle2
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
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#3b82f6']
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
    <section id="contact" className="py-20 bg-[#0E131F] border-b border-slate-800/80 relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Recruitment &amp; Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Initiate Contact &amp; Mobilization
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Available immediately in Riyadh with a Transferable Iqama for Senior MEP BIM Coordination, Lead Modeling, and Project Delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Iqama Notice */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Availability Banner */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-xl space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Transferable Iqama (Immediate)
                </span>
                <span className="text-xs font-mono text-slate-400">🇸🇦 Riyadh, KSA</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                Ready for Immediate Mobilization
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Legally eligible for direct transfer within Saudi Arabia. Ready to lead multidisciplinary MEP BIM coordination across Tier-1 giga-projects, hospitality resorts, and complex infrastructure.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Notice Period: Immediate / Available</span>
              </div>
            </div>

            {/* Direct Channels List */}
            <div className="space-y-2.5">
              
              {/* Phone */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Direct Phone (KSA)</div>
                    <div className="text-sm font-bold text-white font-mono">{personalInfo.phone}</div>
                  </div>
                </div>
                <span className="text-xs text-cyan-400 font-mono">Call &rarr;</span>
              </a>

              {/* WhatsApp */}
              <button
                onClick={handleDirectWhatsApp}
                className="w-full p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-between text-left group cursor-pointer backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400">Direct WhatsApp</div>
                    <div className="text-sm font-bold text-white font-mono">+966 55 865 2603</div>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-semibold">Chat Instant &rarr;</span>
              </button>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Email Address</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono break-all">{personalInfo.email}</div>
                  </div>
                </div>
                <span className="text-xs text-cyan-400 font-mono">Send &rarr;</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://${personalInfo.linkedIn}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 transition-all flex items-center justify-between group backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Professional Profile</div>
                    <div className="text-sm font-bold text-white">LinkedIn / Iqbal Hussain</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
              </a>

            </div>

          </div>

          {/* Right Column: Inquiry Submission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/80 p-6 sm:p-8 shadow-xl backdrop-blur-md">
              
              <div className="pb-4 mb-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Send Recruitment / Project Inquiry
                  </h3>
                  <p className="text-xs text-slate-400">Direct response within 24 business hours</p>
                </div>
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Fast Track
                </div>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Prepared &amp; Dispatched!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you! Your email client has been launched with your structured details. You can also reach out instantly on WhatsApp at <strong>+966 55 865 2603</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eng. Abdullah Al-Harbi"
                        className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                        Company / Consultancy
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. DAR Al-Handasah / Jacobs / Freelance"
                        className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                      Opportunity / Inquiry Nature
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Full-Time Senior Role (KSA)">Full-Time Senior MEP BIM Coordinator (Riyadh / KSA)</option>
                      <option value="BIM Lead / Project Coordination (Contract)">BIM Lead / Project Coordination (Project-Based)</option>
                      <option value="MEP Shop Drawing Package Subcontract">MEP Shop Drawing Production Package</option>
                      <option value="Navisworks Clash Resolution Audit">Navisworks Clash Resolution Audit</option>
                      <option value="General Professional Inquiry">General Technical Discussion</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                      Project Scope or Role Overview *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe project requirements, building typology, LOD requirement, or interview scheduling details..."
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Formal Inquiry</span>
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Guaranteed confidential communications • Riyadh, KSA
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
