import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Studio | The Living Blueprint",
  description: "About the studio. Philosophy, team, and timeline.",
};

export default function StudioPage() {
  return (
    <div className="w-full flex flex-col pt-32 site-container min-h-screen">
      <PageHeader
        title="The Studio"
        subtitle="Founded in 2018, The Living Blueprint is a multidisciplinary practice operating at the intersection of architecture and interior design."
      />
      
      {/* PHILOSOPHY */}
      <section className="site-section grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="relative aspect-[4/5] w-full max-w-lg mx-auto">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
            alt="Studio workspace"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="absolute inset-0 blueprint-grid opacity-30 mix-blend-multiply pointer-events-none" />
        </div>
        <div>
          <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)] mb-6">
            Philosophy
          </h2>
          <div className="font-display text-3xl leading-tight mb-8">
            "Design is not about imposing a style upon a space, but excavating the logic of the space itself."
          </div>
          <p className="font-sans text-[var(--color-ink)]/80 leading-relaxed mb-6">
            We reject the notion of the 'signature look' in favor of a site-specific approach. Every project begins with a deep analysis of light, volume, and context. We strip away the superfluous until only what is essential and beautiful remains.
          </p>
          <p className="font-sans text-[var(--color-ink)]/80 leading-relaxed">
            Our material palette is intentionally restrained, prioritizing natural, living materials—stone, wood, plaster, and brass—that age gracefully and develop a patina over time.
          </p>
        </div>
      </section>

      {/* AWARDS */}
      <section className="site-section">
        <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)] mb-12 text-center">
          Recognition
        </h2>
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="font-display text-2xl uppercase tracking-widest">Awwwards</div>
          <div className="font-display text-2xl uppercase tracking-widest">CSSDA</div>
          <div className="font-display text-2xl uppercase tracking-widest">Architectural Digest</div>
          <div className="font-display text-2xl uppercase tracking-widest">Dezeen Awards</div>
        </div>
      </section>

      {/* TEAM */}
      <section className="site-section">
        <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)] mb-12">
          Leadership
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Evelyn Reed", role: "Principal Architect", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" },
            { name: "Marcus Chen", role: "Design Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
            { name: "Sarah Jenkins", role: "Head of Procurement", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" }
          ].map((member) => (
            <div key={member.name} className="flex flex-col gap-4">
              <div className="relative aspect-square w-full filter grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div>
                <h3 className="font-display text-xl uppercase tracking-tight">{member.name}</h3>
                <Badge variant="meta">{member.role}</Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
