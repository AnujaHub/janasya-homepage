import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Gift, Sparkles, X } from 'lucide-react'
import { scrollToSection } from '@/utils/scroll'

const SESSION_KEY = 'janasya-festive-offer-seen'
const COUPON_CODE = 'WELCOME10'
const premiumEase = [0.22, 1, 0.36, 1] as const

const popupVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.42, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 12,
    transition: { duration: 0.22, ease: premiumEase },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const confettiParticles = [
  { className: 'left-[10%] top-[14%] h-2 w-2', delay: 0, duration: 5.6 },
  { className: 'right-[14%] top-[18%] h-1.5 w-1.5', delay: 0.4, duration: 6.2 },
  { className: 'left-[8%] bottom-[22%] h-1.5 w-1.5', delay: 0.8, duration: 5.8 },
  { className: 'right-[10%] bottom-[20%] h-2 w-2', delay: 1.2, duration: 6.6 },
  { className: 'left-[22%] top-[8%] h-1 w-1', delay: 1.6, duration: 5.2 },
  { className: 'right-[24%] top-[10%] h-1 w-1', delay: 0.2, duration: 5.4 },
  { className: 'left-[20%] bottom-[10%] h-1 w-1', delay: 0.6, duration: 5.9 },
  { className: 'right-[18%] bottom-[12%] h-1 w-1', delay: 1.1, duration: 5.7 },
] as const

function markSessionSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Ignore storage failures and keep the popup functional.
  }
}

