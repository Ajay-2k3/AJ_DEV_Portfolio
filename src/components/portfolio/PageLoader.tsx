import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

// ─── Constants ────────────────────────────────────────────────────────────────
const LOAD_DURATION = 2200; // ms total loading time

// ─── Eases ────────────────────────────────────────────────────────────────────
const expo = [0.16, 1, 0.3, 1] as const;

// ─── Ring ─────────────────────────────────────────────────────────────────────
// A single SVG arc that draws itself as progress fills
function ProgressRing({ progress }: { progress: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="absolute inset-0 -rotate-90"
      aria-hidden
    >
      {/* Track */}
      <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {/* Fill arc */}
      <circle
        cx="64"
        cy="64"
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.06s linear" }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="var(--accent-purple)" />
          <stop offset="100%" stopColor="var(--accent-cyan)"   />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Scanning line – sweeps vertically across the logo ───────────────────────
function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-purple)]/60 to-transparent"
      initial={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Orbital dot ─────────────────────────────────────────────────────────────
function OrbitalDot({ angle, radius, size, color, duration }: {
  angle: number; radius: number; size: number; color: string; duration: number;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full"
      style={{
        width: size, height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        marginLeft: -size / 2, marginTop: -size / 2,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      transformTemplate={({ rotate }) =>
        `rotate(${rotate}) translate(${radius}px) rotate(-${rotate})`
      }
      initial={{ rotate: angle }}
    />
  );
}

// ─── Horizontal progress bar ──────────────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative h-px w-48 overflow-hidden rounded-full bg-white/[0.06]">
      {/* Fill */}
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-glow)] to-[var(--accent-cyan)]"
        style={{ width: `${progress}%`, transition: "width 0.06s linear" }}
      />
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: [-64, 200] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Progress ticker ────────────────────────────────────────────────────────
  useEffect(() => {
    let start: number | null = null;
    let raf: number;

    function tick(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100));
      setProgress(p);

      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief hold at 100%, then GSAP curtain exit
        setTimeout(() => setPhase("done"), 350);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── GSAP curtain exit: overlay splits & slides off vertically ─────────────
  useEffect(() => {
    if (phase !== "done" || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: onComplete,
      defaults: { ease: "power4.inOut" },
    });

    tl.to(overlayRef.current, {
      clipPath: "inset(50% 0% 50% 0%)",
      duration: 0.7,
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.25 },
      "-=0.1"
    );

    return () => { tl.kill(); };
  }, [phase, onComplete]);

  // ── Cursor spotlight ───────────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const sY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const handleMouse = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // radial gradient that follows cursor
  const spotBg = useTransform(
    [sX, sY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(124,58,237,0.07), transparent 60%)`
  );

  // ── Stagger timing for logo characters ────────────────────────────────────
  const chars = [
    { char: "A", color: "text-gradient-purple", delay: 0    },
    { char: ".", color: "text-white/30",         delay: 0.08 },
    { char: "S", color: "text-white",            delay: 0.14 },
  ];

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          ref={overlayRef}
          onMouseMove={handleMouse}
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505] select-none"
          aria-label="Loading portfolio"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* ── Cursor spotlight ── */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: spotBg }}
          />

          {/* ── Radial ambient glow ── */}
          <motion.div
            className="pointer-events-none absolute h-[700px] w-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.04) 45%, transparent 70%)",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: expo }}
          />

          {/* ── Static dot grid (no layout thrash) ── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* ── Central composition ── */}
          <div className="relative flex flex-col items-center gap-10">

            {/* ── Orbital ring + logo ── */}
            <div className="relative flex h-32 w-32 items-center justify-center">
              {/* Outer SVG progress ring */}
              <ProgressRing progress={progress} />

              {/* Inner glow disk */}
              <motion.div
                className="absolute h-20 w-20 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
                }}
                animate={{ scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Orbital dots */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > 20 ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <OrbitalDot angle={0}   radius={60} size={3.5} color="var(--accent-purple)" duration={6}   />
                <OrbitalDot angle={180} radius={60} size={2}   color="var(--accent-cyan)"   duration={9}   />
                <OrbitalDot angle={90}  radius={68} size={2}   color="rgba(255,255,255,0.4)" duration={14} />
              </motion.div>

              {/* Logo letters — scan + reveal ── */}
              <div className="relative overflow-hidden">
                <ScanLine />
                <div className="flex items-baseline gap-0.5">
                  {chars.map(({ char, color, delay }) => (
                    <motion.span
                      key={char + delay}
                      className={`font-display text-5xl font-extrabold tracking-tighter ${color}`}
                      initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                      animate={
                        progress > 10
                          ? { y: 0, opacity: 1, filter: "blur(0px)" }
                          : { y: 30, opacity: 0, filter: "blur(8px)" }
                      }
                      transition={{ duration: 0.75, ease: expo, delay }}
                    />
                  ))}
                </div>
                {/* Ghost glow duplicate */}
                <div
                  className="pointer-events-none absolute inset-0 flex items-baseline justify-center gap-0.5 font-display text-5xl font-extrabold tracking-tighter text-gradient-purple blur-xl opacity-50 select-none"
                  aria-hidden
                >
                  A.S
                </div>
              </div>
            </div>

            {/* ── Name + tagline ── */}
            <motion.div
              className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: progress > 30 ? 1 : 0, y: progress > 30 ? 0 : 12 }}
              transition={{ duration: 0.7, ease: expo }}
            >
              <p className="font-display text-[15px] font-semibold tracking-[0.12em] text-white/90">
                AJAY S
              </p>
              <p className="font-mono-accent text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Full Stack Engineer
              </p>
            </motion.div>

            {/* ── Progress bar + counter ── */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 15 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressBar progress={progress} />
              <div className="flex w-48 items-center justify-between">
                <span className="font-mono-accent text-[9px] tracking-[0.25em] text-muted-foreground/40 uppercase">
                  Initializing
                </span>
                <span className="font-mono-accent text-[9px] tracking-[0.2em] text-muted-foreground/60 tabular-nums">
                  {String(progress).padStart(3, "0")}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom brand ── */}
          <motion.div
            className="absolute bottom-10 font-mono-accent text-[8px] tracking-[0.5em] text-white/10 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 50 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            AJAY S · DIGITAL SYSTEMS · 2025
          </motion.div>

          {/* ── Corner coordinates (Linear / Vercel aesthetic) ── */}
          <div className="pointer-events-none absolute bottom-10 left-10 font-mono-accent text-[8px] tracking-widest text-white/10">
            {`{ x:0 y:0 }`}
          </div>
          <div className="pointer-events-none absolute top-10 right-10 font-mono-accent text-[8px] tracking-widest text-white/10">
            v1.0.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
