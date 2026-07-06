"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const SVG_ROOMS = [
  { id: "room-living", d: "M10,10 L50,10 L50,60 L10,60 Z" },
  { id: "room-kitchen", d: "M50,10 L90,10 L90,40 L50,40 Z" },
  { id: "room-bedroom", d: "M50,40 L90,40 L90,90 L50,90 Z" },
  { id: "room-bathroom", d: "M10,60 L50,60 L50,90 L10,90 Z" }
];

export function FloorPlanNavigator() {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const activeProject = hoveredRoom 
    ? PROJECTS.find(p => p.svgPathId === hoveredRoom) 
    : null;

  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="w-full relative">
      {/* DESKTOP: Floor Plan SVG */}
      <div className="hidden lg:grid grid-cols-2 gap-12 items-center min-h-[600px]">
        <div className="relative w-full aspect-square border border-[var(--color-blueprint-line)]/30 p-8 blueprint-grid bg-[var(--color-paper)]">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-sm"
          >
            {/* Outer walls */}
            <rect x="5" y="5" width="90" height="90" fill="none" stroke="var(--color-blueprint-line)" strokeWidth="0.5" />
            
            {SVG_ROOMS.map((room) => {
              const isHovered = hoveredRoom === room.id;
              const project = PROJECTS.find(p => p.svgPathId === room.id);
              
              return (
                <Link 
                  href={project ? `/portfolio/${project.slug}` : "#"} 
                  key={room.id}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                >
                  <path 
                    d={room.d}
                    fill={isHovered ? "var(--color-blueprint-line)" : "transparent"}
                    fillOpacity={isHovered ? 0.2 : 0}
                    stroke="var(--color-blueprint-line)"
                    strokeWidth={isHovered ? "1" : "0.5"}
                    className="transition-all duration-300 cursor-pointer"
                  />
                  {/* Label */}
                  {project && (
                    <text 
                      x="50" y="50" // This is a simplification, ideally calculated from bbox
                      fill="var(--color-ink)"
                      fontSize="3"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                      className="pointer-events-none opacity-50 uppercase tracking-widest mix-blend-difference"
                    >
                      {/* We could place text at the center of the path, but let's just rely on the side panel for details for simplicity */}
                    </text>
                  )}
                </Link>
              );
            })}
          </svg>
        </div>
        
        {/* Project Details Panel */}
        <div className="flex flex-col justify-center h-full">
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image 
                    src={activeProject.heroImage}
                    alt={activeProject.title}
                    fill
                    className="object-cover rounded-[12px]"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="category">{activeProject.category}</Badge>
                    <Badge variant="meta">{activeProject.sqft} SQ.FT</Badge>
                  </div>
                  <h2 className="font-display text-4xl uppercase tracking-tight mb-4">
                    {activeProject.title}
                  </h2>
                  <p className="font-sans text-[var(--color-ink)]/70 max-w-md">
                    {activeProject.brief}
                  </p>
                  <div className="mt-8">
                    <Button as="link" href={`/portfolio/${activeProject.slug}`} variant="ghost">
                      View Case Study
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center text-[var(--color-ink)]/40 h-full border border-dashed border-[var(--color-blueprint-line)]/30 rounded-none p-12"
              >
                <div className="font-mono text-xs uppercase tracking-widest">
                  Hover over the floor plan to explore projects
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE: Filterable Grid */}
      <div className="lg:hidden flex flex-col gap-8">
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "font-mono text-[10px] tracking-widest uppercase px-4 py-2 border whitespace-nowrap transition-colors",
                filter === cat 
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]" 
                  : "border-[var(--color-blueprint-line)]/30 text-[var(--color-ink)] hover:border-[var(--color-ink)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
              >
                <Link href={`/portfolio/${project.slug}`} className="group flex flex-col gap-4">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px]">
                    <Image 
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="category">{project.category}</Badge>
                      <Badge variant="meta">{project.location}</Badge>
                    </div>
                    <h2 className="font-display text-xl uppercase tracking-tight group-hover:text-[var(--color-walnut)] transition-colors">
                      {project.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
