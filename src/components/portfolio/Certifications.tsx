import { motion } from "framer-motion";
import { Award, Code2, Trophy, ExternalLink, Shield } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { staggerContainer, fadeUp, viewport } from "@/lib/motionVariants";

const certs = [
  {
    Icon: Award,
    title: "Software Engineering Virtual Experience",
    issuer: "JPMorgan Chase × Forage",
    date: "April 2026",
    credentialId: "FORAGE-JPMC-2026-AJS",
    desc: "Built a Kafka consumer microservice in Java/Spring Boot with JPA persistence; 15+ JUnit tests, 100% pass rate.",
    verifyUrl: "https://forage.com/verify",
    gradient: "from-[var(--accent-purple)] to-[var(--accent-glow)]",
    accentColor: "rgba(124,58,237,0.15)",
    borderColor: "rgba(124,58,237,0.3)",
  },
  {
    Icon: Code2,
    title: "Diploma in Java Programming",
    issuer: "Certified Institution",
    date: "November 2023",
    credentialId: "JAVA-DIP-2023-AJS",
    desc: "Grade: A",
    verifyUrl: "#",
    gradient: "from-[var(--accent-cyan)] to-[var(--accent-purple)]",
    accentColor: "rgba(6,182,212,0.15)",
    borderColor: "rgba(6,182,212,0.3)",
  },
  {
    Icon: Trophy,
    title: "180+ DSA Problems Solved",
    issuer: "LeetCode",
    date: "2026",
    credentialId: "LC-USER-AJAY2K3",
    desc: "Dynamic Programming · Graph/Tree Algorithms · Sliding Window · Binary Search — MNC screening level",
    verifyUrl: "https://leetcode.com/Ajay-2k3",
    gradient: "from-yellow-500 to-orange-500",
    accentColor: "rgba(234,179,8,0.1)",
    borderColor: "rgba(234,179,8,0.2)",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative bg-[var(--bg-secondary)] py-24 md:py-32" aria-label="Certifications section">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Certifications</SectionLabel>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-display mb-16 text-4xl leading-tight font-bold md:text-6xl"
        >
          Verified <span className="text-gradient-purple">credentials.</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.12)}
          className="grid gap-6 md:grid-cols-3"
        >
          {certs.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-500"
              style={{ borderColor: c.borderColor }}
            >
              {/* Animated gradient border glow on hover */}
              <div
                className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${c.borderColor}, transparent, ${c.borderColor})`,
                  filter: "blur(1px)",
                }}
              />

              {/* Shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              {/* Icon badge */}
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br p-px" style={{ background: `linear-gradient(135deg, ${c.borderColor}, rgba(255,255,255,0.05))` }}>
                <div
                  className="grid h-full w-full place-items-center rounded-[11px]"
                  style={{ background: c.accentColor }}
                >
                  <c.Icon className="h-6 w-6 text-[var(--accent-glow)]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-lg leading-tight font-bold">{c.title}</h3>
              <div className="mt-1 font-mono-accent text-xs text-[var(--accent-cyan)]">{c.issuer}</div>
              <div className="mt-1 font-mono-accent text-[10px] tracking-wider text-muted-foreground uppercase">{c.date}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>

              {/* Credential ID */}
              <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-[var(--bg-primary)] px-3 py-2">
                <Shield className="h-3 w-3 shrink-0 text-[var(--accent-purple)]" />
                <span className="font-mono-accent text-[10px] text-muted-foreground truncate">{c.credentialId}</span>
              </div>

              {/* Verify button */}
              <motion.a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="mt-5 inline-flex items-center gap-1.5 font-mono-accent text-xs text-[var(--accent-purple)] hover:underline"
              >
                Verify Credential
                <ExternalLink className="h-3 w-3" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