function hasSeenThisSession() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function FestiveOfferPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const corners = useMemo(
    () => [
      'top-4 left-4',
      'top-4 right-4',
      'bottom-4 left-4',
      'bottom-4 right-4',
    ],
    [],
  )

  useEffect(() => {
    if (hasSeenThisSession()) return

    const timer = window.setTimeout(() => {
      if (!hasSeenThisSession()) {
        markSessionSeen()
        setIsOpen(true)
      }
    }, 100)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (!copied) return

    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const closePopup = () => {
    markSessionSeen()
    setIsOpen(false)
  }

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE)
      setCopied(true)
    } catch {
      setCopied(true)
    }
  }

  const handleShopNow = () => {
    closePopup()
    scrollToSection('products')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="festive-offer-popup"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4 py-5 backdrop-blur-[6px] sm:px-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closePopup}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="festive-offer-title"
            aria-describedby="festive-offer-description"
            className="relative w-full max-w-136 overflow-hidden rounded-3xl border border-[#e8ddc7] bg-[#fdfbf6] shadow-[0_28px_80px_rgba(17,24,39,0.24)]"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,164,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.11),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.2] bg-[radial-gradient(circle_at_1px_1px,rgba(212,175,55,0.32)_1px,transparent_0)] bg-size-[18px_18px]" />

            {confettiParticles.map((particle, index) => (
              <motion.span
                key={`${particle.className}-${index}`}
                className={`pointer-events-none absolute rounded-full ${particle.className}`}
                style={{ backgroundColor: index % 2 === 0 ? '#0EA5A4' : '#D4AF37' }}
                animate={{ y: [0, -10, 0], x: [0, index % 2 === 0 ? 6 : -6, 0], opacity: [0.25, 0.55, 0.25], rotate: [0, 180, 360] }}
                transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            <button
              type="button"
              aria-label="Close festive offer popup"
              onClick={closePopup}
              className="interactive-btn absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#e6ddcc] bg-white/95 text-[#1d1d1d] shadow-[0_10px_24px_rgba(17,24,39,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
            >
              <X size={18} strokeWidth={1.9} />
            </button>

            <div className="relative px-4 pb-4 pt-14 sm:px-6 sm:pb-6 sm:pt-15">
              <div className="relative overflow-hidden rounded-[20px] border border-[#eadfcb] bg-white/70 p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] sm:p-6">
                {corners.map((position, index) => (
                  <div
                    key={position}
                    className={`pointer-events-none absolute ${position} h-16 w-16 rounded-[18px] border border-[#D4AF37]/20 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.24)_0_1px,transparent_2px),radial-gradient(circle_at_70%_30%,rgba(14,165,164,0.18)_0_1px,transparent_2px),radial-gradient(circle_at_30%_70%,rgba(212,175,55,0.18)_0_1px,transparent_2px)] bg-size-[16px_16px] ${index === 1 || index === 3 ? 'rotate-90' : ''}`}
                  />
                ))}

                <div className="flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-4 pr-10">
                    <motion.div
                      animate={{ y: [0, -4, 0], rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#e5dcc6] bg-[#fffaf0] text-[#0EA5A4] shadow-[0_10px_24px_rgba(17,24,39,0.06)]"
                    >
                      <Gift size={26} strokeWidth={1.9} aria-hidden="true" />
                      <motion.span
                        className="absolute -right-1 -top-1 text-[#D4AF37]"
                        animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Sparkles size={13} strokeWidth={2.3} />
                      </motion.span>
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#0EA5A4] sm:text-[11px]">
                        Festive Offer
                      </p>
                      <h2
                        id="festive-offer-title"
                        className="mt-2 text-[clamp(1.55rem,4.8vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1D1D1D]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        ✨ Celebrate Every Occasion in Style
                      </h2>
                      <p
                        id="festive-offer-description"
                        className="mt-3 max-w-md text-[14px] leading-[1.8] text-[#666666] sm:text-[15px]"
                      >
                        Festivals are around the corner.
                        <br />
                        Find your perfect festive look with Janasya.
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[20px] border border-[#eadfcb] bg-[linear-gradient(135deg,rgba(14,165,164,0.08)_0%,rgba(212,175,55,0.10)_100%)] px-4 py-4 sm:px-5">
                    <div className="absolute inset-0 opacity-70">
                      <motion.span
                        className="absolute left-3 top-2 text-[#D4AF37]"
                        animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.08, 0.9] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Sparkles size={12} strokeWidth={2.2} />
                      </motion.span>
                      <motion.span
                        className="absolute right-5 top-3 text-[#0EA5A4]"
                        animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.88, 1.05, 0.88] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      >
                        <Sparkles size={11} strokeWidth={2.2} />
                      </motion.span>
                      <motion.span
                        className="absolute bottom-3 right-10 text-[#D4AF37]"
                        animate={{ opacity: [0.3, 0.85, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                      >
                        <Sparkles size={10} strokeWidth={2.2} />
                      </motion.span>
                    </div>

                    <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0EA5A4] sm:text-[11px]">
                          Extra 10% Off
                        </p>
                        <p className="mt-1 text-[13px] font-medium text-[#1D1D1D] sm:text-[14px]">
                          On your first order
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-[#e8ddc8] bg-white px-3 py-2 shadow-[0_8px_18px_rgba(17,24,39,0.04)]">
                        <span className="select-all text-[12px] font-semibold tracking-[0.26em] text-[#1D1D1D] sm:text-[13px]">
                          {COUPON_CODE}
                        </span>
                        <button
                          type="button"
                          onClick={copyCoupon}
                          className="interactive-btn inline-flex items-center gap-1 rounded-full bg-[#0EA5A4] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(14,165,164,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B6B6B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5A4]/35"
                        >
                          <Copy size={12} strokeWidth={2.2} aria-hidden="true" />
                          <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleShopNow}
                      className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-[#0EA5A4] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_16px_34px_rgba(14,165,164,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B6B6B] sm:flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5A4]/35"
                    >
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.48),transparent)]"
                        animate={{ x: ['-140%', '420%'] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                      />
                      <span className="relative">Shop Festive Collection</span>
                    </button>

                    <button
                      type="button"
                      onClick={closePopup}
                      className="interactive-btn inline-flex min-h-12 items-center justify-center rounded-full border border-[#e6ddcc] bg-[#fffdf8] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1D1D1D] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0EA5A4] hover:bg-[#f8f5ef] hover:text-[#0EA5A4] sm:flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5A4]/25"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}