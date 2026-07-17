import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem {
  name: string;
  tag: string;
  imageUrl: string;
  glow: string;
}

const MOVING_SERVICES: ServiceItem[] = [
  {
    name: 'Web Designing & Dev',
    tag: 'Next-Gen Custom UI/UX',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    glow: 'from-cyan-500/20 to-blue-600/10',
  },
  {
    name: 'App Development',
    tag: 'Native iOS & Android Apps',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    glow: 'from-purple-500/20 to-indigo-600/10',
  },
  {
    name: 'Digital Marketing',
    tag: 'ROI-Driven Audience Growth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    glow: 'from-rose-500/20 to-pink-600/10',
  },
  {
    name: 'Graphic Designing',
    tag: 'Vibrant Brand Artworks',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    glow: 'from-emerald-500/20 to-teal-600/10',
  },
  {
    name: 'Content Writing',
    tag: 'High-Converting Copywriting',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    glow: 'from-amber-500/20 to-orange-600/10',
  },
  {
    name: 'Search Engine Optimization',
    tag: 'Google Search Dominance',
    imageUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80',
    glow: 'from-violet-500/20 to-purple-600/10',
  },
  {
    name: 'Social Media Marketing',
    tag: 'Scale & Brand Loyalty',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    glow: 'from-fuchsia-500/20 to-pink-600/10',
  },
  {
    name: 'Pay-Per-Click Ads',
    tag: 'High-Impact Paid Campaigns',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    glow: 'from-sky-500/20 to-blue-600/10',
  },
  {
    name: 'Email Marketing',
    tag: 'Automated Newsletter Cycles',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80',
    glow: 'from-teal-500/20 to-cyan-600/10',
  },
  {
    name: 'Logo Designing',
    tag: 'Iconic Brand Identity',
    imageUrl: 'https://images.unsplash.com/photo-1626785774625-ddc7c82413bc?auto=format&fit=crop&w=800&q=80',
    glow: 'from-orange-500/20 to-red-600/10',
  },
];

export default function MarqueeSection() {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) or (pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Use CSS animation on mobile, no JS needed

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.35;
        setOffset(scrollOffset);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Safely copy and reverse to avoid mutating the original array
  const reversedServices = [...MOVING_SERVICES].reverse();

  // Row 1 & Row 2: Repeated twice for fluid scroll length without gaps
  const row1Services = [...MOVING_SERVICES, ...MOVING_SERVICES];
  const row2Services = [...reversedServices, ...reversedServices];

  return (
    <section
      ref={sectionRef}
      id="marquee-section"
      className="relative bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-16 overflow-hidden"
    >
      {/* Background Section Header */}
      <div className="w-full max-w-none px-6 sm:px-12 md:px-20 lg:px-28 mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-orange-400 font-black block mb-2">
          VISUAL WORKFLOWS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
          OUR DIGITAL SERVICES IN ACTION
        </h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* Row 1 - Moves RIGHT on scroll (desktop) / CSS scroll animation (mobile) */}
        <div className="w-full overflow-hidden">
          <div
            style={isMobile ? {} : {
              transform: `translate3d(${offset - 400}px, 0px, 0px)`,
              willChange: 'transform',
            }}
            className={`flex flex-row gap-5 md:gap-6 whitespace-nowrap ${isMobile ? 'animate-partners-left' : 'transition-transform duration-100 ease-out'}`}
          >
            {(isMobile ? [...row1Services, ...row1Services] : row1Services).map((service, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex-shrink-0 w-[280px] h-[190px] sm:w-[380px] sm:h-[240px] md:w-[440px] md:h-[280px] bg-[#141414] rounded-[24px] overflow-hidden border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative group cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700"
                />

                {/* Color Glow — mix-blend-screen only on devices that support it well */}
                <div className={`absolute inset-0 bg-gradient-to-t ${service.glow} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/40 to-transparent" />

                {/* Glassmorphic card overlay details */}
                <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex flex-col justify-end text-left">
                  <div style={{ WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }} className="bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl">
                    <span className="text-[10px] uppercase tracking-widest text-orange-400 font-black block mb-1">
                      {service.tag}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wide text-white">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves LEFT on scroll (desktop) / CSS reverse animation (mobile) */}
        <div className="w-full overflow-hidden">
          <div
            style={isMobile ? {} : {
              transform: `translate3d(${-offset - 200}px, 0px, 0px)`,
              willChange: 'transform',
            }}
            className={`flex flex-row gap-5 md:gap-6 whitespace-nowrap ${isMobile ? 'animate-partners-right' : 'transition-transform duration-100 ease-out'}`}
          >
            {(isMobile ? [...row2Services, ...row2Services] : row2Services).map((service, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex-shrink-0 w-[280px] h-[190px] sm:w-[380px] sm:h-[240px] md:w-[440px] md:h-[280px] bg-[#141414] rounded-[24px] overflow-hidden border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative group cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700"
                />

                {/* Color Glow */}
                <div className={`absolute inset-0 bg-gradient-to-t ${service.glow} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/40 to-transparent" />

                {/* Glassmorphic card overlay details */}
                <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex flex-col justify-end text-left">
                  <div style={{ WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }} className="bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl">
                    <span className="text-[10px] uppercase tracking-widest text-orange-400 font-black block mb-1">
                      {service.tag}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wide text-white">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
