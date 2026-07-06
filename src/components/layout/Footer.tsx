import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-blueprint-navy)] text-[var(--color-paper)] border-t border-[var(--color-blueprint-line)]/30">
      <div className="site-container site-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-6">
              The Living Blueprint
            </h2>
            <p className="font-sans text-[var(--color-paper)]/70 max-w-md">
              Transforming technical schematics into warm, lived-in realities. 
              We are an award-winning interior design studio crafting bespoke environments.
            </p>
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-[var(--color-blueprint-line)] mb-2 uppercase">Studio</h3>
            <Link href="/studio" className="hover:text-[var(--color-walnut)] transition-colors">About Us</Link>
            <Link href="/portfolio" className="hover:text-[var(--color-walnut)] transition-colors">Portfolio</Link>
            <Link href="/services" className="hover:text-[var(--color-walnut)] transition-colors">Services</Link>
            <Link href="/journal" className="hover:text-[var(--color-walnut)] transition-colors">Journal</Link>
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-[var(--color-blueprint-line)] mb-2 uppercase">Connect</h3>
            <Link href="/contact" className="hover:text-[var(--color-walnut)] transition-colors">Book a Consultation</Link>
            <a href="#" className="hover:text-[var(--color-walnut)] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[var(--color-walnut)] transition-colors">Pinterest</a>
            <a href="#" className="hover:text-[var(--color-walnut)] transition-colors">LinkedIn</a>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-[var(--color-paper)]/10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-widest opacity-50">
          <p>&copy; {new Date().getFullYear()} The Living Blueprint. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
