import React from 'react';
import { PARTNERS } from '../data/rpcHeritage';
import { ShieldCheck } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section id="sponsors" className="py-20 bg-[#03060c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
            COLLABORATIONS & SUPPORTERS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-3">
            Academic & Industry Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Student rocketry and propulsion research supported by COEP university infrastructure, alumni mentorship, and engineering software suites.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#060a14] border border-slate-800/80 rounded-xl flex flex-col items-center text-center justify-center hover:border-slate-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs font-bold text-slate-200 font-heading">
                {partner.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">
                {partner.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
