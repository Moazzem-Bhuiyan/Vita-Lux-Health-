'use client';

import { useGetBlogBySlugQuery } from '@/redux/api/blogApi';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://103.186.20.110:9999/storage';

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-stone-200 rounded w-3/4 mb-4" />
    <div className="h-4 bg-stone-200 rounded w-full mb-2" />
    <div className="h-4 bg-stone-200 rounded w-5/6 mb-2" />
    <div className="h-4 bg-stone-200 rounded w-4/5" />
  </div>
);

const BlogDetailContent = () => {
  const params = useSearchParams();
  const slug = params.get('slug');

  const { data, isLoading, isError } = useGetBlogBySlugQuery({ slug: slug || '' }, { skip: !slug });

  const blog = data?.data?.blog;
  const relatedBlogs = data?.data?.related_blogs || [];

  // Loading State
  if (isLoading) {
    return (
      <article className="bg-cream-50 min-h-screen pb-20">
        {/* Hero Skeleton */}
        <div className="relative h-[65vh] md:h-[75vh] bg-stone-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-luxury">
              <div className="max-w-4xl">
                <div className="h-6 w-28 bg-white/30 rounded mb-6" />
                <div className="h-16 md:h-20 bg-white/30 rounded-2xl w-11/12 mb-6" />
                <div className="h-16 md:h-20 bg-white/30 rounded-2xl w-4/5" />
              </div>
            </div>
          </div>
        </div>

        <div className="container-luxury -mt-12 relative z-10">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-16">
            {/* Meta Skeleton */}
            <div className="flex gap-8 mb-12 border-b pb-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 bg-stone-200 rounded w-32" />
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <Skeleton />
              <Skeleton />
              <div className="h-80 bg-stone-100 rounded-2xl" />
              <Skeleton />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 text-center px-6">
        <div>
          <h2 className="text-4xl font-serif mb-3">Story Not Found</h2>
          <p className="text-stone-500 mb-8">
            We couldn&apos;t find the article you&apos;re looking for.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full hover:bg-black transition-colors"
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-cream-50 min-h-screen pb-20">
      {/* Hero Image */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <Image
          src={`${IMAGE_BASE_URL}/${blog.media_library?.file_path}`}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Badge label={blog.category?.name} variant="gold" className="mb-6" />
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.05] max-w-5xl">
                {blog.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-luxury -mt-12 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-16">
          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-stone-500 mb-12 border-b pb-10"
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(blog.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              By {blog.user?.name}
            </div>iu
            <div className="flex items-center gap-2">
              <Clock size={18} />5 min read
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="prose prose-stone prose-headings:font-serif prose-headings:font-light prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content_details || '' }}
          />

          {/* Author */}
          <div className="mt-16 pt-10 border-t flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
              <Image src="/default-avatar.png" alt={blog.user?.name || ''} width={64} height={64} />
            </div>
            <div>
              <p className="text-xl font-medium">{blog.user?.name}</p>
              <p className="text-stone-500">Wellness Writer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="mt-24 container-luxury">
          <h2 className="text-4xl font-serif mb-10 text-center">You May Also Like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBlogs.map((related: any, index: number) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/blogDetails?slug=${related.slug}`} className="group block">
                  <div className="luxury-card overflow-hidden h-full flex flex-col bg-white">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={`${IMAGE_BASE_URL}/${related.media_library?.file_path}`}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <Badge label={related.category?.name} variant="stone" />
                      <h3 className="font-display text-xl mt-4 leading-tight group-hover:text-gold-700 transition-colors line-clamp-3">
                        {related.title}
                      </h3>
                      <p className="mt-4 text-stone-500 text-sm line-clamp-3 flex-1">
                        {related.excerpt}
                      </p>
                      <div className="pt-6 text-xs text-stone-400 flex justify-between mt-auto">
                        <span>{new Date(related.published_date).toLocaleDateString()}</span>
                        <span>by {related.user?.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 px-10 py-4 bg-stone-900 text-white rounded-full hover:bg-black transition-all"
        >
          ← Explore All Articles
        </Link>
      </div>
    </article>
  );
};

export default BlogDetailContent;
