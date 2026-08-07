import { CATEGORIES } from '@/data/catalog'
import { LazyImage } from '@/components/ui/LazyImage'

type ShopByCategoryProps = {
  onSelectCategory: (sectionId: string) => void
}

export function ShopByCategory({ onSelectCategory }: ShopByCategoryProps) {
  return (
    <section id="new-arrivals" className="scroll-mt-28 bg-white py-10 sm:py-12">
      <h2
        className="mb-6 text-center text-[20px] font-medium tracking-wide text-brand sm:text-[22px]"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        SHOP BY CATEGORY
      </h2>

      <div className="mx-auto max-w-1200 px-3 sm:px-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <button
              key={category.label}
              type="button"
              onClick={() => onSelectCategory(category.sectionId)}
              className="category-card interactive-btn group cursor-pointer rounded-card text-left soft-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="relative overflow-hidden rounded-card" style={{ aspectRatio: '3/4' }}>
                <LazyImage
                  src={category.img}
                  alt={category.alt}
                  className="category-img h-full w-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 text-center sm:bottom-6">
                  <span className="label-pill text-[10px] font-semibold tracking-wider text-white sm:text-[12px]">
                    {category.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
