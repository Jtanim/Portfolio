import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Search, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  FileSpreadsheet,
  CheckCircle,
  Filter,
  Sparkles,
  Wind,
  Zap,
  Droplets,
  Flame
} from 'lucide-react';
import { selectedProjects } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return selectedProjects.filter((proj) => {
      // Category filter
      if (selectedCategory === 'hospitality' && proj.category !== 'Luxury Resort & Hotel' && proj.category !== 'Hospitality') {
        return false;
      }
      if (selectedCategory === 'residential' && proj.category !== 'Residential & Villas') {
        return false;
      }

      // Region filter
      if (selectedRegion === 'KSA' && proj.country !== 'Saudi Arabia') return false;
      if (selectedRegion === 'UAE' && proj.country !== 'UAE') return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = proj.title.toLowerCase().includes(q);
        const matchClient = (proj.client || '').toLowerCase().includes(q);
        const matchLoc = proj.location.toLowerCase().includes(q);
        const matchScope = proj.scope.toLowerCase().includes(q);
        const matchSystems = proj.systemsCovered.some((s) => s.toLowerCase().includes(q));
        const matchSoftware = proj.softwareUsed.some((s) => s.toLowerCase().includes(q));
        return matchTitle || matchClient || matchLoc || matchScope || matchSystems || matchSoftware;
      }

      return true;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  return (
    <section id="projects" className="py-24 bg-[#050505] border-b border-white/10 relative">
      {/* Background Watermark */}
      <div className="absolute top-10 left-10 opacity-[0.02] select-none pointer-events-none hidden md:block">
        <span className="text-[280px] font-black leading-none tracking-tighter text-white">
          ASSETS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-[10px] font-mono tracking-[0.25em] uppercase mb-4">
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Project Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              SELECTED PROJECTS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                MEGA-DEVELOPMENTS.
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-2xl font-light">
              High-profile luxury resorts, residential compounds, and infrastructure developments delivered across Saudi Arabia and the UAE.
            </p>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-[#0a0a0a] px-4 py-2 rounded-xl border border-white/10 self-start md:self-auto">
            Showing <span className="text-white font-bold">{filteredProjects.length}</span> of {selectedProjects.length} Key Projects
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0a0a] border border-white/10 mb-10 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category / Typology Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                All Typologies
              </button>
              <button
                onClick={() => setSelectedCategory('hospitality')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === 'hospitality'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                Resorts &amp; Hotels
              </button>
              <button
                onClick={() => setSelectedCategory('residential')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === 'residential'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                Residential
              </button>
            </div>

            {/* Region Filter & Search */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setSelectedRegion('all')}
                  className={`px-3 py-1 rounded uppercase tracking-wider ${selectedRegion === 'all' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                >
                  All Regions
                </button>
                <button
                  onClick={() => setSelectedRegion('KSA')}
                  className={`px-3 py-1 rounded uppercase tracking-wider ${selectedRegion === 'KSA' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                >
                  🇸🇦 KSA
                </button>
                <button
                  onClick={() => setSelectedRegion('UAE')}
                  className={`px-3 py-1 rounded uppercase tracking-wider ${selectedRegion === 'UAE' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                >
                  🇦🇪 UAE
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Revit, DGDA, HVAC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-neutral-900 border border-white/10 focus:border-white/40 rounded-lg text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 p-7 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header Tag Bar with Editorial numbering */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif italic text-lg text-neutral-400 group-hover:text-white transition-colors">
                      0{index + 1}.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white border border-white/20 uppercase tracking-widest">
                      {project.lodLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-white/10 uppercase">
                      {project.country === 'Saudi Arabia' ? '🇸🇦 KSA' : '🇦🇪 UAE'}
                    </span>
                  </div>

                  <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {project.location}
                  </span>
                </div>

                {/* Project Title & Client */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors tracking-tight font-serif italic">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">{project.subtitle}</p>
                  {project.client && (
                    <p className="text-xs text-neutral-400 mt-1">
                      <span className="text-neutral-500 font-mono uppercase tracking-wider text-[10px]">Client:</span> {project.client}
                    </p>
                  )}
                </div>

                {/* Scope Preview */}
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 font-light">
                  {project.scope}
                </p>

                {/* Disciplines Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.disciplines.map((disc, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-white/10"
                    >
                      {disc}
                    </span>
                  ))}
                </div>

                {/* Key Deliverable Highlights */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 space-y-1.5 text-xs text-neutral-300">
                  <div className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider">Key Achievements:</div>
                  {project.keyAchievements.slice(0, 2).map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300 font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                  <span>{project.role}</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono uppercase tracking-widest text-[10px] font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
