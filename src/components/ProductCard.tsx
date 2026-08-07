import { memo } from 'react'
import { Heart } from 'lucide-react'
import type { Product } from '@/types'
import { LazyImage } from '@/components/ui/LazyImage'

type ProductCardProps = {
  product: Product
  isWishlisted: boolean
  onAddToCart: (product: Product) => void
  onWishlistToggle: (product: Product) => void
  onQuickView: (product: Product) => void
}

function ProductCardComponent({
  product,
  isWishlisted,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-card bg-white soft-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="group relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <LazyImage
          src={product.img}
          alt={`Woman wearing ${product.title}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[11px] text-white">
          {product.discount}
        </span>
        <button
          type="button"
          aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist: ${product.title}`}
          aria-pressed={isWishlisted}
          onClick={() => onWishlistToggle(product)}
          className="interactive-btn absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Heart
            size={16}
            strokeWidth={1.8}
            className={isWishlisted ? 'fill-[#f2665b] text-[#f2665b]' : 'text-brand'}
          />
        </button>
      </div>
      <div className="p-3">
        <div className="text-[13px] font-medium text-brand">{product.title}</div>
        <div className="mt-2 flex items-center gap-3">
          <div className="text-[14px] font-semibold text-brand">{product.price}</div>
          <div className="text-[12px] text-gray-400 line-through">{product.original}</div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="interactive-btn flex-1 rounded bg-[#f2665b] py-2 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2665b]"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="interactive-btn rounded border px-3 py-2 transition-colors duration-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Quick view
          </button>
        </div>
      </div>
    </article>
  )
}

export const ProductCard = memo(ProductCardComponent)
