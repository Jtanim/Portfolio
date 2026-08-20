import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BimViewerClashExplorer } from './components/BimViewerClashExplorer';
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

        {/* Interactive BIM Coordination & Navisworks Clash Lab */}
        <BimViewerClashExplorer />

        {/* Featured Mega-Projects Showcase */}
        <ProjectsShowcase 
          onSelectProject={(proj) => setSelectedProject(proj)} 
        />

        {/* 6 Core MEP BIM Capabilities */}
        <ServicesGrid />

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
