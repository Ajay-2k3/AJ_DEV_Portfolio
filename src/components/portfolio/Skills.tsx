import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiGit,
  SiNextdotjs, SiTailwindcss, SiRedux, SiFramer,
  SiExpress, SiFastapi, SiApachekafka,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiPrisma, SiSupabase,
  SiDocker, SiGithubactions, SiVercel, SiLinux, SiVite, SiPostman,
  SiPython, SiHtml5, SiCss, SiBootstrap, SiSpringboot, SiShadcnui,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Code2, Server, Database, Cloud, BookOpen, Terminal } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { staggerContainer, fadeUp, viewport } from "@/lib/motionVariants";

type Category = "All" | "Languages" | "Frontend" | "Backend" | "Databases" | "DevOps" | "Practices";

const categories: Category[] = ["All", "Languages", "Frontend", "Backend", "Databases", "DevOps", "Practices"];

const categoryIcons: Record<Category, React.ReactNode> = {
  All: <Code2 className="h-3.5 w-3.5" />,
  Languages: <Terminal className="h-3.5 w-3.5" />,
  Frontend: <SiReact className="h-3.5 w-3.5" />,
  Backend: <Server className="h-3.5 w-3.5" />,
  Databases: <Database className="h-3.5 w-3.5" />,
  DevOps: <Cloud className="h-3.5 w-3.5" />,
  Practices: <BookOpen className="h-3.5 w-3.5" />,
};

interface Skill {
  name: string;
  icon?: React.ReactNode;
  category: Exclude<Category, "All">;
  level?: number; // 1-5 for stars
}

const skills: Skill[] = [
  // Languages
  { name: "JavaScript (ES6+)", icon: <SiJavascript />, category: "Languages", level: 5 },
  { name: "TypeScript", icon: <SiTypescript />, category: "Languages", level: 5 },
  { name: "Python", icon: <SiPython />, category: "Languages", level: 4 },
  { name: "Java", icon: <FaJava />, category: "Languages", level: 4 },
  { name: "SQL", category: "Languages", level: 5 },
  { name: "HTML5", icon: <SiHtml5 />, category: "Languages", level: 5 },
  { name: "CSS3", icon: <SiCss />, category: "Languages", level: 4 },

  // Frontend
  { name: "React.js", icon: <SiReact />, category: "Frontend", level: 5 },
  { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend", level: 5 },
  { name: "React Native", icon: <SiReact />, category: "Frontend", level: 4 },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Frontend", level: 5 },
  { name: "Framer Motion", icon: <SiFramer />, category: "Frontend", level: 4 },
  { name: "Shadcn UI", icon: <SiShadcnui />, category: "Frontend", level: 5 },
  { name: "Redux", icon: <SiRedux />, category: "Frontend", level: 4 },
  { name: "Bootstrap", icon: <SiBootstrap />, category: "Frontend", level: 4 },

  // Backend
  { name: "Node.js", icon: <SiNodedotjs />, category: "Backend", level: 5 },
  { name: "Express.js", icon: <SiExpress />, category: "Backend", level: 5 },
  { name: "FastAPI", icon: <SiFastapi />, category: "Backend", level: 4 },
  { name: "Spring Boot", icon: <SiSpringboot />, category: "Backend", level: 3 },
  { name: "Apache Kafka", icon: <SiApachekafka />, category: "Backend", level: 3 },
  { name: "JWT", category: "Backend", level: 5 },
  { name: "RBAC", category: "Backend", level: 5 },
  { name: "Microservices", category: "Backend", level: 4 },

  // Databases
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Databases", level: 5 },
  { name: "MySQL", icon: <SiMysql />, category: "Databases", level: 4 },
  { name: "MongoDB", icon: <SiMongodb />, category: "Databases", level: 4 },
  { name: "Redis", icon: <SiRedis />, category: "Databases", level: 4 },
  { name: "Supabase", icon: <SiSupabase />, category: "Databases", level: 5 },
  { name: "Prisma ORM", icon: <SiPrisma />, category: "Databases", level: 5 },

  // DevOps & Cloud
  { name: "Docker", icon: <SiDocker />, category: "DevOps", level: 4 },
  { name: "GitHub Actions", icon: <SiGithubactions />, category: "DevOps", level: 4 },
  { name: "AWS (EC2, S3)", category: "DevOps", level: 3 },
  { name: "Azure", category: "DevOps", level: 3 },
  { name: "Vercel", icon: <SiVercel />, category: "DevOps", level: 5 },
  { name: "Vite", icon: <SiVite />, category: "DevOps", level: 5 },
  { name: "Postman", icon: <SiPostman />, category: "DevOps", level: 5 },

  // Practices
  { name: "OOP", category: "Practices", level: 5 },
  { name: "TDD", category: "Practices", level: 4 },
  { name: "Design Patterns", category: "Practices", level: 4 },
  { name: "System Design", category: "Practices", level: 4 },
  { name: "Agile/Scrum", category: "Practices", level: 5 },
  { name: "DSA", category: "Practices", level: 4 },
  { name: "Code Review", category: "Practices", level: 5 },
];

function SkillPill({ skill }: { skill: Skill }) {
  const percent = skill.level ? skill.level * 20 : 70;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative flex flex-col justify-between rounded-xl border border-border bg-[var(--bg-card)]/40 p-4 transition-all duration-300 hover:border-[var(--accent-purple)]/50 hover:bg-[var(--accent-purple)]/5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.1)]"
    >
      <div className="flex items-center gap-3">
        {skill.icon ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]/80 text-muted-foreground transition-all duration-300 group-hover:bg-[var(--accent-purple)]/10 group-hover:text-[var(--accent-glow)]">
            {skill.icon}
          </div>
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]/80 text-[10px] font-bold text-muted-foreground uppercase">
            {skill.name.slice(0, 2)}
          </div>
        )}
        <h3 className="font-display text-sm font-semibold text-foreground/90 truncate">{skill.name}</h3>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between font-mono-accent text-[9px] text-muted-foreground uppercase tracking-wider">
          <span>Proficiency</span>
          <span className="text-[var(--accent-cyan)] group-hover:text-[var(--accent-glow)] transition-colors">{percent}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-border overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
          />
        </div>
      </div>

      {/* Hover background spotlight/glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent-purple)]/0 to-[var(--accent-cyan)]/0 opacity-0 transition-opacity duration-500 group-hover:from-[var(--accent-purple)]/5 group-hover:to-[var(--accent-cyan)]/5 group-hover:opacity-100" />
    </motion.div>
  );
}

export function Skills() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative bg-[var(--bg-secondary)] py-24 md:py-32" aria-label="Skills and tech stack">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Skills & Stack</SectionLabel>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-display mb-10 text-4xl leading-tight font-bold md:text-6xl"
        >
          The tools I <span className="text-gradient-purple">wield.</span>
        </motion.h2>

        {/* Category filter tabs */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeUp}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 rounded-full border px-4 py-2 font-mono-accent text-xs tracking-wider uppercase transition-all duration-300"
              style={{
                borderColor: active === cat ? "var(--accent-purple)" : "var(--border)",
                background: active === cat ? "var(--accent-purple)" : "transparent",
                color: active === cat ? "white" : "var(--text-muted)",
              }}
            >
              {categoryIcons[cat]}
              {cat}
              {active === cat && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--accent-purple)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill pills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {filtered.map((skill) => (
              <SkillPill key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count badge */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 font-mono-accent text-xs text-muted-foreground"
        >
          Showing {filtered.length} of {skills.length} skills
        </motion.p>
      </div>
    </section>
  );
}
