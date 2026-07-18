import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FadeIn from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  glowClass: string;
  badgeColor: string;
  highlights: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: 'Web Development',
    category: 'Full-Stack systems',
    description: 'Developing high-performance, responsive, and secure custom web systems built for fast loading speeds and enterprise scalability.',
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-cyan-500/20 to-blue-500/10 shadow-cyan-500/10',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
    highlights: ['React & Next.js experts', 'Optimized Core Web Vitals', 'Ultra-fast Server-Side Rendering'],
  },
  {
    number: '02',
    name: 'App Development',
    category: 'iOS & Android Native',
    description: 'Crafting beautiful, native iOS and Android applications with fluid gesture control and high-fidelity interactive user experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-purple-500/20 to-indigo-500/10 shadow-purple-500/10',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-950/30',
    highlights: ['Cross-platform Flutter/React Native', 'Custom animation rendering', 'App Store & Play Store publishing'],
  },
  {
    number: '03',
    name: 'Digital Marketing',
    category: 'Strategic market campaign',
    description: 'Strategic market campaigns using custom data analytics, content modeling, and market outreach to maximize customer growth.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-pink-500/20 to-rose-500/10 shadow-pink-500/10',
    badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-950/30',
    highlights: ['Targeted user acquisition', 'Custom funnel analysis', 'Data-driven analytics integrations'],
  },
  {
    number: '04',
    name: 'Graphic Designing',
    category: 'Corporate Visuals',
    description: 'Bespoke corporate visual designs representing your specific branding assets across print, web, and physical layouts.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-emerald-500/20 to-teal-500/10 shadow-emerald-500/10',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
    highlights: ['Vector brand guideline sets', 'Advanced layout rendering', 'High-fidelity marketing kits'],
  },
  {
    number: '05',
    name: 'Content Writing',
    category: 'Persuasive Copywriting',
    description: 'Engaging, copywritten, and SEO-optimized messaging that communicates value and speaks directly to your target audience.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-amber-500/20 to-orange-500/10 shadow-amber-500/10',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
    highlights: ['Optimized search intent copy', 'High converting product listings', 'B2B/B2C thought leadership assets'],
  },
  {
    number: '06',
    name: 'SEO Optimization',
    category: 'Search Rank Growth',
    description: 'Advanced technical optimizations, keyword mapping, backlink building, and schema layouts to rank first in Google search.',
    imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-violet-500/20 to-purple-500/10 shadow-violet-500/10',
    badgeColor: 'text-violet-400 border-violet-500/30 bg-violet-950/30',
    highlights: ['PageSpeed and index caching', 'Competitive backlink authority', 'Localized keyword targeting'],
  },
  {
    number: '07',
    name: 'Social Media (SMM)',
    category: 'Grid & Feed Management',
    description: 'Curated social campaigns, design grids, daily content calendars, and interactive posts to nurture dedicated digital audiences.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-fuchsia-500/20 to-pink-500/10 shadow-fuchsia-500/10',
    badgeColor: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-950/30',
    highlights: ['Custom aesthetic layout patterns', 'High viral quotient tracking', 'Multi-channel brand automation'],
  },
  {
    number: '08',
    name: 'PPC Advertising',
    category: 'ROI Campaign Management',
    description: 'Hyper-targeted ad placement across major search and social directories with strict ROI tracking and budget optimizations.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-sky-500/20 to-blue-500/10 shadow-sky-500/10',
    badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-950/30',
    highlights: ['A/B matrix testing algorithms', 'Exact conversion lead pipelines', 'Optimal cost-per-click mapping'],
  },
  {
    number: '09',
    name: 'Email Marketing',
    category: 'Newsletter Conversion',
    description: 'Personalized customer newsletter systems and automated conversion funnels designed to increase client retention.',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-teal-500/20 to-cyan-500/10 shadow-teal-500/10',
    badgeColor: 'text-teal-400 border-teal-500/30 bg-teal-950/30',
    highlights: ['Automation drip sequence design', 'High mailbox deliverability rate', 'Dynamic cohort segment lists'],
  },
  {
    number: '10',
    name: 'Logo Designing',
    category: 'Brand Iconography',
    description: 'Iconic, custom-crafted vector logos that establish a lasting visual identity and stand as an anchor of your corporate brand.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    glowClass: 'from-orange-500/20 to-red-500/10 shadow-orange-500/10',
    badgeColor: 'text-orange-400 border-orange-500/30 bg-orange-950/30',
    highlights: ['Vector absolute resolution scale', 'Custom typography pairings', 'Trademarks and copyright handovers'],
  },
];

