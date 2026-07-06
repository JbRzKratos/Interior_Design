import { Hero } from "@/components/home/Hero";
import { SketchToReality } from "@/components/ui/SketchToReality";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROJECTS } from "@/data/projects";

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="w-full flex flex-col">
      <Hero />

      {/* DIMENSION DIVIDER */}
      <div className="dimension-tick site-container site-section-sm opacity-50" aria-hidden="true" />

      {/* STUDIO INTRO STRIP */}
      <section className="site-section site-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)]">
              The Philosophy
            </h2>
          </div>
          <div className="md:col-span-8 lg:col-span-6">
            <p className="font-display text-3xl md:text-5xl leading-tight text-[var(--color-ink)]">
              We believe a space should feel like it was born there. By anchoring our practice in rigorous architectural principles, we design interiors that endure beyond trends—spaces where every material has a purpose and every line has a reason.
            </p>
            <div className="mt-12">
              <Button as="link" href="/studio" variant="ghost">
                Explore the Studio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE PROJECTS */}
      <section className="site-section site-container">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)]">
            Selected Works
          </h2>
          <div className="hidden md:block">
            <Button as="link" href="/portfolio" variant="ghost">
              View Full Portfolio
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {featuredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${idx % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
            >
              <div className={`md:col-span-7 lg:col-span-8 ${idx % 2 === 1 ? 'md:col-start-6' : ''}`}>
                <a href={`/portfolio/${project.slug}`} className="block relative group" data-cursor-material={project.material.split('&')[0].trim()} data-cursor-color={project.palette[0].hex}>
                  <SketchToReality 
                    imageSrc={project.heroImage}
                    imageAlt={project.title}
                    svgPath={idx === 1 ? "M50,10 L90,10 L90,40 L50,40 Z" : undefined}
                  />
                </a>
              </div>
              
              <div className={`md:col-span-5 lg:col-span-4 flex flex-col justify-center ${idx % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="meta">{String(idx + 1).padStart(2, '0')}</Badge>
                  <div className="h-[1px] w-8 bg-[var(--color-blueprint-line)] opacity-50" />
                  <Badge variant="category">{project.location}</Badge>
                </div>
                <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-6">
                  {project.title}
                </h3>
                <p className="font-sans text-[var(--color-ink)]/70 mb-8">
                  {project.brief}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.palette.map(color => (
                    <div key={color.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border border-[var(--color-ink)]/20" style={{ backgroundColor: color.hex }} />
                      <Badge variant="meta">{color.name}</Badge>
                    </div>
                  ))}
                </div>
                <Button as="link" href={`/portfolio/${project.slug}`} variant="ghost">
                  View Case Study
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 md:hidden">
          <Button as="link" href="/portfolio" variant="secondary" className="w-full text-center">
            View Full Portfolio
          </Button>
        </div>
      </section>

      {/* PROCESS TEASER */}
      <section className="site-section bg-[var(--color-linen)] border-t border-[var(--color-ink)]/10">
        <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-8">
              A Measured<br/>Approach.
            </h2>
            <p className="font-sans text-[var(--color-ink)]/80 max-w-md mb-8">
              Our process demystifies interior design, transforming an opaque creative endeavor into a transparent, predictable series of phases. From initial spatial planning to the final styling of objects, we measure twice so you only build once.
            </p>
            <Button as="link" href="/services" variant="ghost">
              View Our Process
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[var(--color-ink)]/10 border border-[var(--color-ink)]/10 p-px blueprint-grid-dark">
            {[
              { num: "01", title: "Discovery", desc: "Aligning vision and budget." },
              { num: "02", title: "Schematic", desc: "Spatial flows and technical layouts." },
              { num: "03", title: "Design", desc: "Materials, finishes, and fixtures." },
              { num: "04", title: "Execution", desc: "Procurement and installation." }
            ].map(step => (
              <div key={step.num} className="bg-[var(--color-linen)] p-6 md:p-8 flex flex-col gap-4">
                <Badge variant="category">{step.num}</Badge>
                <h3 className="font-display text-xl uppercase tracking-tight">{step.title}</h3>
                <p className="font-sans text-[10px] opacity-60 leading-relaxed uppercase tracking-wide">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="site-section site-container">
        <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)] text-center mb-16">
          Client Experiences
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              quote: "The Living Blueprint team transformed our chaotic duplex into an absolute sanctuary. The attention to detail in the custom millwork is extraordinary.",
              name: "Sarah & James T.",
              project: "The Walnut Residence",
              metric: "Delivered in 14 weeks"
            },
            {
              quote: "They managed to make a stark, minimalist space feel incredibly warm and inviting. Their material sourcing is second to none.",
              name: "David M.",
              project: "Marble Minimalist",
              metric: "Completed on budget"
            },
            {
              quote: "From the first schematic to the final reveal, the transparency and professionalism were unparalleled. The result speaks for itself.",
              name: "Elena R.",
              project: "Serene Sanctuary",
              metric: "Turnkey delivery"
            }
          ].map((t, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="font-display text-6xl text-[var(--color-blueprint-line)] opacity-50 leading-none">"</div>
              <p className="font-sans text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/90">
                {t.quote}
              </p>
              <div className="mt-auto pt-6 border-t border-[var(--color-ink)]/10">
                <div className="font-mono text-[10px] tracking-widest uppercase">{t.name}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/50 mt-1">{t.project} &middot; {t.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
