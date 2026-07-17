import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import FadeIn from './FadeIn';

// ES Module Imports for Showcases to guarantee perfect bundle resolve on deployment
import imgIdeaAdminDashboard from '../assets/images/idea_admin_dashboard_1784113193359.jpg';
import imgOmkareswarAdmin from '../assets/images/bejawada_portal_1_1784015246166.jpg';
import imgVenkateshInteriors from '../assets/images/venkatesh_interiors_1784014805288.jpg';

import imgSurgicalSuperAdmin from '../assets/images/surgical_super_admin_1784113210032.jpg';
import imgSurgicalBranchAdmin from '../assets/images/surgical_branch_admin_1784113231071.jpg';
import imgOmkareswarRealtors from '../assets/images/omkareswar_realtors_1784014788464.jpg';

import imgArshiBilling1 from '../assets/images/arshi_billing_1_1784014989537.jpg';
import imgSurgicalBillingPos from '../assets/images/surgical_billing_pos_1784113267910.jpg';

import imgSurgicalWorldEcommerce from '../assets/images/surgical_world_ecommerce_1784015018669.jpg';
import imgNyraToursWebsite from '../assets/images/nyra_tours_website_1784113283163.jpg';
import imgGoogleToursCargo from '../assets/images/google_tours_cargo_1784121161356.jpg';

import imgBejawadaEducation from '../assets/images/bejawada_education_1784015225721.jpg';
import imgBejawadaAboutPage from '../assets/images/bejawada_about_page_1784121121431.jpg';
import imgBejawadaContactPage from '../assets/images/bejawada_contact_page_1784121139454.jpg';

interface ProjectItem {
  src: string;
  title: string;
  subtitle: string;
  desc: string;
}

interface Project {
  id: string;
  number: string;
  category: string;
  name: string;
  items: ProjectItem[];
}

const PROJECTS: Project[] = [
  {
    id: 'p5',
    number: '01',
    category: 'SaaS Client Management & CRM Portals',
    name: 'CRM',
    items: [
      {
        src: imgOmkareswarRealtors,
        title: 'Omkareswar Admin Dashboard',
        subtitle: 'Seller/Buyer/CRM Management',
        desc: "Interactive platform for registering and verifying properties, managing sellers, approved buyers, and venture analytics."
      },
      {
        src: imgIdeaAdminDashboard,
        title: 'IDEA Admin Dashboard',
        subtitle: 'Members, Events, Enquiries',
        desc: "Powerful administrative panel with active member databases, dynamic chapter directory trackers, and comprehensive contact logs."
      },
      {
        src: imgGoogleToursCargo,
        title: 'Google Tours',
        subtitle: 'Lead generation & inquiry management',
        desc: "High-performance travel and cargo portal built with inquiry pipelines, tour itineraries, and real-time support channels."
      }
    ]
  },
  {
    id: 'p8',
    number: '02',
    category: 'Warehouse & Inventory Management Suites',
    name: 'Inventory',
    items: [
      {
        src: imgSurgicalSuperAdmin,
        title: 'Surgical World Super Admin',
        subtitle: 'Global inventory',
        desc: "Multi-branch command center supervising master billing logs, live stock thresholds, employee shifts, and cross-office inventory."
      },
      {
        src: imgSurgicalBranchAdmin,
        title: 'Surgical World Branch Dashboard',
        subtitle: 'Stock & inventory',
        desc: "Localized administrative console tracking low-stock alert products, vendor records, sales graphs, and shift histories."
      },
      {
        src: imgOmkareswarAdmin,
        title: 'Omkareswar Property Inventory',
        subtitle: 'Plot/Property inventory',
        desc: "Complete property venture catalog showing live plot availabilities, dynamic layout maps, and customer contact interfaces."
      }
    ]
  },
  {
    id: 'p4',
    number: '03',
    category: 'Enterprise Billing & Retail POS Systems',
    name: 'Billing',
    items: [
      {
        src: imgArshiBilling1,
        title: 'Arshi Naturals POS',
        subtitle: 'Counter POS terminal',
        desc: "High-speed retail cashier portal equipped with quick-add hotkeys, live quantity adjustments, and continuous database sync."
      },
      {
        src: imgSurgicalBillingPos,
        title: 'Surgical World Cashier POS',
        subtitle: 'Medical POS',
        desc: "Modern pharmaceutical checkout console built for rapid product barcode scanning, tax rates, and instant receipt dispatch."
      },
      {
        src: imgSurgicalBranchAdmin,
        title: 'Surgical World Branch Billing Dashboard',
        subtitle: 'Billing Supervision',
        desc: "Branch-specific dashboard for monitoring daily transactions, invoice histories, and local cashier shift sales."
      }
    ]
  },
  {
    id: 'p6',
    number: '04',
    category: 'Premium E-Commerce & Travel Portals',
    name: 'E-Commerce',
    items: [
      {
        src: imgSurgicalWorldEcommerce,
        title: 'Surgical World Medical Equipment Store',
        subtitle: 'Product Portal',
        desc: "Sleek retail catalog and store layout built for medical devices distribution and direct shopping."
      },
      {
        src: imgVenkateshInteriors,
        title: 'Venkatesh Interiors Portfolio/Service Website',
        subtitle: 'Design Portfolio Web',
        desc: "Sleek and professional interior design collections explorer paired with client query engines."
      },
      {
        src: imgNyraToursWebsite,
        title: 'Nyra Tours Booking Website',
        subtitle: 'Tour Booking Portal',
        desc: "Immersive tourism, travel packages booking, and devotional temple pilgrimage scheduling."
      }
    ]
  },
  {
    id: 'p7',
    number: '05',
    category: 'Next-Gen Education & Global Portals',
    name: 'School',
    items: [
      {
        src: imgBejawadaEducation,
        title: 'Bejawada Overseas Education Home',
        subtitle: 'Global Education Home',
        desc: "Interactive overseas study portal guiding prospective students with statistics, destinations and signups."
      },
      {
        src: imgBejawadaAboutPage,
        title: 'Bejawada About',
        subtitle: 'Agency About Page',
        desc: "Comprehensive company bio, certified counselor milestones, and core values presentation."
      },
      {
        src: imgBejawadaContactPage,
        title: 'Bejawada Contact & Inquiry Page',
        subtitle: 'Contact & Maps Page',
        desc: "Online inquiry dispatch form integrated with interactive maps of active study-abroad offices."
      }
    ]
  },
];

