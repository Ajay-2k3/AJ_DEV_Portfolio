import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Code2, Trophy, ExternalLink, Shield, X, Eye } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { staggerContainer, fadeUp, viewport } from "@/lib/motionVariants";
import { Magnetic } from "@/components/ui/Magnetic";

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
  const [activeCert, setActiveCert] = useState<typeof certs[0] | null>(null);

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
              onClick={() => setActiveCert(c)}
              className="group relative cursor-none overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-500 select-none"
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
              <div className="mb-5 flex justify-between items-start">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br p-px" style={{ background: `linear-gradient(135deg, ${c.borderColor}, rgba(255,255,255,0.05))` }}>
                  <div
                    className="grid h-full w-full place-items-center rounded-[11px]"
                    style={{ background: c.accentColor }}
                  >
                    <c.Icon className="h-6 w-6 text-[var(--accent-glow)]" />
                  </div>
                </div>
                
                <div className="flex h-7 items-center gap-1 font-mono-accent text-[9px] text-green-400 border border-green-500/20 bg-green-500/5 rounded-full px-2.5">
                  <Shield className="h-3 w-3 shrink-0" /> VERIFIED
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

              {/* Action buttons */}
              <div className="mt-5 flex gap-4 items-center">
                <span className="inline-flex items-center gap-1.5 font-mono-accent text-xs text-[var(--accent-purple)] group-hover:underline">
                  <Eye className="h-3.5 w-3.5" /> Preview Certificate
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Premium Preview Modal Overlay */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="absolute inset-0 bg-[#050505]/85 backdrop-blur-md"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative max-w-lg w-full rounded-2xl border border-border bg-card p-6 md:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 transition-colors"
                aria-label="Close certificate preview"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Certificate visual frame */}
              <div className="relative border border-border/60 bg-[var(--bg-secondary)] rounded-xl p-8 mb-6 overflow-hidden flex flex-col justify-between aspect-[1.4]">
                <div className="absolute inset-0 noise-bg" />
                <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono-accent text-[9px] text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 rounded-full px-2.5 py-1 uppercase bg-[var(--accent-cyan)]/5">
                  <Shield className="h-3 w-3" /> VERIFIED SIGNATURE
                </div>
                
                <div className="flex flex-col gap-4 relative z-10">
                  <Award className="h-10 w-10 text-[var(--accent-purple)]" />
                  <div>
                    <h4 className="font-display text-xl font-bold text-foreground">{activeCert.title}</h4>
                    <p className="font-mono-accent text-xs text-muted-foreground mt-1">{activeCert.issuer}</p>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4 flex justify-between items-center text-[10px] font-mono-accent text-muted-foreground mt-8 relative z-10">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-[var(--accent-purple)]">Credential ID</span>
                    <span className="font-sans text-xs text-foreground/80">{activeCert.credentialId}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] uppercase tracking-wider text-[var(--accent-purple)]">Verified Date</span>
                    <span className="font-sans text-xs text-foreground/80">{activeCert.date}</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-2xl font-bold">{activeCert.title}</h3>
              <div className="mt-1.5 font-mono-accent text-sm text-[var(--accent-cyan)]">{activeCert.issuer}</div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{activeCert.desc}</p>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-4 py-2 text-xs font-mono-accent uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
                <Magnetic range={35} strength={0.35}>
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="px-5 py-2 text-xs font-mono-accent uppercase tracking-wider bg-[var(--accent-purple)] text-white rounded-full hover:bg-[var(--accent-purple)]/90 transition-colors inline-flex items-center gap-1.5"
                  >
                    Verify Certificate <ExternalLink className="h-3 w-3" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
