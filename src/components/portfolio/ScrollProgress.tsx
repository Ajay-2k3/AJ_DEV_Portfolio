import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent-purple), var(--accent-glow), var(--accent-cyan))",
        boxShadow: "0 0 10px var(--accent-glow)",
      }}
    />
  );
}
