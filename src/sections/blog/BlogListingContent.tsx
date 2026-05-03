"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate, cn } from "@/lib/utils";
import type { BlogCategory } from "@/types";

const CATEGORIES: { id: BlogCategory | "all"; label: string }[] = [
  { id: "all", label: "All Articles" },
  { id: "wellness", label: "Wellness" },
  { id: "skincare", label: "Skincare" },
  { id: "massage", label: "Massage" },
  { id: "nutrition", label: "Nutrition" },
  { id: "mindfulness", label: "Mindfulness" },
  { id: "lifestyle", label: "Lifestyle" },
];

export function BlogListingContent() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <>
      {/* Page Hero */}
      <div className="bg-stone-900 pt-40 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="container-luxury relative">
          <SectionHeader
            eyebrow="Wellness Journal"
            heading="The Art of Living Well"
            subheading="Expert perspectives on wellness, beauty, mindfulness, and the science of self-care."
            light
          />
        </div>
      </div>

      {/* Featured post */}
      {featured && activeCategory === "all" && (
        <section className="bg-cream-50 pt-20">
          <div className="container-luxury">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-stone-100 hover:border-gold-500/20 hover:shadow-luxury-lg transition-all duration-500">
                <div className="relative h-72 lg:h-auto min-h-64 overflow-hidden bg-stone-100">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center space-y-5 bg-white">
                  <div className="flex items-center gap-3">
                    <Badge label={featured.category} variant="gold" />
                    <span className="font-sans text-[10px] text-stone-400">Featured</span>
                  </div>
                  <h2 className="font-serif text-display-md text-stone-900 font-light leading-tight group-hover:text-gold-700 transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="font-sans text-stone-500 font-light leading-relaxed text-sm">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-100">
                        <Image
                          src={featured.author.image}
                          alt={featured.author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-stone-700 font-medium">{featured.author.name}</p>
                        <p className="font-sans text-[10px] text-stone-400">{featured.author.title}</p>
                      </div>
                    </div>
                    <span className="text-stone-200">·</span>
                    <div className="flex items-center gap-1 text-stone-400">
                      <Clock size={11} />
                      <span className="font-sans text-xs">{featured.readTime} min read</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-sans text-[11px] tracking-widest uppercase text-gold-600 group-hover:gap-4 transition-all pt-2">
                    Read Article <ArrowRight size={12} />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter */}
      <div className="sticky top-16 bg-cream-50/95 backdrop-blur-sm border-b border-stone-100 z-20">
        <div className="container-luxury">
          <div className="flex items-center gap-1 overflow-x-auto py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-stone-900 text-cream-50"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="luxury-card overflow-hidden h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                      <Badge label={post.category} variant="stone" />
                      <div className="flex items-center gap-1 text-stone-400">
                        <Clock size={10} />
                        <span className="font-sans text-[10px]">{post.readTime} min</span>
                      </div>
                    </div>
                    <h2 className="font-serif text-xl text-stone-900 leading-snug group-hover:text-gold-700 transition-colors duration-300 flex-1">
                      {post.title}
                    </h2>
                    <p className="font-sans text-sm text-stone-500 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-stone-100">
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <p className="font-sans text-[10px] text-stone-500">{post.author.name}</p>
                      </div>
                      <span className="font-sans text-[10px] text-stone-400">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-stone-400">
              <p className="font-serif text-xl">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
