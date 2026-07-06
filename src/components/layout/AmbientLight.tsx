"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function AmbientLight() {
  const { scrollYProgress } = useScroll();
  
  // Transform the scroll progress into a gentle movement for the gradient.
  // We move it primarily along the X axis and slightly along the Y axis to simulate the sun moving.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[var(--color-paper)]">
      <motion.div
        className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%] opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle at center, var(--color-linen) 0%, transparent 60%)",
          x,
          y,
          opacity,
        }}
      />
      <div className="absolute inset-0 blueprint-grid pointer-events-none mix-blend-multiply" />
    </div>
  );
}
