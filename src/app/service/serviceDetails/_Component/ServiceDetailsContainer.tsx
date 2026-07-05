'use client';
import React from 'react';
import { ServiceDetailsHero } from './ServiceDetailsHero';
import ServiceDetailSection from './ServiceDetailsSection';
import { useSearchParams } from 'next/navigation';
import { useGetServiceBySlugQuery } from '@/redux/api/serviceApi';

export default function ServiceDetailsContainer() {
  const params = useSearchParams();
  const slug = params.get('slug');

  // get the service details based on the slug
  const {
    data: serviceDetails,
    isLoading,
    isError,
  } = useGetServiceBySlugQuery({ skip: !slug, slug: slug || '' });

  if (!slug) {
    return <div>Service not found</div>;
  }
  return (
    <div>
      <ServiceDetailsHero serviceDetails={serviceDetails?.data} isLoading={isLoading} />
      <ServiceDetailSection serviceDetails={serviceDetails?.data} isLoading={isLoading} />
    </div>
  );
}
