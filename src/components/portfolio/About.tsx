import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: "+", label: "API Endpoints Shipped" },
  { value: 35, suffix: "%", label: "Response Time Reduced" },
  { value: 2, suffix: "", label: "Full-Stack Systems Built" },
  { value: 180, suffix: "+", label: "DSA Problems Solved" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.v).toString();
      },
    });
  }, [inView, value]);
  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const words = (el.textContent || "").split(" ");
    el.innerHTML = words
      .map((w) => `<span class="about-word inline-block mr-[0.25em] opacity-20 transition-opacity">${w}</span>`)
      .join("");
    const spans = el.querySelectorAll(".about-word");
    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-32 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>About Me</SectionLabel>
        <div className="grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[var(--accent-purple)] via-[var(--accent-glow)] to-[var(--accent-cyan)] blur-2xl opacity-40 ring-rotate" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border bg-card md:h-72 md:w-72">
                <div className="flex h-full w-full items-center justify-center font-display text-7xl font-bold text-gradient-purple">
                  AS
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display mb-8 text-4xl leading-tight font-bold md:text-5xl">
              Full Stack Engineer <br />
              <span className="text-muted-foreground">building at scale.</span>
            </h2>
            <p
              ref={textRef}
              className="text-lg leading-relaxed text-foreground"
            >
              I'm Ajay S, a Full Stack Software Engineer pursuing my MCA at SRM Easwari Engineering College (graduating May 2026). I specialize in building production-grade systems using React.js, Node.js, TypeScript, and PostgreSQL. During my internship at Bluewhiz Infotech, I shipped 12+ RESTful API endpoints that cut response time by 35% and reduced query latency by 40%. I've built two full-stack systems independently — a multi-tenant e-commerce platform and an AI-powered stock prediction system — both running in production. I thrive in Agile environments, take code reviews seriously, and write software that scales.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l border-[var(--accent-purple)]/40 pl-4"
                >
                  <div className="font-display text-3xl font-bold text-gradient-purple md:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 font-mono-accent text-[11px] tracking-wider text-muted-foreground uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
