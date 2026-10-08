import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export interface CoverflowItem {
  id: string;
  badge: string;
  subtitle: string;
  title: string;
  description: string;
  imageSrc: string;
  specs: string;
}

const SLIDER_ITEMS: CoverflowItem[] = [
  {
    id: 'irec-vehicle',
    badge: 'ROCKET VEHICLE',
    subtitle: '10,000 FT SOUNDING ROCKET',
    title: 'IREC 10K Flight Vehicle',
    description:
      'Sounding rocket engineered by the Rocket Propulsion Centre, COEP Technological University for the Intercollegiate Rocket Engineering Competition (IREC). Constructed with wet filament-wound carbon fiber airframe, supersonic phenolic fins, and dual-deploy drogue and main recovery parachutes.',
    imageSrc: '/src/assets/images/rpc_irec_sounding_rocket_1791406272747.jpg',
    specs: 'Target Altitude: 10,000 ft AGL · Airframe: Carbon Fiber · Recovery: Dual Parachute',
  },
  {
    id: 'srad-payload',
    badge: 'SYSTEMS',
    subtitle: 'SRAD 10K SCIENTIFIC PAYLOAD',
    title: 'System Payload Integration',
    description:
      'Student Researched and Developed (SRAD) 3U cubesat form-factor payload bay. Features atmospheric air-quality telemetry, 6-axis IMU logging at 500 Hz, and redundant radio telemetry transmitter.',
    imageSrc: '/src/assets/images/rpc_payload_systems_table_1791406285391.jpg',
    specs: 'Form Factor: 3U CubeSat · Sensors: Atmospheric & High-G IMU · Downlink: 433 MHz Telemetry',
  },
  {
    id: 'static-hotfire',
    badge: 'PROPULSION',
    subtitle: 'SRAD CLASS-H MOTOR',
    title: 'Static Hot Fire Motor Campaign',
    description:
      'Full-duration static firing of the composite propellant motor on the COEP propulsion test bench. Verified combustion chamber pressure curves, graphite supersonic throat integrity, and thrust profile.',
    imageSrc: '/src/assets/images/rpc_team_static_test_1791406297888.jpg',
    specs: 'Total Impulse: 54,200 N·s · Peak Thrust: 7.8 kN · Casing: Toray T700 Filament Wound',
  },
  {
    id: 'launchpad-gse',
    badge: 'OPERATIONS',
    subtitle: 'GROUND SUPPORT EQUIPMENT (GSE)',
    title: 'Launchpad Assembly Operations',
    description:
      'Launchpad ground support systems, umbilical tower erection, remote pneumatic fill line integration, and competition flight safety review with university faculty and range officers.',
    imageSrc: '/src/assets/images/rpc_launchpad_assembly_team_1791406308585.jpg',
    specs: 'Range Safety: Fail-Safe Nitrogen Purge · GSE: Mobile Pneumatic Control Cart',
  },
  {
    id: 'ignis-combustion',
    badge: 'PROPULSION',
    subtitle: 'REGENERATIVE LIQUID ENGINE',
    title: 'Ignis V1 Combustion Chamber',
    description:
      'Regeneratively cooled liquid rocket engine developed at the COEP Propulsion Laboratory. Electroformed copper alloy liner with micro-milled cooling channels burning LOX and high-purity ethanol.',
    imageSrc: '/src/assets/images/engine_combustion_macro_1791403785825.jpg',
    specs: 'Thrust: 12.4 kN · Chamber Pressure: 3.8 MPa · Cooling: 72 Helical Regenerative Channels',
  },
  {
    id: 'transonic-flight',
    badge: 'AERODYNAMICS',
    subtitle: 'TRANSONIC SOUNDING TEST',
    title: 'Atmospheric Flight Envelope',
    description:
      'Sounding rocket punching through mid-level cloud layer during proving flights, demonstrating aerodynamic stability and passive fin roll damping at Mach 1.4.',
    imageSrc: '/src/assets/images/rocket_through_clouds_1791403796261.jpg',
    specs: 'Mach Number: Mach 1.4 · Drag Coefficient: Cd < 0.28 · Stability: 2.1 Calibers',
  },
];

export const CoverflowSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [modalItem, setModalItem] = useState<CoverflowItem | null>(null);

  const total = SLIDER_ITEMS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Keyboard arrow keys navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (modalItem) {
        if (e.key === 'Escape') setModalItem(null);
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalItem]);

  return (
    <section id="hardware-slider" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          RPC FLIGHT ARCHIVES & HARDWARE
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
          Active Vehicles & Research Systems
        </h2>
      </div>

      {/* 3D Coverflow Viewport Container */}
      <div className="relative h-[480px] sm:h-[520px] w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
        {SLIDER_ITEMS.map((item, idx) => {
          // Calculate cyclic offset relative to active card
          let offset = idx - currentIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // 3D Coverflow transform math
          const translateX = offset * 260; // spacing
          const translateZ = isCenter ? 60 : -140 - Math.abs(offset) * 80;
          const rotateY = offset * -28; // angle towards center
          const scale = isCenter ? 1.05 : 0.85;
          const opacity = isCenter ? 1 : Math.max(0.3, 0.75 - Math.abs(offset) * 0.25);
          const zIndex = 20 - Math.abs(offset) * 5;

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isCenter) setModalItem(item);
                else setCurrentIndex(idx);
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              className={`absolute w-[290px] sm:w-[340px] h-[400px] sm:h-[440px] bg-[#070e1c] rounded-2xl p-4 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer ${
                isCenter
                  ? 'border-2 border-cyan-500/80 shadow-[0_0_35px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                  : 'border border-slate-800/90 shadow-xl hover:border-slate-700'
              }`}
            >
              {/* Card Image Area */}
              <div className="relative w-full h-[240px] sm:h-[270px] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold px-2.5 py-1 rounded-md text-slate-200 border border-slate-700/60 uppercase">
                  {item.badge}
                </div>

                {/* Center Card Lightbox Button */}
                {isCenter && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalItem(item);
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-black/75 backdrop-blur-md rounded-lg text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                    title="Expand View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Card Text Footer Area */}
              <div className="pt-3 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1 truncate">
                    {item.subtitle}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-white truncate">
                    {item.title}
                  </h3>
                </div>

                <div className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Controls (Arrow Buttons & Pagination Indicator matching image.png) */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-md cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Pagination Indicator [ — • • • • ] */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-full">
          {SLIDER_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === currentIndex
                  ? 'w-6 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                  : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-md cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Fullscreen Inspection Lightbox Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative max-w-3xl w-full bg-[#070e1c] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={modalItem.imageSrc}
                alt={modalItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                {modalItem.subtitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
                {modalItem.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {modalItem.description}
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-amber-300">
                {modalItem.specs}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
