export interface RocketProject {
  id: string;
  name: string;
  category: 'SOUNDING ROCKET' | 'SOLID MOTOR' | 'STATIC TEST STAND' | 'HYBRID RESEARCH';
  targetApogee: string;
  propulsion: string;
  airframe: string;
  burnTime: string;
  status: 'FLIGHT QUALIFIED' | 'STATIC FIRED' | 'ACTIVE TESTING' | 'FABRICATION';
  diameter: string;
  length: string;
  description: string;
  highlights: string[];
  specs: {
    label: string;
    value: string;
    unit: string;
  }[];
}

export const RPC_PROJECTS: RocketProject[] = [
  {
    id: 'sounding-10k',
    name: '10,000 ft Sounding Rocket Vehicle',
    category: 'SOUNDING ROCKET',
    targetApogee: '10,000 FT (3,048 M) AGL',
    propulsion: 'SRAD Class-H Composite Solid Motor',
    airframe: 'Filament Wound Carbon Fiber & Fiberglass',
    burnTime: '4.8 Seconds',
    status: 'FLIGHT QUALIFIED',
    diameter: '102 mm (4.0 in)',
    length: '2.45 Meters',
    description:
      'High-power sounding rocket engineered by the Rocket Propulsion Centre, COEP Technological University for collegiate rocketry challenges. Designed to ascend to 10,000 ft above ground level carrying a 3U scientific atmospheric research payload, followed by a precision dual-deployment parachute recovery sequence.',
    highlights: [
      'In-house filament-wound carbon fiber airframe tube with CNC 6061-T6 aluminum bulkheads',
      'Dual-deployment parachute recovery with drogue at apogee and main chute at 1,000 ft AGL',
      'Dual redundant flight computers logging 6-DOF IMU, barometric pressure, and GPS data',
      'Live 433 MHz LoRa ground station telemetry link with real-time altitude transmission',
    ],
    specs: [
      { label: 'TARGET APOGEE', value: '10,000', unit: 'FT AGL' },
      { label: 'PEAK VELOCITY', value: '0.88', unit: 'MACH' },
      { label: 'LIFTOFF MASS', value: '14.2', unit: 'KG' },
      { label: 'PAYLOAD MASS', value: '4.0', unit: 'KG (3U)' },
      { label: 'PEAK ACCELERATION', value: '12.4', unit: 'G' },
      { label: 'STABILITY MARGIN', value: '2.3', unit: 'CALIBERS' },
    ],
  },
  {
    id: 'solid-motor',
    name: 'SRAD Class-H Solid Rocket Motor',
    category: 'SOLID MOTOR',
    targetApogee: 'Static Hot-Fire Test Bench',
    propulsion: 'Ammonium Perchlorate Composite Propellant (APCP)',
    airframe: 'Seamless 6061-T6 Aluminum Casing',
    burnTime: '4.6 Seconds',
    status: 'STATIC FIRED',
    diameter: '75 mm Casing',
    length: '680 mm',
    description:
      'Student Researched and Developed (SRAD) solid rocket motor engineered and cast at the COEP Propulsion Laboratory. Features a BATES grain geometry, phenolic thermal liner, and supersonic converging-diverging graphite nozzle designed for optimal atmospheric expansion.',
    highlights: [
      'High-density BATES cylindrical propellant grain formulation with aluminum powder additives',
      'Precision CNC-turned graphite nozzle with 15° divergence half-angle',
      'Hydrostatically proof-tested to 12 MPa (1.5x maximum expected operating pressure)',
      'Characterized with multiple static hot-fire tests on the COEP instrumented test stand',
    ],
    specs: [
      { label: 'TOTAL IMPULSE', value: '3,840', unit: 'N·S' },
      { label: 'PEAK THRUST', value: '1,250', unit: 'N' },
      { label: 'AVERAGE THRUST', value: '835', unit: 'N' },
      { label: 'CHAMBER PRESSURE', value: '4.5', unit: 'MPA' },
      { label: 'SPECIFIC IMPULSE', value: '215', unit: 'SEC' },
      { label: 'PROPELLANT MASS', value: '1.82', unit: 'KG' },
    ],
  },
  {
    id: 'test-stand',
    name: 'Modular Static Test Stand (P-Bench)',
    category: 'STATIC TEST STAND',
    targetApogee: 'Ground Test Bunker',
    propulsion: 'Instrumented Multi-Axis Load Cell Stand',
    airframe: 'Structural Steel & Heavy Box Section Frame',
    burnTime: 'Up to 30 Seconds Firing',
    status: 'ACTIVE TESTING',
    diameter: 'Vertical & Horizontal Rig',
    length: '1.8 Meters Base',
    description:
      'Proprietary propulsion test bench developed by RPC to experimentally characterize student-built solid and hybrid rocket motors. Incorporates a high-speed data acquisition system to capture thrust-time curves, chamber pressure transients, and thermal gradient logs.',
    highlights: [
      '10 kHz sampling frequency National Instruments DAQ chassis with shielded cabling',
      'S-type load cell rated for up to 10 kN thrust measurement with &plusmn;0.1% accuracy',
      'Piezoresistive chamber pressure transducers rated to 100 bar with millisecond response',
      'Automated electronic ignition sequencer and emergency abort shutoff circuits',
    ],
    specs: [
      { label: 'LOAD CAPACITY', value: '10', unit: 'KN' },
      { label: 'DAQ SAMPLING', value: '10,000', unit: 'SAMPLES/S' },
      { label: 'PRESSURE SENSORS', value: '2x 100', unit: 'BAR' },
      { label: 'REMOTE DISTANCE', value: '100', unit: 'METERS' },
      { label: 'CALIBRATION DRIFT', value: '< 0.05', unit: '% FSO' },
      { label: 'FIRE CONTROL', value: 'Pneumatic', unit: 'RELAY' },
    ],
  },
  {
    id: 'hybrid-rig',
    name: 'Experimental Hybrid Propulsion Rig',
    category: 'HYBRID RESEARCH',
    targetApogee: 'Laboratory R&D Facility',
    propulsion: 'Gaseous Oxygen & Solid Hydrocarbon / Paraffin',
    airframe: 'Modular Stainless Steel Test Chamber',
    burnTime: '6.0 Seconds Test Burn',
    status: 'FABRICATION',
    diameter: '80 mm Chamber',
    length: '550 mm',
    description:
      'Undergraduate research initiative investigating hybrid rocket motor physics at COEP Tech. Explores paraffin wax and additive-doped fuel grains combusted with gaseous oxidizer, featuring throttled coaxial injector designs and optical viewport diagnostics.',
    highlights: [
      'Centrifugally cast paraffin wax fuel grains with carbon black pacifying additives',
      'Coaxial showerhead oxidizer injector manifold with pneumatic solenoid flow valve',
      'Pre-combustion chamber spark torch igniter system with nitrogen purge interlock',
      'Regression rate characterization using high-accuracy pre- and post-fire mass measurement',
    ],
    specs: [
      { label: 'TEST THRUST', value: '650', unit: 'N' },
      { label: 'OXIDIZER', value: 'GOX / N2O', unit: 'GAS' },
      { label: 'FUEL GRAIN', value: 'Paraffin', unit: 'WAX' },
      { label: 'CHAMBER PRESSURE', value: '2.8', unit: 'MPA' },
      { label: 'REGRESSION RATE', value: '1.85', unit: 'MM/S' },
      { label: 'O/F RATIO', value: '2.1', unit: 'OPTIMAL' },
    ],
  },
];
