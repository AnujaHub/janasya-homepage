import { Camera, Heart, MessageCircle } from 'lucide-react'
import { INSTAGRAM_POSTS, INSTAGRAM_URL } from '@/data/catalog'
import { LazyImage } from '@/components/ui/LazyImage'
import { scrollToSection } from '@/utils/scroll'

export function WatchAndBuy() {
  return (
    <section id="dresses" className="scroll-mt-28 bg-[#faf8f5] py-12 sm:py-14 lg:py-18" aria-label="Instagram social proof gallery">
      <div className="mx-auto max-w-1400 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl animate-[fadeIn_0.9s_ease-out] text-center">
          <div className="mb-4 flex items-center justify-center text-[#0ea5a4]">
            <div className="rounded-full border border-[#d8d5cf] bg-white p-3 shadow-sm">
              <Camera size={22} strokeWidth={1.9} aria-hidden="true" />
            </div>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-brand">Seen on Instagram</p>
          <h2
            className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#1a1a1a] sm:text-[34px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Follow @janasyaclothing
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-[1.8] text-[#5d5a56] sm:text-[15px]">
            Discover how women across India style their favourite Janasya outfits. Get everyday styling inspiration,
            new collection launches, behind-the-scenes moments, and real customer looks.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="interactive-btn mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0ea5a4] hover:shadow-[0_16px_34px_rgba(14,165,164,0.22)] sm:px-6 sm:text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Camera size={16} strokeWidth={1.9} aria-hidden="true" />
            Follow on Instagram
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.img}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[20px] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

        <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-[#eae4db] bg-white px-5 py-8 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:mt-12 sm:px-6 sm:py-10">
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
