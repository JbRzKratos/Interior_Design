import { cn } from "@/lib/utils";

type BadgeVariant = "category" | "material" | "status" | "meta";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  category: "border-[var(--color-blueprint-line)] text-[var(--color-blueprint-line)]",
  material: "border-[var(--color-walnut)] text-[var(--color-walnut)]",
  status:   "border-[var(--color-ink)]/30 text-[var(--color-ink)]",
  meta:     "border-transparent text-[var(--color-ink)]/60",
};

export function Badge({ children, variant = "category", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] tracking-widest uppercase leading-none px-3 py-1.5 border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
