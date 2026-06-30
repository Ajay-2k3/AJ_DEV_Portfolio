import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const achievements = [
  { icon: "⚡", title: "35% Faster API Response", desc: "Designed 12+ RESTful endpoints with JWT auth, validation, and error-handling middleware — 750ms → 490ms." },
  { icon: "📡", title: "IoT Telemetry at Scale", desc: "Deployed a React Native app managing real-time data for 500+ street-light nodes across 5 municipal zones." },
  { icon: "🗄️", title: "40% Query Latency Reduction", desc: "Optimized PostgreSQL/Supabase schemas via compound indexing and real-time subscriptions." },
  { icon: "🔍", title: "Production Defect Resolution", desc: "Reviewed 6 PRs enforcing clean-code standards; resolved 8 production defects via systematic log analysis." },
  { icon: "🔄", title: "Agile Sprint Delivery", desc: "Delivered features across 3 sprint cycles — requirements gathering through tested release, SDLC-aligned." },
];

export function Experience() {
  return (
    <section id="experience" className="relative bg-[var(--bg-secondary)] py-32 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Work Experience</SectionLabel>
        <div className="grid gap-12 md:grid-cols-[1fr_1.8fr] md:gap-16">
          <div>
            <div className="sticky top-32">
              <div className="font-mono-accent text-xs tracking-wider text-[var(--accent-purple)] uppercase">
                Apr 2025 – Aug 2025
              </div>
              <h3 className="font-display mt-3 text-3xl leading-tight font-bold md:text-4xl">
                Backend Developer Intern
              </h3>
              <div className="mt-2 text-lg text-foreground/80">
                Bluewhiz Infotech Pvt. Ltd.
              </div>
              <div className="mt-1 font-mono-accent text-xs text-muted-foreground">Dindigul, India</div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["React Native", "Node.js", "PostgreSQL", "Supabase", "REST APIs", "JWT", "RBAC", "Git", "Agile/Scrum"].map((s) => (
                  <span key={s} className="rounded-md border border-border bg-card px-2 py-1 font-mono-accent text-[10px] text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ul className="space-y-6">
            {achievements.map((a, i) => (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-[var(--accent-purple)]/40"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--bg-primary)] text-xl">
                    {a.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold">{a.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
