"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MaterialCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [material, setMaterial] = useState<{ name: string; color: string } | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth follow
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    // Detect reduced motion to simplify cursor if needed, but requirements just said "disabled on touch devices"
    // I'll keep the custom cursor on desktop even with reduced motion, just maybe without spring.
    
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientX); // Wait, bug here! e.clientY
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor-material]");
      
      if (cursorTarget) {
        const name = cursorTarget.getAttribute("data-cursor-material");
        const color = cursorTarget.getAttribute("data-cursor-color");
        if (name && color) {
          setMaterial({ name, color });
        }
      } else {
        setMaterial(null);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center text-[10px] font-mono tracking-widest uppercase overflow-hidden whitespace-nowrap shadow-lg",
        isVisible ? "opacity-100" : "opacity-0",
        material ? "w-32 h-32 -ml-16 -mt-16 bg-[var(--cursor-bg)] text-white" : "w-4 h-4 -ml-2 -mt-2 bg-transparent border border-[var(--color-ink)] mix-blend-difference"
      )}
      style={{
        x: springX,
        y: springY,
        "--cursor-bg": material?.color || "transparent",
      } as any}
      animate={{
        scale: material ? 1 : 1, // Add any scale animation if needed
      }}
      transition={{ duration: 0.15 }}
    >
      {material ? (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 text-center leading-tight drop-shadow-md"
        >
          {material.name}<br/>{material.color}
        </motion.span>
      ) : (
        <div className="w-1 h-1 bg-[var(--color-ink)] rounded-full" />
      )}
    </motion.div>
  );
}
