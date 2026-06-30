import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Briefcase } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { fadeUp, staggerContainer, viewport } from "@/lib/motionVariants";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: "+", label: "API Endpoints Shipped" },
  { value: 35, suffix: "%", label: "Faster API Response Time" },
  { value: 500, suffix: "K", label: "Rows Processed at <500ms" },
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
      duration: 2.2,
      ease: "power3.out",
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

// 3D tilt card for the profile image
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);
  const glowX = useTransform(ry, [-15, 15], ["0%", "100%"]);
  const glowY = useTransform(rx, [-15, 15], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 20);
    rotateX.set(-y * 20);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative cursor-none"
    >
      {/* Dynamic glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(255,255,255,0.12), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export function About() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;
    const paragraphs = container.querySelectorAll("p");
    paragraphs.forEach((p) => {
      const words = (p.textContent || "").split(" ");
      p.innerHTML = words
        .map((w) => `<span class="about-word inline-block opacity-20 transition-opacity">${w}</span>`)
        .join(" ");
    });
    const spans = container.querySelectorAll(".about-word");
    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32" aria-label="About section">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>About Me</SectionLabel>
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-20"
        >
          {/* Profile image column */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-6 md:items-start">
            <TiltCard>
              <div className="group relative">
                {/* Animated gradient border ring */}
                <div className="absolute -inset-[3px] rounded-full ring-rotate"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-purple), var(--accent-glow), var(--accent-cyan), var(--accent-purple))",
                    backgroundSize: "200% 200%",
                    padding: "3px",
                  }}
                />
                {/* Glow behind */}
                <div className="absolute -inset-4 rounded-full opacity-40 blur-3xl"
                  style={{ background: "radial-gradient(circle, var(--accent-purple), var(--accent-cyan), transparent)" }} />

                {/* Photo container */}
                <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-[var(--accent-purple)]/20 bg-card md:h-72 md:w-72 float-animation">
                  <img
                    src="/image/AJ.jpeg"
                    alt="Ajay S — Full Stack Software Engineer"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                  {/* Glass overlay shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--accent-purple)]/5 to-[var(--accent-cyan)]/10" />
                </div>
              </div>
            </TiltCard>

            {/* Status badge */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2.5 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-mono-accent text-xs text-green-400">Available for Work</span>
              <Briefcase className="h-3 w-3 text-green-400" />
            </motion.div>

            {/* Resume download */}
            <motion.a
              variants={fadeUp}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2.5 rounded-full border border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/5 px-5 py-2.5 font-mono-accent text-xs tracking-wider text-[var(--accent-glow)] uppercase transition-colors hover:border-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10"
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Text column */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="font-display mb-8 text-4xl leading-tight font-bold md:text-5xl"
            >
              Full Stack Engineer <br />
              <span className="text-muted-foreground">building at scale.</span>
            </motion.h2>

            <div
              ref={textRef}
              className="space-y-6 text-lg leading-relaxed text-foreground"
            >
              <p>
                I'm Ajay S, a Full Stack Developer who completed my MCA at 
                SRM Easwari Engineering College in May 2026. I specialize in 
                building scalable systems with React.js, Next.js, Node.js, 
                TypeScript, and PostgreSQL — and I currently work as a 
                freelance developer while actively seeking full-time 
                opportunities.
              </p>
              <p>
                During my internship at Bluewhiz Infotech, I shipped 12+ 
                production API endpoints that cut response time by 35% and 
                reduced query latency by 40%. As a freelancer, I've since 
                built an AI stock prediction platform running ensemble ML 
                models at sub-500ms latency, and Flowerly — a 4-tier 
                multi-tenant e-commerce ecosystem spanning 35+ pages.
              </p>
              <p>
                I care about clean architecture, horizontal scalability, and 
                writing code that's actually testable — not just code that works.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="group border-l-2 border-[var(--accent-purple)]/40 pl-4 transition-colors hover:border-[var(--accent-purple)]"
                >
                  <div className="font-display text-3xl font-bold text-gradient-purple md:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 font-mono-accent text-[11px] tracking-wider text-muted-foreground uppercase leading-tight">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
