import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, ArrowRight, Award, Zap, Code } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: "+", label: "API Endpoints Shipped", icon: <Code className="h-4.5 w-4.5 text-[var(--accent-purple)]" /> },
  { value: 35, suffix: "%", label: "Faster API Response", icon: <Zap className="h-4.5 w-4.5 text-[var(--accent-cyan)]" /> },
  { value: 500, suffix: "K", label: "Rows Scaled <500ms", icon: <Award className="h-4.5 w-4.5 text-[var(--accent-glow)]" /> },
  { value: 180, suffix: "+", label: "DSA Problems Solved", icon: <Code className="h-4.5 w-4.5 text-white" /> },
];

function StatCard({ s }: { s: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Apple/Linear premium spring configurations
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.1 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.1 });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 12);
    rotateX.set(-y * 12);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    if (!inView || !countRef.current) return;
    const obj = { v: 0 };
    
    // Store tweens to kill on unmount
    const countTween = gsap.to(obj, {
      v: s.value,
      duration: 1.8,
      ease: "power4.out",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = Math.round(obj.v).toString();
      },
    });

    let lineTween: gsap.core.Tween | null = null;
    if (lineRef.current && !reducedMotion) {
      lineTween = gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "expo.out", delay: 0.2 }
      );
    } else if (lineRef.current && reducedMotion) {
      gsap.set(lineRef.current, { scaleX: 1 });
    }

    return () => {
      countTween.kill();
      if (lineTween) lineTween.kill();
    };
  }, [inView, s.value, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 600 }}
      className="group relative flex flex-col justify-between rounded-xl border border-border bg-[var(--bg-card)]/40 p-5 hover:border-[var(--accent-purple)]/30 hover:bg-[var(--accent-purple)]/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="font-display text-3.5xl font-bold text-gradient-purple">
          <span ref={countRef}>0</span>
          {s.suffix}
        </div>
        <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          {s.icon}
        </div>
      </div>
      <div className="mt-4 font-mono-accent text-[11px] tracking-wider text-muted-foreground uppercase leading-tight">
        {s.label}
      </div>
      {/* Animated underline */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] origin-left scale-x-0"
      />
    </motion.div>
  );
}

function ProfileCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rx = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const ry = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const shadowX = useTransform(ry, [-20, 20], [15, -15]);
  const shadowY = useTransform(rx, [-20, 20], [15, -15]);
  const glowX = useTransform(ry, [-20, 20], ["0%", "100%"]);
  const glowY = useTransform(rx, [-20, 20], ["0%", "100%"]);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 24);
    rotateX.set(-y * 24);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // Scroll Trigger to scale profile card from 0.85 to 1.0 with context revert
  useEffect(() => {
    if (!containerRef.current) return;
    if (reducedMotion) {
      gsap.set(containerRef.current, { scale: 1.0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { scale: 0.82, opacity: 0.7 },
        {
          scale: 1.0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: 1.2,
          }
        }
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  const glareBg = useMotionTemplate`radial-gradient(circle 200px at ${glowX} ${glowY}, rgba(255, 255, 255, 0.12), transparent 75%)`;
  const filterShadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 25px rgba(124, 58, 237, 0.25))`;

  return (
    <div ref={containerRef} className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
      {/* Orbiting particles backdrop */}
      <div className="absolute inset-0 pointer-events-none scale-[1.12]">
        <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-[spin_24s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-dashed border-[var(--accent-purple)]/10 animate-[spin_32s_linear_infinite_reverse]" />
        
        {/* Particle nodes orbiting */}
        <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-purple)] glow-purple animate-[spin_9s_linear_infinite] origin-[50%_170px]" />
        <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--accent-cyan)] glow-cyan animate-[spin_13s_linear_infinite_reverse] origin-[50%_-170px]" />
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: rx, rotateY: ry, filter: filterShadow, transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative h-64 w-64 md:h-76 md:w-76 cursor-none"
      >
        {/* Animated breathing glow border ring */}
        <div className="absolute -inset-[3px] rounded-full ring-rotate opacity-75"
          style={{
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-glow), var(--accent-cyan), var(--accent-purple))",
            backgroundSize: "200% 200%",
            padding: "3px",
          }}
        />
        
        {/* Photo frame */}
        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-card float-animation" style={{ transformStyle: "preserve-3d" }}>
          <img
            src="/image/AJ.jpeg"
            alt="Ajay S — Software Engineer"
            className="h-full w-full object-cover object-center scale-[1.05] transition-transform duration-700"
            loading="eager"
          />
          {/* Subtle gradient shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--accent-purple)]/5 to-[var(--accent-cyan)]/15 pointer-events-none" />
        </div>

        {/* Floating spotlight on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: glareBg,
          }}
        />
      </motion.div>
    </div>
  );
}

function ScrollRevealParagraph({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <p className="flex flex-wrap text-md md:text-lg leading-relaxed text-foreground/80">
      {words.map((w, idx) => {
        const cleanWord = w.replace(/[^a-zA-Z0-9\.\-]/g, "");
        const isSpecial = ["React.js", "Next.js", "Node.js", "AI", "PostgreSQL", "React", "Node"].includes(cleanWord);
        return (
          <span key={idx} className="about-word-wrap inline-block overflow-hidden mr-[0.26em] py-0.5">
            <span className={`about-word inline-block origin-bottom-left translate-y-[110%] opacity-0 filter blur-[3px] transition-all duration-300 ${isSpecial ? 'text-gradient-purple font-semibold' : ''}`}>
              {w}
            </span>
          </span>
        );
      })}
    </p>
  );
}

export function About() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;

    let ctx: gsap.Context;
    let isMounted = true;

    const timer = setTimeout(() => {
      if (!isMounted) return;
      
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const spans = container.querySelectorAll(".about-word");
      
      if (isReduced) {
        gsap.set(spans, { y: 0, opacity: 1, filter: "blur(0px)" });
        return;
      }

      ctx = gsap.context(() => {
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.008,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 1.0,
          },
        });
      });
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden" aria-label="About section">
      {/* Background Animated aurora/gradient mesh & Noise */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-[5%] h-[550px] w-[550px] rounded-full bg-[var(--accent-purple)]/5 blur-[130px] aurora-orb" />
        <div className="absolute bottom-1/4 right-[5%] h-[500px] w-[500px] rounded-full bg-[var(--accent-cyan)]/5 blur-[130px] aurora-orb" style={{ animationDirection: "reverse" }} />
        <div className="absolute inset-0 noise-bg" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>About Me</SectionLabel>
        
        <div className="grid gap-16 md:grid-cols-[1.1fr_1.8fr] md:gap-20 items-start">
          {/* Profile Column */}
          <div className="flex flex-col items-center gap-8 md:items-start">
            <ProfileCard />

            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
              {/* Status Badge */}
              <div className="flex items-center gap-2.5 rounded-full border border-green-500/20 bg-green-500/5 px-4.5 py-2.5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="font-mono-accent text-[11px] tracking-wider text-green-400 uppercase">Available for Work</span>
              </div>

              {/* Resume download */}
              <Magnetic range={35} strength={0.2}>
                <a
                  href="/Ajay_S_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="group flex items-center gap-2.5 rounded-full border border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/5 px-5 py-2.5 font-mono-accent text-[11px] tracking-wider text-[var(--accent-glow)] uppercase transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10"
                >
                  <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Resume
                </a>
              </Magnetic>
            </div>
          </div>

          {/* About Text Column */}
          <div>
            <h2 className="font-display mb-10 text-4xl leading-[1.1] font-bold md:text-5.5xl tracking-tight">
              Full Stack Engineer <br />
              <span className="text-muted-foreground">building high-performance software.</span>
            </h2>

            <div ref={textRef} className="space-y-8">
              <ScrollRevealParagraph>
                I'm Ajay S, a Full Stack Developer who completed my MCA at 
                SRM Easwari Engineering College in May 2026. I specialize in 
                building scalable systems with React.js, Next.js, Node.js, 
                TypeScript, and PostgreSQL — and I currently work as a 
                freelance developer while actively seeking full-time 
                opportunities.
              </ScrollRevealParagraph>
              <ScrollRevealParagraph>
                During my internship at Bluewhiz Infotech, I shipped 12+ 
                production API endpoints that cut response time by 35% and 
                reduced query latency by 40%. As a freelancer, I've since 
                built an AI stock prediction platform running ensemble ML 
                models at sub-500ms latency, and Flowerly — a 4-tier 
                multi-tenant e-commerce ecosystem spanning 35+ pages.
              </ScrollRevealParagraph>
              <ScrollRevealParagraph>
                I care about clean architecture, horizontal scalability, and 
                writing code that's actually testable — not just code that works.
              </ScrollRevealParagraph>
            </div>

            {/* CTA action */}
            <div className="mt-10">
              <Magnetic range={40} strength={0.3}>
                <a
                  href="#contact"
                  data-magnetic
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-2 font-mono-accent text-[11px] tracking-wider text-[var(--accent-cyan)] hover:text-[var(--accent-glow)] transition-colors uppercase"
                >
                  Let's collaborate
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </div>

            {/* Stats laboratory */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <StatCard key={s.label} s={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

