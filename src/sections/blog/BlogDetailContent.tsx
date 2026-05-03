import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/data/blog";

interface Props {
  post: BlogPost;
}

// Sample long-form content paragraphs
const SAMPLE_CONTENT = [
  "The relationship between the nervous system and therapeutic touch is one of the most fascinating frontiers in modern wellness science. When skilled hands apply pressure to the body, a cascade of neurochemical events unfolds—cortisol levels drop, serotonin rises, and the parasympathetic nervous system shifts from its defensive posture into what researchers now call the 'rest-and-digest' state.",
  "For decades, massage was considered a luxury—a pleasant indulgence with few measurable health benefits. That perception has changed dramatically. A landmark study published in the International Journal of Neuroscience found that participants who received regular therapeutic massage showed significant reductions in cortisol (the primary stress hormone) and measurable increases in dopamine and serotonin—the neurotransmitters associated with mood regulation, focus, and emotional resilience.",
  "Perhaps most remarkably, the effects are not confined to the duration of the treatment. Brain imaging studies reveal that a single 60-minute session can reduce activity in the amygdala—the brain's threat-detection center—for up to 48 hours afterward. This suggests that regular therapeutic touch doesn't merely provide temporary relief; it may actually reshape neural pathways over time.",
  "The implications for stress-related conditions are profound. Chronic stress is now understood to be a root cause or significant contributing factor in over 75% of all physician visits in the United States. Conditions ranging from cardiovascular disease and autoimmune disorders to insomnia and depression all have measurable stress components. A wellness practice that addresses stress at the neurological level—rather than simply masking symptoms—represents a meaningful shift in how we approach health.",
  "At Aurum Star, our therapists are trained not just in technique, but in the science behind each modality. Understanding why a particular stroke or pressure point activates specific neural responses allows our team to customize treatments with a level of precision that goes far beyond conventional spa offerings. Every session is a collaboration between clinical knowledge and intuitive artistry.",
  "The path to lasting wellness is rarely a single dramatic intervention. More often, it is the cumulative effect of consistent, intentional practices—of showing up for yourself with regularity and care. Therapeutic massage, when approached not as occasional treat but as a cornerstone of a holistic wellness strategy, has the potential to meaningfully transform your relationship with stress, your body, and your capacity for joy.",
];

export function BlogDetailContent({ post }: Props) {
  const related = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative pt-24">
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden bg-stone-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-stone-900/10" />

          <div className="absolute top-8 left-0 right-0 container-luxury">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cream-100/60 hover:text-cream-50 font-sans text-xs tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={12} /> Journal
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 container-luxury pb-12 space-y-4">
            <div className="flex items-center gap-3">
              <Badge label={post.category} variant="gold" />
              <div className="flex items-center gap-1 text-cream-100/60">
                <Clock size={11} />
                <span className="font-sans text-[11px]">{post.readTime} min read</span>
              </div>
            </div>
            <h1 className="font-serif text-display-lg text-cream-50 font-light max-w-3xl leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="bg-cream-50 section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Article */}
            <article className="lg:col-span-8 space-y-8">
              {/* Author + meta */}
              <div className="flex items-center gap-6 pb-8 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-stone-800">{post.author.name}</p>
                    <p className="font-sans text-xs text-stone-400">{post.author.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-stone-400 ml-auto">
                  <Calendar size={12} />
                  <span className="font-sans text-xs">{formatDate(post.publishedAt)}</span>
                </div>
              </div>

              {/* Excerpt lead */}
              <p className="font-serif text-xl text-stone-600 font-light italic leading-relaxed border-l-2 border-gold-500 pl-6">
                {post.excerpt}
              </p>

              {/* Body paragraphs */}
              <div className="space-y-6">
                {SAMPLE_CONTENT.map((para, i) => (
                  <p key={i} className="font-sans text-stone-600 font-light leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-8 border-t border-stone-200 flex flex-wrap items-center gap-2">
                <Tag size={13} className="text-stone-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[10px] tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1 hover:border-gold-500/50 hover:text-gold-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              {/* CTA card */}
              <div className="bg-stone-900 p-8 space-y-4 text-center">
                <p className="eyebrow text-gold-500">Ready to Experience This?</p>
                <p className="font-serif text-xl text-cream-50 font-light leading-snug">
                  Book a Treatment Today
                </p>
                <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
                  Our therapists are ready to craft a personalized experience for you.
                </p>
                <Link
                  href="/booking"
                  className="inline-block w-full bg-gold-500 hover:bg-gold-600 text-stone-900 font-sans text-[10px] tracking-[0.2em] uppercase py-3 transition-colors font-medium"
                >
                  Reserve Now
                </Link>
              </div>

              {/* About author */}
              <div className="border border-stone-200 p-6 space-y-4">
                <p className="eyebrow text-gold-600">About the Author</p>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-stone-900">{post.author.name}</p>
                    <p className="font-sans text-xs text-stone-400">{post.author.title}</p>
                  </div>
                </div>
                <p className="font-sans text-sm text-stone-500 font-light leading-relaxed">
                  A dedicated member of the Aurum Star wellness team, bringing years of expertise and passion for holistic health to every article and treatment.
                </p>
              </div>

              {/* Popular tags */}
              <div className="space-y-4">
                <p className="eyebrow text-gold-600">Popular Topics</p>
                <div className="flex flex-wrap gap-2">
                  {["wellness", "skincare", "massage", "mindfulness", "nutrition", "stress", "sleep", "anti-aging"].map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1.5 hover:border-gold-500/50 hover:text-gold-700 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-stone-200">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-gold-500" />
                <p className="eyebrow text-gold-600">Related Articles</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                    <div className="luxury-card overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <Badge label={p.category} variant="stone" />
                        <h3 className="font-serif text-base text-stone-900 group-hover:text-gold-700 transition-colors leading-snug">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-1 text-stone-400">
                          <Clock size={10} />
                          <span className="font-sans text-[10px]">{p.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
