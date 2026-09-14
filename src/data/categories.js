export const categories = [
  {
    id: "all",
    name: "All Stories",
    slug: "all",
    description: "Browse all latest stories across all categories",
    color: "slate"
  },
  {
    id: "technology",
    name: "Technology",
    slug: "technology",
    description: "Artificial Intelligence, computing, software, and hardware breakthroughs",
    color: "indigo"
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    description: "Global markets, startup ecosystems, finance, and corporate innovation",
    color: "emerald"
  },
  {
    id: "science",
    name: "Science",
    slug: "science",
    description: "Space exploration, physics, renewable energy, and biotechnology",
    color: "cyan"
  },
  {
    id: "culture",
    name: "Culture",
    slug: "culture",
    description: "Modern design, cinema, media, digital arts, and architecture",
    color: "amber"
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Work culture, remote productivity, wellness, and modern living",
    color: "rose"
  },
  {
    id: "politics",
    name: "Politics",
    slug: "politics",
    description: "International affairs, global policy, digital governance, and economy",
    color: "purple"
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug) || categories[0];
};
