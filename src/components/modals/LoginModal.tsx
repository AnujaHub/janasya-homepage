import { useEffect } from 'react'

type LoginModalProps = {
  open: boolean
  onClose: () => void
}

export function LoginModal({ open, onClose }: LoginModalProps) {
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
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div
        className="w-full max-w-md rounded-card bg-white p-5 shadow-2xl animate-[fadeIn_0.2s_ease-out]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 id="login-title" className="text-lg font-semibold text-brand">
              Welcome back
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to view your saved favourites and checkout faster.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close login"
            className="interactive-btn text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ✕
          </button>
        </div>
        <form
          className="mt-4 space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            onClose()
          }}
        >
          <input
            className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm focus:border-[#0ea5a4] focus:outline-none focus:ring-2 focus:ring-[#0ea5a4]/20"
            placeholder="Email address"
            type="email"
            required
            aria-label="Email address"
          />
          <input
            className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm focus:border-[#0ea5a4] focus:outline-none focus:ring-2 focus:ring-[#0ea5a4]/20"
            type="password"
            placeholder="Password"
            required
            aria-label="Password"
          />
          <button
            type="submit"
            className="interactive-btn w-full rounded-full bg-brand py-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
