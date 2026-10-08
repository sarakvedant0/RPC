import React from 'react';
import { EngineFlowSimulation } from './EngineFlowSimulation';
import { Flame, Activity, ShieldCheck, Gauge, Cpu } from 'lucide-react';

export const PropulsionLabSection: React.FC = () => {
  return (
    <section id="propulsion" className="py-20 bg-[#04070e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              PROPULSION TESTING & SIMULATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Static Motor Test Bench & Nozzle Flow Lab
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Experimental thermodynamics, solid motor static hot-fire characterization, and supersonic de Laval nozzle CFD simulation at COEP Technological University.
          </p>
        </div>

        {/* Engine Flow Simulation Interactive Component */}
        <EngineFlowSimulation />

        {/* Test Stand Specifications & Operational Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 bg-[#060a14] border border-slate-800 rounded-xl">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>TEST STAND INSTRUMENTATION & DAQ</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-3">
              10 kHz High-Speed Data Acquisition System
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              The RPC static motor test bench (P-Bench) is equipped with precision S-type strain-gauge load cells and piezoresistive pressure transducers connected to a National Instruments DAQ chassis. This allows the team to capture millisecond-accurate thrust-time curves, chamber pressure profiles, and total impulse values for every static motor burn.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">MAX THRUST RATING</span>
                <span className="text-white font-bold">10 kN Test Rig</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">SAMPLING FREQUENCY</span>
                <span className="text-amber-400 font-bold">10,000 Samples/sec</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#060a14] border border-slate-800 rounded-xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RANGE SAFETY & FIRING SEQUENCER</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-3">
              Automated Electronic Ignition & Remote Abort
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Safety is paramount during all propulsion testing. Our firing console features dual-key physical interlocks, continuity verify circuits, and an automated electronic countdown sequencer operated from a designated 100-meter safety perimeter. An automated emergency abort interlock instantly disarms the ignition line if anomalous pressure spikes are detected.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">SAFE STANDOFF</span>
                <span className="text-white font-bold">100m Remote Link</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">INTERLOCK SAFETY</span>
                <span className="text-cyan-400 font-bold">Dual-Key Failsafe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
