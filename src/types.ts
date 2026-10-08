export interface RocketMission {
  id: string;
  name: string;
  classification: string;
  targetApogee: string;
  payloadCapacity: string;
  thrust: string;
  propellantType: string;
  burnTime: string;
  status: 'FLIGHT PROVEN' | 'STATIC FIRED' | 'ACTIVE DEVELOPMENT' | 'FLIGHT READY';
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

export interface RocketComponentPart {
  id: string;
  name: string;
  subsystem: string;
  material: string;
  massKg: number;
  specs: string;
  description: string;
  yOffset: number; // exploded position offset
}

export interface LaunchTelemetry {
  stage: 'T-MINUS' | 'IGNITION' | 'LIFTOFF' | 'MAX-Q' | 'BOOSTER_SEP' | 'COAST' | 'ORBITAL_INSERTION';
  timeSec: number;
  altitudeKm: number;
  velocityKmh: number;
  mach: number;
  thrustKn: number;
  accelerationG: number;
  pitchDeg: number;
  chamberPressureBar: number;
  fuelPercent: number;
  oxidizerPercent: number;
  trajectoryStatus: 'OPTIMAL' | 'NOMINAL' | 'ADJUSTING';
}

export type CameraViewAngle =
  | 'wide_pad'
  | 'low_hero'
  | 'engine_macro'
  | 'tower_track'
  | 'side_crane'
  | 'follow_cam'
  | 'cloud_layer'
  | 'above_clouds'
  | 'high_altitude'
  | 'near_space';

export interface GalleryMediaItem {
  id: string;
  title: string;
  category: 'LAUNCHPAD' | 'COMBUSTION' | 'ATMOSPHERE' | 'ORBIT' | 'PLUME';
  imageSrc: string;
  date: string;
  location: string;
  caption: string;
  telemetry: {
    shutter: string;
    iso: string;
    lens: string;
    sensor: string;
  };
}

export interface MilestoneItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  statLabel: string;
  statValue: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  specialization: string;
  contributions: string;
  status: string;
}
