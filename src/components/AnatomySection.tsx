import React, { useState } from 'react';
import { ROCKET_COMPONENTS } from '../data/anatomyData';
import { RocketComponentPart } from '../types';
import { Layers, ChevronRight } from 'lucide-react';

export const AnatomySection: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<RocketComponentPart>(ROCKET_COMPONENTS[0]);

  return (
    <section id="anatomy" className="py-20 bg-[#03060c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              VEHICLE BLUEPRINT & HARDWARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Sounding Rocket Subassembly Anatomy
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Detailed breakdown of our 10,000 ft flight vehicle: filament-wound composites, dual-deployment recovery rigging, SRAD solid motor casing, and redundant avionics bays.
          </p>
        </div>

        {/* Interactive Aerospace Component Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#060a14] border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Left Column: Component Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>EXPLORE VEHICLE STAGES (9 COMPONENTS)</span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-2">
              {ROCKET_COMPONENTS.map((comp) => {
                const isSelected = selectedComp.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComp(comp)}
                    className={`w-full text-left p-3 rounded-lg font-mono text-xs transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold shadow-sm'
                        : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-[10px] text-slate-500 uppercase">{comp.subsystem}</div>
                      <div className="truncate text-white text-xs mt-0.5">{comp.name}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Component Engineering Dossier */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#04070f] border border-slate-800/80 rounded-xl p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3 pb-3 border-b border-slate-800">
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  {selectedComp.subsystem}
                </span>
                <span className="text-slate-500">STAGE INDEX: {selectedComp.id.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white mb-3">
                {selectedComp.name}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedComp.description}
              </p>

              {/* Technical Specifications Callout */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg mb-6 font-mono text-xs">
                <span className="text-slate-500 block text-[10px] uppercase mb-1">DESIGN PARAMETERS & INTEGRATION</span>
                <span className="text-amber-300 font-medium leading-relaxed">{selectedComp.specs}</span>
              </div>
            </div>

            {/* Mass and Material Metallurgy Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">MATERIAL COMPOSITION</span>
                <span className="text-white font-medium mt-1 block truncate">{selectedComp.material}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">SUBASSEMBLY MASS</span>
                <span className="text-amber-400 font-bold text-base mt-0.5 block tabular-nums">
                  {selectedComp.massKg} <span className="text-xs font-normal text-slate-400">KG</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
