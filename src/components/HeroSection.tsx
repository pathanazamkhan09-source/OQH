import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ContactButton from './ContactButton';
import Magnet from './Magnet';
import FadeIn from './FadeIn';
import RoboImage from '../assets/images/hero_robot_1783950729708.jpg';
import LogoImage from '../assets/images/oqh logo.jpeg';

export default function HeroSection() {
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C]"
      style={{ overflowX: 'clip', height: '100vh', minHeight: '-webkit-fill-available' }}
    >
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} duration={0.8} as="nav">
        <div className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 relative z-[10001]">
          <button
            onClick={() => handleScrollTo('hero-section')}
            className="flex items-center gap-2 md:gap-3 text-white font-black uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity duration-200 text-left"
          >
            <img
              src={LogoImage}
              alt="Orange Quantum Hub Logo"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain rounded-md select-none pointer-events-none"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback: show a simple OQ text badge if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <span>ORANGE QUANTUM HUB</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 sm:gap-10 md:gap-12 lg:gap-16">
            <button
              onClick={() => handleScrollTo('about-section')}
              className="text-white font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              About
            </button>
            <button
              onClick={() => setShowPricingDialog(true)}
              className="text-white font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              Services Rates
            </button>
            <button
              onClick={() => handleScrollTo('projects-section')}
              className="text-white font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              Clients & Showcases
            </button>
            <button
              onClick={() => handleScrollTo('contact-section')} // Scrolls to footer
              className="text-white font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Toggle Button (3 lines / Hamburger) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-[10002] relative cursor-pointer active:scale-90 transition-transform"
            aria-label="Toggle Mobile Menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-7 h-[2.5px] bg-white rounded-full block origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-7 h-[2.5px] bg-white rounded-full block"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-7 h-[2.5px] bg-white rounded-full block origin-center"
            />
          </button>
        </div>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="relative flex-grow flex items-center justify-center overflow-hidden z-30 pointer-events-none select-none">
        <div className="w-full text-center px-4">
          <FadeIn delay={0.15} y={40} duration={0.9} as="div" className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[12.5vw] sm:text-[10.5vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8vw] mt-6 sm:mt-4 md:-mt-5 max-w-[95vw] mx-auto break-words select-all whitespace-normal">
              ORANGE QUANTUM HUB
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="relative w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-30">
        <FadeIn delay={0.35} y={20} duration={0.8} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p className="text-white font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)]">
            a digital powerhouse driven by web, app, graphic design, and marketing
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.8}>
          <ContactButton onClick={() => handleScrollTo('contact-section')} />
        </FadeIn>
      </div>

      {/* 4. Hero Portrait (Centered absolutely with Magnet) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[300px] md:w-[350px] lg:w-[390px] xl:w-[420px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} duration={1.0}>
          <div className="w-full animate-ambient-float">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-full cursor-grab active:cursor-grabbing"
            >
              <div className="w-full aspect-[3/4] overflow-hidden rounded-t-[5rem] sm:rounded-t-[7rem] md:rounded-t-[8rem] rounded-b-[1.5rem] border border-orange-500/60 shadow-[0_0_35px_rgba(249,115,22,0.4),0_30px_60px_rgba(0,0,0,0.85)] bg-[#111] relative">
                <img
                  src={RoboImage}
                  alt="Orange Quantum Hub AI Robo Companion"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none filter contrast-[1.15] brightness-[1.1] saturate-[1.1]"
                />
                {/* Subtle orange vignette overlay for premium depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </Magnet>
          </div>
        </FadeIn>
      </div>

      {/* Pricing Modal / Dialog */}
      {showPricingDialog && (
        <div className="fixed inset-0 bg-[#0C0C0C]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141414] border border-orange-500/60 shadow-[0_0_35px_rgba(249,115,22,0.4)] p-8 rounded-3xl max-w-lg w-full relative"
          >
            <button
              onClick={() => setShowPricingDialog(false)}
              className="absolute top-4 right-4 text-white hover:text-orange-500 uppercase font-black text-sm tracking-widest cursor-pointer"
            >
              [ Close ]
            </button>
            <h3 className="text-2xl font-black uppercase text-white mb-6 tracking-tight">
              Premium Solutions Suite
            </h3>
            <div className="space-y-6 text-white font-medium">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="font-medium text-white uppercase">WEB & APP DEV</span>
                <span className="font-mono text-white">Custom Tier</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D7E2EA]/10 pb-3">
                <span className="font-medium text-white uppercase">DIGITAL MARKETING & SMM</span>
                <span className="font-mono text-white">Growth Tier</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D7E2EA]/10 pb-3">
                <span className="font-medium text-white uppercase">SEO & PPC OPTIMIZATION</span>
                <span className="font-mono text-white">Rank Tier</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D7E2EA]/10 pb-3">
                <span className="font-medium text-white uppercase">GRAPHIC & LOGO DESIGNING</span>
                <span className="font-mono text-white">Creative Tier</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D7E2EA]/10 pb-3">
                <span className="font-medium text-white uppercase">CONTENT & EMAIL FLOW</span>
                <span className="font-mono text-white">Strategic Tier</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-white uppercase tracking-wider text-center font-bold">
              All plans include custom analytics, dedicated support, and project source files.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setShowPricingDialog(false);
                  handleScrollTo('contact-section');
                }}
                className="bg-white text-black font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Inquire Project
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 5. Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[10000] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-[85vw] max-w-[360px] h-full bg-[#0E0E0E] border-l border-orange-500/20 flex flex-col justify-between p-8 pt-24 z-10 shadow-[-20px_0_60px_rgba(249,115,22,0.15)]"
            >
              <div className="flex flex-col gap-6 text-left">
                <div className="flex flex-col gap-1 border-b border-white/5 pb-4 mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-white font-black">
                    Navigation Menu
                  </span>
                  <span className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
                    ORANGE QUANTUM HUB
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollTo('about-section');
                  }}
                  className="text-left text-white hover:text-orange-500 font-black uppercase tracking-widest text-lg py-3 transition-colors duration-200 border-b border-white/5 cursor-pointer active:text-orange-500"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowPricingDialog(true);
                  }}
                  className="text-left text-white hover:text-orange-500 font-black uppercase tracking-widest text-lg py-3 transition-colors duration-200 border-b border-white/5 cursor-pointer active:text-orange-500"
                >
                  Services Rates
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollTo('projects-section');
                  }}
                  className="text-left text-white hover:text-orange-500 font-black uppercase tracking-widest text-lg py-3 transition-colors duration-200 border-b border-white/5 cursor-pointer active:text-orange-500"
                >
                  Clients & Showcases
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollTo('contact-section');
                  }}
                  className="text-left text-white hover:text-orange-500 font-black uppercase tracking-widest text-lg py-3 transition-colors duration-200 border-b border-white/5 cursor-pointer active:text-orange-500"
                >
                  Contact
                </button>
              </div>

              {/* Drawer footer info */}
              <div className="flex flex-col gap-2 border-t border-white/5 pt-6 text-left">
                <span className="text-[10px] text-white uppercase tracking-widest font-black">
                  Direct Line
                </span>
                <a
                  href="mailto:pathanazamkhan09@gmail.com"
                  className="text-xs font-mono text-white font-medium hover:text-orange-500 transition-colors"
                >
                  pathanazamkhan09@gmail.com
                </a>
                <a
                  href="tel:8143124242"
                  className="text-xs font-mono text-white font-medium hover:text-orange-500 transition-colors"
                >
                  +91 8143124242
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
