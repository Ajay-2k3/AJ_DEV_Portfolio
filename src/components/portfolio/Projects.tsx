import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { fadeUp, viewport } from "@/lib/motionVariants";

// Real project screenshots provided by user in screenshots (using Unsplash as placeholders with correct project titles)
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
    accentColor: "rgba(168,85,247,0.3)",
    image: "/image/flowerly_img.png",
    liveUrl: "https://flowerly.vercel.app",
    githubUrl: "https://github.com/Ajay-2k3",
  },
  {
    number: "02",
    year: "March 2026",
    title: "AI Stock Prediction & Monitoring System",
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
    accentColor: "rgba(6,182,212,0.3)",
    image: "/image/AI_StockPlatform_img.png",
    liveUrl: "#",
    githubUrl: "https://github.com/Ajay-2k3",
  },
];

// Mouse-tracking tilt card
function ProjectCard({ project, reverse }: { project: typeof projects[0]; reverse: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springCfg = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springCfg);
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const imageScale = useSpring(hovered ? 1.08 : 1, { stiffness: 200, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
    >
      {/* Browser mockup with real screenshot */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          mouseX.set(0.5);
          mouseY.set(0.5);
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="group relative"
      >
        {/* Ambient glow behind card */}
        <motion.div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl blur-3xl transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, ${project.accentColor}, transparent 70%)` }}
          animate={{ opacity: hovered ? 0.7 : 0.4 }}
        />

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-500 group-hover:border-[var(--accent-purple)]/30 group-hover:shadow-[0_20px_60px_rgba(124,58,237,0.15)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-border bg-[var(--bg-secondary)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <span className="ml-3 flex-1 rounded-md bg-[var(--bg-primary)] px-3 py-1 font-mono-accent text-[10px] text-muted-foreground">
              {project.title.toLowerCase().replace(/\s+/g, "")}.app
            </span>
            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-50" />
          </div>

          {/* Screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.image}
              alt={`${project.title} — ${project.subtitle}`}
              style={{ scale: imageScale }}
              className="h-full w-full object-cover object-top transition-all duration-700"
              loading="lazy"
            />
            {/* Mouse tracking light */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle 150px at ${glowX.get()} ${glowY.get()}, rgba(255,255,255,0.08), transparent 70%)`,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative">
        {/* Big number */}
        <div className="absolute -top-16 -left-2 font-display text-[120px] leading-none font-bold text-foreground/[0.04] select-none md:text-[160px] pointer-events-none">
          {project.number}
        </div>

        <div className="relative">
          {/* Meta line */}
          <div className="mb-3 flex items-center gap-3 font-mono-accent text-xs text-muted-foreground">
            <span className="text-[var(--accent-purple)]">/ {project.number}</span>
            <span className="h-px flex-1 bg-border" />
            <span>{project.year}</span>
            {project.badge && (
              <span className="rounded-full bg-[var(--accent-purple)]/10 px-2.5 py-0.5 text-[10px] text-[var(--accent-glow)] font-semibold border border-[var(--accent-purple)]/20 uppercase tracking-wider">
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="font-display text-3xl font-bold md:text-5xl">{project.title}</h3>
          <p className="mt-2 font-mono-accent text-sm text-[var(--accent-cyan)]">{project.subtitle}</p>

          {/* Type */}
          <div className="mt-3 flex items-center gap-2 font-mono-accent text-[11px] text-muted-foreground">
            <span className="h-px w-4 bg-[var(--accent-purple)]/50" />
            Type: <span className="text-foreground/70">{project.type}</span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{project.description}</p>

          {/* Highlights */}
          <ul className="mt-6 space-y-2 text-sm text-foreground/80">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-[var(--accent-purple)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Metrics */}
          <div className="mt-6 flex gap-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-xl font-bold text-gradient-purple">{m.value}</div>
                <div className="font-mono-accent text-[10px] tracking-wider text-muted-foreground uppercase">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Stack badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-card px-2.5 py-1 font-mono-accent text-[10px] text-muted-foreground transition-colors hover:border-[var(--accent-purple)]/40 hover:text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="mt-8 flex gap-6">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-purple)] px-4 py-2 font-mono-accent text-xs tracking-wider text-[var(--accent-purple)] uppercase transition-all hover:bg-[var(--accent-purple)] hover:text-white"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              className="group inline-flex items-center gap-1.5 font-mono-accent text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32" aria-label="Projects section">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Selected Work</SectionLabel>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-display mb-20 text-4xl leading-tight font-bold md:text-6xl"
        >
          Shipped in <span className="text-gradient-purple">production.</span>
        </motion.h2>

        <div className="space-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.number} project={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
