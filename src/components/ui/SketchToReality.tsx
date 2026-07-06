"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SketchToRealityProps {
  imageSrc: string;
  imageAlt: string;
  svgPath?: string; // Optional custom path, defaults to a room perspective
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
  priority?: boolean;
}

const DEFAULT_ROOM_PATH = 
  "M10,10 L90,10 L90,90 L10,90 Z M10,10 L30,30 M90,10 L70,30 M10,90 L30,70 M90,90 L70,70 M30,30 L70,30 L70,70 L30,70 Z";

export function SketchToReality({
  imageSrc,
  imageAlt,
  svgPath = DEFAULT_ROOM_PATH,
  className,
  aspectRatio = "video",
  priority = false
}: SketchToRealityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  // SVG drawing progress (0 to 1)
  const pathLength = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0, 1]),
    { stiffness: 100, damping: 30 }
  );
  
  // Image fade in (starts at 50% scroll progress, fully visible at 100%)
  const imageOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  // SVG fade out (starts at 60%, fully gone at 100%)
  const svgOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]"
  };

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative overflow-hidden bg-[var(--color-blueprint-navy)]", aspectClasses[aspectRatio], className)}>
        <Image 
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden bg-transparent group", aspectClasses[aspectRatio], className)}
    >
      {/* Blueprint SVG Layer */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center p-8 pointer-events-none"
        style={{ opacity: svgOpacity }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full stroke-[var(--color-blueprint-line)] fill-none stroke-[0.5]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path 
            d={svgPath}
            style={{ pathLength }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-0 blueprint-grid opacity-20" />
      </motion.div>

      {/* Real Image Layer */}
      <motion.div 
        className="absolute inset-0 z-20"
        style={{ opacity: imageOpacity }}
      >
        <Image 
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}