function ProjectCard({ project, index, totalCards }: { project: Project; index: number; totalCards: number; key?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll tracking to trigger scaling and rotation as the card sticky-scrolls past
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Highly professional 3D card deck stacking scroll animations:
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Top positioning offset: index * 24px (staggered slightly to show deck depth)
  const topOffset = index * 24 + 96; 

  // Disable motion calculations on mobile viewports for smooth scrolling and zero height constraints
  const cardScale = isMobile ? 1 : scale;
  const cardOpacity = isMobile ? 1 : opacity;
  const cardY = isMobile ? 0 : y;
  const cardRotateX = isMobile ? 0 : rotateX;

  return (
    <div
      ref={containerRef}
      className={`w-full ${isMobile ? 'min-h-fit py-6' : 'min-h-[95vh] md:min-h-[110vh] py-8'} relative flex justify-center perspective-1000`}
    >
      <motion.div
        style={{
          scale: cardScale,
          opacity: cardOpacity,
          y: cardY,
          rotateX: cardRotateX,
          top: isMobile ? 'auto' : `${topOffset}px`,
          transformStyle: 'preserve-3d',
          zIndex: index,
        }}
        className={`${isMobile ? 'relative' : 'sticky'} w-full max-w-none rounded-[32px] sm:rounded-[40px] md:rounded-[60px] border-2 border-orange-500/60 bg-[#121212]/95 backdrop-blur-xl p-5 sm:p-8 md:p-12 shadow-[0_0_35px_rgba(249,115,22,0.3),0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between`}
      >
        {/* Card ambient backing glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B600A8]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Row Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number */}
            <span className="font-black text-orange-500/20 text-[clamp(2.5rem,8vw,90px)] leading-none select-none font-mono">
              {project.number}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-orange-400 font-extrabold block mb-1">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-orange-400 font-extrabold">3 System Snapshots</span>
          </div>
        </div>

        {/* Bottom Row - 3 Column Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 flex-grow relative z-10 w-full">
          {project.items.map((item, itemIdx) => (
            <div key={`${project.id}-item-${itemIdx}`} className="flex flex-col group h-full justify-between">
              {/* Image Block with Aspect Ratio and badging */}
              <div className="relative overflow-hidden aspect-[16/10] w-full rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#0C0C0C] shadow-2xl transition-all duration-500 group-hover:border-orange-500/40 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Show a branded placeholder on error instead of hiding entirely
                    const container = e.currentTarget.parentElement;
                    if (container) {
                      e.currentTarget.style.display = 'none';
                      const placeholder = document.createElement('div');
                      placeholder.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#222]';
                      placeholder.innerHTML = '<span style="color:#f97316;font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;opacity:0.6">SYSTEM SNAPSHOT</span>';
                      container.appendChild(placeholder);
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                
                {/* Fine gradient screen cover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Title & metadata section directly underneath image */}
              <div className="flex flex-col text-left pt-5 flex-grow">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500/90 block mb-1">
                  PRODUCTION BUILD
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors duration-300 tracking-tight leading-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-200 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const CLIENTS_LIST_ROW_1 = [
  "Surgical World", "Arshi Naturals", "Nyra", "Shayan's Dental", "IDEA", 
  "Merit Real Solutions", "Omkareswar", "Coffee billing", "Bejawada Overseas", 
  "SRS Furnitures", "Hindustan"
];

const CLIENTS_LIST_ROW_2 = [
  "Subharati", "GGU", "Venkatesh Interiors", "Windor Fab", "AR Fashions", 
  "Jaya Grand", "Aayushman Hospital", "Meenakshi collections", "Madhu Fashions", "Akshara"
];

export default function ProjectsSection() {
  return (
    <section
      id="projects-section"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pb-32 -mt-10 sm:-mt-12 md:-mt-14 z-30 overflow-visible w-full"
    >
      <div className="w-full max-w-none px-6 sm:px-12 md:px-20 lg:px-28 flex flex-col">
        {/* Heading */}
        <div className="w-full text-center pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
          <FadeIn delay={0} y={40} className="w-full">
            <h2 className="hero-heading font-black uppercase text-[clamp(3rem,11vw,140px)] leading-none tracking-tight">
              SHOWCASES
            </h2>
          </FadeIn>
        </div>

        {/* Stacking Cards Wrapper */}
        <div className="flex flex-col gap-0 mb-32">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              totalCards={PROJECTS.length}
            />
          ))}
        </div>

        {/* Trusted Partners / Clients Section - Continuous Moving Marquee */}
        <div id="clients-subsection" className="w-full border-t border-white/5 pt-20 overflow-hidden">
          <FadeIn delay={0} y={30}>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-orange-400 font-black block mb-3">
                TRUSTED PARTNERS
              </span>
              <h3 className="hero-heading font-black uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                OUR CLIENTS
              </h3>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-5 w-full relative z-10 pointer-events-auto">
            {/* ROW 1: Slides Left */}
            <div className="w-full overflow-hidden relative py-2">
              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
              
              <div className="animate-partners-left flex flex-row gap-4">
                {/* Dual arrays for perfect infinite scroll */}
                {[...CLIENTS_LIST_ROW_1, ...CLIENTS_LIST_ROW_1, ...CLIENTS_LIST_ROW_1].map((client, idx) => (
                  <div
                    key={`partner-r1-${idx}`}
                    className="flex-shrink-0 bg-[#141414] hover:bg-[#1A1A1A] border border-orange-500/40 hover:border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.45)] transition-all duration-300 rounded-2xl py-5 px-8 flex items-center justify-center text-center group h-20 min-w-[160px] sm:min-w-[200px]"
                  >
                    <span className="text-white group-hover:text-white font-black uppercase tracking-wider text-xs sm:text-sm transition-colors duration-200">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Slides Right */}
            <div className="w-full overflow-hidden relative py-2">
              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 pointer-events-none" />

              <div className="animate-partners-right flex flex-row gap-4">
                {[...CLIENTS_LIST_ROW_2, ...CLIENTS_LIST_ROW_2, ...CLIENTS_LIST_ROW_2].map((client, idx) => (
                  <div
                    key={`partner-r2-${idx}`}
                    className="flex-shrink-0 bg-[#141414] hover:bg-[#1A1A1A] border border-orange-500/40 hover:border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.45)] transition-all duration-300 rounded-2xl py-5 px-8 flex items-center justify-center text-center group h-20 min-w-[160px] sm:min-w-[200px]"
                  >
                    <span className="text-white group-hover:text-white font-black uppercase tracking-wider text-xs sm:text-sm transition-colors duration-200">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
