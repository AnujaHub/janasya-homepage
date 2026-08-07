import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Sparkles, Star } from 'lucide-react'

type Review = {
  name: string
  initials: string
  location: string
  product: string
  date: string
  review: string
}

const TRUST_STATS = [
  { value: '4.8/5', label: 'Average Rating', icon: Star },
  { value: '10,000+', label: 'Verified Reviews', icon: Sparkles },
  { value: '10,00,000+', label: 'Trusted by Women', icon: BadgeCheck },
]

const REVIEWS: Review[] = [
  {
    name: 'Priya S.',
    initials: 'PS',
    location: 'Mumbai',
    product: 'Festive Kurta Set',
    date: 'Reviewed on 12 Jun 2026',
    review:
      'The fabric feels premium and the fit was exactly as expected. I wore it for a family function and received compliments all evening.',
  },
  {
    name: 'Ananya K.',
    initials: 'AK',
    location: 'Bangalore',
    product: 'Contour Co-ord Set',
    date: 'Reviewed on 28 May 2026',
    review:
      'Beautifully tailored and very comfortable for a long workday. It looks refined, feels lightweight, and photographs really well.',
  },
  {
    name: 'Meera P.',
    initials: 'MP',
    location: 'Pune',
    product: 'Minimalist Dress',
    date: 'Reviewed on 03 Jul 2026',
    review:
      'The silhouette is elegant and the quality exceeded my expectations. It has become my go-to outfit for brunches and outings.',
  },
  {
    name: 'Shruti R.',
    initials: 'SR',
    location: 'Hyderabad',
    product: 'Maternity Comfort Set',
    date: 'Reviewed on 19 Jun 2026',
    review:
      'Soft, breathable, and thoughtfully designed. I loved how easy it was to move in while still looking polished and put together.',
  },
  {
    name: 'Nisha T.',
    initials: 'NT',
    location: 'Delhi',
    product: 'Dark Pink Flared Kurta',
    date: 'Reviewed on 01 Jul 2026',
    review:
      'The color is rich and the drape is lovely. It feels like an occasion piece without sacrificing everyday comfort.',
  },
]

export function TrustSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const visibleReviews = useMemo(() => REVIEWS, [])

  useEffect(() => {
    if (isPaused) return

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleReviews.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [isPaused, visibleReviews.length])

  useEffect(() => {
    const area = carouselRef.current
    if (!area) return

    const card = area.querySelector<HTMLElement>('[data-review-card="true"]')
    const width = card?.offsetWidth ?? area.clientWidth
    const gap = 16
    area.scrollTo({ left: activeIndex * (width + gap), behavior: 'smooth' })
  }, [activeIndex])

  const scrollReviews = (direction: 'left' | 'right') => {
    setActiveIndex((prev) => {
      const next = direction === 'left' ? prev - 1 : prev + 1
      return (next + visibleReviews.length) % visibleReviews.length
    })
  }

  return (
    <section
      className="border-y border-[#f0ebe3]/80 bg-[#faf8f5] py-8 sm:py-10"
      aria-labelledby="customer-reviews-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#0ea5a4]">
            What Our Customers Say
          </p>
          <h2
            id="customer-reviews-heading"
            className="mt-3 text-[28px] font-medium tracking-[-0.03em] text-brand sm:text-[34px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Loved by Women Across India
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-[#5d5a56] sm:text-[15px]">
            Real experiences from women who wear Janasya every day.
          </p>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#e6ddd1] bg-white/85 px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)] sm:px-5 sm:py-5">
          <div className="grid gap-3 text-center sm:grid-cols-3">
            {TRUST_STATS.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="flex items-center justify-center gap-3 rounded-2xl border border-transparent bg-[#fbf8f2] px-3 py-3 text-[#5a5a5a] transition-all duration-300 hover:border-[#e4d8c7] hover:bg-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0ea5a4]/10 text-[#0ea5a4]">
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="text-left">
                    <div className="text-[14px] font-semibold text-brand sm:text-[15px]">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#78716c]">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="hidden text-[12px] uppercase tracking-[0.24em] text-[#8a7f73] sm:block sm:text-[13px]">
              Customer Reviews ({REVIEWS.length})
            </div>
            <div className="flex items-center gap-2 sm:hidden">
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => scrollReviews('left')}
                className="interactive-btn flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d0c4] bg-white text-brand shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeft size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => scrollReviews('right')}
                className="interactive-btn flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d0c4] bg-white text-brand shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {visibleReviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                data-review-card="true"
                className="group min-w-[86vw] snap-start rounded-3xl border border-[#e6ddd1] bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,23,42,0.06)] sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.75rem)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3ede3] text-[13px] font-semibold text-brand">
                      {review.initials}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-brand">{review.name}</h3>
                      <p className="text-[12px] text-[#7b7368]">{review.location}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#0ea5a4]/20 bg-[#0ea5a4]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a8e8d]">
                    <BadgeCheck size={11} strokeWidth={2.2} aria-hidden="true" />
                    Verified Buyer
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1 text-[#c8a96e]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} strokeWidth={2.1} className="fill-current" aria-hidden="true" />
                  ))}
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <Quote size={18} className="mt-0.5 shrink-0 text-[#0ea5a4] opacity-80" aria-hidden="true" />
                  <p className="text-[14px] leading-7 text-[#534f49] sm:text-[15px]">{review.review}</p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0ebe3] pt-4 text-[12px] text-[#7b7368]">
                  <span className="rounded-full bg-[#faf8f5] px-3 py-1">{review.product}</span>
                  <span>{review.date}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-2" aria-label="Review carousel pagination">
            {visibleReviews.map((review, index) => (
              <button
                key={`${review.name}-dot`}
                type="button"
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`interactive-btn h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${index === activeIndex ? 'w-6 bg-[#0ea5a4]' : 'w-2.5 bg-[#d9d1c5]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
