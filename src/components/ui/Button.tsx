import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: "link";
  href: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base = "inline-flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:   "bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 hover:bg-[var(--color-walnut)]",
  secondary: "border border-[var(--color-ink)]/20 text-[var(--color-ink)] px-8 py-4 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
  ghost:     "text-[var(--color-ink)] hover:text-[var(--color-walnut)] px-0 py-0",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, disabled } = props;
  const classes = cn(base, variantStyles[variant], className);

  if (props.as === "link") {
    return (
      <Link href={props.href} className={classes}>
        {children}
        {variant === "ghost" && (
          <span className="text-[var(--color-blueprint-line)]">&rarr;</span>
        )}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
