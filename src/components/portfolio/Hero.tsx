import { useEffect, useRef, useState, useContext } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { LoaderContext } from "@/routes/index";
import { Magnetic } from "@/components/ui/Magnetic";

const roles = [
  "Full Stack Developer",
  "Software Engineer",
  "Freelance Developer"
];

const autoKeywords = [
  "Experiences.",
  "for Startups.",
  "for Creators.",
  "for Businesses.",
  "for Developers.",
  "for Founders.",
  "for AI Products.",
  "for the Future."
];

const scrollKeywords = [
  "Innovative.",
  "Scalable.",
  "Creative.",
  "Reliable.",
  "AI-Powered.",
  "Future-Ready.",
  "Full-Stack.",
  "High-Performance."
];

// Character morphing component
function MorphText({ word }: { word: string }) {
  const characters = Array.from(word);
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={word}
        className="inline-flex flex-wrap"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { transition: { staggerChildren: 0.015 } },
          visible: { transition: { staggerChildren: 0.02 } },
          exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } }
        }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${word}-${index}-${char}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 35,
                scale: 0.8,
                filter: "blur(6px)",
                rotateX: -30,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                rotateX: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1]
                }
              },
              exit: {
                opacity: 0,
                y: -25,
                scale: 0.9,
                filter: "blur(4px)",
                rotateX: 30,
                transition: {
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1]
                }
              }
            }}
            className="inline-block origin-center tracking-tight text-gradient-purple"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

// Floating particle
function HeroParticle({ i }: { i: number }) {
  const size = 1 + (i % 3);
  const left = `${5 + (i * 9.3) % 90}%`;
  const top = `${10 + (i * 13.7) % 80}%`;
  const delay = i * 0.5;
  const dur = 4 + (i % 5) * 1.5;
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: i % 2 === 0 ? "var(--accent-purple)" : "var(--accent-cyan)",
        opacity: 0.5,
      }}
      animate={{
        y: [-8, -20, -8],
        x: [-4, 4, -4],
        opacity: [0.5, 0.2, 0.5],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  // Scroll bindings
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const keywordIndex = useTransform(scrollYProgress, [0, 0.85], [0, scrollKeywords.length - 1]);
  const [scrollIdx, setScrollIdx] = useState(0);
  const [autoIdx, setAutoIdx] = useState(0);
  const [useScrollControl, setUseScrollControl] = useState(false);

  // Mouse spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Spotlight templates for hardware acceleration
  const spotlightGradient = useMotionTemplate`radial-gradient(circle 450px at ${springX}px ${springY}px, rgba(124,58,237,0.06), transparent 70%)`;

  // Parallax transforms for the glow orb
  const orbX = useTransform(springX, [0, typeof window !== "undefined" ? window.innerWidth : 1440], [-60, 60]);
  const orbY = useTransform(springY, [0, typeof window !== "undefined" ? window.innerHeight : 900], [-40, 40]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    const t2 = setInterval(() => setAutoIdx((i) => (i + 1) % autoKeywords.length), 3200);
    return () => {
      clearInterval(t);
      clearInterval(t2);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  // Sync scroll values
  useEffect(() => {
    const unsubscribeIndex = keywordIndex.on("change", (latest) => {
      const idx = Math.min(scrollKeywords.length - 1, Math.max(0, Math.round(latest)));
      setScrollIdx((prev) => (prev !== idx ? idx : prev));
    });
    const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
      const isControl = latest > 0.05;
      setUseScrollControl((prev) => (prev !== isControl ? isControl : prev));
    });
    return () => {
      unsubscribeIndex();
      unsubscribeScroll();
    };
  }, [keywordIndex, scrollYProgress]);

  // GSAP word reveal on load
  const { loaded } = useContext(LoaderContext);
  const splitDone = useRef(false);
  useEffect(() => {
    if (!loaded) return;
    if (splitDone.current) return;
    splitDone.current = true;

    const split = (el: HTMLElement | null) => {
      if (!el) return [];
      const text = el.textContent || "";
      el.innerHTML = "";
      return text.split(" ").map((word) => {
        const wrap = document.createElement("span");
        wrap.className = "inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.05em]";
        const inner = document.createElement("span");
        inner.className = "inline-block";
        inner.textContent = word;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        return inner;
      });
    };

    const words = split(line1Ref.current);

    gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.08, ease: "power4.out", duration: 1, delay: 0.4 }
    );
  }, [loaded]);
  const currentWord = useScrollControl ? scrollKeywords[scrollIdx] : autoKeywords[autoIdx];

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 noise-bg" />

      {/* Animated gradient mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 h-[700px] w-[700px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)",
            x: orbX,
            y: orbY,
            filter: "blur(80px)",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <HeroParticle key={i} i={i} />
        ))}
      </div>

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10 hidden md:block"
        style={{
          background: spotlightGradient,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-32 pb-24">
        {/* Status badge */}
        <Magnetic range={30} strength={0.15}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            data-magnetic
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-1.5 font-mono-accent text-xs tracking-wider uppercase backdrop-blur-sm"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 pulse-dot" />
            </span>
            Fresher · Freelance Developer · Open to Full-Time Roles
          </motion.div>
        </Magnetic>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(2.8rem,8.5vw,7.8rem)] leading-[0.95] font-bold tracking-tight"
          aria-label="Crafting Digital Experiences"
        >
          <span ref={line1Ref} className="block">Crafting Digital</span>
          <span className="block mt-2 min-h-[1.1em] overflow-hidden">
            {loaded ? (
              <MorphText word={currentWord} />
            ) : (
              <span ref={line2Ref} className="text-gradient-purple">Experiences.</span>
            )}
          </span>
        </h1>

        {/* Rotating role */}
        <div className="mt-10 flex h-8 items-center font-mono-accent text-sm text-muted-foreground md:text-base">
          <span className="mr-3 text-[var(--accent-purple)]">{">"}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {roles[roleIdx]}
            </motion.span>
          </AnimatePresence>
          <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-[var(--accent-cyan)]" />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          I build production-grade web systems — from AI-powered prediction engines to multi-tenant e-commerce platforms — with clean architecture and measurable impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Magnetic range={45} strength={0.25}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-magnetic
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent-purple)] px-7 py-3.5 text-sm font-semibold text-white glow-purple transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              {/* Ripple overlay */}
              <span className="absolute inset-0 -z-10 scale-0 rounded-full bg-white/20 transition-transform duration-500 group-active:scale-100" />
              View My Work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          
          <Magnetic range={45} strength={0.25}>
            <a
              href="/Ajay_S_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-7 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/5"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </Magnetic>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 font-mono-accent text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            scroll
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
