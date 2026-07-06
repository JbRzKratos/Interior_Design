import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { SketchToReality } from "@/components/ui/SketchToReality";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="w-full flex flex-col bg-[var(--color-paper)]">
      {/* HERO */}
      <section className="relative w-full h-screen">
        <SketchToReality 
          imageSrc={project.heroImage}
          imageAlt={project.title}
          className="w-full h-full"
          aspectRatio="video"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-paper)] via-transparent to-transparent z-30 pointer-events-none" />
      </section>

      {/* BRIEF */}
      <section className="site-section site-container relative z-40 -mt-32">
        <div className="bg-[var(--color-paper)] p-8 md:p-16 border border-[var(--color-blueprint-line)]/30 shadow-2xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="flex-1">
              <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-8">
                {project.title}
              </h1>
              <p className="font-sans text-lg md:text-xl text-[var(--color-ink)]/80 leading-relaxed">
                {project.brief}
              </p>
            </div>
            <div className="w-full md:w-64 flex flex-col gap-6 shrink-0">
              {[
                { label: "Location", value: project.location },
                { label: "Scale", value: `${project.sqft} SQ.FT` },
                { label: "Duration", value: project.duration },
                { label: "Budget Category", value: project.budget },
              ].map((item) => (
                <div key={item.label}>
                  <Badge variant="category" className="mb-1">{item.label}</Badge>
                  <div className="font-mono text-[10px] tracking-widest uppercase">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PALETTE */}
      <section className="site-section-sm site-container flex justify-center">
        <div className="flex flex-wrap gap-8 justify-center">
          {project.palette.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-4">
              <div 
                className="w-24 h-24 rounded-full border border-[var(--color-ink)]/10 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-center">
                <Badge variant="material">{color.name}</Badge>
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/50 mt-1">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="site-section site-container">
        <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)] text-center mb-12">
          Transformation
        </h2>
        <BeforeAfterSlider 
          beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop"
          afterImage={project.gallery[0] || project.heroImage}
        />
      </section>

      {/* GALLERY */}
      <section className="site-section-sm site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((img, i) => (
            <div key={i} className={`relative aspect-[4/5] ${i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : ''}`}>
              <Image 
                src={img}
                alt={`${project.title} detail`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* NEXT PROJECT NAV */}
      <section className="border-t border-[var(--color-blueprint-line)]/30">
        <Link 
          href={`/portfolio/${nextProject.slug}`}
          className="group block w-full site-section site-container hover:bg-[var(--color-blueprint-line)]/5 transition-colors"
        >
          <Badge variant="category" className="mb-4">Next Project</Badge>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tight group-hover:text-[var(--color-walnut)] transition-colors">
              {nextProject.title}
            </h2>
            <span className="text-4xl md:text-6xl text-[var(--color-blueprint-line)] group-hover:translate-x-4 transition-transform">
              &rarr;
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