export default function ServicesSection() {
  const [selectedQuoteService, setSelectedQuoteService] = useState<ServiceItem | null>(null);
  const [flippedService, setFlippedService] = useState<string | null>(null);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Detect if device uses hover (desktop mouse) or tap (mobile/touch)
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  React.useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // Clean up autoPlay timeout on unmount
  React.useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  // Auto-flip cycle for mobile/touch devices
  React.useEffect(() => {
    if (isHoverDevice) return; // Use normal hover on desktop
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setFlippedService((current) => {
        const nextIndex = current 
          ? (SERVICES.findIndex((s) => s.number === current) + 1) % SERVICES.length
          : 0;
        return SERVICES[nextIndex].number;
      });
    }, 4500); // 4.5 seconds per card is perfect reading speed for highlights

    return () => clearInterval(interval);
  }, [isHoverDevice, isAutoPlay]);

  // Helper to trigger manual interaction and pause autoplay
  const handleCardClick = (serviceNumber: string) => {
    // Toggle card flip
    if (flippedService === serviceNumber) {
      setFlippedService(null);
    } else {
      setFlippedService(serviceNumber);
    }

    // Pause autoplay
    setIsAutoPlay(false);

    // Clear previous pause timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Resume autoplay after 12 seconds of inactivity
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 12000);
  };

  const handleOpenQuoteModal = (service: ServiceItem) => {
    setSelectedQuoteService(service);
    setQuoteFormData({
      name: '',
      email: '',
      message: `Hi! I would like to get a quote for "${service.name}". Here are some of my project specifications and requirements:\n- \n- `
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "8143124242";
    const text = `*New Quote Request from Orange Quantum Hub*\n\n*Service:* ${selectedQuoteService?.name}\n*Name:* ${quoteFormData.name}\n*Email:* ${quoteFormData.email}\n*Requirements:* ${quoteFormData.message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=91${whatsappNumber}&text=${encodeURIComponent(text)}`;
    
    try {
      const opened = window.open(whatsappUrl, '_blank');
      if (!opened) {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      window.location.href = whatsappUrl;
    }
    
    setSelectedQuoteService(null);
  };

  return (
    <section
      id="services-section"
      className="relative bg-[#0C0C0C] py-24 sm:py-28 md:py-36 text-white z-30 w-full"
    >
      {/* Decorative Grid Mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="w-full max-w-none px-6 sm:px-12 md:px-20 lg:px-28 flex flex-col relative z-10">
        {/* Section Header */}
        <div className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0.1} y={30}>
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-black block mb-4">
              Core Capabilities
            </span>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,8vw,100px)] leading-none tracking-tight">
              SERVICES
            </h2>
          </FadeIn>
          <FadeIn delay={0.3} y={30}>
            <p className="text-sm sm:text-base text-zinc-100 max-w-xl mx-auto mt-6 font-normal leading-relaxed">
              Explore our core capabilities, deliverables, and premium solutions tailored to your brand.
            </p>
          </FadeIn>
        </div>

        {/* Services Horizontal Cards Stack - 1 per line */}
        <div className="flex flex-col gap-6 w-full max-w-none">
          {SERVICES.map((service, i) => {
            return (
              <FadeIn
                key={service.number}
                delay={i * 0.05}
                y={40}
                className="w-full"
              >
                {/* 3D Flip Horizontal Container — tap on mobile, hover on desktop */}
                <div 
                  onClick={() => {
                    handleCardClick(service.number);
                  }}
                  className="w-full h-auto min-h-[220px] sm:min-h-[160px] md:h-[140px] perspective-1000 group cursor-pointer"
                >
                  <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${flippedService === service.number ? '[transform:rotateY(180deg)]' : (isHoverDevice ? 'md:group-hover:[transform:rotateY(180deg)]' : '')}`}>
                    
                    {/* FRONT SIDE - Premium White Card Theme */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-orange-500/60 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between shadow-[0_0_20px_rgba(249,115,22,0.35),0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden backface-hidden">
                      
                      {/* Interactive soft glowing light spot */}
                      <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${service.glowClass} blur-3xl opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-700`} />

                      {/* Left Side: Number, Category and Name */}
                      <div className="flex items-start gap-4 md:gap-6 relative z-10">
                        <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-zinc-200 leading-none select-none">
                          {service.number}
                        </span>
                        <div className="flex flex-col text-left">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest border border-zinc-200 px-2 py-0.5 rounded-full text-zinc-500 bg-zinc-50">
                              {service.category}
                            </span>
                            <span className="font-mono text-[9px] text-zinc-400 font-medium">
                              REF ID: {service.number}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase text-zinc-900 tracking-tight">
                            {service.name}
                          </h3>
                        </div>
                      </div>

                      {/* Right Side: Description */}
                      <div className="mt-4 md:mt-0 md:max-w-md lg:max-w-lg text-left relative z-10 border-t border-zinc-100 pt-3 md:border-t-0 md:pt-0">
                        <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* BACK SIDE - Image Background with Content Overlay */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl border border-orange-500/60 overflow-hidden rotate-y-180 backface-hidden shadow-[0_0_20px_rgba(249,115,22,0.35),0_20px_40px_rgba(0,0,0,0.4)]">
                      {/* Image background */}
                      <img
                        src={service.imageUrl}
                        alt={`${service.name} Deliverables`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Rich Dark Glass Overlay to ensure readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/85 to-black/70 sm:from-black/85 sm:via-black/75 sm:to-black/60" />
                      
                      {/* Interactive subtle color glow overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${service.glowClass} mix-blend-screen opacity-25`} />

                      {/* Flex Layout for Back Content */}
                      <div className="absolute inset-0 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between text-white relative z-10">
                        
                        {/* Left Side: Deliverables Label */}
                        <div className="text-left flex flex-col mb-2 md:mb-0">
                          <span className="font-mono text-[9px] text-orange-400 font-black tracking-widest uppercase mb-1">
                            DELIVERABLES PREVIEW
                          </span>
                          <h4 className="text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-tight drop-shadow-sm">
                            {service.name}
                          </h4>
                        </div>

                        {/* Middle Side: Specifications */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-8 border-t border-white/10 pt-3 md:border-t-0 md:pt-0">
                          {service.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-left">
                              <span className="text-white/40 font-mono text-xs font-semibold">0{idx + 1}.</span>
                              <span className="text-white font-medium text-xs sm:text-sm drop-shadow-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Right Side: Action CTA Button */}
                        <div className="mt-3 md:mt-0 flex justify-start md:justify-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenQuoteModal(service);
                            }}
                            className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-md text-center cursor-pointer active:scale-95 transform"
                          >
                            Get Quote
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Get Quote Modal */}
      <AnimatePresence>
        {selectedQuoteService && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 select-none pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuoteService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#121212]/95 border border-orange-500/50 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(249,115,22,0.3)] z-10 overflow-hidden flex flex-col pointer-events-auto select-text"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedQuoteService(null)}
                className="absolute top-4 right-4 text-[#D7E2EA]/40 hover:text-white transition-colors p-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col text-left gap-1 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/45 font-bold">
                  Inquiry Desk
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                  GET A QUOTE FOR
                </h3>
                <span className="text-sm font-semibold text-[#B600A8] uppercase tracking-wider">
                  {selectedQuoteService.name}
                </span>
              </div>

              <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-5 text-left">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                    placeholder="Pathan Gousay"
                    className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-[#1E1E1E]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-[#1E1E1E]"
                  />
                </div>

                {/* Requirements Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold">
                    Requirements Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={quoteFormData.message}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                    className="bg-[#1A1A1A] border border-white/5 focus:border-[#B600A8]/40 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-[#1E1E1E] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-[#D7E2EA] text-black font-black uppercase py-3.5 rounded-full text-xs tracking-widest transition-all duration-300 shadow-lg relative overflow-hidden group flex items-center justify-center gap-2 cursor-pointer active:scale-95 transform mt-2"
                >
                  <span>SEND INQUIRY TO WHATSAPP</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
