import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface ThemeConfig {
  color: string;
  glowColor: string;
  bgGlow: string;
  name: string;
  borderColor: string;
  shapeClass: string;
}

const SECTION_THEMES: Record<string, ThemeConfig> = {
  'hero-section': {
    color: '#00F0FF', // Cyber Cyan
    glowColor: 'rgba(0, 240, 255, 0.4)',
    bgGlow: 'rgba(0, 240, 255, 0.15)',
    borderColor: 'border-[#00F0FF]/40',
    name: 'HERO MODULE',
    shapeClass: 'rounded-full',
  },
  'about-section': {
    color: '#FF007A', // Laser Magenta
    glowColor: 'rgba(255, 0, 122, 0.4)',
    bgGlow: 'rgba(255, 0, 122, 0.15)',
    borderColor: 'border-[#FF007A]/40',
    name: 'ABOUT MODULE',
    shapeClass: 'rounded-xl [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
  },
  'services-section': {
    color: '#05FF60', // Matrix Emerald
    glowColor: 'rgba(5, 255, 96, 0.4)',
    bgGlow: 'rgba(5, 255, 96, 0.15)',
    borderColor: 'border-[#05FF60]/40',
    name: 'SERVICES MODULE',
    shapeClass: 'rounded-none border-2',
  },
  'projects-section': {
    color: '#B600A8', // Quantum Violet
    glowColor: 'rgba(182, 0, 168, 0.4)',
    bgGlow: 'rgba(182, 0, 168, 0.15)',
    borderColor: 'border-[#B600A8]/40',
    name: 'PORTFOLIO MODULE',
    shapeClass: 'rounded-3xl rotate-45',
  },
  'contact-section': {
    color: '#FF9F00', // Solar Amber
    glowColor: 'rgba(255, 159, 0, 0.4)',
    bgGlow: 'rgba(255, 159, 0, 0.15)',
    borderColor: 'border-[#FF9F00]/40',
    name: 'CONTACT MODULE',
    shapeClass: 'rounded-t-full rounded-b-2xl',
  },
};

