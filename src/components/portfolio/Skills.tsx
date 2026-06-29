import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const categories = [
  {
    title: "Core / JD-Ready",
    items: ["React.js", "Node.js", "TypeScript", "JavaScript ES6+", "REST APIs", "Git", "Agile / Scrum"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React Native", "Tailwind CSS", "Shadcn UI", "Redux", "Framer Motion", "Responsive Web"],
  },
  {
    title: "Backend",
    items: ["Express.js", "FastAPI", "Spring Boot", "Microservices", "Apache Kafka", "JWT", "RBAC", "WebSockets"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM", "Supabase"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Docker", "GitHub Actions", "AWS (EC2, S3)", "Azure", "Vercel", "Linux/Unix", "Vite", "Postman"],
  },
  {
    title: "Practices",
    items: ["OOP", "SOLID", "Design Patterns", "TDD", "System Design", "DSA", "Code Review", "SDLC"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative bg-[var(--bg-secondary)] py-32 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Skills & Stack</SectionLabel>
        <h2 className="font-display mb-16 text-4xl leading-tight font-bold md:text-6xl">
          The tools I <span className="text-gradient-purple">wield.</span>
        </h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[var(--accent-purple)]/50"
            >
              <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)]/0 via-[var(--accent-purple)]/0 to-[var(--accent-cyan)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-30" />
              <div className="mb-4 flex items-center gap-2 font-mono-accent text-[10px] tracking-[0.25em] text-[var(--accent-purple)] uppercase">
                <span className="h-px w-6 bg-[var(--accent-purple)]" />
                {cat.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-[var(--bg-primary)]/60 px-2.5 py-1 font-mono-accent text-xs text-foreground/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
