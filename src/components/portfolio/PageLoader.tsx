import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Floating particle
function Particle({ i }: { i: number }) {
  const size = 2 + (i % 3);
  const left = `${10 + (i * 7.3) % 80}%`;
  const delay = i * 0.4;
  const duration = 6 + (i % 4) * 2;
  return (
    <motion.div
      className="absolute rounded-full bg-[var(--accent-purple)] opacity-60"
      style={{ width: size, height: size, left, top: "50%" }}
      animate={{ y: [-20, -80, -20], opacity: [0.6, 0.2, 0.6] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting">("loading");

  useEffect(() => {
    // Progress from 0→100 in ~1.5s
    let start: number | null = null;
    const duration = 1500;

    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(step);
      } else {
          setTimeout(() => {
            setPhase("exiting");
            onComplete();
          }, 200);
        }
      }
  
      const raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [onComplete]);
  
    return (
      <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
        >
          {/* Ambient particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <Particle key={i} i={i} />
            ))}
          </div>

          {/* Glow orb */}
          <motion.div
            className="absolute h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-16 font-display text-6xl font-bold tracking-tight"
          >
            <span className="text-gradient-purple">A</span>
            <span className="text-foreground">.S</span>
            {/* Glow behind logo */}
            <div className="absolute inset-0 -z-10 blur-2xl opacity-60 text-gradient-purple select-none">
              A.S
            </div>
          </motion.div>

          {/* Progress bar + counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex w-64 flex-col items-center gap-3"
          >
            {/* Track */}
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
              {/* Shimmer on the bar */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: [-80, 256] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <div className="font-mono-accent text-xs tracking-[0.3em] text-muted-foreground">
              {String(progress).padStart(3, "0")}%
            </div>
          </motion.div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-12 font-mono-accent text-[10px] tracking-[0.4em] text-muted-foreground uppercase"
          >
            Portfolio · Ajay S
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