export default function RobotCursor() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // Only show cursor companion on devices with a fine pointer (mouse/trackpad) — not on touch screens
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Mouse Tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Detect fine pointer (mouse) vs coarse pointer (touch) on mount
  useEffect(() => {
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsFinePointer(hasFinePointer);
      if (hasFinePointer) {
        setIsVisible(true);
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };
    checkPointer();
    // Listen for changes (e.g. external keyboard connected to tablet)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    mq.addEventListener?.('change', checkPointer);
    return () => mq.removeEventListener?.('change', checkPointer);
  }, []);

  // Smooth springs for gliding "floaty" companion feel
  const springX = useSpring(mouseX, { damping: 30, stiffness: 180, mass: 0.6 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 180, mass: 0.6 });

  // Mouse position tracking — desktop/mouse only (component skips render on touch devices)
  useEffect(() => {
    if (!isFinePointer) return;

    const updatePosition = (clientX: number, clientY: number) => {
      // Offset cursor to upper-left of actual pointer tip
      mouseX.set(clientX + 16);
      mouseY.set(clientY + 16);
    };

    const checkInteractiveTarget = (target: HTMLElement | null) => {
      if (!target) return;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovered(true);
        let text = 'CLICK!';
        const parentEl = target.closest('button') || target.closest('a') || target;
        const textContent = (parentEl.textContent || '').trim().toUpperCase();
        if (textContent.includes('ABOUT')) text = 'WHO WE ARE?';
        else if (textContent.includes('SERVICES') || textContent.includes('RATES')) text = 'INSPECT FEES!';
        else if (textContent.includes('CLIENTS') || textContent.includes('SHOWCASES')) text = 'VIEW RECENT!';
        else if (textContent.includes('CONTACT') || textContent.includes('SEND') || textContent.includes('INQUIRY')) text = 'SAY HELLO!';
        else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') text = 'TYPING...';
        setHoverText(text);
      }
    };

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY);
    const handleMouseOver = (e: MouseEvent) => checkInteractiveTarget(e.target as HTMLElement);
    const handleMouseOut = () => { setIsHovered(false); setHoverText(''); };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY, isFinePointer]);

  // Section Tracking using IntersectionObserver
  useEffect(() => {
    const sections = ['hero-section', 'about-section', 'services-section', 'projects-section', 'contact-section'];
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px', // Detects section in the central screen view
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Only render on fine pointer (mouse) devices
  if (!isFinePointer || !isVisible) return null;

  // Active theme configuration
  const currentTheme = SECTION_THEMES[activeSection] || SECTION_THEMES['hero-section'];
  const color = currentTheme.color;

  // SVG Eyes builder based on active section and interaction
  const renderEyes = () => {
    if (isHovered) {
      // Loving Heart Eyes
      return (
        <svg width="40" height="18" viewBox="0 0 40 18" className="animate-pulse">
          <path d="M4 6 C2 2, 8 2, 8 6 C8 2, 14 2, 12 6 L8 10 Z" fill={color} transform="translate(4, 2)" />
          <path d="M4 6 C2 2, 8 2, 8 6 C8 2, 14 2, 12 6 L8 10 Z" fill={color} transform="translate(20, 2)" />
        </svg>
      );
    }

    switch (activeSection) {
      case 'hero-section':
        // Happy arch eyes: ^ ^
        return (
          <svg width="40" height="18" viewBox="0 0 40 18">
            <path d="M4 11 Q8 5 12 11" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M24 11 Q28 5 32 11" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'about-section':
        // Analytical focus eyes: [ - _ - ]
        return (
          <svg width="40" height="18" viewBox="0 0 40 18">
            <line x1="4" y1="9" x2="14" y2="9" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="22" y1="9" x2="32" y2="9" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'services-section':
        // Terminal bracket eyes: [ < _ > ]
        return (
          <svg width="40" height="18" viewBox="0 0 40 18">
            <path d="M12 4 L6 9 L12 14" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 4 L30 9 L24 14" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'projects-section':
        // Crosshair / Spark eyes: [ + _ + ]
        return (
          <svg width="40" height="18" viewBox="0 0 40 18">
            {/* Left cross */}
            <line x1="8" y1="4" x2="8" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="3" y1="9" x2="13" y2="9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            {/* Right cross */}
            <line x1="28" y1="4" x2="28" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="23" y1="9" x2="33" y2="9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'contact-section':
        // Amazed wide circles: [ O _ O ]
        return (
          <svg width="40" height="18" viewBox="0 0 40 18" className="animate-pulse">
            <circle cx="8" cy="9" r="5" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="28" cy="9" r="5" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="8" cy="9" r="2" fill={color} />
            <circle cx="28" cy="9" r="2" fill={color} />
          </svg>
        );
      default:
        return (
          <svg width="40" height="18" viewBox="0 0 40 18">
            <circle cx="8" cy="9" r="3" fill={color} />
            <circle cx="28" cy="9" r="3" fill={color} />
          </svg>
        );
    }
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none select-none flex flex-col items-center gap-2"
    >
      {/* 1. Interactive Tooltip Bubble */}
      <motion.div
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        className="bg-[#141414] border px-3 py-1.5 rounded-xl flex items-center justify-center gap-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.4)] whitespace-nowrap"
        style={{ borderColor: color }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
          {hoverText || 'HELLO!'}
        </span>
      </motion.div>

      {/* 2. Main Robot Companion Head */}
      <div className="relative">
        {/* Soft atmospheric backing glow */}
        <div
          className="absolute inset-[-12px] rounded-full blur-[24px] opacity-60 transition-colors duration-500"
          style={{ backgroundColor: currentTheme.glowColor }}
        />

        {/* Small floating antenna */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            rotate: isHovered ? [0, 10, -10, 0] : [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 1.2 : 3,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 -top-5 -translate-x-1/2 flex flex-col items-center z-20"
        >
          {/* Antenna tip LED node */}
          <div
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentcolor] transition-colors duration-500"
            style={{ backgroundColor: color, color: color }}
          />
          {/* Antenna stem */}
          <div className="w-[2px] h-3 bg-zinc-600" />
        </motion.div>

        {/* Outer Robotic Face Armor (Chassis) */}
        <div
          className={`relative w-[60px] h-[48px] bg-zinc-950/90 border border-white/10 backdrop-blur-md p-1.5 flex flex-col items-center justify-center shadow-2xl z-10 transition-all duration-500 overflow-hidden ${currentTheme.shapeClass}`}
        >
          {/* Subtle grid mesh overlay on the visor screen */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3px_3px] pointer-events-none" />

          {/* Glowing visor screen */}
          <div className="relative w-full h-full bg-black/60 rounded-lg border border-white/5 flex flex-col items-center justify-center px-1">
            {/* Render dynamically morphing eyes */}
            <div className="flex items-center justify-center">
              {renderEyes()}
            </div>

            {/* Glowing dashboard name (micro details) */}
            <span
              className="text-[5px] font-mono font-bold tracking-widest uppercase mt-0.5 opacity-65 scale-90 transition-colors duration-500"
              style={{ color }}
            >
              {currentTheme.name}
            </span>
          </div>
        </div>

        {/* Left & Right Cybernetic Ear Nodes */}
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-0">
          <div className="w-[3px] h-3 bg-zinc-700 rounded-l" />
        </div>
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-0">
          <div className="w-[3px] h-3 bg-zinc-700 rounded-r" />
        </div>
      </div>
    </motion.div>
  );
}
