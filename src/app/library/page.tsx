import { SwatchWall } from "@/components/library/SwatchWall";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Material Library | The Living Blueprint",
  description: "Curate your palette. Explore our selection of materials.",
};

export default function LibraryPage() {
  return (
    <div className="w-full flex flex-col pt-32 site-container min-h-screen">
      <PageHeader
        title="Material Library"
        subtitle="Our curated selection of natural stone, warm woods, and tactile textiles. Drag and drop swatches to preview material palettes."
      />
      
      <SwatchWall />

      {/* MOOD BOARD CTA */}
      <section className="site-section bg-[var(--color-blueprint-navy)] text-[var(--color-paper)] text-center -mx-6 md:-mx-10 lg:-mx-16 px-6 md:px-10 lg:px-16 mt-16">
        <h2 className="font-display text-4xl uppercase tracking-tight mb-6">
          Ready to synthesize your vision?
        </h2>
        <p className="font-sans text-lg opacity-80 max-w-lg mx-auto mb-12">
          Compile your favorite materials and inspirations into a cohesive design brief with our studio team.
        </p>
        <Button as="link" href="/contact" variant="primary" className="bg-[var(--color-walnut)] hover:bg-[var(--color-sand)]">
          Book a Material Consultation
        </Button>
      </section>
    </div>
  );
}
