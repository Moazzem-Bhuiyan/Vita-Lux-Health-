import BlogDetailContent from '@/sections/blog/BlogDetailContent';
import React from 'react';
export const metadata = {
  title: 'Blog Details',
  description:
    'Discover insightful articles on wellness, skincare, mindfulness, and holistic health from the Aurum Star team.',
};
export default function page() {
  return (
    <div>
      <BlogDetailContent />
    </div>
  );
}
