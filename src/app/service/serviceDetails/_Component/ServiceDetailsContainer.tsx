'use client';
import React from 'react';
import { ServiceDetailsHero } from './ServiceDetailsHero';
import ServiceDetailSection from './ServiceDetailsSection';
import { useSearchParams } from 'next/navigation';
import { useGetServiceBySlugQuery } from '@/redux/api/serviceApi';

// Skeleton for Hero Section
function ServiceHeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[600px] bg-stone-900 flex items-center">
      <div className="max-w-5xl mx-auto px-6 md:px-8 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Breadcrumb */}
          <div className="h-4 w-48 bg-white/10 rounded animate-pulse" />

          {/* Title */}
          <div className="space-y-4">
            <div className="h-12 md:h-16 w-4/5 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-12 md:h-16 w-3/4 bg-white/10 rounded-xl animate-pulse" />
          </div>

          {/* Subtitle */}
          <div className="h-6 w-96 bg-white/10 rounded animate-pulse" />

          {/* Button */}
          <div className="h-14 w-52 bg-white/10 rounded-full animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for Details Section
function ServiceDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 space-y-20">
      {/* Overview Section */}
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-8">
          <div className="h-8 w-64 bg-stone-200 rounded animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-5 bg-stone-200 rounded w-full animate-pulse" />
            ))}
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="sticky top-24 bg-white rounded-2xl p-8 shadow-sm space-y-8">
            <div className="h-7 w-40 bg-stone-200 rounded animate-pulse" />
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-5 w-28 bg-stone-200 rounded animate-pulse" />
                  <div className="h-5 w-20 bg-stone-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="space-y-16">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-6">
            <div className="h-9 w-80 bg-stone-200 rounded animate-pulse" />
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="h-80 bg-stone-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceDetailsContainer() {
  const params = useSearchParams();
  const slug = params.get('slug');

  const {
    data: serviceDetails,
    isLoading,
    isError,
  } = useGetServiceBySlugQuery({ skip: !slug, slug: slug || '' });

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        Service not found
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load service details. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <ServiceHeroSkeleton />
        <ServiceDetailsSkeleton />
      </>
    );
  }

  return (
    <div>
      <ServiceDetailsHero serviceDetails={serviceDetails?.data} isLoading={isLoading} />
      <ServiceDetailSection serviceDetails={serviceDetails?.data} isLoading={isLoading} />
    </div>
  );
}
