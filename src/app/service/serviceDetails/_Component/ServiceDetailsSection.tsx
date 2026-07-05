'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function ServiceDetailSection({
  serviceDetails,
  isLoading,
}: {
  serviceDetails: any;
  isLoading: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log('🔍 ServiceDetails Received:', serviceDetails);
  }, [serviceDetails]);

  if (isLoading) {
    return <div className="py-20 text-center text-stone-500">Loading service details...</div>;
  }

  if (!serviceDetails) {
    return <div className="py-20 text-center text-stone-500">No service details available.</div>;
  }

  // All possible content fields
  const possibleContents = {
    about:
      serviceDetails.service_details ||
      serviceDetails.about_the_service ||
      serviceDetails.description,

    includes: serviceDetails.what_this_service_includes || serviceDetails.includes,

    benefits: serviceDetails.benefits_section || serviceDetails.benefits,

    how: serviceDetails.how_it_works || serviceDetails.how_it_works_section,

    faq: serviceDetails.faq_section || serviceDetails.faqs,
  };

  const tabs = [
    { id: 0, label: 'About the Service', key: 'about', heading: 'About This Service' },
    { id: 1, label: 'What This Includes', key: 'includes', heading: 'What This Service Includes' },
    { id: 2, label: 'Benefits', key: 'benefits', heading: 'Key Benefits' },
    { id: 3, label: 'How It Works', key: 'how', heading: 'How It Works' },
    { id: 4, label: 'FAQ', key: 'faq', heading: 'Frequently Asked Questions' },
  ];

  const currentTab = tabs[activeTab];
  const content =
    possibleContents[currentTab.key as keyof typeof possibleContents] ||
    '<p>No information available for this section.</p>';

  return (
    <section ref={sectionRef} className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="max-w-[1500px] mx-auto border border-[#e2ddd6] rounded-2xl overflow-hidden bg-white"
      >
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-6 pt-5 pb-0 border-b border-[#e2ddd6] overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 px-6 py-3.5 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1a1008] text-white'
                  : 'text-[#1a1008]/60 hover:text-[#1a1008] hover:bg-[#f5f0e8]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-[#1a1008] rounded-t-lg -z-10"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="text-3xl md:text-4xl text-[#1a1008] font-bold mb-8">
                {currentTab.heading}
              </h2>

              <div
                className="prose prose-lg max-w-none text-[#1a1008]/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
