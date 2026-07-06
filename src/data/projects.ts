export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Kitchen" | "Living" | "Bedroom" | "Bathroom" | "Office";
  material: string;
  budget: "$$" | "$$$" | "$$$$";
  location: string;
  sqft: number;
  duration: string;
  heroImage: string;
  gallery: string[];
  brief: string;
  palette: { name: string; hex: string }[];
  svgPathId?: string; // Links to the floor plan SVG element
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    slug: "the-walnut-residence",
    title: "The Walnut Residence",
    category: "Living",
    material: "Walnut & Linen",
    budget: "$$$",
    location: "Tribeca, NY",
    sqft: 1200,
    duration: "14 weeks",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?q=80&w=1200&auto=format&fit=crop"
    ],
    brief: "A complete reimagining of a historic loft, balancing original architectural bones with warm, tactile modernism.",
    palette: [
      { name: "WALNUT", hex: "#8B5E3C" },
      { name: "LINEN", hex: "#E8DFD3" },
      { name: "SLATE", hex: "#4A4E53" }
    ],
    svgPathId: "room-living"
  },
  {
    id: "p2",
    slug: "marble-minimalist-kitchen",
    title: "Marble Minimalist",
    category: "Kitchen",
    material: "Calacatta Marble",
    budget: "$$$$",
    location: "SoHo, NY",
    sqft: 450,
    duration: "9 weeks",
    heroImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1200&auto=format&fit=crop"
    ],
    brief: "Transforming a cramped galley into an open, light-filled culinary space anchored by a monolithic marble island.",
    palette: [
      { name: "CALACATTA", hex: "#F5F5F5" },
      { name: "BRUSHED BRASS", hex: "#C5A059" },
      { name: "MATTE BLACK", hex: "#1A1A1A" }
    ],
    svgPathId: "room-kitchen"
  },
  {
    id: "p3",
    slug: "serene-sanctuary",
    title: "Serene Sanctuary",
    category: "Bedroom",
    material: "Oak & Bouclé",
    budget: "$$",
    location: "Brooklyn, NY",
    sqft: 350,
    duration: "6 weeks",
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1200&auto=format&fit=crop"
    ],
    brief: "A primary suite designed for absolute tranquility, utilizing acoustic materials and soft, indirect lighting.",
    palette: [
      { name: "WHITE OAK", hex: "#D4C5B3" },
      { name: "SAND", hex: "#C9A87C" },
      { name: "PLASTER", hex: "#F2EBE3" }
    ],
    svgPathId: "room-bedroom"
  },
  {
    id: "p4",
    slug: "monolithic-bath",
    title: "Monolithic Bath",
    category: "Bathroom",
    material: "Travertine",
    budget: "$$$",
    location: "West Village, NY",
    sqft: 180,
    duration: "8 weeks",
    heroImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop"
    ],
    brief: "A spa-like retreat carved out of travertine, featuring a custom wet room and hidden ambient lighting.",
    palette: [
      { name: "TRAVERTINE", hex: "#D6CEBD" },
      { name: "SMOKED GLASS", hex: "#4a4a4a" },
      { name: "CHROME", hex: "#E8E8E8" }
    ],
    svgPathId: "room-bathroom"
  }
];
