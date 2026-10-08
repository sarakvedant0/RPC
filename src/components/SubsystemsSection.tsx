import React from 'react';
import { RESEARCH_SUBSYSTEMS } from '../data/rpcHeritage';
import { Flame, Cpu, Shield, Wind, Compass, Activity } from 'lucide-react';

export const SubsystemsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    propulsion: <Flame className="w-5 h-5 text-amber-400" />,
    avionics: <Cpu className="w-5 h-5 text-cyan-400" />,
    structures: <Shield className="w-5 h-5 text-emerald-400" />,
    aerodynamics: <Wind className="w-5 h-5 text-purple-400" />,
    recovery: <Compass className="w-5 h-5 text-rose-400" />,
    'test-facilities': <Activity className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section id="subsystems" className="py-20 bg-[#03060c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              ENGINEERING DIVISIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Aerospace Subsystems & Research Labs
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Multi-disciplinary student engineering divisions across mechanical, metallurgy, electronics, and instrumentation faculties at COEP Technological University.
          </p>
        </div>

        {/* Subsystems Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_SUBSYSTEMS.map((sub) => (
            <div
              key={sub.id}
              className="p-6 bg-[#060a14] border border-slate-800 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    {iconMap[sub.id]}
                  </div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {sub.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {sub.focus}
                </p>

                <div className="text-[11px] font-mono text-slate-500 mb-6 bg-slate-950 p-2.5 rounded border border-slate-900">
                  {sub.specs}
                </div>
              </div>

              {/* Unboxed Metadata Metrics */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                {sub.metrics.map((m, idx) => (
                  <span key={idx} className={idx === 0 ? 'text-amber-300 font-semibold' : ''}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
