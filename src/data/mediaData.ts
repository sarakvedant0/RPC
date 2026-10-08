export interface GalleryMediaItem {
  id: string;
  title: string;
  category: 'VEHICLES' | 'STATIC TESTS' | 'PAYLOAD & AVIONICS' | 'LAUNCH OPERATIONS';
  imageSrc: string;
  date: string;
  location: string;
  caption: string;
  hardware: string;
}

export const MEDIA_GALLERY: GalleryMediaItem[] = [
  {
    id: 'media-launchpad',
    title: 'Sounding Rocket on Launch Pad at Range Operations',
    category: 'LAUNCH OPERATIONS',
    imageSrc: '/src/assets/images/hero_launchpad_night_1791403773688.jpg',
    date: 'Flight Proving Campaign',
    location: 'Designated Coastal Test Range',
    caption:
      'The RPC sounding rocket erected on the 15-meter mobile launch rail during final pre-launch checks and safety perimeter clearance.',
    hardware: '10,000 ft Flight Vehicle · Mobile Launch Rail · GSE',
  },
  {
    id: 'media-irec-vehicle',
    title: '10,000 ft Sounding Rocket Full Assembly',
    category: 'VEHICLES',
    imageSrc: '/src/assets/images/rpc_irec_sounding_rocket_1791406272747.jpg',
    date: 'Competition Preparation',
    location: 'COEP Mechanical Engineering Workshop',
    caption:
      'Complete airframe integration of the 2.45-meter sounding rocket vehicle showing filament-wound carbon fiber tubes and precision CNC aluminum couplers.',
    hardware: 'Carbon Fiber Airframe · Dual Deploy Parachute · 4.0 in Dia',
  },
  {
    id: 'media-static-test',
    title: 'Propulsion Team at Static Hot-Fire Test Bench',
    category: 'STATIC TESTS',
    imageSrc: '/src/assets/images/rpc_team_static_test_1791406297888.jpg',
    date: 'Static Fire Campaign',
    location: 'Propulsion Testing Facility Bunker',
    caption:
      'Student propulsion engineers conducting calibration and checkout of the 10 kN load cell and National Instruments high-speed DAQ instrumentation.',
    hardware: 'Static Test Stand (P-Bench) · 10 kHz DAQ · Load Cell',
  },
  {
    id: 'media-payload-avionics',
    title: 'Avionics Bay & 3U Scientific Payload Integration',
    category: 'PAYLOAD & AVIONICS',
    imageSrc: '/src/assets/images/rpc_payload_systems_table_1791406285391.jpg',
    date: 'Subsystem Checkout',
    location: 'RPC Electronics & Telemetry Lab',
    caption:
      'Integration and bench testing of dual redundant flight computers, barometric deployment channels, and 3U atmospheric sensor payload.',
    hardware: 'Dual Altimeters · 433 MHz LoRa Telemetry · 3U CubeSat Bay',
  },
  {
    id: 'media-launchpad-team',
    title: 'Launchpad Operations & Safety Review',
    category: 'LAUNCH OPERATIONS',
    imageSrc: '/src/assets/images/rpc_launchpad_assembly_team_1791406308585.jpg',
    date: 'Range Operations',
    location: 'Test Range Pad Alpha',
    caption:
      'RPC recovery and ground crew inspecting rail guidance buttons, umbilical connections, and ignition key safety interlocks.',
    hardware: 'Rail Launch Tower · Ground Support System · Blast Deflector',
  },
  {
    id: 'media-engine-exhaust',
    title: 'SRAD Motor Firing & Supersonic Exhaust Plume',
    category: 'STATIC TESTS',
    imageSrc: '/src/assets/images/engine_combustion_macro_1791403785825.jpg',
    date: 'Motor Hot-Fire Qualification',
    location: 'High-Temperature Test Bunker',
    caption:
      'Supersonic exhaust jet from the graphite converging-diverging nozzle during full-thrust qualification static burn on the test bench.',
    hardware: 'Class-H Solid Motor · Graphite Nozzle · 1,250 N Thrust',
  },
  {
    id: 'media-transonic-flight',
    title: 'High-Power Rocket Ascent Proving Flight',
    category: 'VEHICLES',
    imageSrc: '/src/assets/images/rocket_through_clouds_1791403796261.jpg',
    date: 'Flight Verification',
    location: 'Proving Ground Range',
    caption:
      'Sounding rocket climbing vertically into high-altitude cloud cover demonstrating aerodynamic stability and nominal fin alignment.',
    hardware: 'Proving Sounding Rocket · Class-H Motor · Dual Deployment',
  },
];
