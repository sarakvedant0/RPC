import React from 'react';
import { Target, Compass, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#04070e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              ABOUT THE CENTRE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Rocket Propulsion Centre, COEP Tech
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            The premier student-led aerospace engineering and propulsion research team at COEP Technological University, Pune.
          </p>
        </div>

        {/* Overview & Mission Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main About Story */}
          <div className="lg:col-span-7 bg-[#070b14] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>COEP TECHNOLOGICAL UNIVERSITY · DEPARTMENT OF MECHANICAL ENGINEERING</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-4">
                Pioneering Hands-On Collegiate Rocketry in India
              </h3>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Established by undergraduate engineering students and faculty mentors at <strong>COEP Technological University</strong> (formerly College of Engineering Pune, est. 1854), the <strong>Rocket Propulsion Centre (RPC)</strong> is dedicated to designing, analyzing, manufacturing, and static-testing sounding rockets and advanced solid and hybrid rocket propulsion systems.
                </p>
                <p>
                  Drawing on COEP's rich history in aerospace engineering—most notably demonstrated by the celebrated <strong>SWAYAM satellite</strong> launched into orbit by ISRO—RPC bridges theoretical classroom thermodynamics, fluid dynamics, and composite materials science with physical, test-bench validated engineering hardware.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-800/80">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">ESTABLISHED</div>
                <div className="text-lg font-bold font-heading text-white mt-0.5">COEP Tech</div>
                <div className="text-[11px] text-slate-500">Pune, Maharashtra</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">METHODOLOGY</div>
                <div className="text-lg font-bold font-heading text-amber-400 mt-0.5">SRAD</div>
                <div className="text-[11px] text-slate-500">Student Researched</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">DISCIPLINES</div>
                <div className="text-lg font-bold font-heading text-cyan-400 mt-0.5">6 Teams</div>
                <div className="text-[11px] text-slate-500">Multi-disciplinary</div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#070b14] border border-slate-800 rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold font-heading text-white">Our Vision</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To establish COEP Technological University as a premier hub for collegiate sounding rocketry, indigenous propulsion systems, and experimental aerospace technologies, cultivating world-class engineers capable of driving India's expanding space ecosystem.
              </p>
            </div>

            <div className="bg-[#070b14] border border-slate-800 rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold font-heading text-white">Our Mission</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To indigenously engineer safe, flight-proven sounding rocket vehicles capable of reaching target apogees of 10,000+ ft, develop reliable composite solid and hybrid motors, and validate dual-deployment recovery and high-speed telemetry systems through rigorous testing.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#060a14] border border-slate-800 rounded-xl">
            <div className="text-xs font-mono text-amber-400 mb-2">01 · DESIGN & CAD</div>
            <h5 className="font-bold text-white text-sm mb-1 font-heading">High-Fidelity Simulation</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD) using ANSYS and SOLIDWORKS for aerodynamic and structural stability.
            </p>
          </div>

          <div className="p-5 bg-[#060a14] border border-slate-800 rounded-xl">
            <div className="text-xs font-mono text-amber-400 mb-2">02 · FABRICATION</div>
            <h5 className="font-bold text-white text-sm mb-1 font-heading">In-House Manufacturing</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wet filament winding of carbon fiber and fiberglass airframes, CNC-machined bulkheads, and precision motor casing manufacturing at COEP workshops.
            </p>
          </div>

          <div className="p-5 bg-[#060a14] border border-slate-800 rounded-xl">
            <div className="text-xs font-mono text-amber-400 mb-2">03 · STATIC TESTING</div>
            <h5 className="font-bold text-white text-sm mb-1 font-heading">Static Hot-Fire Test Rig</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proprietary test bench equipped with 10 kHz multi-axis load cells, chamber pressure transducers, and remote automated ignition abort sequences.
            </p>
          </div>

          <div className="p-5 bg-[#060a14] border border-slate-800 rounded-xl">
            <div className="text-xs font-mono text-amber-400 mb-2">04 · FLIGHT OPERATIONS</div>
            <h5 className="font-bold text-white text-sm mb-1 font-heading">Range & Recovery Operations</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dual-deployment drogue and main parachute systems, redundant barometric altimeters, 433 MHz LoRa ground station telemetry, and GPS tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
