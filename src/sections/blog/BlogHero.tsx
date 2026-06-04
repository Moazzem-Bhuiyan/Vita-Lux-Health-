import Herobg from '@/assets/hero/bloghero.png';

export function BlogHero() {
  return (
    <section className="relative min-h-screen-xl flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Herobg.src})`,
        }}
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative flex justify-between z-10 pt-32 pb-24">
        <div className="max-w-5xl p-12  ">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white font-medium">
              Luxury · Wellness · Sanctuary
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font- text-cream-50 leading-[1.05] text-display-xl lg:text-[72px] font-bold mb-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Insights for Better Health &
            <br />
            <em className="not-italic font-bold text-gold-400">Modern Wellness</em>
          </h1>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            {/* <Link href="/booking">
              <Button
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-stone-900 shadow-gold-lg font-medium"
              >
                Our Services
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
