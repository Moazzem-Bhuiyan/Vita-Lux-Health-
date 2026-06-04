'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

/* ─── Types ─────────────────────────────────────────── */
interface ServiceInclude {
  title: string;
  desc: string;
}

interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

interface Step {
  number: string;
  title: string;
  desc: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface TabData {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
  includes: ServiceInclude[];
  benefits?: Benefit[];
  steps?: Step[];
  faqs?: FAQ[];
}

/* ─── Content ────────────────────────────────────────── */
const tabs: TabData[] = [
  {
    id: 'about',
    label: 'About the Service',
    heading: 'Modern Mental Wellness, Designed Around You',
    paragraphs: [
      'Mental health is deeply personal, and your care should be too. At Aurum Star, we provide confidential, personalized support for individuals experiencing depression, anxiety, stress, and emotional burnout through secure telehealth consultations and science-backed wellness approaches.',
      'Our providers work closely with you to understand your symptoms, lifestyle, and goals before creating a treatment plan tailored specifically to your needs.',
      "Whether you're seeking ongoing support, professional guidance, or a modern approach to mental wellness, our care team is here to help you move forward with confidence.",
    ],
    includes: [
      {
        title: 'Personalized Mental Wellness Assessments',
        desc: 'One-on-one evaluations designed to better understand your needs.',
      },
      {
        title: 'Virtual Consultations',
        desc: 'Convenient telehealth appointments with licensed providers.',
      },
      {
        title: 'Customized Care Plans',
        desc: 'Tailored treatment recommendations based on your symptoms, goals, and lifestyle.',
      },
      {
        title: 'Ongoing Progress Monitoring',
        desc: 'Continuous support and adjustments to help ensure long-term wellbeing.',
      },
    ],
  },
  {
    id: 'includes',
    label: 'What This Service Includes?',
    heading: 'Everything You Need, All in One Place',
    paragraphs: [
      'Our Depression & Anxiety service is a comprehensive, end-to-end program designed to address every dimension of your mental health journey — from initial assessment through long-term maintenance.',
      'We combine clinical expertise with the convenience of telehealth, ensuring you receive top-tier care without leaving the comfort of your home.',
    ],
    includes: [
      {
        title: 'Intake Assessment & History Review',
        desc: 'A thorough evaluation of your medical history, mental health background, and current symptoms.',
      },
      {
        title: 'Licensed Psychiatrist Consultations',
        desc: 'One-on-one sessions with board-certified psychiatrists specializing in mood disorders.',
      },
      {
        title: 'Evidence-Based Therapy Sessions',
        desc: 'CBT, DBT, and mindfulness-based interventions tailored to your profile.',
      },
      {
        title: 'Medication Management (if needed)',
        desc: 'Safe, supervised prescription and monitoring of mental health medications.',
      },
      {
        title: 'Crisis Support Line',
        desc: '24/7 access to our care coordinators during acute episodes.',
      },
      {
        title: 'Monthly Progress Reviews',
        desc: 'Regular check-ins to refine your care plan and celebrate milestones.',
      },
    ],
  },
  {
    id: 'benefits',
    label: 'Benefits Section',
    heading: 'Why Patients Choose Aurum Star',
    paragraphs: [
      'Our approach to mental wellness is rooted in three principles: personalization, science, and compassion. The results speak for themselves — 95% of our patients report meaningful improvement within 60 days.',
    ],
    includes: [
      {
        title: 'Faster Recovery Timelines',
        desc: 'Structured protocols reduce average symptom resolution time by 40% compared to traditional care.',
      },
      {
        title: 'No Waiting Rooms',
        desc: 'Book same-week appointments and attend from anywhere via our secure video platform.',
      },
      {
        title: 'Holistic, Root-Cause Focus',
        desc: 'We treat the whole person — mind, body, and lifestyle — not just the diagnosis.',
      },
      {
        title: 'Confidential & Judgment-Free',
        desc: 'All sessions are HIPAA-compliant with complete privacy guaranteed.',
      },
    ],
    benefits: [
      {
        icon: '🧠',
        title: '95% Satisfaction Rate',
        desc: 'Backed by real patient outcomes and continuous quality reviews.',
      },
      { icon: '⚡', title: 'Same-Week Appointments', desc: 'Get started within days, not months.' },
      {
        icon: '🌿',
        title: 'Holistic Approach',
        desc: 'Lifestyle, nutrition, sleep, and therapy — all integrated.',
      },
      {
        icon: '🔒',
        title: 'Full Privacy',
        desc: 'HIPAA-compliant platform with end-to-end encryption.',
      },
    ],
  },
  {
    id: 'how',
    label: 'How It Works?',
    heading: 'Your Journey to Better Mental Health',
    paragraphs: [
      'Getting started with Aurum Star is simple. Our streamlined onboarding process gets you from sign-up to your first session in under 48 hours, with no paperwork headaches.',
    ],
    includes: [
      {
        title: 'Step 1 — Create Your Account',
        desc: 'Sign up in minutes and complete our brief mental wellness intake form.',
      },
      {
        title: 'Step 2 — Match With a Provider',
        desc: 'Our algorithm matches you with the ideal licensed professional based on your needs.',
      },
      {
        title: 'Step 3 — Attend Your First Session',
        desc: 'Connect via secure video, phone, or chat — whichever feels most comfortable.',
      },
      {
        title: 'Step 4 — Receive Your Care Plan',
        desc: 'Your provider delivers a personalized treatment roadmap within 24 hours.',
      },
      {
        title: 'Step 5 — Ongoing Care & Adjustments',
        desc: 'Regular follow-ups ensure your plan evolves with your progress.',
      },
    ],
    steps: [
      { number: '01', title: 'Sign Up', desc: 'Create your profile.' },
      { number: '02', title: 'Match', desc: 'Meet your provider.' },
      { number: '03', title: 'Consult', desc: 'Attend your session.' },
      { number: '04', title: 'Heal', desc: 'Follow your plan.' },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ Section',
    heading: 'Frequently Asked Questions',
    paragraphs: [
      "Have questions before getting started? We've answered the most common ones below. If you don't see yours, our care team is always available to chat.",
    ],
    includes: [
      {
        title: 'Is this service covered by insurance?',
        desc: "Many major insurance plans cover our telehealth services. We'll verify your benefits before your first session.",
      },
      {
        title: 'How quickly can I get an appointment?',
        desc: 'Most patients are matched and scheduled within 24–48 hours of signing up.',
      },
      {
        title: 'Are sessions truly confidential?',
        desc: 'Absolutely. All sessions are HIPAA-compliant and your data is never shared without explicit consent.',
      },
      {
        title: 'What if I need to cancel or reschedule?',
        desc: 'You can cancel or reschedule up to 24 hours before your appointment at no charge.',
      },
      {
        title: 'Do you prescribe medication?',
        desc: 'Our licensed psychiatrists can prescribe and manage mental health medications where clinically appropriate.',
      },
      {
        title: 'Can I switch providers?',
        desc: "Yes — if you'd prefer a different provider, we'll make the transition seamless at no extra cost.",
      },
    ],
    faqs: [
      {
        q: 'Is this service covered by insurance?',
        a: 'Many major insurance plans cover our telehealth services. We verify your benefits before your first session.',
      },
      {
        q: 'How quickly can I get an appointment?',
        a: 'Most patients are matched and scheduled within 24–48 hours of signing up.',
      },
    ],
  },
];

/* ─── Component ──────────────────────────────────────── */
export default function ServiceDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState(0);

  const tab = tabs[activeTab];

  return (
    <section ref={sectionRef} className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-[1500px] mx-auto border border-[#e2ddd6] rounded-2xl overflow-hidden bg-white"
      >
        {/* ── Tab Bar ── */}
        <div className="flex items-center gap-1 px-6 pt-5 pb-0 border-b border-[#e2ddd6] overflow-x-auto scrollbar-hide">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 whitespace-nowrap
                ${
                  activeTab === i
                    ? 'bg-[#1a1008] text-white'
                    : 'text-[#1a1008]/55 hover:text-[#1a1008] hover:bg-[#f5f0e8]'
                }`}
            >
              {t.label}
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

        {/* ── Tab Content ── */}
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
                {tab.heading}
              </motion.h2>

              {/* Paragraphs */}
              <div className="space-y-4 mb-12">
                {tab.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="text-[#1a1008]/65 text-base leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Benefits grid (only on benefits tab) */}
              {tab.benefits && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                  {tab.benefits.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                      className="bg-[#f5f0e8] rounded-xl p-5 flex flex-col gap-2"
                    >
                      <span className="text-2xl">{b.icon}</span>
                      <p className="text-[#1a1008] font-semibold text-sm">{b.title}</p>
                      <p className="text-[#1a1008]/55 text-xs leading-relaxed">{b.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Steps (only on how-it-works tab) */}
              {tab.steps && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                  className="flex flex-col md:flex-row gap-0 mb-12 relative"
                >
                  {/* connector line */}
                  <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#e2ddd6]" />
                  {tab.steps.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.22 + i * 0.09 }}
                      className="flex-1 flex flex-col items-center text-center px-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#1a1008] text-white flex items-center justify-center text-lg font-bold mb-3 relative z-10">
                        {s.number}
                      </div>
                      <p className="text-[#1a1008] font-semibold text-sm mb-1">{s.title}</p>
                      <p className="text-[#1a1008]/50 text-xs">{s.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* "What This Service Includes" list */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="text-2xl md:text-3xl text-[#1a1008] font-bold mb-8"
                >
                  {activeTab === 0 ? 'What This Service Includes' : 'Key Details'}
                </motion.h3>

                <div className="space-y-6">
                  {tab.includes.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.38, delay: 0.28 + i * 0.07 }}
                      className="flex flex-col gap-1 pb-6 border-b border-[#e2ddd6] last:border-0 last:pb-0"
                    >
                      <p className="text-[#1a1008] font-semibold text-base">{item.title}</p>
                      <p className="text-[#1a1008]/60 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
