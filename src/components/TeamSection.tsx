import React from 'react';
import { TEAM_MEMBERS } from '../data/rpcHeritage';
import { User, Award, BookOpen } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-[#04070e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              TEAM & MENTORSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Student Aerospace Engineers & Faculty Advisor
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            The dedicated undergraduate student team and faculty mentors driving design, structural fabrication, avionics development, and static hot-fire motor tests at COEP Tech.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#070b14] border border-slate-800 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    {member.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">COEP TECH</span>
                </div>

                <h3 className="text-lg font-bold text-white font-heading mb-1">
                  {member.name}
                </h3>
                <div className="text-xs font-medium text-slate-300 mb-1">
                  {member.role}
                </div>
                <div className="text-[11px] text-slate-400 mb-4 font-mono">
                  {member.department}
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 mb-4 text-xs">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">SPECIALIZATION</div>
                  <div className="text-slate-300 font-medium">{member.specialization}</div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.contributions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
