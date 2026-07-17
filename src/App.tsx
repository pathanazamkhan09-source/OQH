import React from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import RobotCursor from './components/RobotCursor';

export default function App() {
  return (
    <div
      id="main-wrapper"
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] selection:bg-[#B600A8]/30 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* Dynamic Robot Cursor Companion */}
      <RobotCursor />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* 6. High-End Contact Section */}
      <ContactSection />

      {/* Minimalistic Premium Footer */}
      <footer
        className="relative bg-[#0C0C0C] py-20 px-6 border-t border-white/5 flex flex-col items-center justify-center gap-6 text-center z-40"
      >
        <h3 className="text-xl sm:text-2xl font-black uppercase text-[#D7E2EA] tracking-widest">
          LET&apos;S DEFINE THE FUTURE
        </h3>
        <p className="font-light text-xs sm:text-sm uppercase tracking-wider text-[#D7E2EA]/60 max-w-lg leading-relaxed">
          Partnering with bold brands globally to develop high-performance web systems, custom mobile apps, and strategic digital campaigns.
        </p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-xs text-white/50 uppercase tracking-widest">
            Managing Director -- Pathan Gousay Azam Khan
          </div>
          <a
            href="mailto:pathanazamkhan09@gmail.com?subject=Project Inquiry"
            className="text-sm sm:text-base font-mono tracking-widest text-[#D7E2EA] hover:text-[#B600A8] transition-colors"
          >
            PATHANAZAMKHAN09@GMAIL.COM
          </a>
          <a
            href="tel:8143124242"
            className="text-sm sm:text-base font-mono tracking-widest text-[#D7E2EA] hover:text-[#B600A8] transition-colors mt-1"
          >
            +91 8143124242
          </a>
        </div>
        <div className="text-[10px] text-gray-600 uppercase tracking-widest mt-8 font-light select-none">
          © 2026 ORANGE QUANTUM HUB. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
