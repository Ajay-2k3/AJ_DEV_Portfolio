import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(1);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const rawProgress = docHeight > 0 ? scrollY / docHeight : 0;
  const spring = useSpring(rawProgress, { stiffness: 400, damping: 40 });
  const scaleX = useTransform(spring, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))",
      }}
    />
  );
}
