import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const projects = [
  {
    number: "01",
    year: "2026",
    title: "Flowerly",
    subtitle: "Multi-Tenant Floral E-Commerce Platform",
    description:
      "A production-grade 4-tier multi-tenant platform serving Customers, Sellers, Delivery Agents, and Admins — built with Next.js 16 App Router and React 19 across 35+ responsive pages.",
    highlights: [
      "4-tier multi-tenant architecture",
      "3-step checkout: Address → Slot → Razorpay",
      "Real-time delivery via Socket.IO + Google Maps",
      "Redis + Bull MQ async order pipeline",
      "NextAuth RBAC · Prisma · Supabase",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Socket.IO", "Razorpay", "Bull MQ"],
    gradient: "from-fuchsia-500/30 via-purple-500/20 to-cyan-500/20",
  },
  {
    number: "02",
    year: "Mar 2026",
    title: "AI Stock Platform",
    subtitle: "Real-Time Prediction & Monitoring System",
    description:
      "A full-stack Indian stock market platform (NSE/BSE) with real-time WebSocket streaming, AI-powered price predictions, live charts, and portfolio analytics — under 500ms latency on a 500K-row dataset.",
    highlights: [
      "Ensemble: LSTM + Transformer + RF + XGBoost + RL",
      "RAG-style AI context retrieval assistant",
      "Sub-500ms latency on 500K row dataset",
      "WhatsApp alerts via background jobs",
      "Hardened API: JWT · bcrypt · Helmet · CSRF",
    ],
    stack: ["React", "Node.js", "FastAPI", "PostgreSQL", "Redis", "Socket.IO", "LSTM", "XGBoost"],
    gradient: "from-cyan-500/30 via-blue-500/20 to-purple-500/20",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="font-display mb-20 text-4xl leading-tight font-bold md:text-6xl">
          Shipped in <span className="text-gradient-purple">production.</span>
        </h2>

        <div className="space-y-32">
          {projects.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Browser mock */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative"
                >
                  <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-br opacity-60 blur-3xl ${p.gradient}"
                    style={{ backgroundImage: `radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)` }} />
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                    <div className="flex items-center gap-1.5 border-b border-border bg-[var(--bg-secondary)] px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                      <span className="ml-4 font-mono-accent text-[10px] text-muted-foreground">
                        {p.title.toLowerCase().replace(/\s+/g, "")}.app
                      </span>
                    </div>
                    <div className={`relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${p.gradient}`}>
                      <div className="absolute inset-0 grid-bg opacity-30" />
                      <div className="relative font-display text-5xl font-bold text-white/90 md:text-7xl">
                        {p.title}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <div className="absolute -top-16 -left-2 font-display text-[120px] leading-none font-bold text-foreground/5 select-none md:text-[180px]">
                    {p.number}
                  </div>
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-3 font-mono-accent text-xs text-muted-foreground">
                      <span className="text-[var(--accent-purple)]">/ {p.number}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span>{p.year}</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold md:text-5xl">{p.title}</h3>
                    <p className="mt-2 font-mono-accent text-sm text-[var(--accent-cyan)]">{p.subtitle}</p>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                    <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-2 h-px w-4 shrink-0 bg-[var(--accent-purple)]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-border bg-card px-2 py-1 font-mono-accent text-[10px] text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex gap-5">
                      <a href="#" className="group inline-flex items-center gap-1.5 font-mono-accent text-xs tracking-wider uppercase hover:text-[var(--accent-purple)]">
                        Live <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a href="#" className="group inline-flex items-center gap-1.5 font-mono-accent text-xs tracking-wider uppercase hover:text-[var(--accent-purple)]">
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
