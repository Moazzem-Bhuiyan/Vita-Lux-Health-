'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { BlogHero } from './BlogHero';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui';
import { useGetBlogsQuery } from '@/redux/api/blogApi';

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published_date: string;
  content_details?: string;
  status: boolean;
  category?: {
    id: number;
    name: string;
    type: string;
  };
  user?: {
    id: number;
    name: string;
  };
  media_library?: {
    id: number;
    file_path: string;
  };
};

export function BlogListingContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetBlogsQuery({
    search: searchTerm,
    category_name: activeCategory === 'all' ? '' : activeCategory,
    page: currentPage,
    per_page: 9,
  });

  const blogs: Blog[] = data?.data?.data || [];
  const pagination = data?.data;

  // Dynamic Categories
  const dynamicCategories = useMemo(() => {
    const unique = new Set(blogs.map((post) => post.category?.name).filter(Boolean) as string[]);
    return Array.from(unique);
  }, [blogs]);

  const allCategories = [
    { id: 'all', label: 'All Articles' },
    ...dynamicCategories.map((name) => ({ id: name, label: name })),
  ];

  // Featured Post
  const featured = activeCategory === 'all' && !searchTerm && blogs.length > 0 ? blogs[0] : null;

  const restPosts = featured ? blogs.slice(1) : blogs;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load blogs. Please try again later.
      </div>
    );
  }

  return (
    <>
      <BlogHero />

      {/* Search & Filter */}
      <div className="sticky top-16 bg-cream-50/95 backdrop-blur-sm border-b z-20">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-3.5 text-stone-400" size={18} />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-11 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    'flex-shrink-0 px-5 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all',
                    activeCategory === cat.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <section className="bg-cream-50 pt-12 pb-16">
          <div className="container-luxury">
            <Link href={`/blog/blogDetails?slug=${featured.slug}`} className="group block">
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-stone-100 hover:border-gold-500/30 rounded-3xl">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <Image
                    src={
                      featured.media_library?.file_path
                        ? `http://103.186.20.110:9999/storage/${featured.media_library.file_path}`
                        : '/placeholder.jpg'
                    }
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center bg-white">
                  <Badge label={featured.category?.name || 'Blog'} variant="gold" />
                  <h2 className="font-serif text-4xl mt-4 leading-tight group-hover:text-gold-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-stone-600 line-clamp-3">{featured.excerpt}</p>

                  <div className="mt-6 flex items-center gap-4 text-sm text-stone-500">
                    <Clock size={16} />
                    <span>5 min read</span>
                    <span>•</span>
                    <span>{new Date(featured.published_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-luxury">
          {isLoading ? (
            <div className="text-center py-20">Loading articles...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/blogDetails?slug=${post.slug}`}
                    className="group block"
                  >
                    <article className="luxury-card overflow-hidden h-full flex flex-col bg-white">
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={
                            post.media_library?.file_path
                              ? `http://103.186.20.110:9999/storage/${post.media_library.file_path}`
                              : '/placeholder.jpg'
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <Badge label={post.category?.name || 'Blog'} variant="stone" />
                        <h3 className="font-display text-xl mt-3 leading-tight group-hover:text-gold-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-stone-500 text-sm line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="pt-4 mt-auto border-t text-xs text-stone-400 flex justify-between">
                          <span>{new Date(post.published_date).toLocaleDateString()}</span>
                          <span>by {post.user?.name}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {restPosts.length === 0 && (
                <div className="text-center py-20 text-stone-400">No articles found.</div>
              )}

              {pagination && pagination.last_page > 1 && (
                <div className="mt-12 flex justify-center">
                  {/* <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.last_page}
                    onPageChange={setCurrentPage}
                  /> */}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
