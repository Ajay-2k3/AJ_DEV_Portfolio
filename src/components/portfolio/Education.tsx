import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    degree: "Master of Computer Applications (MCA)",
    inst: "SRM Easwari Engineering College, Chennai",
    uni: "Anna University",
    period: "Jun 2024 – May 2026",
    grade: "CGPA: 8.37 / 10",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    inst: "Adhiparasakthi College of Arts & Science",
    uni: "Thiruvalluvar University, Ranipet",
    period: "2021 – 2024",
    grade: "CGPA: 6.9 / 10",
  },
];

export function Education() {
  const axisRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        axisRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="relative py-32 md:py-[120px]" ref={sectionRef}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Education</SectionLabel>
        <h2 className="font-display mb-20 text-4xl leading-tight font-bold md:text-6xl">
          Academic <span className="text-gradient-purple">journey.</span>
        </h2>

        <div className="relative">
          <div
            ref={axisRef}
            className="absolute top-0 left-4 h-full w-px origin-top bg-gradient-to-b from-[var(--accent-purple)] via-[var(--accent-glow)] to-transparent md:left-1/2 md:-translate-x-1/2"
          />
          <div className="space-y-16">
            {nodes.map((n, i) => {
              const left = i % 2 === 0;
              return (
                <div key={n.degree} className="relative grid md:grid-cols-2 md:gap-12">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="absolute top-6 left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--accent-purple)] glow-purple md:left-1/2"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-purple)] opacity-60" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: left ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`pl-12 md:pl-0 ${left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}
                  >
                    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-[var(--accent-purple)]/40">
                      <div className="font-mono-accent text-[10px] tracking-[0.25em] text-[var(--accent-purple)] uppercase">
                        {n.period}
                      </div>
                      <h3 className="font-display mt-3 text-xl leading-tight font-bold md:text-2xl">
                        {n.degree}
                      </h3>
                      <div className="mt-2 text-sm text-foreground/80">{n.inst}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{n.uni}</div>
                      <div className="mt-4 inline-block rounded-md border border-[var(--accent-purple)]/40 bg-[var(--bg-primary)] px-3 py-1 font-mono-accent text-xs text-[var(--accent-glow)]">
                        {n.grade}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
