import { motion } from "framer-motion";
import { Award, Code2, Trophy } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const certs = [
  {
    icon: Award,
    title: "Software Engineering Virtual Experience",
    issuer: "JPMorgan Chase × Forage",
    date: "April 2026",
    desc: "Built Kafka microservice in Java/Spring Boot; 15+ JUnit tests — 100% pass rate.",
  },
  {
    icon: Code2,
    title: "Diploma in Java Programming",
    issuer: "Certified Institution",
    date: "November 2023",
    desc: "Grade: A · Core Java, OOP, Collections, Multithreading, JDBC.",
  },
  {
    icon: Trophy,
    title: "180+ DSA Problems",
    issuer: "LeetCode & HackerRank",
    date: "Ongoing",
    desc: "Dynamic Programming · Graphs · Trees · Sliding Window · Binary Search — MNC screening level.",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative bg-[var(--bg-secondary)] py-32 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Certifications</SectionLabel>
        <h2 className="font-display mb-16 text-4xl leading-tight font-bold md:text-6xl">
          Verified <span className="text-gradient-purple">credentials.</span>
        </h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-6 md:grid-cols-3"
        >
          {certs.map((c) => (
            <motion.div
              key={c.title}
              variants={{
                hidden: { y: 30, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[var(--accent-purple)]/50"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-cyan)] p-px">
                <div className="grid h-full w-full place-items-center rounded-[11px] bg-card">
                  <c.icon className="h-6 w-6 text-[var(--accent-glow)]" />
                </div>
              </div>
              <h3 className="font-display text-lg leading-tight font-bold">{c.title}</h3>
              <div className="mt-1 font-mono-accent text-xs text-[var(--accent-cyan)]">{c.issuer}</div>
              <div className="mt-1 font-mono-accent text-[10px] tracking-wider text-muted-foreground uppercase">{c.date}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <a href="#" className="mt-5 inline-block font-mono-accent text-xs text-[var(--accent-purple)] hover:underline">
                Verify →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
