import { useEffect, useState } from 'react'
import { HERO_SLIDES } from '@/data/catalog'
import { LazyImage } from '@/components/ui/LazyImage'
import { scrollToSection } from '@/utils/scroll'

export function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  const slide = HERO_SLIDES[activeSlide]

  const handleCta = () => {
    scrollToSection(slide.ctaTarget === 'products' ? 'products' : 'new-arrivals')
  }

  return (
    <section id="home" className="relative h-[72vh] min-h-110 max-h-205 w-full overflow-hidden bg-[#e8e0d4] sm:h-[calc(100vh-80px)]">
      <LazyImage
        src={slide.image}
        alt={slide.alt}
        eager
        className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
      />
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-linear-to-t from-black/65 via-black/18 to-transparent sm:hidden" />
      <div className="hero-overlay absolute inset-0" />

      <div className="absolute inset-x-0 bottom-[11%] flex justify-center px-4 sm:inset-0 sm:bottom-0 sm:items-center sm:justify-end sm:px-6 sm:pb-0 lg:px-12">
        <div className="max-w-[calc(100%-1rem)] text-center text-cream sm:mr-[6%] sm:max-w-105 sm:self-center sm:text-right lg:mr-[8%]">
          <p
            className="mb-3 hidden text-[10px] uppercase tracking-[0.38em] opacity-80 sm:mb-4 sm:block sm:text-[11px]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {slide.eyebrow}
          </p>
          <h1
            className="mb-3 whitespace-pre-line leading-[1.02] sm:mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 8vw, 5.5rem)' }}
          >
            {slide.title}
          </h1>
          <p className="mx-auto mb-5 hidden max-w-88 text-[12px] leading-[1.6] text-cream/85 sm:mb-6 sm:ml-auto sm:mr-0 sm:block sm:max-w-90 sm:text-[14px] sm:leading-[1.8]">
            {slide.subtitle}
          </p>
          <button
            type="button"
            onClick={handleCta}
            className="interactive-btn inline-flex min-h-11 items-center justify-center rounded-full border border-cream px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-cream transition-all duration-300 hover:bg-cream hover:text-brand sm:px-10 sm:py-3.5 sm:text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            {slide.cta ?? 'EXPLORE NOW'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            className={`interactive-btn block rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === activeSlide ? 'h-1.5 w-5 bg-white' : 'h-1.5 w-1.5 bg-white/50'}`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="interactive-btn absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/40 sm:left-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="interactive-btn absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/40 sm:right-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ›
      </button>
    </section>
  )
}
