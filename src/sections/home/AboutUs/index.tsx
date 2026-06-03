'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';

import { Button } from '@/components/ui';
import aboutImage from '@/assets/aboutus/aboutus.png';
import aboutBottom from '@/assets/aboutus/aboutBottom.png';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

export default function AboutUs() {
  return (
    <section className="section-padding min-h-screen bg-[#120B00] px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-24">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-1 flex-col space-y-6 text-center lg:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="text-lg font-bold text-[#F2E8D9] md:text-xl lg:text-2xl"
            >
              At AURUM STAR, wellness transcends the ordinary — it becomes a deeply personalized
              journey. Through advanced therapies, restorative rituals, and results-driven care, we
              curate experiences that nurture your body.
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="mt-4 self-center lg:self-start"
            >
              <Link href="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-white font-medium text-black hover:bg-white/10 hover:text-white"
                  >
                    Our Services
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-1 justify-center lg:justify-end"
          >
            <motion.div whileHover={{ scale: 1.03 }}>
              <Image src={aboutImage} alt="About Us" className="w-full max-w-xl" priority />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-1 justify-center lg:justify-start"
          >
            <motion.div whileHover={{ scale: 1.03 }}>
              <Image src={aboutBottom} alt="About Bottom" className="w-full max-w-lg" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-1 justify-center text-center lg:justify-end lg:text-right"
          >
            <motion.h2
              variants={fadeUp}
              className="max-w-[650px] text-2xl font-bold text-[#FFFFF0] md:text-4xl lg:text-5xl"
            >
              We blend innovation with holistic care to create refined, personalized wellness
              experiences.
            </motion.h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
