import { useEffect } from 'react'
import type { Product } from '@/types'
import { LazyImage } from '@/components/ui/LazyImage'

type WishlistDrawerProps = {
  open: boolean
  items: Product[]
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export function WishlistDrawer({ open, items, onClose, onAddToCart }: WishlistDrawerProps) {
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="motion-fade-in fixed inset-0 z-65 bg-black/30" onClick={onClose} role="dialog" aria-modal="true" aria-label="Wishlist">
      <aside
        className="motion-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-brand">Wishlist</h3>
            <p className="text-sm text-gray-500">Your saved pieces</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="interactive-btn text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your wishlist is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                <LazyImage src={item.img} alt={item.title} className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToCart(item)}
                  className="interactive-btn shrink-0 rounded-full bg-[#f2665b] px-3 py-2 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2665b]"
                >
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}
