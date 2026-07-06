'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Download, Home } from 'lucide-react';
import Lottie from 'lottie-react';
import confetti from 'canvas-confetti';

/**
 * SETUP
 * ------------------------------------------------------------------
 * npm install lottie-react canvas-confetti framer-motion
 * npm install -D @types/canvas-confetti
 *
 * Drop a free "success checkmark" Lottie JSON (search lottiefiles.com)
 * at:  public/lottie/payment-success.json
 *
 * If that file isn't present, <SuccessAnimation /> automatically falls
 * back to a hand-drawn animated checkmark below, so the page never
 * looks broken — the Lottie is a drop-in upgrade, not a hard dependency.
 * ------------------------------------------------------------------
 */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const amount = searchParams.get('amount') ?? '600.00';
  const transactionId = searchParams.get('transactionId') ?? 'TXN-8F3D2A91';
  const method = searchParams.get('method') ?? 'Visa •••• 4242';
  const serviceName = searchParams.get('service') ?? 'Vita Lux Service';
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Gold confetti burst, timed just after the checkmark finishes drawing.
  React.useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 75,
        startVelocity: 32,
        gravity: 0.9,
        ticks: 200,
        colors: ['#c9a96e', '#a07850', '#faf6ee', '#1c1917'],
        origin: { y: 0.35 },
      });
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf6ee] px-6 py-16 !mt-10">
      <AmbientParticles />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
      >
        <motion.div variants={itemVariants}>
          <SuccessAnimation />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-2 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c9a96e]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a07850]">
            Payment Successful
          </span>
          <span className="h-px w-8 bg-[#c9a96e]" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-4 text-4xl text-stone-900 sm:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Thank You for Your Booking
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-md text-sm leading-relaxed text-stone-500"
        >
          Your payment has been confirmed and a receipt has been sent to your email. We look forward
          to welcoming you.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 w-full">
          {/* <ReceiptCard
            amount={amount}
            transactionId={transactionId}
            method={method}
            serviceName={serviceName}
            date={date}
          /> */}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/dashboard/bookings"
              className="flex items-center justify-center gap-2 rounded-md bg-stone-900 px-7 py-3 text-sm font-medium text-[#faf6ee] shadow-md transition-shadow hover:shadow-lg"
            >
              View Booking Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-md border border-stone-200 bg-white/70 px-7 py-3 text-sm font-medium text-stone-700 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

        {/* <motion.button
          variants={itemVariants}
          type="button"
          onClick={() => window.print()}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 transition-colors hover:text-stone-700"
        >
          <Download className="h-3.5 w-3.5" />
          Download Receipt
        </motion.button> */}
      </motion.div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Success icon — Lottie if available, elegant hand-drawn fallback     */
/*  otherwise, so the page always renders correctly.                    */
/* ------------------------------------------------------------------ */

function SuccessAnimation() {
  const [animationData, setAnimationData] = React.useState<object | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    fetch('/lottie/payment-success.json')
      .then((res) => {
        if (!res.ok) throw new Error('Lottie asset not found');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      {/* soft radial glow that blooms in behind the icon */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.35), transparent 70%)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />

      {animationData && !failed ? (
        <Lottie animationData={animationData} loop={false} className="relative h-40 w-40" />
      ) : (
        <FallbackCheckmark />
      )}
    </div>
  );
}

function FallbackCheckmark() {
  return (
    <svg viewBox="0 0 120 120" className="relative h-40 w-40">
      <motion.circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
        animate={{ pathLength: 1, opacity: 1, rotate: -90 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 60px' }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        fill="#1c1917"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35, duration: 0.55, type: 'spring', stiffness: 150, damping: 14 }}
      />
      <motion.path
        d="M39 61 L53 75 L83 44"
        fill="none"
        stroke="#faf6ee"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Receipt summary card                                               */
/* ------------------------------------------------------------------ */

function ReceiptCard({
  amount,
  transactionId,
  method,
  serviceName,
  date,
}: {
  amount: string;
  transactionId: string;
  method: string;
  serviceName: string;
  date: string;
}) {
  const rows: { label: string; value: string; emphasize?: boolean }[] = [
    { label: 'Service', value: serviceName },
    { label: 'Transaction ID', value: transactionId },
    { label: 'Payment Method', value: method },
    { label: 'Date', value: date },
    { label: 'Amount Paid', value: `$${amount}`, emphasize: true },
  ];

  return (
    <div className="overflow-hidden rounded-md border border-stone-100 bg-white/80 text-left shadow-[0_20px_45px_-25px_rgba(28,25,23,0.35)] backdrop-blur-sm">
      <div className="border-b border-stone-100 bg-stone-50/70 px-6 py-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
          Payment Receipt
        </span>
      </div>
      <div className="divide-y divide-stone-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-3.5">
            <span className="text-xs text-stone-500">{row.label}</span>
            <span
              className={
                row.emphasize
                  ? 'text-base font-semibold text-stone-900'
                  : 'text-right text-sm font-medium text-stone-800'
              }
              style={row.emphasize ? { fontFamily: "'Cormorant Garamond', serif" } : undefined}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ambient floating gold particles — decorative background texture     */
/* ------------------------------------------------------------------ */

function AmbientParticles() {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        size: 4 + ((i * 7) % 10),
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        duration: 8 + (i % 5) * 2,
        delay: i * 0.4,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: 'radial-gradient(circle, rgba(201,169,110,0.55), transparent 70%)',
          }}
          animate={{ y: [0, -22, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
