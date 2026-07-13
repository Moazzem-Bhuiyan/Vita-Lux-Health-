'use client';

import React from 'react';
import { useGetmyReviewsQuery } from '@/redux/api/reviewApi';
import { Star, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  approved: { label: 'Approved', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-100' },
  rejected: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-100' },
};

export default function MyReview() {
  const { data, isLoading, isError } = useGetmyReviewsQuery({});

  const reviews = data?.data?.data || [];

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-8">My Reviews</h2>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || reviews.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Star className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-medium mb-2">No Reviews Yet</h3>
        <p className="text-gray-600">You haven&apos;t written any reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold">My Reviews</h2>
        <p className="text-sm text-gray-500">
          {reviews.length} review{reviews.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {reviews.map((review: any) => {
          const status = statusConfig[review.status] || {
            label: review.status,
            color: 'text-gray-600',
            bg: 'bg-gray-100',
          };

          return (
            <div
              key={review.id}
              className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Service Image */}
                <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {review.service?.media_library?.file_path ? (
                    <Image
                      src={`http://103.186.20.110:9999/storage/${review.service.media_library.file_path}`}
                      alt={review.service.service_name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🌿
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {review.service?.service_name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Calendar size={16} />{' '}
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <h1 className={`${status.bg} ${status.color} px-4 py-1 text-sm font-medium`}>
                      {status.label}
                    </h1>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-[#c9a96e] fill-[#c9a96e]' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      ({review.rating}.0)
                    </span>
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <div className="mt-5 text-gray-700 leading-relaxed">
                      &quot;{review.comment}&quot;
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
