'use client';

import { useGetSettingsQuery } from '@/redux/api/settingsApi';
import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

const TermsContainer = () => {
  const { data: termsData, isLoading } = useGetSettingsQuery({
    type: 'terms_and_conditions',
  });

  const content = termsData?.data?.data || '';

  return (
    <div className="min-h-screen bg-[#1a1008] text-white py-16 md:py-[200px]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-[#c9a96e]/10">
              <Shield className="w-10 h-10 text-[#c9a96e]" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none 
                     prose-headings:text-white prose-headings:font-semibold
                     prose-p:text-white/80 prose-strong:text-[#c9a96e]
                     prose-li:text-white/80"
        >
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-[#c9a96e] border-t-transparent rounded-full" />
            </div>
          ) : content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} className="leading-relaxed" />
          ) : (
            <div className="text-center py-20 text-white/50">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Terms and Conditions will be available soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TermsContainer;
