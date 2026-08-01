import { useEffect, useState } from 'react'
import type { Product } from '@/types'
import { LazyImage } from '@/components/ui/LazyImage'

type QuickModalProps = {
  product: Product | null
  onClose: () => void
  onAdd: (product: Product, size?: string, quantity?: number) => void
}

export function QuickModal({ product, onClose, onAdd }: QuickModalProps) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? 'S')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setSelectedSize(product?.sizes[0] ?? 'S')
    setQuantity(1)
  }, [product])

  useEffect(() => {
    if (!product) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="w-full max-w-lg animate-[fadeIn_0.2s_ease-out] rounded-card bg-white p-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 id="quick-view-title" className="text-lg font-semibold text-brand">
            {product.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="interactive-btn text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close quick view"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <LazyImage src={product.img} alt={product.title} className="h-48 w-full rounded object-cover" />
          <div>
            <p className="font-semibold text-brand">{product.price}</p>
            <p className="text-sm text-gray-500 line-through">{product.original}</p>
            <p className="mt-3 text-sm text-[#555]">{product.description}</p>
            <div className="mt-3">
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`interactive-btn rounded-full border px-3 py-1 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      selectedSize === size ? 'border-brand bg-brand text-white' : 'border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Qty</p>
              <div className="flex items-center rounded-full border">
                <button
                  type="button"
                  className="interactive-btn px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-8 text-center">{quantity}</span>
                <button
                  type="button"
                  className="interactive-btn px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onAdd(product, selectedSize, quantity)
                  onClose()
                }}
                className="interactive-btn flex-1 rounded bg-[#f2665b] py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2665b]"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={onClose}
                className="interactive-btn rounded border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
