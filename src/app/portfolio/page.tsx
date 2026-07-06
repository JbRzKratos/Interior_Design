import { FloorPlanNavigator } from "@/components/portfolio/FloorPlanNavigator";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Portfolio | The Living Blueprint",
  description: "Explore our selected works and interior architecture projects.",
};

export default function PortfolioPage() {
  return (
    <div className="w-full flex flex-col pt-32 site-container min-h-screen">
      <PageHeader
        title="Portfolio"
        subtitle="Our selected works. A study in materiality, proportion, and light across New York, London, and Tokyo."
        meta={<Badge variant="meta">Index 01 &mdash; 24</Badge>}
      />
      
      <FloorPlanNavigator />
    </div>
  );
}
