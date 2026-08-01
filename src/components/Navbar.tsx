import { useEffect, useRef, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { NAV_ITEMS, NAV_SECTION_IDS } from '@/data/catalog'
import type { Product } from '@/types'
import { scrollToSection } from '@/utils/scroll'
import { TickerBar } from '@/components/TickerBar'

type NavbarProps = {
  activeSection: string
  cartCount: number
  wishlistCount: number
  searchTerm: string
  setSearchTerm: (value: string) => void
  searchResults: Product[]
  hasSearchQuery: boolean
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenLogin: () => void
  onSelectCategory: (sectionId: string) => void
}

export function Navbar({
  activeSection,
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
  searchResults,
  hasSearchQuery,
  onOpenCart,
  onOpenWishlist,
  onOpenLogin,
  onSelectCategory,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 6)
      setShowBackToTop(window.scrollY > 360)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleSearchSelect = (product: Product) => {
    setSearchTerm(product.title)
    setShowSuggestions(false)
    setMobileSearchOpen(false)
    scrollToSection('products')
  }

  const renderSearch = () => (
    <div className="relative" ref={searchRef}>
      <input
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => setShowSuggestions(true)}
        name="search"
        type="search"
        placeholder="Search for kurtas, dresses, co-ords..."
        className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Search products"
        aria-expanded={showSuggestions && hasSearchQuery}
        aria-controls="search-suggestions"
      />
      {showSuggestions && hasSearchQuery && (
        <div
          id="search-suggestions"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
          role="listbox"
        >
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <button
                key={product.id}
                type="button"
                role="option"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors duration-200 hover:bg-cream focus-visible:bg-cream focus-visible:outline-none"
                onClick={() => handleSearchSelect(product)}
              >
                <span className="truncate">{product.title}</span>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                  {product.category}
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-4 text-sm text-gray-500">No products found. Try another search.</p>
          )}
        </div>
      )}
    </div>
  )

  return (
    <header className={`sticky top-0 z-50 bg-cream transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <TickerBar />
      <div className="mx-auto flex h-16 max-w-1400 items-center justify-between gap-3 px-3 sm:h-20 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
            className="interactive-btn flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d0c3] bg-white text-brand lg:hidden"
          >
            <Menu size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="text-2xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            style={{ color: '#0ea5a4', fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            Janasya
          </button>
        </div>

        <div className="hidden flex-1 px-4 lg:flex lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-185">{renderSearch()}</div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="interactive-btn flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d0c3] bg-white text-brand lg:hidden"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Account"
            onClick={onOpenLogin}
            className="interactive-btn hidden h-11 items-center gap-2 rounded-full px-4 text-sm transition-opacity hover:opacity-80 lg:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <User size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            onClick={onOpenWishlist}
            className="interactive-btn relative flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d0c3] bg-white text-brand lg:h-auto lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Heart size={18} strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="ml-2 hidden rounded-full bg-accent px-2 py-0.5 text-[10px] text-white lg:inline-flex">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Cart"
            onClick={onOpenCart}
            className="interactive-btn relative flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d0c3] bg-white text-brand lg:h-auto lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-b border-t border-gray-100 bg-white px-3 py-3 lg:hidden">
          <div className="mx-auto max-w-2xl">{renderSearch()}</div>
        </div>
      )}

      <div className="hidden border-b border-t border-gray-100 bg-white lg:block">
        <div className="mx-auto max-w-1400 px-4">
          <nav className="no-scrollbar flex gap-4 overflow-x-auto py-3 text-[13px] font-medium xl:gap-6" aria-label="Primary navigation">
            {NAV_ITEMS.map((item, index) => {
              const sectionId = NAV_SECTION_IDS[index]
              const isActive = activeSection === sectionId

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectCategory(sectionId)}
                  className={`relative shrink-0 pb-2 uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? 'text-accent' : 'hover:text-accent'}`}
                >
                  <span>{item}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'origin-left scale-x-0 hover:scale-x-100'}`}
                  />
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-70 bg-black/35 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <aside
            className="h-full w-[88%] max-w-sm bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span
                className="text-xl font-semibold"
                style={{ color: '#0ea5a4', fontFamily: "'Noto Serif Devanagari', serif" }}
              >
                Janasya
              </span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileMenuOpen(false)}
                className="interactive-btn flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d0c3] bg-white text-brand"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <button
                type="button"
                aria-label="Account"
                onClick={() => {
                  onOpenLogin()
                  setMobileMenuOpen(false)
                }}
                className="interactive-btn flex w-full items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 text-sm font-medium text-brand"
              >
                <span>Account</span>
                <User size={16} strokeWidth={1.8} />
              </button>
            </div>
            <nav className="mt-5 space-y-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, index) => {
                const sectionId = NAV_SECTION_IDS[index]
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onSelectCategory(sectionId)
                      setMobileMenuOpen(false)
                    }}
                    className="interactive-btn flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.18em] text-brand transition-colors duration-200 hover:bg-cream"
                  >
                    <span>{item}</span>
                    <span className="text-xs text-gray-400">→</span>
                  </button>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="interactive-btn fixed bottom-24 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-black text-lg text-white shadow-md transition-all duration-300 sm:bottom-28 sm:right-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ↑
        </button>
      )}
    </header>
  )
}
