'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion'; // Fixed import

/* ─── Component ──────────────────────────────────────── */
export default function ServiceDetailSection({
  serviceDetails,
  isLoading,
}: {
  serviceDetails: any;
  isLoading: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading || !serviceDetails) {
    return <div className="py-20 text-center">Loading service details...</div>;
  }

  const tabs = [
    {
      id: 'about',
      label: 'About the Service',
      heading: 'About This Service',
      content:
        serviceDetails.service_details ||
        serviceDetails.about_the_service ||
        '<p>No description available.</p>',
    },
    {
      id: 'includes',
      label: 'What This Includes',
      heading: 'What This Service Includes',
      content: serviceDetails.what_this_service_includes || '<p>No details available.</p>',
    },
    {
      id: 'benefits',
      label: 'Benefits',
      heading: 'Key Benefits',
      content: serviceDetails.benefits_section || '<p>No benefits listed.</p>',
    },
    {
      id: 'how',
      label: 'How It Works',
      heading: 'How It Works',
      content: serviceDetails.how_it_works || '<p>No information available.</p>',
    },
    {
      id: 'faq',
      label: 'FAQ',
      heading: 'Frequently Asked Questions',
      content: serviceDetails.faq_section || '<p>No FAQs available.</p>',
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section ref={sectionRef} className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-[1500px] mx-auto border border-[#e2ddd6] rounded-2xl overflow-hidden bg-white"
      >
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-6 pt-5 pb-0 border-b border-[#e2ddd6] overflow-x-auto scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`relative shrink-0 px-6 py-3.5 text-sm font-medium rounded-t-lg transition-colors duration-200 whitespace-nowrap ${
                activeTab === i
                  ? 'bg-[#1a1008] text-white'
                  : 'text-[#1a1008]/55 hover:text-[#1a1008] hover:bg-[#f5f0e8]'
              }`}
            >
              {tab.label}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-[#1a1008] rounded-t-lg -z-10"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="text-3xl md:text-4xl lg:text-[2.6rem] text-[#1a1008] font-bold leading-[1.12] mb-8"
              >
                {currentTab.heading}
              </motion.h2>

              {/* Dynamic HTML Content from API */}
              <div
                className="prose prose-lg max-w-none text-[#1a1008]/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentTab.content }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
