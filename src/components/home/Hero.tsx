"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SketchToReality } from "@/components/ui/SketchToReality";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={ref} className="relative w-full h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 bg-[var(--color-blueprint-navy)] text-[var(--color-paper)] overflow-hidden">
      
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{ y: y1, scale }}
      >
        <SketchToReality 
          imageSrc="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2500&auto=format&fit=crop"
          imageAlt="The Living Blueprint signature style"
          className="w-full h-full"
          aspectRatio="video" // Custom override to fill
          priority={true}
        />
        {/* Darkening Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blueprint-navy)] via-[var(--color-blueprint-navy)]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </motion.div>

      {/* Floating Blueprint Accents */}
      <motion.div 
        className="absolute top-32 right-12 z-10 hidden lg:flex flex-col gap-2 text-[10px] font-mono tracking-widest text-[var(--color-paper)] opacity-80 uppercase"
        style={{ opacity }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-current" />
          <span>Elevation 34.2</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-current" />
          <span>Scale 1:50</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-current" />
          <span>N 40° 42' 46"</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 max-w-[1920px] mx-auto w-full flex flex-col gap-12 mt-auto">
        
        {/* Animated Typography */}
        <div className="flex flex-col drop-shadow-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[9rem] tracking-tighter uppercase leading-[0.85]"
          >
            {/* Outline text for "SCHEMATIC" */}
            <span className="block text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)] lg:[-webkit-text-stroke:2px_var(--color-paper)] ml-2 lg:ml-8">
              From Schematic
            </span>
            {/* Solid text for "SANCTUARY" */}
            <span className="block mt-2 lg:mt-0 text-[var(--color-paper)]">
              To Sanctuary.
            </span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-8 lg:gap-12 items-start sm:items-center ml-2 lg:ml-10"
        >
          <Link 
            href="/contact"
            className="group relative overflow-hidden bg-[var(--color-blueprint-navy)]/50 backdrop-blur-sm border border-[var(--color-paper)]/50 text-[var(--color-paper)] px-8 py-5 font-mono text-[11px] tracking-widest uppercase transition-colors hover:border-[var(--color-paper)]"
          >
            <span className="relative z-10 group-hover:text-[var(--color-blueprint-navy)] transition-colors duration-500">Book a Consultation</span>
            <div className="absolute inset-0 h-full w-full bg-[var(--color-paper)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out" />
          </Link>
          
          <div className="flex flex-col gap-2">
            <div className="w-12 h-[1px] bg-[var(--color-paper)] opacity-50 hidden sm:block" />
            <div className="font-mono text-[10px] tracking-widest text-[var(--color-paper)] uppercase opacity-90 max-w-[280px] leading-loose drop-shadow-md">
              Award-winning interior architecture<br/>in New York, London, and Tokyo.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        style={{ opacity }}
      >
        <span className="font-mono text-[9px] tracking-widest text-[var(--color-blueprint-line)] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-blueprint-line)] to-transparent" />
      </motion.div>
    </section>
  );
}
