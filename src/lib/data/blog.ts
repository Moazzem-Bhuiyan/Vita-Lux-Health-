import type { BlogPost } from "@/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-001",
    slug: "the-science-of-stress-relief",
    title: "The Science of Stress Relief: How Massage Rewires Your Brain",
    excerpt: "Modern neuroscience reveals why therapeutic touch is one of the most powerful tools for resetting the nervous system and fostering genuine calm.",
    content: "",
    author: {
      name: "Dr. Amara Osei",
      title: "Wellness Research Director",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
    },
    category: "massage",
    tags: ["stress", "neuroscience", "wellness", "massage"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    publishedAt: "2026-04-15",
    readTime: 8,
    featured: true,
  },
  {
    id: "blog-002",
    slug: "morning-rituals-luminous-skin",
    title: "Morning Rituals for Luminous Skin: A Dermatologist's Guide",
    excerpt: "The first ten minutes of your morning can determine the health and radiance of your skin for the entire day. Here's what the science says.",
    content: "",
    author: {
      name: "Sofia Marchetti",
      title: "Head Esthetician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    },
    category: "skincare",
    tags: ["skincare", "morning routine", "radiance", "tips"],
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    publishedAt: "2026-04-08",
    readTime: 6,
    featured: true,
  },
  {
    id: "blog-003",
    slug: "breathwork-for-anxiety",
    title: "Ancient Breathwork Techniques for Modern Anxiety",
    excerpt: "From Pranayama to box breathing—how conscious breath control can shift your nervous system out of fight-or-flight in under two minutes.",
    content: "",
    author: {
      name: "Leila Nouri",
      title: "Mindfulness & Wellness Coach",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&q=80",
    },
    category: "mindfulness",
    tags: ["breathwork", "anxiety", "mindfulness", "meditation"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    publishedAt: "2026-03-28",
    readTime: 5,
    featured: false,
  },
  {
    id: "blog-004",
    slug: "adaptogens-wellness-guide",
    title: "The Complete Guide to Adaptogens for Stress & Vitality",
    excerpt: "Ashwagandha, rhodiola, holy basil—these ancient botanical allies are having a modern renaissance. Here's what works and why.",
    content: "",
    author: {
      name: "Dr. Amara Osei",
      title: "Wellness Research Director",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
    },
    category: "nutrition",
    tags: ["adaptogens", "herbs", "nutrition", "vitality"],
    image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=800&q=80",
    publishedAt: "2026-03-20",
    readTime: 10,
    featured: false,
  },
  {
    id: "blog-005",
    slug: "hydrotherapy-benefits",
    title: "Cold Plunge, Sauna, Contrast Therapy: Your Complete Guide",
    excerpt: "The ancient practice of hydrotherapy is backed by modern research. Discover the optimal protocols for recovery, immune strength, and mental clarity.",
    content: "",
    author: {
      name: "Marcus Chen",
      title: "Hydrotherapy Specialist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
    },
    category: "wellness",
    tags: ["hydrotherapy", "cold plunge", "sauna", "recovery"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    publishedAt: "2026-03-10",
    readTime: 9,
    featured: true,
  },
  {
    id: "blog-006",
    slug: "sleep-and-skin-connection",
    title: "The Skin-Sleep Connection: Why Beauty Sleep Is Real",
    excerpt: "Sleep is your skin's primary regeneration window. Understand the cellular mechanisms behind beauty sleep and how to optimize them.",
    content: "",
    author: {
      name: "Sofia Marchetti",
      title: "Head Esthetician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    },
    category: "skincare",
    tags: ["sleep", "skincare", "anti-aging", "circadian rhythm"],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    publishedAt: "2026-02-25",
    readTime: 7,
    featured: false,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getFeaturedBlogPosts = (): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.featured);

export const getBlogPostsByCategory = (category: string): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.category === category);
