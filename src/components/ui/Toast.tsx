import { memo } from 'react'
import type { ToastMessage } from '@/types'

type ToastContainerProps = {
  toasts: ToastMessage[]
  onDismiss: (id: number) => void
}

function ToastContainerComponent({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-20 right-4 z-80 flex max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg animate-[fadeIn_0.25s_ease-out] ${
            toast.type === 'success'
              ? 'border-[#0ea5a4]/30 bg-white text-brand'
              : 'border-gray-200 bg-white text-brand'
          }`}
        >
          <span>{toast.text}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 text-gray-400 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export const ToastContainer = memo(ToastContainerComponent)
