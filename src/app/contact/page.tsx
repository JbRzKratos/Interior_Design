import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Contact | The Living Blueprint",
  description: "Book a consultation with our interior design studio.",
};

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col pt-32 site-container min-h-screen">
      <PageHeader
        title="Contact"
        subtitle="To inquire about our design services or schedule a consultation, please provide details about your project."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 site-section">
        
        {/* Form Column */}
        <div className="lg:col-span-7 xl:col-span-8">
          <ContactForm />
        </div>

        {/* Location & Info Column */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-12">
          
          <div className="flex flex-col gap-4">
            <Badge variant="category">Hyderabad Studio</Badge>
            <address className="not-italic font-sans text-sm text-[var(--color-ink)]/80 leading-relaxed">
              Road No. 36, Jubilee Hills<br />
              Near Metro Station<br />
              Hyderabad, Telangana 500033
            </address>
            <a href="mailto:studio@livingblueprint.design" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)] hover:text-[var(--color-walnut)] transition-colors mt-2">
              studio@livingblueprint.design
            </a>
            <a href="tel:+91405550192" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)] hover:text-[var(--color-walnut)] transition-colors">
              +91 (40) 555-0192
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <Badge variant="category">Mumbai Studio</Badge>
            <address className="not-italic font-sans text-sm text-[var(--color-ink)]/80 leading-relaxed">
              Turner Road, Bandra West<br />
              Opp. Joggers Park<br />
              Mumbai, Maharashtra 400050
            </address>
          </div>

          {/* Interactive Google Map with Monochrome Filter */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square mt-8 border border-[var(--color-blueprint-line)]/30 overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.750697920364!2d78.3820251!3d17.4237785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e2b274ffc1%3A0x33446908e2f69e6b!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033!5e0!3m2!1sen!2sin!4v1720272000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) opacity(0.85)" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Location Map"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
