import { MilestoneItem, TeamMember } from '../types';

export const RPC_MILESTONES: MilestoneItem[] = [
  {
    year: '2021',
    title: 'Founding of the Rocket Propulsion Centre',
    subtitle: 'COEP Mechanical Engineering Department, Pune',
    description:
      'Rocket Propulsion Centre founded as an official student rocketry and aerospace research initiative at COEP Technological University, supported by department faculty and aerospace alumni.',
    statLabel: 'INITIATIVE',
    statValue: 'COEP TECH',
  },
  {
    year: '2022',
    title: 'First SRAD Solid Motor Static Firing',
    subtitle: 'Propulsion Test Bench Commissioning',
    description:
      'Designed, cast, and static-fired the first Student Researched and Developed (SRAD) solid composite motor on the custom-fabricated vertical test rig, recording chamber pressure and thrust curves.',
    statLabel: 'MOTOR CLASS',
    statValue: 'CLASS-G/H',
  },
  {
    year: '2023',
    title: 'Sounding Flight & Dual Recovery Proving',
    subtitle: 'Low-Altitude Launch Campaign',
    description:
      'Conducted a proving flight campaign validating the dual-deployment recovery sequence (drogue parachute at apogee and main chute at 1,000 ft) with onboard barometric altimeter logging.',
    statLabel: 'ALTITUDE REACHED',
    statValue: '3,500 FT',
  },
  {
    year: '2024',
    title: 'Composite Filament Winding & 10 kHz DAQ',
    subtitle: 'In-House Advanced Manufacturing',
    description:
      'Transitioned airframe manufacturing to in-house wet filament-wound carbon fiber tubes and integrated a high-speed 10 kHz National Instruments DAQ system on the propulsion test bench.',
    statLabel: 'AIRFRAME MASS',
    statValue: '-45% WEIGHT',
  },
  {
    year: '2025',
    title: 'Class-H Motor Static Qualification',
    subtitle: 'Full-Duration Static Hot-Fire Burn',
    description:
      'Achieved a complete 4.6-second qualification static burn of the Class-H composite motor, delivering 3,840 N·s total impulse and proving the integrity of the supersonic graphite nozzle.',
    statLabel: 'TOTAL IMPULSE',
    statValue: '3,840 N·S',
  },
  {
    year: '2026',
    title: '10,000 ft Sounding Rocket Campaign',
    subtitle: 'Intercollegiate Rocketry Preparation',
    description:
      'Final structural integration and telemetry ground station readiness for the 10,000 ft sounding rocket campaign carrying a 3U scientific atmospheric research payload.',
    statLabel: 'TARGET APOGEE',
    statValue: '10,000 FT AGL',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. S. V. Kulkarni',
    role: 'Faculty Advisor & Mentor',
    department: 'Department of Mechanical Engineering, COEP Tech',
    specialization: 'Thermal Engineering, CFD & Fluid Dynamics',
    contributions: 'Guiding collegiate propulsion research, safety compliance, academic approvals, and institutional liaison.',
    status: 'FACULTY ADVISOR',
  },
  {
    name: 'Aarav Deshmukh',
    role: 'Student Project Lead & Systems Director',
    department: 'B.Tech Mechanical Engineering, Final Year',
    specialization: 'Sounding Rocket Systems Engineering & Launch Operations',
    contributions: 'Overall project execution, team coordination, mass budget tracking, and range safety protocols.',
    status: 'PROJECT LEAD',
  },
  {
    name: 'Tanvi Patwardhan',
    role: 'Propulsion Subsystem Lead',
    department: 'B.Tech Mechanical Engineering',
    specialization: 'Solid Propellant Chemistry, Nozzle Design & Test Bench DAQ',
    contributions: 'Lead engineer for the SRAD Class-H motor casting, graphite nozzle contouring, and test stand firing sequences.',
    status: 'PROPULSION LEAD',
  },
  {
    name: 'Rohan Joshi',
    role: 'Avionics & Telemetry Lead',
    department: 'B.Tech Electronics & Telecommunication',
    specialization: 'Embedded Systems, Sensor Fusion & 433 MHz LoRa Telemetry',
    contributions: 'Developed dual redundant flight computers, pyro ejection circuits, GPS tracking, and ground station UI.',
    status: 'AVIONICS LEAD',
  },
  {
    name: 'Ananya Shinde',
    role: 'Structures & Aerodynamics Lead',
    department: 'B.Tech Metallurgy & Materials Engineering',
    specialization: 'Composite Filament Winding, FEA & CNC Machining',
    contributions: 'Engineered carbon fiber airframe tubes, CNC 6061-T6 bulkheads, and OpenRocket dynamic stability calculations.',
    status: 'STRUCTURES LEAD',
  },
  {
    name: 'Vikramaditya Gaikwad',
    role: 'Recovery & Payload Lead',
    department: 'B.Tech Mechanical Engineering',
    specialization: 'Dual-Deployment Parachutes & Ejection Mechanisms',
    contributions: 'Designed drogue and main parachute descent rigging, black powder separation charges, and 3U payload bay.',
    status: 'RECOVERY LEAD',
  },
];

