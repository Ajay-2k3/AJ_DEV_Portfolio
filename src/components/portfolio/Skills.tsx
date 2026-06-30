import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiGit,
  SiNextdotjs, SiTailwindcss, SiRedux, SiFramer,
  SiExpress, SiFastapi, SiApachekafka,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiPrisma, SiSupabase,
  SiDocker, SiGithubactions, SiVercel, SiLinux, SiVite, SiPostman,
  SiPython, SiHtml5, SiCss, SiBootstrap, SiSpringboot, SiShadcnui,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Code2, Server, Database, Cloud, BookOpen, Terminal, Layers } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "All" | "Languages" | "Frontend" | "Backend" | "Databases" | "DevOps" | "Practices";

interface Skill {
  name: string;
  icon?: React.ReactNode;
  category: Exclude<Category, "All">;
  level: number; // 1-5
  core?: boolean; // featured in Core Stack hero row
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "All",       label: "All",       icon: <Layers   className="h-3.5 w-3.5" /> },
  { id: "Languages", label: "Languages", icon: <Terminal  className="h-3.5 w-3.5" /> },
  { id: "Frontend",  label: "Frontend",  icon: <SiReact  className="h-3.5 w-3.5" /> },
  { id: "Backend",   label: "Backend",   icon: <Server   className="h-3.5 w-3.5" /> },
  { id: "Databases", label: "Databases", icon: <Database className="h-3.5 w-3.5" /> },
  { id: "DevOps",    label: "DevOps",    icon: <Cloud    className="h-3.5 w-3.5" /> },
  { id: "Practices", label: "Practices", icon: <BookOpen className="h-3.5 w-3.5" /> },
];

const skills: Skill[] = [
  // Languages
  { name: "TypeScript",       icon: <SiTypescript />,   category: "Languages", level: 5, core: true  },
  { name: "JavaScript",       icon: <SiJavascript />,   category: "Languages", level: 5, core: true  },
  { name: "Python",           icon: <SiPython />,       category: "Languages", level: 4              },
  { name: "Java",             icon: <FaJava />,          category: "Languages", level: 4              },
  { name: "SQL",              icon: <Code2 className="h-4 w-4" />, category: "Languages", level: 5   },
  { name: "HTML5",            icon: <SiHtml5 />,         category: "Languages", level: 5              },
  { name: "CSS3",             icon: <SiCss />,           category: "Languages", level: 4              },
  // Frontend
  { name: "React.js",         icon: <SiReact />,        category: "Frontend",  level: 5, core: true  },
  { name: "Next.js",          icon: <SiNextdotjs />,    category: "Frontend",  level: 5, core: true  },
  { name: "Tailwind CSS",     icon: <SiTailwindcss />,  category: "Frontend",  level: 5, core: true  },
  { name: "Shadcn UI",        icon: <SiShadcnui />,     category: "Frontend",  level: 5              },
  { name: "Framer Motion",    icon: <SiFramer />,        category: "Frontend",  level: 4              },
  { name: "Redux",            icon: <SiRedux />,         category: "Frontend",  level: 4              },
  { name: "React Native",     icon: <SiReact />,         category: "Frontend",  level: 4              },
  { name: "Bootstrap",        icon: <SiBootstrap />,     category: "Frontend",  level: 4              },
  // Backend
  { name: "Node.js",          icon: <SiNodedotjs />,    category: "Backend",   level: 5, core: true  },
  { name: "Express.js",       icon: <SiExpress />,       category: "Backend",   level: 5, core: true  },
  { name: "FastAPI",          icon: <SiFastapi />,       category: "Backend",   level: 4              },
  { name: "Spring Boot",      icon: <SiSpringboot />,    category: "Backend",   level: 3              },
  { name: "Apache Kafka",     icon: <SiApachekafka />,   category: "Backend",   level: 3              },
  { name: "JWT",              icon: <Code2 className="h-4 w-4" />, category: "Backend", level: 5     },
  { name: "RBAC",             icon: <Code2 className="h-4 w-4" />, category: "Backend", level: 5     },
  { name: "Microservices",    icon: <Layers className="h-4 w-4" />, category: "Backend", level: 4    },
  // Databases
  { name: "PostgreSQL",       icon: <SiPostgresql />,   category: "Databases", level: 5, core: true  },
  { name: "Prisma ORM",       icon: <SiPrisma />,        category: "Databases", level: 5              },
  { name: "Supabase",         icon: <SiSupabase />,      category: "Databases", level: 5              },
  { name: "MySQL",            icon: <SiMysql />,         category: "Databases", level: 4              },
  { name: "MongoDB",          icon: <SiMongodb />,       category: "Databases", level: 4              },
  { name: "Redis",            icon: <SiRedis />,         category: "Databases", level: 4              },
  // DevOps
  { name: "Docker",           icon: <SiDocker />,        category: "DevOps",    level: 4              },
  { name: "GitHub Actions",   icon: <SiGithubactions />, category: "DevOps",    level: 4              },
  { name: "Vercel",           icon: <SiVercel />,        category: "DevOps",    level: 5              },
  { name: "Vite",             icon: <SiVite />,          category: "DevOps",    level: 5              },
  { name: "Postman",          icon: <SiPostman />,       category: "DevOps",    level: 5              },
  { name: "AWS (EC2, S3)",    icon: <Cloud className="h-4 w-4" />, category: "DevOps", level: 3      },
  { name: "Linux",            icon: <SiLinux />,         category: "DevOps",    level: 4              },
  { name: "Git",              icon: <SiGit />,           category: "DevOps",    level: 5              },
  // Practices
  { name: "OOP",              icon: <BookOpen className="h-4 w-4" />, category: "Practices", level: 5 },
  { name: "TDD",              icon: <BookOpen className="h-4 w-4" />, category: "Practices", level: 4 },
  { name: "Design Patterns",  icon: <Layers className="h-4 w-4" />,   category: "Practices", level: 4 },
  { name: "System Design",    icon: <Server className="h-4 w-4" />,    category: "Practices", level: 4 },
  { name: "Agile / Scrum",    icon: <BookOpen className="h-4 w-4" />, category: "Practices", level: 5 },
  { name: "DSA",              icon: <Code2 className="h-4 w-4" />,    category: "Practices", level: 4 },
  { name: "Code Review",      icon: <Code2 className="h-4 w-4" />,    category: "Practices", level: 5 },
];

