import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll, useMotionTemplate, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, ExternalLink, Code2 } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    year: "2026",
    title: "Flowerly",
    subtitle: "Multi-Tenant Floral E-Commerce Platform",
    description:
      "Delivered as a freelance engagement — a 4-tier multi-tenant ecosystem (Customer App, Seller Dashboard, Delivery Agent App, Admin Portal) built across 35+ responsive pages with glassmorphism UI and real-time order tracking.",
    type: "Freelance Project",
    badge: "Freelance",
    highlights: [
      "Freelance client delivery — end-to-end ownership from architecture to deployment",
      "4-tier multi-tenant architecture across 35+ responsive pages",
      "3-step checkout (Address → Slot → Payment) via Razorpay",
      "Real-time delivery tracking: Socket.IO + Google Maps API",
      "Redis/Bull MQ async queues + NextAuth RBAC",
    ],
    metrics: [
      { label: "Pages", value: "35+" },
      { label: "User Roles", value: "4" },
      { label: "Payment", value: "Live" },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Prisma", "Supabase", "PostgreSQL", "Socket.IO", "Razorpay", "Bull MQ", "NextAuth"],
    gradient: "from-fuchsia-500/20 via-purple-500/15 to-cyan-500/15",
    accentColor: "rgba(168,85,247,0.25)",
    image: "/image/flowerly_img.png",
    liveUrl: "https://flowerly.vercel.app",
    githubUrl: "https://github.com/Ajay-2k3",
  },
  {
    number: "02",
    year: "March 2026",
    title: "AI Stock Platform",
    subtitle: "Real-Time Prediction & Monitoring System",
    description:
      "Final year MCA project — a full-stack Indian stock market platform (NSE/BSE) delivering real-time WebSocket data, AI-driven predictions, and a voice-enabled assistant, engineered for sub-500ms latency on a 500,000-row dataset.",
    type: "Final Year Academic Project",
    badge: "Final Year Project",
    highlights: [
      "ML ensemble: LSTM + Transformer + Random Forest + XGBoost + Reinforcement Learning",
      "RAG-style AI context retrieval with voice responses",
      "Sub-500ms prediction latency at 500K-row scale",
      "Secure Node.js backend: JWT · bcrypt · Helmet · rate limiting · CSRF protection",
    ],
    metrics: [
      { label: "Latency", value: "<500ms" },
      { label: "Dataset", value: "500K rows" },
      { label: "Accuracy", value: "95%+" },
    ],
    stack: ["React.js", "Node.js", "TypeScript", "Python FastAPI", "PostgreSQL", "Redis", "Socket.IO", "LSTM", "Transformer", "XGBoost"],
    gradient: "from-cyan-500/20 via-blue-500/15 to-purple-500/15",
    accentColor: "rgba(6,182,212,0.25)",
    image: "/image/AI_StockPlatform_img.png",
    liveUrl: "#",
    githubUrl: "https://github.com/Ajay-2k3",
  },
];

function MetricCard({ m, index }: { m: typeof projects[0]["metrics"][0]; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const cleanNum = m.value.replace(/[^0-9]/g, "");
    const target = parseInt(cleanNum, 10);
    if (isNaN(target)) {
      setVal(m.value);
      return;
    }
    const obj = { v: 0 };
    const controls = gsap.to(obj, {
      v: target,
      duration: 1.5,
      delay: index * 0.1,
      ease: "power3.out",
      onUpdate: () => {
        const rounded = Math.round(obj.v);
        if (m.value.includes("<")) {
          setVal(`<${rounded}ms`);
        } else if (m.value.includes("+")) {
          setVal(`${rounded}+`);
        } else if (m.value.includes("%")) {
          setVal(`${rounded}%`);
        } else {
          setVal(String(rounded));
        }
      }
    });
    return () => controls.kill();
  }, [inView, m.value, index]);

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-border/40 bg-card/30 min-w-20 hover:border-[var(--accent-purple)]/30 transition-colors">
      <span ref={ref} className="font-display text-xl font-bold text-gradient-purple">{val}</span>
      <span className="font-mono-accent text-[9px] tracking-wider text-muted-foreground uppercase mt-1">{m.label}</span>
    </div>
  );
}



