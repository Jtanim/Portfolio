import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionDivider } from './components/SectionDivider';
import { BimViewerClashExplorer } from './components/BimViewerClashExplorer';
import { BimAssemblyStack } from './components/BimAssemblyStack';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ProjectModal } from './components/ProjectModal';
import { ServicesGrid } from './components/ServicesGrid';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CertificationsSkills } from './components/CertificationsSkills';
import { BimLodCalculator } from './components/BimLodCalculator';
import { PrintableCvModal } from './components/PrintableCvModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Navigation Header */}
      <Header 
        onOpenCvModal={() => setIsCvModalOpen(true)} 
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onOpenCvModal={() => setIsCvModalOpen(true)} 
        />

        <SectionDivider 
          type="hvac" 
          label="CLASH DETECTION & SPATIAL RESOLUTION" 
          tag="NAVISWORKS MANAGE" 
        />

        {/* Interactive BIM Coordination & Navisworks Clash Lab */}
        <BimViewerClashExplorer />

        <SectionDivider 
          type="bim" 
          label="FEDERATED 3D MULTI-LAYER STACKING" 
          tag="LOD 200–400" 
        />

        {/* Multi-Layer 3D BIM Assembly Stack */}
        <BimAssemblyStack />

        <SectionDivider 
          type="electrical" 
          label="GCC GIGA-PROJECTS & RESORTS" 
          tag="KSA & UAE" 
        />

        {/* Featured Mega-Projects Showcase */}
        <ProjectsShowcase 
          onSelectProject={(proj) => setSelectedProject(proj)} 
        />

        <SectionDivider 
          type="plumbing" 
          label="TECHNICAL DISCIPLINES & SERVICES" 
          tag="ISO 19650" 
        />

        {/* 6 Core MEP BIM Capabilities */}
        <ServicesGrid />

        <SectionDivider 
          type="fire" 
          label="CAREER HISTORY & DELIVERABLES" 
          tag="10+ YEARS EXPERIENCE" 
        />

        {/* Career Experience Timeline */}
        <ExperienceTimeline />

        {/* Certifications, Education & Software Matrix */}
        <CertificationsSkills />

        {/* Interactive Drawing & LOD Sheet Estimator */}
        <BimLodCalculator />

        {/* Contact & Hiring Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenCvModal={() => setIsCvModalOpen(true)} 
      />

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* ATS Printable & Shareable CV Modal */}
      <PrintableCvModal 
        isOpen={isCvModalOpen} 
        onClose={() => setIsCvModalOpen(false)} 
      />
    </div>
  );
}
