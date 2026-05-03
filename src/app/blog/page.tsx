import type { Metadata } from "next";
import { BlogListingContent } from "@/sections/blog/BlogListingContent";

export const metadata: Metadata = {
  title: "Wellness Journal",
  description:
    "Expert insights on wellness, skincare, mindfulness, and holistic health from the Vita Lux team.",
};

export default function BlogPage() {
  return <BlogListingContent />;
}
