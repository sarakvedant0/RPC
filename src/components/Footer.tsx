import React from 'react';
import { ArrowUp, Rocket, ExternalLink, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020408] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Col 1: Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Rocket className="w-3.5 h-3.5" />
              </div>
              <div className="font-heading font-bold text-base text-white">
                ROCKET PROPULSION CENTRE
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              Official student aerospace engineering and propulsion research team at COEP Technological University, Pune. Dedicated to indigenous sounding rockets, composite solid motors, and experimental propulsion testing.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              COEP Technological University · Est. 1854 · Autonomous Public University
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="text-xs font-mono text-white font-semibold uppercase mb-3">
              EXPLORE
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About the Centre
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">
                  Rocket Projects
                </a>
              </li>
              <li>
                <a href="#subsystems" className="hover:text-amber-400 transition-colors">
                  Engineering Subsystems
                </a>
              </li>
              <li>
                <a href="#anatomy" className="hover:text-amber-400 transition-colors">
                  Vehicle Anatomy
                </a>
              </li>
              <li>
                <a href="#propulsion" className="hover:text-amber-400 transition-colors">
                  Test Bench & CFD
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-amber-400 transition-colors">
                  Milestones
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Campus */}
          <div>
            <div className="text-xs font-mono text-white font-semibold uppercase mb-3">
              HEADQUARTERS
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                Department of Mechanical Engineering, COEP Technological University,
                Wellesley Road, Shivajinagar, Pune 411005, India
              </p>
              <p className="text-amber-400 font-mono">
                rpc@coeptech.ac.in
              </p>
              <div className="pt-2">
                <a
                  href="https://www.coeptech.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                >
                  <span>coeptech.ac.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 font-mono text-center sm:text-left">
            © {new Date().getFullYear()} Rocket Propulsion Centre, COEP Technological University. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
