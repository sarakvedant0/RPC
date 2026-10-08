import React from 'react';
import { RPC_MILESTONES } from '../data/rpcHeritage';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';

export const HeritageTimeline: React.FC = () => {
  return (
    <section id="heritage" className="py-20 bg-[#04070e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              ACHIEVEMENTS & TIMELINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Milestones of the Rocket Propulsion Centre
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Key milestones in student rocketry, motor casting, static test stand development, and sounding rocket campaigns at COEP Technological University.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
          {RPC_MILESTONES.map((m, idx) => (
            <div key={idx} className="relative pl-8 md:pl-10">
              {/* Year Marker on Left */}
              <div className="md:absolute md:-left-32 md:w-24 md:text-right text-xs font-mono font-bold text-amber-400 mb-2 md:mb-0">
                {m.year}
              </div>

              {/* Node dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-[#04070e]" />

              <div className="p-6 bg-[#070b14] border border-slate-800/90 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white font-heading">
                    {m.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">
                    <span className="text-slate-500">{m.statLabel}: </span>
                    <span className="text-emerald-400 font-semibold">{m.statValue}</span>
                  </div>
                </div>

                <div className="text-xs text-amber-400/80 font-mono mb-3">
                  {m.subtitle}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
