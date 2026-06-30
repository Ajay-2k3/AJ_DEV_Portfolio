import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useInView, animate } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, Award, Zap, Activity, ShieldAlert, Cpu } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { fadeUp, viewport } from "@/lib/motionVariants";

const achievements = [
  {
    icon: Zap,
    title: "35% Faster API Response",
    desc: "Designed 12+ RESTful endpoints with JWT auth, validation, and error-handling middleware — 750ms → 490ms.",
    details: "Leveraged Node.js microservice architecture, modular routes, custom Express.js error-handling middleware, and rigorous input validations using Zod. Refactored bloated SQL queries into optimal execution patterns.",
    techs: ["Node.js", "Express.js", "Zod", "JWT", "REST APIs"]
  },
  {
    icon: Activity,
    title: "IoT Telemetry at Scale",
    desc: "Deployed a React Native app managing real-time data for 500+ street-light nodes across 5 municipal zones.",
    details: "Integrated a custom WebSocket client with automated connection loss recovery, local data sync buffers, and offline caching. Managed state via custom hooks to prevent redundant virtual DOM refreshes.",
    techs: ["React Native", "WebSockets", "IoT", "Mobile Development"]
  },
  {
    icon: Cpu,
    title: "40% Query Latency Reduction",
    desc: "Optimized PostgreSQL/Supabase schemas via compound indexing and real-time subscriptions.",
    details: "Created composite indexes matching the most frequent WHERE/JOIN column sets. Established Row-Level Security (RLS) policies and configured real-time event triggers for live synchronization.",
    techs: ["PostgreSQL", "Supabase", "Indexing", "DB Optimization"]
  },
  {
    icon: ShieldAlert,
    title: "Production Defect Resolution",
    desc: "Reviewed 6 PRs enforcing clean-code standards; resolved 8 production defects via systematic log analysis.",
    details: "Used Winston and custom logs to trace intermittent asynchronous exceptions in staging. Refactored race conditions in order processing queue locks.",
    techs: ["Git", "Logging", "Debugging", "Code Review"]
  },
  {
    icon: Award,
    title: "Agile Sprint Delivery",
    desc: "Delivered features across 3 sprint cycles — requirements gathering through tested release, SDLC-aligned.",
    details: "Collaborated in daily standups, designed user stories, and engineered feature endpoints while strictly following Agile methodologies. Wrote comprehensive unit tests to achieve 90%+ branch coverage.",
    techs: ["Agile/Scrum", "Jira", "SDLC", "Software testing"]
  },
];

function TimelineCard({ a, index }: { a: typeof achievements[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row w-full items-center justify-between mb-12 md:mb-16 ${
      isLeft ? "md:flex-row-reverse" : ""
    }`}>
      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-[45%]" />

      {/* Center line dot marker */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.15 }}
        className="absolute left-6 md:left-1/2 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-[var(--accent-purple)] bg-[var(--bg-primary)] shadow-[0_0_15px_rgba(124,58,237,0.3)]"
      >
        <a.icon className="h-4.5 w-4.5 text-[var(--accent-cyan)]" />
      </motion.div>

      {/* Main card content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="w-[calc(100%-3.5rem)] ml-14 md:ml-0 md:w-[45%] group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-[var(--accent-purple)]/50 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h4 className="font-display text-lg font-bold group-hover:text-gradient-purple transition-all duration-300">{a.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
          </div>

          {/* Animated technology badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {a.techs.map((tech) => (
              <span
                key={tech}
                className="rounded bg-[var(--bg-secondary)] border border-border/40 px-2 py-0.5 font-mono-accent text-[9px] text-muted-foreground/80 hover:border-[var(--accent-purple)]/30 hover:text-foreground transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expand responsibilities trigger */}
          <div className="mt-4 border-t border-border/50 pt-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 font-mono-accent text-[10px] tracking-wider text-[var(--accent-cyan)] uppercase hover:text-[var(--accent-glow)] transition-colors focus:outline-none"
            >
              <span>{expanded ? "Hide Details" : "Show System Impact"}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground bg-[var(--bg-secondary)]/50 border border-border/40 p-3 rounded-lg">
                    {a.details}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Growing central timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const scaleY = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative bg-[var(--bg-secondary)] py-24 md:py-32" aria-label="Experience timeline">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Work Experience</SectionLabel>
        
        {/* Sticky Role info details on the top / grid */}
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16 items-start">
          <div className="sticky top-32">
            <span className="font-mono-accent text-xs tracking-wider text-[var(--accent-purple)] uppercase font-semibold">
              Apr 2025 – Aug 2025
            </span>
            <h3 className="font-display mt-3 text-3xl leading-tight font-bold md:text-5xl">
              Backend Developer Intern
            </h3>
            <div className="mt-3 text-xl text-foreground/80 font-medium">
              Bluewhiz Infotech Pvt. Ltd.
            </div>
            <div className="mt-1 flex items-center gap-1 font-mono-accent text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Dindigul, India
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Delivered enterprise backend features, scaled databases, and resolved deployment blocks. Collaborated directly with project managers under Agile sprint cycles to launch IoT monitoring apps.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["React Native", "Node.js", "PostgreSQL", "Supabase", "REST APIs", "JWT", "RBAC", "Git", "Agile/Scrum"].map((s) => (
                <span key={s} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono-accent text-[9px] text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Timeline column */}
          <div ref={containerRef} className="relative mt-8 md:mt-0">
            {/* SVG / Div timeline line - hidden on small mobile, visible on md+ */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-border/40" />
            
            {/* Animated growing mask overlay */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--accent-purple)] via-[var(--accent-glow)] to-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-purple)]"
            />

            {/* List of achievement cards */}
            <div className="space-y-4 relative">
              {achievements.map((a, i) => (
                <TimelineCard key={a.title} a={a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