export const RESEARCH_SUBSYSTEMS = [
  {
    id: 'propulsion',
    name: 'Propulsion Subsystem',
    focus: 'Design, casting, and static testing of SRAD solid rocket motors (APCP/KNSB), supersonic graphite nozzles, and experimental hybrid engines.',
    specs: 'Class-H motor · 3,840 N·s total impulse · Graphite converging-diverging nozzle · Hydrostatic proof tested to 12 MPa',
    metrics: ['Class-H Solid Motor', '1,250 N Peak Thrust', '4.6s Burn Time'],
  },
  {
    id: 'aerodynamics',
    name: 'Aerodynamics Subsystem',
    focus: 'External aerodynamic geometry optimization, von Kármán nose cone profiles, fin flutter analysis, and OpenRocket trajectory flight simulations.',
    specs: 'Transonic flow regime (Mach 0.85) · Barrowman stability margin > 2.0 calibers · Phenolic high-strength fin flutter damping',
    metrics: ['Mach 0.88 Apogee', '2.3 Calibers Margin', 'Cd < 0.32 Drag'],
  },
  {
    id: 'structures',
    name: 'Structures & Manufacturing',
    focus: 'Filament-wound carbon fiber and fiberglass airframe tubes, CNC 6061-T6 aluminum bulkheads, internal coupler rings, and structural FEA.',
    specs: 'Toray carbon fiber wet winding · Lightweight aluminum bulkheads · 1.5x structural factor of safety under 15G flight loads',
    metrics: ['Carbon Fiber Body', '15G Structural Safety', '4.0 in Diameter'],
  },
  {
    id: 'avionics',
    name: 'Avionics & Telemetry',
    focus: 'Dual redundant flight computers, barometric pressure altimeters, 6-DOF IMU sensor fusion, GPS tracking, and live 433 MHz LoRa ground station.',
    specs: 'Redundant baro triggers · 500 Hz sensor logging · 10 km RF telemetry downlink range · Dual pyrotechnic deployment arming',
    metrics: ['Dual Redundant Alt', '433 MHz LoRa Link', '500 Hz Data Rate'],
  },
  {
    id: 'recovery',
    name: 'Recovery Systems',
    focus: 'Dual-deployment parachute system with high-speed drogue parachute deployed at apogee and reefed main parachute deployed at 1,000 ft AGL.',
    specs: 'Ripstop nylon parachutes · Kevlar shock cord harness · Dual black powder energetic ejection canisters · Shear pin retention',
    metrics: ['Drogue @ Apogee', 'Main @ 1,000 ft', '< 6.5 m/s Touchdown'],
  },
  {
    id: 'test-facilities',
    name: 'Static Test Rig & GSE',
    focus: 'Instrumented vertical and horizontal motor test stand equipped with 10 kHz DAQ load cells, pressure transducers, and remote launch rails.',
    specs: '10 kN S-type load cell · 100 bar piezoresistive pressure transducer · Pneumatic automated ignition interlock · 100m safe bunker link',
    metrics: ['10 kHz DAQ Rig', '10 kN Load Cell', 'Remote Sequencer'],
  },
];

export const PARTNERS = [
  { name: 'COEP Technological University', subtitle: 'Est. 1854 · Premier Engineering Institute' },
  { name: 'Department of Mechanical Engineering', subtitle: 'Host Department & Laboratory Support' },
  { name: 'COEP Alumni Association', subtitle: 'Mentorship, Industry Links & Sponsorship' },
  { name: 'ANSYS Academic Suite', subtitle: 'CFD Fluid Dynamics & Structural FEA' },
  { name: 'Dassault Systèmes SOLIDWORKS', subtitle: 'CAD & 3D Engineering Platform' },
  { name: 'National Instruments', subtitle: 'LabVIEW DAQ & Load Cell Instrumentation' },
];
