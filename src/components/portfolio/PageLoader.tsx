import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Floating glowing particles in the loader
function Particle({ i }: { i: number }) {
  const size = 1.5 + (i % 3);
  const left = `${5 + (i * 8.7) % 90}%`;
  const delay = i * 0.25;
  const duration = 5 + (i % 4) * 1.5;
  return (
    <motion.div
      initial={{ y: "60vh", opacity: 0 }}
      animate={{ y: "-10vh", opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      className="absolute rounded-full bg-[var(--accent-purple)]"
      style={{
        width: size,
        height: size,
        left,
        filter: "blur(0.5px)",
      }}
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
    // Ticks up 0 -> 100 in 1.8s
    let start: number | null = null;
    const duration = 1800; 

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setPhase("exiting");
          onComplete();
        }, 300);
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
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: "blur(15px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
        >
          {/* Animated background grid - slowly appears when progress > 50% */}
          <motion.div 
            className="absolute inset-0 grid-bg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 50 ? 0.35 : 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Soft glowing gradient - appears after logo reveal */}
          <motion.div
            className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.06) 50%, transparent 75%)",
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ 
              scale: progress > 25 ? 1.1 : 0.4, 
              opacity: progress > 25 ? 1 : 0 
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Floating particles - fade in when progress > 30% */}
          {progress > 30 && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <Particle key={i} i={i} />
              ))}
            </div>
          )}

          {/* Animated logo reveal */}
          <div className="relative mb-14 overflow-hidden py-2 px-6">
            <motion.div
              className="flex items-center gap-1 font-display text-7xl font-extrabold tracking-tighter"
              initial={{ y: 80, filter: "blur(12px)" }}
              animate={{ 
                y: progress > 15 ? 0 : 80, 
                filter: progress > 15 ? "blur(0px)" : "blur(12px)" 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gradient-purple">A</span>
              <span className="text-foreground">.S</span>
            </motion.div>
            
            {/* Soft background logo blur glow */}
            <motion.div
              className="absolute inset-0 -z-10 text-center font-display text-7xl font-extrabold tracking-tighter text-gradient-purple blur-2xl select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 40 ? 0.5 : 0 }}
              transition={{ duration: 0.5 }}
            >
              A.S
            </motion.div>
          </div>

          {/* Percentage counter and animated line */}
          <div className="flex w-64 flex-col items-center gap-3">
            {/* Animated loading line */}
            <motion.div 
              className="relative h-px w-full overflow-hidden bg-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress > 35 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-glow)] to-[var(--accent-cyan)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
              <motion.div
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: [-96, 256] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Percentage counter */}
            <motion.div 
              className="font-mono-accent text-[11px] tracking-[0.35em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 20 ? 0.8 : 0 }}
            >
              {String(progress).padStart(3, "0")}%
            </motion.div>
          </div>

          {/* Bottom branding detail */}
          <div className="absolute bottom-12 font-mono-accent text-[9px] tracking-[0.45em] text-muted-foreground/30 uppercase">
            AJAY S · DIGITAL SYSTEMS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

