import React, { useState } from 'react';
import { RPC_PROJECTS, RocketProject } from '../data/projectsData';
import { ChevronRight, Gauge, Layers, ShieldCheck, Flame, Compass } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>('sounding-10k');
  const activeProject = RPC_PROJECTS.find((p) => p.id === activeProjectId) || RPC_PROJECTS[0];

  return (
    <section id="projects" className="py-20 bg-[#04070e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              PROJECTS & HARDWARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Sounding Rockets & Propulsion Systems
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Student researched, developed, and static-tested rocket vehicles, solid rocket motors, and instrumentation test stands at COEP Technological University.
          </p>
        </div>

        {/* Project Selector Segmented Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-lg w-fit mb-8 overflow-x-auto max-w-full">
          {RPC_PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setActiveProjectId(proj.id)}
              className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeProjectId === proj.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {proj.name}
            </button>
          ))}
        </div>

        {/* Project Showcase Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#070b14] border border-slate-800/90 rounded-2xl p-6 sm:p-8">
          {/* Left Column: Project Overview & Engineering Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Status and Category */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                <span className="text-emerald-400 font-semibold">{activeProject.status}</span>
                <span aria-hidden="true">·</span>
                <span>{activeProject.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">{activeProject.targetApogee}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-4">
                {activeProject.name}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                {activeProject.description}
              </p>

              {/* Engineering Highlights */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  SUBSYSTEM HIGHLIGHTS & CAPABILITIES
                </div>
                {activeProject.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Info Bar */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="text-slate-500">PROPULSION: </span>
                <span className="text-white font-medium">{activeProject.propulsion}</span>
              </div>
              <div>
                <span className="text-slate-500">DIMENSIONS: </span>
                <span className="text-amber-300 font-medium">{activeProject.diameter} × {activeProject.length}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Specifications Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#04070f] border border-slate-800/80 rounded-xl p-6">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  ENGINEERING METRICS
                </span>
                <span className="text-xs font-mono text-amber-400">SRAD SPECIFICATION</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {activeProject.specs.map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">{s.label}</div>
                    <div className="text-lg font-bold font-mono text-white mt-0.5">
                      {s.value} <span className="text-[11px] font-normal text-slate-400">{s.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>AIRFRAME: {activeProject.airframe}</span>
              <span className="text-emerald-400">VERIFIED BY COEP TECH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
