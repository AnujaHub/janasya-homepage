import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import {
  FOOTER_DISCOVER,
  FOOTER_INFO,
  FOOTER_SHOP,
  FOOTER_SHOP_SECTION_MAP,
  FOOTER_SOCIALS,
} from '@/data/catalog'
import { scrollToSection } from '@/utils/scroll'

type FooterProps = {
  onNavigate: (sectionId: string) => void
  onShowToast: (message: string) => void
}

export function Footer({ onNavigate, onShowToast }: FooterProps) {
  const [openFaq, setOpenFaq] = useState<string | null>('size')
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const faqItems = [
    {
      key: 'size',
      question: 'How do I choose the right size?',
      answer:
        'Refer to the size chart available on each product page and choose based on your bust, waist, and hip measurements for a comfortable fit.',
    },
    {
      key: 'returns',
      question: 'What is your return & exchange policy?',
      answer:
        'You can initiate a return or exchange within the return window if the product is unused, unworn, and in its original packaging.',
    },
    {
      key: 'shipping',
      question: 'How long does shipping take?',
      answer:
        'Orders typically dispatch within 24–48 hours and arrive within 3–7 business days across India, depending on your location.',
    },
    {
      key: 'cod',
      question: 'Do you offer Cash on Delivery?',
      answer: 'Yes, Cash on Delivery is available on select pin codes for convenient checkout.',
    },
    {
      key: 'tracking',
      question: 'How can I track my order?',
      answer:
        'Once your order is shipped, you will receive a tracking link by email and SMS to follow its progress in real time.',
    },
    {
      key: 'international',
      question: 'Do you ship internationally?',
      answer:
        'Currently, our shipping is focused on India. International shipping support may be added based on destination availability.',
    },
  ]

  const footerLinkGroups = [
    { title: 'Shop', items: FOOTER_SHOP },
    { title: 'Discover', items: FOOTER_DISCOVER },
    { title: 'Information', items: FOOTER_INFO },
    {
      title: 'Contact',
      items: ['A-15/5-A, Road No 8, Udhana, Surat-394210', '+91-9310070073', '+91-7837796109 (WhatsApp)', 'care@janasya.com'],
    },
  ]

  const paymentMethods = ['Visa', 'Mastercard', 'RuPay', 'UPI', 'Google Pay', 'PhonePe', 'Paytm']

//   const trustItems = [
//     { label: 'Secure Payments', icon: ShieldCheck },
//     { label: 'Easy Returns', icon: HeartHandshake },
//     { label: 'Fast Shipping', icon: Truck },
//     { label: 'Made with Love in India', icon: Sparkles },
//   ]

  const handleNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

    if (!isValid) {
      setNewsletterStatus('error')
      return
    }

    setNewsletterStatus('success')
    onShowToast('Thank you for subscribing to the Janasya Circle.')
    setEmail('')
  }

  useEffect(() => {
    if (newsletterStatus === 'error') {
      const timer = window.setTimeout(() => setNewsletterStatus('idle'), 4000)
      return () => window.clearTimeout(timer)
    }
  }, [newsletterStatus])

  const handleFooterLink = (item: string, groupTitle: string) => {
    if (groupTitle === 'Shop' && FOOTER_SHOP_SECTION_MAP[item]) {
      onNavigate(FOOTER_SHOP_SECTION_MAP[item])
      return
    }

    if (item === 'Contact' || item.includes('@') || item.startsWith('+')) {
      if (item.includes('WhatsApp')) {
        window.open('https://wa.me/917837796109', '_blank', 'noopener,noreferrer')
      } else if (item.includes('@')) {
        window.location.href = `mailto:${item}`
      }
      return
    }

    onShowToast(`${item} — coming soon on the full Janasya store.`)
  }

  return (
    <footer className="border-t border-gray-100 bg-cream pb-6 pt-12 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[30px] border border-[#e5ddd2] bg-white/80 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-7 lg:p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2
                className="text-[22px] font-medium tracking-[0.24em] text-brand sm:text-[28px]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((item) => {
                const isOpen = openFaq === item.key

                return (
                  <div
                    key={item.key}
                    className="overflow-hidden rounded-[20px] border border-[#e8dfd0] bg-[#fbf8f2] transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.key)}
                      aria-expanded={isOpen}
                      className="interactive-btn flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span className="text-[14px] font-medium text-brand sm:text-[15px]">{item.question}</span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#d9d1c2] bg-white text-brand transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <ChevronDown size={16} strokeWidth={1.8} />
                      </span>
                    </button>

                    <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 text-[13px] leading-6 text-[#5a5a5a] sm:px-5 sm:text-[14px]">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[28px] border border-[#e4d8c7] bg-[#f9f5ef] px-4 py-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:px-6 sm:py-7 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3
                className="text-[22px] font-medium text-brand sm:text-[26px]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Join the Janasya Circle
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-[#5f5a55]">
                Get early access to new collections, styling inspiration and exclusive offers.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (newsletterStatus !== 'idle') setNewsletterStatus('idle')
                }}
                placeholder="Enter your email address"
                className={`w-full rounded-full border bg-white px-4 py-3 text-sm text-brand outline-none transition-all duration-300 focus:ring-2 focus:ring-[#0ea5a4]/20 ${
                  newsletterStatus === 'error' ? 'border-red-400 focus:border-red-400' : 'border-[#d7d0c3] focus:border-[#0ea5a4]'
                }`}
                aria-invalid={newsletterStatus === 'error'}
                aria-describedby={newsletterStatus !== 'idle' ? 'newsletter-feedback' : undefined}
              />
              <button
                type="submit"
                className="interactive-btn inline-flex items-center justify-center gap-2 rounded-full bg-[#0ea5a4] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c8f90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Subscribe
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </form>
          </div>
          {newsletterStatus === 'success' && (
            <p id="newsletter-feedback" className="mt-3 text-sm text-[#0ea5a4]" role="status">
              You&apos;re subscribed. Welcome to the Janasya Circle.
            </p>
          )}
          {newsletterStatus === 'error' && (
            <p id="newsletter-feedback" className="mt-3 text-sm text-red-500" role="alert">
              Please enter a valid email address.
            </p>
          )}
        </section>

        <section className="pt-2">
          <div className="mb-8 text-center">
            <span className="text-4xl font-semibold text-brand" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              जनस्या
            </span>
            <p className="mt-3 text-[13px] uppercase tracking-[0.26em] text-[#7a7266] sm:text-[14px]">
              Modern Indian Wear • Crafted for Everyday Elegance
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {footerLinkGroups.map((group) => (
              <div key={group.title} className="rounded-[22px] border border-[#e6ddd1] bg-white/70 p-4 sm:p-5">
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => handleFooterLink(item, group.title)}
                        className="interactive-btn text-left text-[13px] text-[#5a5a5a] transition-all duration-300 hover:text-[#0ea5a4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-[#e2d9c9] bg-white/80 p-5 shadow-[0_14px_38px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-[18px] font-medium text-brand" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Follow Our Journey
                </h3>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  {FOOTER_SOCIALS.map(({ href, image, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="interactive-btn group flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 transition duration-300 hover:border-teal-600 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h3 className="text-[18px] font-medium text-brand" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Accepted Payments
                </h3>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="rounded-full border border-[#d9d1c2] bg-[#f8f4ec] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#4c4a46]"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-8 rounded-3xl border border-[#e6ddd1] bg-[#fbf9f4] px-4 py-4 sm:px-5">
            <div className="grid gap-3 text-center sm:grid-cols-2 xl:grid-cols-4">
              {trustItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center justify-center gap-2 text-[13px] text-[#5a5a5a]">
                    <Icon size={15} className="text-[#0ea5a4]" strokeWidth={2} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div> */}

          <div className="mt-8 border-t border-[#e7dfd1] pt-4">
            <div className="flex flex-col gap-3 text-center text-[11px] uppercase tracking-[0.2em] text-[#786f64] sm:flex-row sm:items-center sm:justify-between">
              <div>© 2026 Janasya. All rights reserved.</div>
              <div className="text-[#0ea5a4]">Crafted with ❤️ by Anuja</div>
              <div className="flex items-center justify-center gap-3 sm:justify-end">
                <button type="button" onClick={() => onShowToast('Privacy Policy — coming soon.')} className="interactive-btn transition-colors hover:text-[#0ea5a4]">
                  Privacy Policy
                </button>
                <span>•</span>
                <button type="button" onClick={() => onShowToast('Terms — coming soon.')} className="interactive-btn transition-colors hover:text-[#0ea5a4]">
                  Terms
                </button>
                <span>•</span>
                <button type="button" onClick={() => scrollToSection('home')} className="interactive-btn transition-colors hover:text-[#0ea5a4]">
                  Sitemap
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
