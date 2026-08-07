import { useEffect } from 'react'
import type { CartItem } from '@/types'
import { LazyImage } from '@/components/ui/LazyImage'

type CartDrawerProps = {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
  onShowToast: (message: string) => void
}

export function CartDrawer({
  open,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onShowToast,
}: CartDrawerProps) {
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

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price.replace(/[₹,]/g, '')) * item.qty,
    0,
  )

  return (
    <div className="motion-fade-in fixed inset-0 z-65 bg-black/30" onClick={onClose} role="dialog" aria-modal="true" aria-label="Shopping cart">
      <aside
        className="motion-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-brand">Your cart</h3>
            <p className="text-sm text-gray-500">
              {items.length} item{items.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="interactive-btn text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your bag feels light — add a few pieces.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                <LazyImage src={item.img} alt={item.title} className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDecrease(item.id)}
                      className="interactive-btn rounded-full border px-2 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onIncrease(item.id)}
                      className="interactive-btn rounded-full border px-2 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="interactive-btn shrink-0 text-sm text-gray-400 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between text-sm font-medium text-brand">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Checkout is coming soon on the full Janasya store.')}
            className="interactive-btn w-full rounded-full bg-brand py-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Checkout
          </button>
          <button
            type="button"
            onClick={onClose}
            className="interactive-btn w-full rounded-full border border-gray-200 py-3 font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </div>
  )
}
