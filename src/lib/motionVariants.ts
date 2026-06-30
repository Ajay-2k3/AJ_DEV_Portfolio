import type { Variants } from "framer-motion";

// ─── Shared easing ────────────────────────────────────────────────────────────
// Premium cubic bezier definitions inspired by Apple/Linear
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,      // ultra-gentle deceleration (default)
  in: [0.7, 0, 0.84, 0] as const,
  inOut: [0.87, 0, 0.13, 1] as const,    // symmetrical smooth ease
  swift: [0.25, 1, 0.5, 1] as const,     // fast fade/deceleration
  spring: { type: "spring" as const, stiffness: 200, damping: 25, mass: 0.8 },
  springGentle: { type: "spring" as const, stiffness: 120, damping: 20 },
  springBouncy: { type: "spring" as const, stiffness: 300, damping: 15 },
};

// Standardized durations (seconds)
export const durations = {
  xs: 0.2,
  sm: 0.4,
  md: 0.6,
  lg: 0.8,
  xl: 1.2,
  loading: 1.8,
};

// ─── Fade up (default entry) ──────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

// ─── Fade down ────────────────────────────────────────────────────────────────
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

// ─── Fade in ──────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: durations.md, ease: ease.out },
  },
};

// ─── Scale in ─────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.md, ease: ease.out },
  },
};

// ─── Blur in ──────────────────────────────────────────────────────────────────
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", scale: 0.985 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: durations.lg, ease: ease.out },
  },
};

// ─── Slide from left ──────────────────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

// ─── Slide from right ─────────────────────────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

// ─── Stagger container ────────────────────────────────────────────────────────
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

// ─── Card tilt transform helper ───────────────────────────────────────────────
export function getTiltTransform(
  e: React.MouseEvent<HTMLElement>,
  el: HTMLElement,
  intensity = 8
) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -intensity;
  const rotateY = ((x - cx) / cx) * intensity;
  return { rotateX, rotateY };
}

// ─── Viewport config shortcuts ────────────────────────────────────────────────
export const viewport = {
  once: true,
  margin: "-60px",
} as const;

export const viewportLarge = {
  once: true,
  margin: "-100px",
} as const;

