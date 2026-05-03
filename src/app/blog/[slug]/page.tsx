import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, BLOG_POSTS } from "@/lib/data/blog";
import { BlogDetailContent } from "@/sections/blog/BlogDetailContent";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogDetailPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  return <BlogDetailContent post={post} />;
}
