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
  Flame,
  CheckCircle2
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
    <section id="projects" className="py-20 bg-[#07090E] border-b border-white/[0.08] relative">
      
      {/* Background Subtle CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Flagship Mega-Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Selected Project Portfolio
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              Coordinated luxury resorts, residential multi-tower developments, and infrastructure assets across Saudi Arabia and the UAE.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-300 bg-[#0D111A] px-4 py-2 rounded-xl border border-white/[0.08] self-start md:self-auto">
            Showing <span className="text-cyan-300 font-bold">{filteredProjects.length}</span> of {selectedProjects.length} Key Projects
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="arch-panel p-4 mb-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setSelectedCategory('hospitality')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === 'hospitality'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                Resorts &amp; Hotels
              </button>
              <button
                onClick={() => setSelectedCategory('residential')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === 'residential'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                Residential &amp; High-Rise
              </button>
            </div>

            {/* Region Filter & Search */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1 bg-[#090D15] p-1 rounded-xl border border-white/[0.08] text-xs font-mono">
                <button
                  onClick={() => setSelectedRegion('all')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${selectedRegion === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  All Regions
                </button>
                <button
                  onClick={() => setSelectedRegion('KSA')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${selectedRegion === 'KSA' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  🇸🇦 Saudi Arabia
                </button>
                <button
                  onClick={() => setSelectedRegion('UAE')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${selectedRegion === 'UAE' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  🇦🇪 UAE
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by system, tool..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-[#090D15] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="arch-card p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Card Top Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {project.lodLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-white/[0.08]">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Project Title & Client */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight font-display">
                    {project.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    {project.client ? <span className="text-slate-300">Client: {project.client} • </span> : null}
                    <span className="text-slate-400">Role: {project.role}</span>
                  </div>
                </div>

                {/* Scope Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {project.scope}
                </p>

                {/* Key Achievements Bullet Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                  <div className="text-[11px] uppercase font-mono text-slate-400 font-semibold">Key Achievements:</div>
                  {project.keyAchievements.slice(0, 2).map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Disciplines Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.disciplines.map((disc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#090D15] text-slate-300 border border-white/[0.08]"
                    >
                      {disc}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  Timeline: <span className="text-slate-200 font-semibold">{project.period || 'Completed'}</span>
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer border border-white/[0.08]"
                >
                  <span>Deep-Dive Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
