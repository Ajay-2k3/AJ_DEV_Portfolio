import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";

const roles = [
  "Full Stack Software Engineer",
  "React.js · Node.js · TypeScript",
  "Building Scalable Web Systems",
];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const orbRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    const xTo = gsap.quickTo(orb, "x", { duration: 0.9, ease: "power3" });
    const yTo = gsap.quickTo(orb, "y", { duration: 0.9, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const splitDone = useRef(false);
  useEffect(() => {
    // Guard against React StrictMode's double-invoke: splitting twice leaves
    // words stuck at the gsap.from baseline (opacity 0, yPercent 110).
    if (splitDone.current) return;
    splitDone.current = true;

    const split = (el: HTMLElement | null, gradient = false) => {
      if (!el) return [];
      const text = el.textContent || "";
      el.innerHTML = "";
      return text.split(" ").map((word) => {
        const wrap = document.createElement("span");
        wrap.className = "inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.05em]";
        const inner = document.createElement("span");
        inner.className = gradient ? "inline-block text-gradient-purple" : "inline-block";
        inner.textContent = word;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        return inner;
      });
    };
    const words = [
      ...split(line1Ref.current, false),
      ...split(line2Ref.current, true),
    ];
    gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.08, ease: "power4.out", duration: 1, delay: 0.3 }
    );
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        ref={orbRef}
        className="pointer-events-none fixed top-0 left-0 -z-0 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_60%)] blur-3xl md:block"
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-1.5 font-mono-accent text-xs tracking-wider uppercase"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 pulse-dot" />
          </span>
          Open to Opportunities · Chennai, IN
        </motion.div>

        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.95] font-bold tracking-tight">
          <span ref={line1Ref} className="block">Crafting Digital</span>
          <span ref={line2Ref} className="block">Experiences.</span>
        </h1>

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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          I architect and ship full-stack products — from real-time IoT dashboards to AI-powered stock platforms — with clean code and zero compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent-purple)] px-6 py-3 text-sm font-medium text-white glow-purple transition-transform hover:scale-[1.03]"
          >
            View My Work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-[var(--accent-purple)]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 font-mono-accent text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            scroll
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
