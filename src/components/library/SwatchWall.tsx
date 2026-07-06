"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const SWATCHES = [
  { id: "s1", name: "Walnut", color: "#8B5E3C", type: "wood" },
  { id: "s2", name: "Calacatta", color: "#F5F5F5", type: "stone" },
  { id: "s3", name: "Linen", color: "#E8DFD3", type: "textile" },
  { id: "s4", name: "Slate", color: "#4A4E53", type: "stone" },
  { id: "s5", name: "Sand", color: "#C9A87C", type: "paint" },
  { id: "s6", name: "Travertine", color: "#D6CEBD", type: "stone" },
  { id: "s7", name: "White Oak", color: "#D4C5B3", type: "wood" },
  { id: "s8", name: "Brushed Brass", color: "#C5A059", type: "metal" },
];

export function SwatchWall() {
  const [activeCombination, setActiveCombination] = useState<string[]>([]);
  const [isHoveringDropZone, setIsHoveringDropZone] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, swatch: typeof SWATCHES[0]) => {
    // A simplified collision detection for the drop zone
    // In a real app we might use getBoundingClientRect on a ref
    // Here we'll just check if they dragged it significantly to the left/right or specific area
    // Let's assume the dropzone is on the left (x < 0 relative to start if dragging from right)
    
    // Instead of complex bounds, we just allow click or small drag to add/remove
    if (activeCombination.includes(swatch.id)) {
      setActiveCombination(prev => prev.filter(id => id !== swatch.id));
    } else {
      if (activeCombination.length < 3) {
        setActiveCombination(prev => [...prev, swatch.id]);
      }
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 min-h-[600px]">
      {/* Drop Zone / Mockup Area */}
      <div 
        className={cn(
          "w-full lg:w-1/2 rounded-[24px] transition-colors duration-500 flex flex-col p-8 lg:p-12 border-2",
          activeCombination.length > 0 
            ? "border-transparent" 
            : "border-dashed border-[var(--color-blueprint-line)]/50",
          isHoveringDropZone ? "bg-[var(--color-blueprint-line)]/10" : "bg-[var(--color-paper)]"
        )}
      >
        <div className="flex-1 w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden rounded-[16px] shadow-sm">
          {activeCombination.length === 0 ? (
            <div className="text-center">
              <div className="font-display text-2xl uppercase tracking-tight text-[var(--color-ink)]/30 mb-2">
                Neutral Canvas
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]/30">
                Drag up to 3 swatches here or tap to select
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex">
              {activeCombination.map((id, index) => {
                const swatch = SWATCHES.find(s => s.id === id)!;
                return (
                  <motion.div 
                    key={swatch.id}
                    layoutId={`preview-${swatch.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                    style={{ 
                      width: `${100 / activeCombination.length}%`,
                      backgroundColor: swatch.color 
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        
        {/* Current Palette Legend */}
        {activeCombination.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[var(--color-ink)]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex flex-wrap gap-6">
              {activeCombination.map(id => {
                const swatch = SWATCHES.find(s => s.id === id)!;
                return (
                  <div key={`legend-${swatch.id}`} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-[var(--color-ink)]/20" style={{ backgroundColor: swatch.color }} />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest leading-none mb-1">{swatch.type}</div>
                      <div className="font-display text-sm uppercase tracking-tight leading-none">{swatch.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setActiveCombination([])}
              className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]/50 hover:text-[var(--color-ink)] transition-colors self-start sm:self-end border-b border-transparent hover:border-[var(--color-ink)]"
            >
              Reset Canvas
            </button>
          </div>
        )}
      </div>

      {/* Swatch Library */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="font-mono text-[10px] tracking-widest text-[var(--color-blueprint-line)] uppercase mb-6">
          Material Library
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {SWATCHES.map((swatch) => {
            const isSelected = activeCombination.includes(swatch.id);
            const isDisabled = !isSelected && activeCombination.length >= 3;

            return (
              <motion.div
                key={swatch.id}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => handleDragEnd(e, info, swatch)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative aspect-square rounded-[12px] cursor-grab active:cursor-grabbing flex flex-col justify-end p-4 shadow-sm border border-[var(--color-ink)]/10 transition-opacity",
                  isSelected ? "ring-2 ring-[var(--color-ink)] ring-offset-4 ring-offset-[var(--color-paper)]" : "",
                  isDisabled ? "opacity-30 cursor-not-allowed" : ""
                )}
                style={{ backgroundColor: swatch.color }}
              >
                {/* Simulated specular highlight for 3D feel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/20 rounded-[12px] pointer-events-none" />
                
                <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded shadow-sm inline-block self-start">
                  <Badge variant="material">{swatch.name}</Badge>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
