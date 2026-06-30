import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    // Don't run on touch/mobile devices
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Park off-screen initially
    gsap.set([dot, ring], { x: -200, y: -200 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover], input, textarea, select")) {
        gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: "power3" });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power3" });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [isTouch]);

  // Don't render at all on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 mix-blend-difference md:block"
      />
      {/* Sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />
    </>
  );
}
