import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Journal | The Living Blueprint",
  description: "Insights on design, materiality, and architecture.",
};

const POSTS = [
  {
    id: 1,
    title: "The Case for Natural Stone",
    category: "Materiality",
    date: "October 12, 2023",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Why we prioritize materials that age, scratch, and develop a patina over synthetic alternatives."
  },
  {
    id: 2,
    title: "Lighting as Architecture",
    category: "Theory",
    date: "September 05, 2023",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Exploring how ambient, indirect light shapes our perception of space and volume."
  },
  {
    id: 3,
    title: "A Conversation with Evelyn Reed",
    category: "Studio",
    date: "August 18, 2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    excerpt: "The founder discusses the genesis of The Living Blueprint and the future of residential design."
  }
];

export default function JournalPage() {
  return (
    <div className="w-full flex flex-col pt-32 site-container min-h-screen">
      <PageHeader
        title="Journal"
        subtitle="Insights on design, materiality, and the practice of interior architecture."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 site-section">
        {POSTS.map((post) => (
          <Link href="#" key={post.id} className="group flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <Badge variant="category">{post.category}</Badge>
                <Badge variant="meta">{post.date}</Badge>
              </div>
              <h2 className="font-display text-2xl uppercase tracking-tight mb-3 group-hover:text-[var(--color-walnut)] transition-colors">
                {post.title}
              </h2>
              <p className="font-sans text-[var(--color-ink)]/70">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
