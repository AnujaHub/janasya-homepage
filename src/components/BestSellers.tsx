import { useRef } from 'react'
import { NAV_SECTION_IDS } from '@/data/catalog'
import type { Product } from '@/types'
import { ProductCard } from '@/components/ProductCard'

type BestSellersProps = {
  products: Product[]
  wishlistIds: number[]
  searchTerm: string
  activeCategoryLabel?: string
  onAddToCart: (product: Product) => void
  onWishlistToggle: (product: Product) => void
  onQuickView: (product: Product) => void
}

const PRODUCT_SECTION_ANCHORS = NAV_SECTION_IDS.filter(
  (id) => !['new-arrivals', 'dresses'].includes(id),
)

export function BestSellers({
  products,
  wishlistIds,
  searchTerm,
  activeCategoryLabel,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
}: BestSellersProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: 'left' | 'right') => {
    const area = sliderRef.current
    if (!area) return

    const amount = Math.max(area.clientWidth * 0.8, 280)
    area.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="co-ords" className="scroll-mt-28 bg-[#faf8f5] py-8 sm:py-10">
      {PRODUCT_SECTION_ANCHORS.map((sectionId) => (
        <div key={sectionId} id={sectionId} className="scroll-mt-28" aria-hidden="true" />
      ))}

      <h2 className="mb-1.5 text-center text-[20px] font-medium tracking-wide text-brand sm:text-[22px]">
        BEST SELLERS
      </h2>
      {(searchTerm || activeCategoryLabel) && (
        <p className="mb-5 text-center text-sm text-gray-500">
          {searchTerm
            ? `Showing results for “${searchTerm}”`
            : `Showing ${activeCategoryLabel} collection`}
        </p>
      )}

      <div id="products" className="scroll-mt-28 mx-auto max-w-1400 px-3 sm:px-4">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center">
            <p className="text-base font-medium text-brand">No products found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or browse another category.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-end gap-2">
              <button
                type="button"
                aria-label="Scroll best sellers left"
                onClick={() => scrollSlider('left')}
                className="interactive-btn flex h-10 w-10 items-center justify-center rounded-full border border-[#d3cfc6] bg-white text-lg text-brand shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Scroll best sellers right"
                onClick={() => scrollSlider('right')}
                className="interactive-btn flex h-10 w-10 items-center justify-center rounded-full border border-[#d3cfc6] bg-white text-lg text-brand shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                ›
              </button>
            </div>

            <div
              ref={sliderRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scroll-smooth touch-pan-x sm:gap-4"
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-[78vw] snap-start sm:min-w-70 lg:min-w-60">
                  <ProductCard
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onAddToCart={onAddToCart}
                    onWishlistToggle={onWishlistToggle}
                    onQuickView={onQuickView}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