const coreStack = skills.filter((s) => s.core);

// Proficiency dot label
const levelLabel: Record<number, string> = {
  5: "Expert",
  4: "Advanced",
  3: "Proficient",
  2: "Familiar",
  1: "Learning",
};

// ─── ProficiencyDots ──────────────────────────────────────────────────────────
function ProficiencyDots({ level, animate }: { level: number; animate?: boolean }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, scale: 0 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`h-[5px] rounded-full transition-all duration-500 ${
            i < level
              ? "w-4 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
              : "w-[5px] bg-border/60"
          }`}
        />
      ))}
    </div>
  );
}

// ─── CoreFeatureCard ──────────────────────────────────────────────────────────
function CoreFeatureCard({ skill }: { skill: Skill }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(168,85,247,0.10), transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-[var(--bg-card)] p-6 cursor-default"
    >
      {/* Animated gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))",
        }}
      />
      {/* Inset border gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-[var(--accent-purple)]/20 transition-all duration-500"
      />
      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-primary)] text-2xl text-muted-foreground group-hover:text-[var(--accent-glow)] transition-colors duration-300 border border-border">
          {skill.icon}
        </div>

        {/* Name */}
        <div>
          <h3 className="font-display text-[15px] font-semibold text-foreground leading-tight">
            {skill.name}
          </h3>
          <p className="mt-0.5 font-mono-accent text-[10px] tracking-widest text-muted-foreground uppercase">
            {skill.category}
          </p>
        </div>

        {/* Proficiency */}
        <div className="flex items-center gap-3">
          <ProficiencyDots level={skill.level} animate />
          <span className="font-mono-accent text-[10px] text-muted-foreground tracking-wider">
            {levelLabel[skill.level]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SkillPill ────────────────────────────────────────────────────────────────
function SkillPill({ skill }: { skill: Skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group flex items-center gap-3 rounded-xl border border-border bg-[var(--bg-card)] px-4 py-3 hover:border-[var(--accent-purple)]/30 hover:bg-[var(--accent-purple)]/[0.04] transition-colors duration-300 cursor-default"
    >
      {/* Icon */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-base text-muted-foreground group-hover:text-[var(--accent-glow)] transition-colors duration-300">
        {skill.icon ?? (
          <span className="font-mono-accent text-[10px] font-bold uppercase text-muted-foreground">
            {skill.name.slice(0, 2)}
          </span>
        )}
      </div>

      {/* Name */}
      <span className="font-sans text-[13px] font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200 flex-1 truncate">
        {skill.name}
      </span>

      {/* Dots */}
      <ProficiencyDots level={skill.level} />
    </motion.div>
  );
}

// ─── Main Skills Component ────────────────────────────────────────────────────
export function Skills() {
  const [active, setActive] = useState<Category>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreRowRef = useRef<HTMLDivElement>(null);
  const pillGridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered = active === "All"
    ? skills.filter((s) => !s.core)
    : skills.filter((s) => s.category === active);

  // ── GSAP scroll-triggered stagger on header ──────────────────────────────
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".skills-reveal");
      gsap.fromTo(
        items,
        { y: 28, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── GSAP stagger on core cards ───────────────────────────────────────────
  useEffect(() => {
    const el = coreRowRef.current;
    if (!el) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y: 36, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.07,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── GSAP stagger on pill grid ────────────────────────────────────────────
  const runPillStagger = useCallback(() => {
    const el = pillGridRef.current;
    if (!el) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;
    gsap.fromTo(
      el.querySelectorAll(".skill-pill"),
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.035,
        duration: 0.55,
        ease: "power2.out",
        clearProps: "all",
      }
    );
  }, []);

  useEffect(() => {
    // Small delay to let Framer Motion render first
    const t = setTimeout(runPillStagger, 120);
    return () => clearTimeout(t);
  }, [active, runPillStagger]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[var(--bg-secondary)] py-24 md:py-36 overflow-hidden"
      aria-label="Skills and tech stack"
    >
      {/* ── Subtle background grid ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Soft purple ambient */}
        <div className="absolute -top-64 left-1/3 h-[500px] w-[500px] rounded-full bg-[var(--accent-purple)]/[0.04] blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-[var(--accent-cyan)]/[0.03] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6">

        {/* ── Header ── */}
        <div ref={headerRef}>
          <div className="skills-reveal">
            <SectionLabel>Skills &amp; Stack</SectionLabel>
          </div>
          <h2 className="skills-reveal font-display mt-4 text-4xl leading-[1.1] font-bold md:text-5xl tracking-tight">
            The tools I&nbsp;
            <span className="text-gradient-purple">wield.</span>
          </h2>
          <p className="skills-reveal mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            A curated set of technologies I use to architect and ship production software — from APIs to UIs.
          </p>
        </div>

        {/* ── Core Stack ── */}
        <div className="mt-14">
          <p className="mb-5 font-mono-accent text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Core Stack
          </p>
          <div
            ref={coreRowRef}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
          >
            {coreStack.map((skill) => (
              <CoreFeatureCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* ── Category Tabs ── */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by skill category"
        >
          {categories.map(({ id, label, icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 font-mono-accent text-[11px] tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent-purple)] ${
                active === id
                  ? "text-white"
                  : "text-muted-foreground border border-border hover:border-[var(--accent-purple)]/40 hover:text-foreground"
              }`}
            >
              {icon}
              <span className="relative z-10">{label}</span>
              {active === id && (
                <motion.span
                  layoutId="active-skill-tab"
                  className="absolute inset-0 rounded-full bg-[var(--accent-purple)]"
                  style={{ zIndex: 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Pills Grid ── */}
        <motion.div
          ref={pillGridRef}
          layout
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <div key={skill.name} className="skill-pill">
                <SkillPill skill={skill} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Footer legend ── */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/30 pt-6">
          <p className="font-mono-accent text-[10px] text-muted-foreground uppercase tracking-widest">
            {filtered.length}&nbsp;technologies · {active} view
          </p>
          {/* Proficiency legend */}
          <div className="flex items-center gap-5">
            {([["Expert", 5], ["Advanced", 4], ["Proficient", 3]] as [string, number][]).map(([label, lvl]) => (
              <div key={label} className="flex items-center gap-1.5">
                <ProficiencyDots level={lvl} />
                <span className="font-mono-accent text-[9px] text-muted-foreground uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