function ProjectCard({ project, reverse }: { project: typeof projects[0]; reverse: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Parallax backdrop number tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const numY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.01, 0.08, 0.08, 0.01]);
  const windowScale = useTransform(scrollYProgress, [0, 0.35], [0.93, 1]);
  const windowY = useTransform(scrollYProgress, [0, 0.35], [40, 0]);

  // Card 3D tilt coordinates
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rx = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const ry = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 90, damping: 15 });
  const springGlowY = useSpring(glowY, { stiffness: 90, damping: 15 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mockupRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 12);
    rotateX.set(-y * 12);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const glareBg = useMotionTemplate`radial-gradient(circle 200px at ${springGlowX}px ${springGlowY}px, rgba(255,255,255,0.06), transparent 75%)`;

  return (
    <div
      ref={containerRef}
      className={`grid items-start gap-12 md:grid-cols-2 md:gap-20 relative py-12 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* 3D Browser Showcase Mockup */}
      <motion.div
        ref={mockupRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          scale: windowScale,
          y: windowY,
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="group relative cursor-none"
      >
        {/* Soft background glow matching accent */}
        <div
          className="absolute -inset-6 -z-10 rounded-2xl opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-65"
          style={{ background: `radial-gradient(circle, ${project.accentColor}, transparent 70%)` }}
        />

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-colors duration-300 group-hover:border-[var(--accent-purple)]/30">
          {/* OS window controls */}
          <div className="flex items-center gap-1.5 border-b border-border/40 bg-[var(--bg-secondary)] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-red-500/50" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
            <span className="h-2 w-2 rounded-full bg-green-500/50" />
            <div className="ml-4 flex-1 rounded bg-[var(--bg-primary)] px-3 py-0.5 text-center font-mono-accent text-[9px] text-muted-foreground select-none">
              {project.title.toLowerCase().replace(/\s+/g, "")}.vercel.app
            </div>
            <ExternalLink className="h-3 w-3 text-muted-foreground/40" />
          </div>

          {/* Screenshot container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-secondary)]">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-border via-card to-border animate-pulse" />
            )}
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              onLoad={() => setImgLoaded(true)}
              className={`h-full w-full object-cover object-top transition-all duration-700 ${
                hovered ? "scale-[1.04]" : "scale-100"
              } ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
            />
            {/* Mirror light beam glare */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: glareBg,
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 pointer-events-none`} />
          </div>
        </div>
      </motion.div>

      {/* Narrative details block */}
      <div className="relative">
        {/* Deep Parallax number backdrop */}
        <motion.div
          style={{ y: numY, opacity: numOpacity }}
          className="absolute -top-24 -left-6 font-display text-[130px] leading-none font-bold text-stroke-number select-none md:text-[200px] pointer-events-none z-0"
        >
          {project.number}
        </motion.div>

        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3 font-mono-accent text-[11px] text-muted-foreground uppercase tracking-widest">
            <span className="text-[var(--accent-purple)]">/ {project.number}</span>
            <span className="h-px flex-1 bg-border/40" />
            <span>{project.year}</span>
            <span className="rounded-full bg-[var(--accent-purple)]/10 px-2.5 py-0.5 text-[9px] text-[var(--accent-glow)] font-semibold border border-[var(--accent-purple)]/20">
              {project.badge}
            </span>
          </div>

          <h3 className="font-display text-3xl font-bold md:text-5xl tracking-tight">{project.title}</h3>
          <p className="mt-2.5 font-mono-accent text-[11px] text-[var(--accent-cyan)] tracking-wider uppercase">{project.subtitle}</p>

          <p className="mt-6 text-sm md:text-base leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mt-6 space-y-3.5 text-xs md:text-sm text-foreground/80">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-2.5 h-[1.5px] w-4 shrink-0 bg-[var(--accent-purple)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Staggered load statistics */}
          <div className="mt-8 flex flex-wrap gap-4">
            {project.metrics.map((m, idx) => (
              <MetricCard key={m.label} m={m} index={idx} />
            ))}
          </div>

          {/* Stack Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s, idx) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.5 }}
                className="rounded border border-border bg-card px-2.5 py-1 font-mono-accent text-[9px] text-muted-foreground hover:border-[var(--accent-purple)]/50 hover:text-foreground/90 transition-colors"
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* Premium Expandable Apple Drawer & Graph */}
          <div className="mt-8">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-2 font-mono-accent text-[10px] tracking-wider text-[var(--accent-cyan)] hover:text-[var(--accent-glow)] transition-colors uppercase"
            >
              <span>{expanded ? "[-]" : "[+]"}</span>
              {expanded ? "Collapse Architecture Diagram" : "Expand System Architecture Diagram"}
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl border border-border/80 bg-[var(--bg-secondary)]/80 p-5 space-y-4 backdrop-blur-md">
                  <div className="grid grid-cols-2 gap-4 font-mono-accent text-[10px] text-muted-foreground border-b border-border/40 pb-4">
                    <div>
                      <span className="text-[var(--accent-purple)] uppercase block mb-1">Architecture Node</span>
                      <span className="text-foreground/90 font-sans text-xs">High Scalability Microservice</span>
                    </div>
                    <div>
                      <span className="text-[var(--accent-purple)] uppercase block mb-1">Queue Pipeline</span>
                      <span className="text-foreground/90 font-sans text-xs">Bull MQ Queue / Redis Cache</span>
                    </div>
                  </div>

                  {/* SVG Architecture Diagram Node pipeline */}
                  <div className="relative pt-2 pb-1 overflow-x-auto min-w-[280px]">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2 font-mono-accent text-[9px]">
                      
                      {/* Responsive SVG connection lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
                        <defs>
                          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--accent-purple)" />
                            <stop offset="100%" stopColor="var(--accent-cyan)" />
                          </linearGradient>
                        </defs>
                        <path d="M 55,30 L 115,30" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" className="animate-draw" />
                        <path d="M 175,30 L 235,30" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" className="animate-draw" />
                        <path d="M 295,30 L 355,30" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" className="animate-draw" />
                        <path d="M 415,30 L 475,30" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" className="animate-draw" />
                      </svg>

                      {/* Nodes block */}
                      {[
                        { label: "Client App", tech: project.number === "01" ? "Next.js" : "React.js", glow: "glow-purple" },
                        { label: "API Gateway", tech: project.number === "01" ? "NextAuth" : "FastAPI/Node", glow: "glow-cyan" },
                        { label: "Cache/Queue", tech: "Redis Queue", glow: "glow-purple" },
                        { label: "Data Layer", tech: "Postgres/Prisma", glow: "glow-cyan" },
                        { label: "Workers", tech: "Node / FastAPI", glow: "glow-purple" }
                      ].map((node, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="relative z-10 flex flex-col items-center p-2 rounded border border-border bg-card/90 text-center w-full md:w-[86px] hover:border-[var(--accent-purple)]/50 transition-colors duration-300"
                        >
                          <div className={`h-2 w-2 rounded-full mb-1.5 bg-[var(--accent-purple)] ${node.glow} animate-pulse`} />
                          <span className="font-semibold text-foreground/95 truncate w-full">{node.label}</span>
                          <span className="text-[8px] text-muted-foreground truncate w-full">{node.tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call-to-action buttons with custom slide expands */}
          <div className="mt-8 flex gap-6">
            <Magnetic range={35} strength={0.25}>
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-white/10 bg-transparent px-5 py-2.5 font-mono-accent text-[11px] tracking-wider text-foreground hover:text-white uppercase transition-colors"
              >
                {/* Liquid slide background hover */}
                <div className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                Live Demo
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </Magnetic>

            <Magnetic range={35} strength={0.25}>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-border bg-transparent px-5 py-2.5 font-mono-accent text-[11px] tracking-wider text-muted-foreground hover:text-foreground uppercase transition-colors"
              >
                <div className="absolute inset-0 -z-10 translate-y-full bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <Github className="h-3.5 w-3.5" />
                GitHub
              </motion.a>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of projects wrapper to animate vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} id="projects" className="relative py-24 md:py-36 overflow-hidden" aria-label="Projects section">
      {/* Vertical Timeline Axis Line */}
      <div className="absolute left-6 top-1/4 bottom-1/4 w-[1px] bg-border/40 md:left-1/2 md:-translate-x-1/2 pointer-events-none z-0">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-[var(--accent-purple)] via-[var(--accent-cyan)] to-[var(--accent-glow)] origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Selected Work</SectionLabel>
        
        <h2 className="font-display mb-20 text-4xl leading-tight font-bold md:text-6xl">
          Shipped in <span className="text-gradient-purple font-display">production.</span>
        </h2>

        <div className="space-y-36 relative z-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.number} project={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

