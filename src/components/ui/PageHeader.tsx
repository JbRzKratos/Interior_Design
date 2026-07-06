interface PageHeaderProps {
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
}

export function PageHeader({ title, subtitle, meta }: PageHeaderProps) {
  return (
    <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div>
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-[var(--color-ink)]/70 max-w-md">
            {subtitle}
          </p>
        )}
      </div>
      {meta && <div>{meta}</div>}
    </div>
  );
}
