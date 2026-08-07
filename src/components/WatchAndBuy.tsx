import { useRef } from 'react'
import { Camera, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { INSTAGRAM_POSTS, INSTAGRAM_URL } from '@/data/catalog'
import { LazyImage } from '@/components/ui/LazyImage'
import { scrollToSection } from '@/utils/scroll'

export function WatchAndBuy() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: 'left' | 'right') => {
    const area = sliderRef.current
    if (!area) return

    const amount = Math.max(area.clientWidth * 0.8, 280)
    area.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="dresses" className="scroll-mt-28 bg-[#faf8f5] py-9 sm:py-10 lg:py-12" aria-label="Instagram social proof gallery">
      <div className="mx-auto max-w-1400 px-4 sm:px-6 lg:px-8">
        <div className="motion-fade-in mx-auto max-w-4xl text-center">
          
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="interactive-btn mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0ea5a4] hover:shadow-[0_16px_34px_rgba(14,165,164,0.22)] sm:px-6 sm:text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Camera size={16} strokeWidth={1.9} aria-hidden="true" />
            Explore on Instagram
          </a>
          <br />
          <br />
          <p className="mx-auto mt-3 max-w-3xl text-[14px] leading-[1.8] text-[#5d5a56] sm:text-[15px]">
           Get everyday styling inspiration,new collection launches, behind-the-scenes moments, and real customer looks.
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Scroll Instagram gallery left"
              onClick={() => scrollSlider('left')}
              className="interactive-btn flex h-10 w-10 items-center justify-center rounded-full border border-[#d3cfc6] bg-white text-lg text-brand shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Scroll Instagram gallery right"
              onClick={() => scrollSlider('right')}
              className="interactive-btn flex h-10 w-10 items-center justify-center rounded-full border border-[#d3cfc6] bg-white text-lg text-brand shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={sliderRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scroll-smooth touch-pan-x sm:gap-4"
          >
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.img}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group relative min-w-[78vw] snap-start overflow-hidden rounded-[20px] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-w-[42vw] lg:min-w-[24vw]"
                aria-label="View Janasya Instagram post"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
                  <LazyImage
                    src={post.img}
                    alt="Janasya Instagram-inspired lifestyle look"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1a1a1a] shadow-md sm:px-4 sm:text-[11px]">
                      <Camera size={14} strokeWidth={2} aria-hidden="true" />
                      View on Instagram
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-medium text-white sm:text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
                      <Heart size={12} strokeWidth={2} aria-hidden="true" />
                      {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
                      <MessageCircle size={12} strokeWidth={2} aria-hidden="true" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-[28px] border border-[#eae4db] bg-white px-5 py-7 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:mt-10 sm:px-6 sm:py-9">
          <p className="text-[15px] font-medium text-brand">Love these looks?</p>
          <h3
            className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-[24px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Explore the complete Janasya collection inspired by our Instagram community.
          </h3>
          <button
            type="button"
            onClick={() => scrollToSection('products')}
            className="interactive-btn mt-6 inline-flex items-center rounded-full bg-[#0ea5a4] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c8f90] sm:px-6 sm:text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Shop the Collection
          </button>
        </div>
      </div>
    </section>
  )
}
