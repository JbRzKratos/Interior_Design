"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "STUDIO", href: "/studio" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "SERVICES", href: "/services" },
  { name: "LIBRARY", href: "/library" },
  { name: "JOURNAL", href: "/journal" },
  { name: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Progress of current page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-[var(--color-paper)] pointer-events-none">
        <div className="site-container h-24 flex items-center justify-between pointer-events-auto">
          {/* Logo / Title */}
          <Link href="/" className="font-display text-2xl tracking-tight uppercase hover:opacity-80 transition-opacity">
            The Living Blueprint
          </Link>

          {/* Desktop Ruler Nav */}
          <nav className="hidden md:flex items-end h-full pt-8 pb-4">
            <div className="flex items-end border-b border-[var(--color-paper)] opacity-80 h-full">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                
                return (
                  <div key={link.name} className="relative px-6 pb-2 group">
                    {/* Tick Mark */}
                    <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-[var(--color-paper)]" />
                    {index === NAV_LINKS.length - 1 && (
                      <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-[var(--color-paper)]" />
                    )}
                    
                    <Link 
                      href={link.href}
                      className={cn(
                        "font-mono text-[10px] tracking-widest transition-opacity block",
                        isActive ? "opacity-100 font-medium" : "opacity-50 group-hover:opacity-100"
                      )}
                    >
                      {link.name}
                    </Link>

                    {/* Progress Bar for Active Section */}
                    {isActive && (
                      <motion.div 
                        className="absolute bottom-[-1px] left-0 h-[3px] bg-[var(--color-paper)] origin-left w-full"
                        style={{ scaleX }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Sheet */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-[var(--color-blueprint-navy)] text-[var(--color-paper)] transition-transform duration-500 ease-in-out md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="px-6 h-24 flex items-center justify-between border-b border-[var(--color-blueprint-line)]/30">
          <span className="font-display text-2xl tracking-tight uppercase">Menu</span>
          <button 
            className="p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col justify-center px-6 gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.div 
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: isMobileMenuOpen ? 0.2 + (i * 0.05) : 0 }}
            >
              <Link 
                href={link.href}
                className={cn(
                  "font-mono text-2xl tracking-widest uppercase flex items-center group",
                  pathname === link.href ? "text-[var(--color-paper)]" : "text-[var(--color-paper)]/50"
                )}
              >
                <span className="w-8 h-[1px] bg-current mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </>
  );
}
