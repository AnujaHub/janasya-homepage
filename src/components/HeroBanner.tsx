import { useEffect, useRef, useState } from 'react'
import { HERO_SLIDES } from '@/data/catalog'
import { LazyImage } from '@/components/ui/LazyImage'
import { scrollToSection } from '@/utils/scroll'

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [previousSlide, setPreviousSlide] = useState<number | null>(null)
  const [transitionPhase, setTransitionPhase] = useState<0 | 1>(1)
  const rafRef = useRef<number | null>(null)
  const transitionTimerRef = useRef<number | null>(null)
  const lastSlideRef = useRef(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const image = new Image()
      image.src = slide.image
    })
  }, [])

  useEffect(() => {
    if (currentSlide === lastSlideRef.current) return

    const previous = lastSlideRef.current
    lastSlideRef.current = currentSlide

    setPreviousSlide(previous)
    setTransitionPhase(0)

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = window.requestAnimationFrame(() => {
      setTransitionPhase(1)
    })

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current)
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setPreviousSlide(null)
      transitionTimerRef.current = null
    }, 500)

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [currentSlide])

  const slide = HERO_SLIDES[currentSlide]
  const currentBackground = HERO_SLIDES[currentSlide]
  const outgoingBackground = previousSlide !== null ? HERO_SLIDES[previousSlide] : null

  const handleCta = () => {
    scrollToSection(slide.ctaTarget === 'products' ? 'products' : 'new-arrivals')
  }

  const renderSlideLayer = (heroSlide: (typeof HERO_SLIDES)[number], isOutgoing: boolean) => {
    const shouldBeVisible = isOutgoing ? transitionPhase === 0 : transitionPhase === 1

    return (
      <div
        aria-hidden={isOutgoing}
        className={`absolute inset-x-0 bottom-14 flex justify-center px-4 transition-opacity duration-500 ease-out sm:inset-0 sm:bottom-0 sm:items-center sm:justify-end sm:px-6 sm:pb-0 lg:px-12 ${shouldBeVisible ? 'opacity-100' : 'opacity-0'} ${isOutgoing ? 'pointer-events-none' : ''}`}
      >
        <div
          className="w-full max-w-[min(92vw,25rem)] text-center text-cream sm:mr-[6%] sm:max-w-105 sm:self-center sm:text-right lg:mr-[8%]"
          style={{
  textShadow: `
    0 2px 6px rgba(0,0,0,0.45),
    0 6px 20px rgba(0,0,0,0.35),
    0 0 35px rgba(0,0,0,0.25)
  `,
}}
        >
         <p
  className="hidden sm:block mb-4 text-[11px] uppercase tracking-[0.34em] text-white/85"
  style={{ fontFamily: "'Jost', sans-serif" }}
>
  {heroSlide.eyebrow}
</p>
          <h1
            className="mb-2 whitespace-pre-line leading-[1.04] sm:mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.9rem, 8.5vw, 5.5rem)' }}
          >
            {heroSlide.title}
          </h1>
          <p className="mx-auto mb-4 hidden max-w-88 text-[12px] leading-[1.65] text-white/90 sm:mb-6 sm:ml-auto sm:mr-0 sm:block sm:max-w-90 sm:text-[14px] sm:leading-[1.8] sm:text-cream/85">
            {heroSlide.subtitle}
          </p>
          <button
            type="button"
            onClick={handleCta}
           className="group inline-flex items-center justify-center
rounded-full
bg-[#E4C15A]
px-7 py-3.5
text-[#1F2D2D]
text-[12px]
font-bold
uppercase
tracking-[0.25em]
shadow-[0_8px_25px_rgba(212,175,55,0.45)]
transition-all duration-300
hover:scale-105
hover:bg-[#96cbd5] 
hover:shadow-[0_12px_35px_rgba(212,175,55,0.6)]">
            {heroSlide.cta ?? 'EXPLORE NOW'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <section id="home" className="relative h-[72svh] min-h-128 max-h-205 w-full overflow-hidden bg-[#e8e0d4] sm:h-[calc(100vh-80px)] sm:min-h-110">
      {outgoingBackground && (
        <LazyImage
          src={outgoingBackground.image}
          alt={outgoingBackground.alt}
          eager
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-out ${transitionPhase === 0 ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <LazyImage
        key={currentBackground.image}
        src={currentBackground.image}
        alt={currentBackground.alt}
        eager
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-out ${transitionPhase === 0 ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-linear-to-t from-black/65 via-black/18 to-transparent sm:hidden" />
      <div className="hero-overlay absolute inset-0" />

      <div className="absolute inset-x-0 bottom-6 sm:inset-0 sm:bottom-0 sm:flex sm:items-center sm:justify-end">
        {outgoingBackground && renderSlideLayer(outgoingBackground, true)}
        {renderSlideLayer(slide, false)}
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
            className={`interactive-btn block rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === currentSlide ? 'h-1.5 w-5 bg-white' : 'h-1.5 w-1.5 bg-white/50'}`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="interactive-btn absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/40 sm:left-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="interactive-btn absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/40 sm:right-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ›
      </button>
    </section>
  )
}
