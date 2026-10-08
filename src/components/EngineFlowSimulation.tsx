import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Flame, Gauge, Zap, Wind, RotateCcw } from 'lucide-react';

export const EngineFlowSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Engine inputs
  const [chamberPressureMpa, setChamberPressureMpa] = useState<number>(3.8); // 2.0 to 6.5 MPa
  const [mixtureRatio, setMixtureRatio] = useState<number>(1.45); // O/F ratio: 1.1 to 2.2
  const [expansionRatio, setExpansionRatio] = useState<number>(12.5); // Ae / At: 6 to 24

  // Thermodynamic calculations based on isentropic 1D gas dynamics
  // For LOX / Ethanol (gamma ~ 1.22, M_mol ~ 22.4 g/mol)
  const gamma = 1.22;
  const throatAreaMm2 = 1850; // Throat area in mm²

  // Flame temperature based on O/F ratio (peak around 1.5)
  const flameTempK = Math.round(
    3250 - Math.pow(mixtureRatio - 1.5, 2) * 1200 + (chamberPressureMpa - 3.8) * 45
  );

  // Characteristic velocity c* (m/s)
  const cStar = Math.round(1680 + Math.sqrt(flameTempK) * 4.2);

  // Exit Mach number from expansion ratio
  const exitMach = parseFloat(
    (1 + 0.92 * Math.pow(expansionRatio, 0.45)).toFixed(2)
  );

  // Thrust coefficient Cf
  const thrustCoeff = parseFloat(
    (
      Math.sqrt(
        ((2 * Math.pow(gamma, 2)) / (gamma - 1)) *
          Math.pow(2 / (gamma + 1), (gamma + 1) / (gamma - 1)) *
          (1 - Math.pow(1 / (chamberPressureMpa * 10), (gamma - 1) / gamma))
      ) + 0.35
    ).toFixed(2)
  );

  // Thrust in kN: F = Cf * Pc * At
  const thrustKn = parseFloat(
    ((thrustCoeff * (chamberPressureMpa * 1e6) * (throatAreaMm2 * 1e-6)) / 1000).toFixed(1)
  );

  // Specific impulse Isp (s): c* * Cf / g0
  const ispSec = Math.round((cStar * thrustCoeff) / 9.80665);

  // Exit velocity (m/s): Isp * g0
  const exitVelocityMs = Math.round(ispSec * 9.80665);

  // Flow expansion status (Over-expanded vs Optimum vs Under-expanded)
  const exitPressureBar = parseFloat(
    ((chamberPressureMpa * 10) / Math.pow(1 + 0.5 * (gamma - 1) * Math.pow(exitMach, 2), gamma / (gamma - 1))).toFixed(2)
  );

  let flowRegime = 'OPTIMAL EXPANSION';
  if (exitPressureBar < 0.85) flowRegime = 'OVER-EXPANDED (FLOW SEPARATION)';
  else if (exitPressureBar > 1.2) flowRegime = 'UNDER-EXPANDED (EXTERNAL EXPANSION)';

  // Particle simulation for nozzle flow
  interface FlowParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: 'fuel' | 'oxidizer' | 'combustion' | 'exhaust';
    life: number;
  }

  const particlesRef = useRef<FlowParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Particle array initialization
    const particles = particlesRef.current;

    const render = () => {
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      const centerY = height / 2;
      const chamberLeft = 60;
      const chamberWidth = 140;
      const throatX = chamberLeft + chamberWidth;
      const nozzleLength = 220;
      const nozzleExitX = throatX + nozzleLength;

      const chamberRadius = 75;
      const throatRadius = 24;
      const exitRadius = Math.min(
        110,
        throatRadius * Math.sqrt(expansionRatio * 0.45)
      );

      // 1. Draw De Laval Nozzle Wall Contours & Regenerative Cooling Jacket
      ctx.save();

      // Regenerative cooling jacket outer wall (Copper outer rim)
      ctx.beginPath();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Upper wall contour
      ctx.beginPath();
      ctx.moveTo(chamberLeft, centerY - chamberRadius);
      ctx.lineTo(chamberLeft + chamberWidth * 0.7, centerY - chamberRadius);
      // Converging section to throat
      ctx.bezierCurveTo(
        chamberLeft + chamberWidth,
        centerY - chamberRadius,
        throatX - 25,
        centerY - throatRadius,
        throatX,
        centerY - throatRadius
      );
      // Diverging bell section (Rao Parabola)
      ctx.bezierCurveTo(
        throatX + 35,
        centerY - throatRadius,
        throatX + nozzleLength * 0.6,
        centerY - exitRadius * 0.85,
        nozzleExitX,
        centerY - exitRadius
      );
      ctx.stroke();

      // Lower wall contour
      ctx.beginPath();
      ctx.moveTo(chamberLeft, centerY + chamberRadius);
      ctx.lineTo(chamberLeft + chamberWidth * 0.7, centerY + chamberRadius);
      ctx.bezierCurveTo(
        chamberLeft + chamberWidth,
        centerY + chamberRadius,
        throatX - 25,
        centerY + throatRadius,
        throatX,
        centerY + throatRadius
      );
      ctx.bezierCurveTo(
        throatX + 35,
        centerY + throatRadius,
        throatX + nozzleLength * 0.6,
        centerY + exitRadius * 0.85,
        nozzleExitX,
        centerY + exitRadius
      );
      ctx.stroke();

      // Inner heat-resistant coating line (Titanium Inconel)
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(chamberLeft, centerY - chamberRadius + 4);
      ctx.lineTo(chamberLeft + chamberWidth * 0.7, centerY - chamberRadius + 4);
      ctx.bezierCurveTo(
        chamberLeft + chamberWidth,
        centerY - chamberRadius + 4,
        throatX - 25,
        centerY - throatRadius + 4,
        throatX,
        centerY - throatRadius + 4
      );
      ctx.bezierCurveTo(
        throatX + 35,
        centerY - throatRadius + 4,
        throatX + nozzleLength * 0.6,
        centerY - exitRadius * 0.85 + 4,
        nozzleExitX,
        centerY - exitRadius + 4
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(chamberLeft, centerY + chamberRadius - 4);
      ctx.lineTo(chamberLeft + chamberWidth * 0.7, centerY + chamberRadius - 4);
      ctx.bezierCurveTo(
        chamberLeft + chamberWidth,
        centerY + chamberRadius - 4,
        throatX - 25,
        centerY + throatRadius - 4,
        throatX,
        centerY + throatRadius - 4
      );
      ctx.bezierCurveTo(
        throatX + 35,
        centerY + throatRadius - 4,
        throatX + nozzleLength * 0.6,
        centerY + exitRadius * 0.85 - 4,
        nozzleExitX,
        centerY + exitRadius - 4
      );
      ctx.stroke();

      // Coaxial Pintle Injector Dome (Left boundary)
      ctx.fillStyle = '#334155';
      ctx.fillRect(chamberLeft - 25, centerY - chamberRadius, 25, chamberRadius * 2);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(chamberLeft - 25, centerY - chamberRadius, 25, chamberRadius * 2);

      // Injector Pintle Needle
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(chamberLeft - 5, centerY - 10, 18, 20);

      // 2. Spawn and update flow particles
      // Spawn fuel (green/yellow) & oxidizer (blue/cyan) from pintle head
      for (let s = 0; s < 4; s++) {
        particles.push({
          x: chamberLeft + 10,
          y: centerY + (Math.random() - 0.5) * (chamberRadius * 0.6),
          vx: 2 + Math.random() * 2,
          vy: (Math.random() - 0.5) * 1.5,
          type: Math.random() > 0.4 ? 'combustion' : 'oxidizer',
          life: 1.0,
        });
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Velocity increases dramatically through nozzle throat into supersonic exit
        if (p.x < throatX) {
          // Subsonic converging acceleration
          const frac = (p.x - chamberLeft) / (throatX - chamberLeft);
          p.vx = 2.5 + frac * 4.5 * (chamberPressureMpa / 3.0);
        } else if (p.x >= throatX && p.x < nozzleExitX) {
          // Supersonic diverging acceleration (Mach 1 -> Mach 3+)
          const frac = (p.x - throatX) / nozzleLength;
          p.vx = 7.0 + frac * (exitMach * 3.5);
          // Divergence expansion in Y
          p.vy += (p.y - centerY) * 0.015;
        } else {
          // Exhaust plume downstream of nozzle bell
          p.vx += 0.4;
          p.life -= 0.035;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Particle rendering
        let pColor = '#38bdf8'; // Blue oxidizer
        let pRadius = 2.2;

        if (p.x > chamberLeft + 40 && p.x < throatX) {
          pColor = '#f59e0b'; // High temp combustion gas
          pRadius = 2.8;
        } else if (p.x >= throatX && p.x < nozzleExitX) {
          pColor = '#ffffff'; // White-hot sonic throat
          pRadius = 2.4;
        } else if (p.x >= nozzleExitX) {
          pColor = '#ea580c'; // Radiant orange exhaust plume
          pRadius = 3.2;
        }

        ctx.fillStyle = pColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pRadius, 0, Math.PI * 2);
        ctx.fill();

        if (p.x > width + 40 || p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // 3. Supersonic Shock Diamonds (Mach Discs) downstream of nozzle exit
      if (nozzleExitX < width - 100) {
        const diamondCount = 4;
        const diamondSpacing = 38 * (chamberPressureMpa / 3.5);

        for (let d = 1; d <= diamondCount; d++) {
          const dx = nozzleExitX + d * diamondSpacing;
          const dy = centerY;
          const size = 18 / (d * 0.7);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(dx - size, dy);
          ctx.lineTo(dx, dy - size * 0.7);
          ctx.lineTo(dx + size, dy);
          ctx.lineTo(dx, dy + size * 0.7);
          ctx.closePath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.restore();
        }
      }

      // Annotations: Mach number stations along nozzle axis
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('INJECTOR (M ≈ 0.1)', chamberLeft - 20, height - 20);
      ctx.fillText('THROAT (M = 1.0 SONIC)', throatX - 45, height - 20);
      ctx.fillText(`EXIT (M = ${exitMach} SUPERSONIC)`, nozzleExitX - 40, height - 20);

      ctx.restore();
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [chamberPressureMpa, mixtureRatio, expansionRatio, exitMach]);

  return (
    <div className="w-full bg-[#040812] border border-slate-800 rounded-xl overflow-hidden p-6 text-slate-100">
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1">
            <Flame className="w-4 h-4" />
            <span>RPC PROPULSION LABORATORY · CFD NOZZLE DYNAMICS</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
            Regenerative Liquid Combustion & Supersonic Expansion
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {flowRegime}
          </span>
        </div>
      </div>

      {/* Main Interactive Cross-Section Canvas */}
      <div className="relative my-6 w-full h-[360px] bg-[#060a12] border border-slate-800/90 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded border border-slate-800">
          Cross-Section: Copper Liner · 72 Helical Cooling Ribs · Pintle Atomization
        </div>
      </div>

      {/* Thermodynamic Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 font-mono text-xs">
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">ENGINE THRUST (F)</div>
          <div className="text-lg font-bold text-white mt-0.5">
            {thrustKn} <span className="text-[10px] text-slate-400">kN</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">SPECIFIC IMPULSE (Isp)</div>
          <div className="text-lg font-bold text-amber-400 mt-0.5">
            {ispSec} <span className="text-[10px] text-slate-400">sec</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">EXIT VELOCITY (ve)</div>
          <div className="text-lg font-bold text-white mt-0.5">
            {exitVelocityMs} <span className="text-[10px] text-slate-400">m/s</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">FLAME TEMP (Tc)</div>
          <div className="text-lg font-bold text-rose-400 mt-0.5">
            {flameTempK} <span className="text-[10px] text-slate-400">K</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">EXIT MACH (Me)</div>
          <div className="text-lg font-bold text-cyan-400 mt-0.5">
            M {exitMach}
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase">C* VELOCITY</div>
          <div className="text-lg font-bold text-white mt-0.5">
            {cStar} <span className="text-[10px] text-slate-400">m/s</span>
          </div>
        </div>
      </div>

      {/* Engineer Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono">
        {/* Slider 1: Chamber Pressure */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>CHAMBER PRESSURE (Pc)</span>
            </span>
            <span className="text-amber-400 font-bold">{chamberPressureMpa.toFixed(1)} MPa</span>
          </div>
          <input
            type="range"
            min="2.0"
            max="6.5"
            step="0.1"
            value={chamberPressureMpa}
            onChange={(e) => setChamberPressureMpa(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>2.0 MPa (Low)</span>
            <span>6.5 MPa (Max MEOP)</span>
          </div>
        </div>

        {/* Slider 2: Mixture Ratio O/F */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROPELLANT RATIO (O/F)</span>
            </span>
            <span className="text-cyan-400 font-bold">{mixtureRatio.toFixed(2)} : 1</span>
          </div>
          <input
            type="range"
            min="1.1"
            max="2.2"
            step="0.05"
            value={mixtureRatio}
            onChange={(e) => setMixtureRatio(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>1.10 (Fuel-Rich)</span>
            <span>2.20 (Oxidizer-Rich)</span>
          </div>
        </div>

        {/* Slider 3: Area Expansion Ratio */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-rose-400" />
              <span>NOZZLE RATIO (Ae / At)</span>
            </span>
            <span className="text-rose-400 font-bold">{expansionRatio.toFixed(1)} : 1</span>
          </div>
          <input
            type="range"
            min="6.0"
            max="24.0"
            step="0.5"
            value={expansionRatio}
            onChange={(e) => setExpansionRatio(parseFloat(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>6.0 (Sea-Level)</span>
            <span>24.0 (Vacuum Contour)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
