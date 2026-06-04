import React from 'react';
import { ServiceDetailsHero } from './ServiceDetailsHero';
import ServiceDetailSection from './ServiceDetailsSection';

export default function ServiceDetailsContainer() {
  return (
    <div>
      <ServiceDetailsHero />
      <ServiceDetailSection />
    </div>
  );
}
