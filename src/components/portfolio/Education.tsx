import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { fadeUp, viewport } from "@/lib/motionVariants";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    degree: "Master of Computer Applications (MCA)",
    shortDegree: "MCA",
    inst: "SRM Easwari Engineering College, Chennai",
    uni: "Anna University",
    period: "Jun 2024 – May 2026",
    grade: "8.37 / 10",
    status: "Completed",
    coursework: ["Data Structures", "System Design", "Distributed Systems", "Cloud Computing", "ML Fundamentals"],
    color: "var(--accent-purple)",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    shortDegree: "BCA",
    inst: "Adhiparasakthi College of Arts & Science, Ranipet",
    uni: "Thiruvalluvar University",
    period: "2021 – 2024",
    grade: "6.9 / 10",
    status: "Completed",
    coursework: ["Java Programming", "Database Management", "Web Technologies", "OOP Concepts", "Software Engineering"],
    color: "var(--accent-cyan)",
  },
];

function CGPABar({ grade, color }: { grade: string; color: string }) {
  const pct = (parseFloat(grade.split(" ")[0]) / 10) * 100;
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between font-mono-accent text-[10px] text-muted-foreground">
        <span>CGPA</span>
        <span style={{ color }}>{grade}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, var(--accent-glow))` }}
        />
      </div>
    </div>
  );
}

export function Education() {
  const axisRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      aria-label="Education section"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Education</SectionLabel>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-display mb-20 text-4xl leading-tight font-bold md:text-6xl"
        >
          Academic <span className="text-gradient-purple">journey.</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical axis — hidden on mobile, visible on md+ */}
          <div
            ref={axisRef}
            className="absolute top-0 bottom-0 left-1/2 hidden w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[var(--accent-purple)] via-[var(--accent-glow)] to-transparent md:block"
          />

          <div className="space-y-20">
            {nodes.map((n, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={n.degree} className="relative">
                  {/* Center dot (desktop only) */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="absolute top-8 left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full md:block"
                    style={{ background: n.color, boxShadow: `0 0 16px ${n.color}80` }}
                  >
                    <span
                      className="absolute inset-0 animate-ping rounded-full opacity-40"
                      style={{ background: n.color }}
                    />
                  </motion.div>

                  {/* Card — full width on mobile, half on desktop */}
                  <div className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4 }}
                      className="w-full md:w-[calc(50%-2.5rem)]"
                    >
                      <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-[var(--accent-purple)]/40 hover:shadow-[0_8px_30px_rgba(124,58,237,0.1)]">
                        {/* Degree badge */}
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                            style={{ background: `linear-gradient(135deg, ${n.color}, var(--accent-glow))` }}
                          >
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <span
                            className="font-display text-2xl font-bold"
                            style={{ color: n.color }}
                          >
                            {n.shortDegree}
                          </span>
                        </div>

                        {/* Period & Status */}
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 font-mono-accent text-[10px] tracking-[0.2em] uppercase" style={{ color: n.color }}>
                            <Calendar className="h-3 w-3" />
                            {n.period}
                          </div>
                          {n.status && (
                            <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 font-mono-accent text-[9px] text-green-400 uppercase tracking-wider">
                              {n.status}
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-lg leading-tight font-bold md:text-xl">
                          {n.degree}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/80">
                          <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                          {n.inst}
                        </div>
                        <div className="mt-1 font-mono-accent text-xs text-muted-foreground">
                          {n.uni}
                        </div>

                        {/* CGPA bar */}
                        <CGPABar grade={n.grade} color={n.color} />

                        {/* Coursework */}
                        <div className="mt-5">
                          <div className="mb-2 font-mono-accent text-[10px] tracking-wider text-muted-foreground uppercase">
                            Relevant Coursework
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {n.coursework.map((c) => (
                              <span
                                key={c}
                                className="rounded-md border border-border bg-[var(--bg-primary)] px-2 py-0.5 font-mono-accent text-[10px] text-muted-foreground"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
