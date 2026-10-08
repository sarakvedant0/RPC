import { RocketComponentPart } from '../types';

export const ROCKET_COMPONENTS: RocketComponentPart[] = [
  {
    id: 'nose-cone',
    name: 'von Kármán Aerodynamic Nose Cone',
    subsystem: 'Aerodynamics & Recovery',
    material: 'Precision Hand-Laid Fiberglass & High-Temp Epoxy',
    massKg: 0.85,
    specs: '5:1 Length-to-Diameter Ratio · RF-Transparent for Internal GPS Antenna',
    description:
      'Engineered with a low-drag von Kármán mathematical profile to minimize wave drag during transonic ascent. Fabricated from RF-transparent fiberglass to enable clear GPS satellite reception for the onboard tracking receiver housed in the tip.',
    yOffset: 3.2,
  },
  {
    id: 'payload-bay',
    name: '3U Scientific Atmospheric Payload',
    subsystem: 'Scientific Research',
    material: 'Anodized 6061-T6 Aluminum Rails & 3D Printed PETG Structure',
    massKg: 2.1,
    specs: '3U CubeSat Standard Form Factor (100 × 100 × 340 mm) · 4.0 kg Max Mass',
    description:
      'Houses the student scientific research experiment. Features barometric air density sensors, 3-axis magnetic magnetometer, multi-gas air pollution analyzers, and autonomous data logging at 100 Hz.',
    yOffset: 2.4,
  },
  {
    id: 'avionics-bay',
    name: 'Dual Redundant Flight Avionics Bay (e-Bay)',
    subsystem: 'Avionics & Telemetry',
    material: 'Polycarbonate Bulkheads & Aluminum Threaded Stand-offs',
    massKg: 0.95,
    specs: 'Dual Independent Baro-Altimeters · 6-DOF IMU · 433 MHz LoRa Telemetry Transmitter',
    description:
      'The electronic brain of the sounding rocket. Contains two independent flight computers powered by separate lithium polymer battery packs. Monitors apogee detection via barometric pressure and IMU acceleration, arming pyrotechnic recovery channels with failsafe logic.',
    yOffset: 1.6,
  },
  {
    id: 'drogue-recovery',
    name: 'Drogue Parachute Deployment Bay',
    subsystem: 'Recovery Systems',
    material: 'Ripstop 1.1 oz Nylon & 1/2 in Tubular Kevlar Harness',
    massKg: 0.65,
    specs: '18 in Hemispherical Drogue · 0.85g Black Powder Energetic Ejection Charge',
    description:
      'Deploys immediately at detected apogee (10,000 ft) to stabilize the vehicle and control initial descent at approximately 22 m/s, preventing ballistic lawn-darting while minimizing wind drift.',
    yOffset: 0.8,
  },
  {
    id: 'airframe-coupler',
    name: 'Airframe Coupler & External Arming Band',
    subsystem: 'Structures & Mechanical',
    material: 'Toray T700 Filament-Wound Carbon Fiber & 6061-T6 Aluminum',
    massKg: 0.72,
    specs: '102 mm Outer Diameter · 4x Precision Delrin Shear Pins · Safety Arming Key',
    description:
      'Structural joint coupling the forward avionics section to the aft recovery and booster tube. Incorporates an external switch band with magnetic and rotary arming switches for ground crew safety before launch pad arming.',
    yOffset: 0.0,
  },
  {
    id: 'main-recovery',
    name: 'Main Parachute Recovery Bay',
    subsystem: 'Recovery Systems',
    material: 'Zero-Porosity Ripstop Nylon & Heavy-Duty Deployment Bag',
    massKg: 1.45,
    specs: '72 in Toroidal Main Chute · Deployment at 1,000 ft AGL · Descent Rate 5.8 m/s',
    description:
      'Deploys at 1,000 ft above ground level via a secondary pyrotechnic ejection charge. Opens gently using a deployment bag to ensure smooth inflation, decelerating the entire 14 kg vehicle to a safe landing velocity of under 6 m/s.',
    yOffset: -0.8,
  },
  {
    id: 'motor-casing',
    name: 'SRAD Class-H Solid Motor Casing',
    subsystem: 'Propulsion',
    material: 'Seamless 6061-T6 Aluminum Alloy Casing · Phenolic Liner',
    massKg: 2.8,
    specs: '75 mm Outer Diameter · 4.6s Burn Duration · Hydro-Tested to 12.0 MPa',
    description:
      'Precision machined casing housing the APCP composite propellant grains. Features a high-temperature phenolic insulating sleeve and forward closure with threaded retention retaining the combustion pressure safely.',
    yOffset: -1.6,
  },
  {
    id: 'graphite-nozzle',
    name: 'Supersonic Converging-Diverging Graphite Nozzle',
    subsystem: 'Propulsion',
    material: 'High-Density Isomolded Graphite & High-Temp Silicone O-Rings',
    massKg: 0.62,
    specs: '18 mm Throat Diameter · 15° Conical Divergence · Mach 2.4 Exhaust Velocity',
    description:
      'Erosion-resistant graphite nozzle engineered to expand combustion gases from 4.5 MPa chamber pressure to atmospheric ambient, producing 1,250 N peak thrust with minimal throat enlargement during the burn.',
    yOffset: -2.4,
  },
  {
    id: 'fin-can',
    name: 'Beveled Trailing Fin Can & Tailcone',
    subsystem: 'Aerodynamics & Structures',
    material: '4 mm Solid Carbon Fiber Plate & CNC Aluminum Retainer Ring',
    massKg: 1.1,
    specs: 'Clip-Delta Fin Profile · Flutter Velocity > Mach 1.5 · Static Margin 2.3 Calibers',
    description:
      'Four beveled fins through-the-wall mounted directly to the internal motor casing using structural aerospace epoxy and carbon-fiber tip-to-tip layups. Provides passive aerodynamic stability and prevents fin flutter throughout the flight envelope.',
    yOffset: -3.2,
  },
];
