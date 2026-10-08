import React from 'react';
import { Navbar } from './components/Navbar';
import { LaunchPadHero } from './components/LaunchPadHero';
import { CoverflowSlider } from './components/CoverflowSlider';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SubsystemsSection } from './components/SubsystemsSection';
import { AnatomySection } from './components/AnatomySection';
import { PropulsionLabSection } from './components/PropulsionLabSection';
import { HeritageTimeline } from './components/HeritageTimeline';
import { MediaGalleryModal } from './components/MediaGalleryModal';
import { TeamSection } from './components/TeamSection';
import { PartnersSection } from './components/PartnersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#020306] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative flex flex-col">
        {/* Stage 1: The Photorealistic Launchpad Hero with authentic COEP Tech branding */}
        <div id="top">
          <LaunchPadHero />
        </div>

        {/* 3D Hardware Coverflow Slider positioned right below hero */}
        <CoverflowSlider />

        {/* About the Centre: Overview, Vision, Mission, COEP Heritage */}
        <AboutSection />

        {/* Projects: Sounding Rockets & Motor Hardware */}
        <ProjectsSection />

        {/* Subsystems: Propulsion, Aerodynamics, Structures, Avionics, Recovery, GSE */}
        <SubsystemsSection />

        {/* Vehicle Anatomy: 9-Stage Component Breakdown */}
        <AnatomySection />

        {/* Propulsion Lab: Static Test Bench & Supersonic CFD Nozzle Lab */}
        <PropulsionLabSection />

        {/* Heritage & Milestones */}
        <HeritageTimeline />

        {/* Optical Cinematography & Test Footage Gallery */}
        <MediaGalleryModal />

        {/* Student Engineers & Faculty Mentorship */}
        <TeamSection />

        {/* Academic & Aerospace Partners */}
        <PartnersSection />

        {/* Official Campus Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
