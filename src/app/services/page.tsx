import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Services & Pricing | The Living Blueprint",
  description: "Our interior design services, process, and transparent pricing.",
};

export default function ServicesPage() {
  return (
    <div className="w-full flex flex-col pt-32 site-container min-h-screen">
      <PageHeader
        title="Services"
        subtitle="A transparent approach to interior architecture. We offer tiered services to accommodate different project scopes."
      />

      {/* SERVICE TIERS */}
      <section className="site-section grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Concept & Schematic",
            price: "Starting at ₹4,00,000",
            desc: "Ideal for clients who want our creative direction but plan to execute the project themselves.",
            features: [
              "Initial site visit & measurement",
              "2 Spatial layout options",
              "Material & mood board",
              "Key furniture recommendations"
            ]
          },
          {
            title: "Full-Service Design",
            price: "Starting at ₹20,00,000",
            desc: "Our signature offering. Comprehensive design from initial concept through to technical drawings.",
            features: [
              "Everything in Concept",
              "3D Renderings",
              "Custom millwork drawings",
              "Full FF&E specification",
              "Contractor liaison"
            ],
            highlight: true
          },
          {
            title: "Turnkey Execution",
            price: "Custom Pricing",
            desc: "For clients requiring absolute peace of mind. We handle the design, procurement, and white-glove installation.",
            features: [
              "Everything in Full-Service",
              "Purchasing & logistics",
              "Warehousing management",
              "On-site installation",
              "Final styling & art curation"
            ]
          }
        ].map((tier, i) => (
          <div 
            key={i} 
            className={`p-8 md:p-12 border flex flex-col gap-8 ${
              tier.highlight 
                ? 'bg-[var(--color-blueprint-navy)] text-[var(--color-paper)] border-[var(--color-blueprint-navy)] transform md:-translate-y-4 shadow-2xl' 
                : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-blueprint-line)]/30'
            }`}
          >
            <div>
              <h2 className="font-display text-3xl uppercase tracking-tight mb-2">{tier.title}</h2>
              <Badge variant={tier.highlight ? "category" : "meta"}>{tier.price}</Badge>
            </div>
            
            <p className={`font-sans text-sm leading-relaxed ${tier.highlight ? 'text-[var(--color-paper)]/80' : 'text-[var(--color-ink)]/70'}`}>
              {tier.desc}
            </p>

            <ul className="flex flex-col gap-4 flex-1">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className={tier.highlight ? 'text-[var(--color-blueprint-line)]' : 'text-[var(--color-walnut)]'}>+</span>
                  <span className="font-sans text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {tier.highlight ? (
              <Button as="link" href="/contact" variant="primary" className="bg-[var(--color-paper)] text-[var(--color-blueprint-navy)] hover:bg-[var(--color-linen)] w-full text-center">
                Inquire
              </Button>
            ) : (
              <Button as="link" href="/contact" variant="secondary" className="w-full text-center">
                Inquire
              </Button>
            )}
          </div>
        ))}
      </section>

      {/* PROCESS */}
      <section className="site-section bg-[var(--color-linen)] -mx-6 md:-mx-10 lg:-mx-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-blueprint-line)] mb-16">
            Our Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[1px] bg-[var(--color-blueprint-line)]/30" />
            
            {[
              { num: "01", title: "Discovery", desc: "We begin with a deep dive into your lifestyle, aesthetic preferences, and the architectural context of your home." },
              { num: "02", title: "Schematic", desc: "Translation of ideas into floor plans, massing studies, and preliminary material palettes." },
              { num: "03", title: "Development", desc: "Refining every detail, producing technical drawings for custom millwork, and finalizing all fixtures." },
              { num: "04", title: "Execution", desc: "Overseeing construction, managing procurement, and executing the final white-glove installation." }
            ].map((step) => (
              <div key={step.num} className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-paper)] border border-[var(--color-blueprint-line)] flex items-center justify-center">
                  <Badge variant="category">{step.num}</Badge>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-tight">{step.title}</h3>
                <p className="font-sans text-sm text-[var(--color-ink)]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
