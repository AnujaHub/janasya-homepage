import { useEffect, useRef, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { NAV_ITEMS, NAV_SECTION_IDS } from '@/data/catalog'
import type { Product } from '@/types'
import { scrollToSection } from '@/utils/scroll'
import { TickerBar } from '@/components/TickerBar'
import logoAnimationSrc from "@/data/videos/logo-animation.gif";


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
        type="search"
        placeholder="Search kurtas, dresses..."
        className="w-full rounded-full border border-[#e6ddcc] bg-[#fffdf8] px-5 py-3.5 pr-11 text-sm text-[#1d1d1d] shadow-[0_10px_28px_rgba(17,24,39,0.05)] outline-none transition-all duration-300 placeholder:text-[#5a6769] focus:border-[#0ea5a4] focus:bg-white focus:shadow-[0_16px_34px_rgba(14,165,164,0.12)]"
      />
      <Search
        size={16}
        strokeWidth={1.9}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0ea5a4]"
      />
      {showSuggestions && hasSearchQuery && (
        <div
          id="search-suggestions"
          className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-[22px] border border-[#e6ddcc] bg-white shadow-[0_18px_50px_rgba(17,24,39,0.12)]"
          role="listbox"
        >
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <button
                key={product.id}
                type="button"
                role="option"
                className="flex w-full items-center justify-between gap-3 border-b border-[#f0ebe3] px-4 py-3.5 text-left text-sm text-[#1d1d1d] transition-colors duration-200 hover:bg-[#f8f5ef] focus-visible:bg-[#f8f5ef] focus-visible:outline-none last:border-b-0"
                onClick={() => handleSearchSelect(product)}
              >
                <span className="truncate">{product.title}</span>
                <span className="shrink-0 text-[12px] uppercase tracking-[0.22em] text-[#356c78]">
                  {product.category}
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-4 text-sm text-[#666666]">No products found. Try another search.</p>
          )}
        </div>
      )}
    </div>
  )

  return (
   <header
className={`sticky top-0 z-50 ...`}
>
      <TickerBar />
      <div className="mx-auto flex h-16 max-w-1400 items-center justify-between gap-3 px-3 sm:h-20 sm:px-4 lg:h-20.5">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
            className="interactive-btn flex h-11 w-11 items-center justify-center rounded-full border border-[#e6ddcc] bg-[#fffdf8] text-[#1d1d1d] shadow-[0_10px_22px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0ea5a4] lg:hidden"
          >
            <Menu size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="interactive-btn flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/25"
          >
            <img
              src={logoAnimationSrc}
              alt="Janasya"
              className="h-11 w-auto object-contain sm:h-12"
            />
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
            className="interactive-btn flex h-11 w-11 items-center justify-center rounded-full border border-[#e6ddcc] bg-[#fffdf8] text-[#1d1d1d] shadow-[0_10px_22px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0ea5a4] lg:hidden"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Account"
            onClick={onOpenLogin}
            className="interactive-btn hidden h-11 items-center gap-2 rounded-full border border-transparent px-4 text-sm font-medium text-[#1d1d1d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f8f5ef] hover:text-[#0ea5a4] lg:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/25"
          >
            <User size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            onClick={onOpenWishlist}
            className="interactive-btn relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e6ddcc] bg-[#fffdf8] text-[#1d1d1d] shadow-[0_10px_22px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0ea5a4] lg:h-11 lg:w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/25"
          >
            <Heart size={18} strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="ml-2 hidden rounded-full bg-[#c9a24d] px-2 py-0.5 text-[10px] text-white lg:inline-flex">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Cart"
            onClick={onOpenCart}
            className="interactive-btn relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e6ddcc] bg-[#fffdf8] text-[#1d1d1d] shadow-[0_10px_22px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0ea5a4] lg:h-11 lg:w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/25"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0b6b6b] text-[9px] font-medium text-white shadow-[0_4px_12px_rgba(11,107,107,0.28)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-b border-t border-[#e6ddcc] bg-[#fffdf8] px-3 py-3 lg:hidden">
          <div className="mx-auto max-w-2xl">{renderSearch()}</div>
        </div>
      )}

      <div className="hidden border-b border-t border-[#e6ddcc] bg-[#f7f2e8] lg:block">
        <div className="mx-auto max-w-1400 px-4">
          <nav className="no-scrollbar flex justify-center gap-5 overflow-x-auto py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1d1d1d] xl:gap-7" aria-label="Primary navigation">
            {NAV_ITEMS.map((item, index) => {
              const sectionId = NAV_SECTION_IDS[index]
              const isActive = activeSection === sectionId

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectCategory(sectionId)}
                  className={`group relative shrink-0 pb-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/25 ${isActive ? 'text-[#0ea5a4]' : 'text-[#1d1d1d] hover:text-[#0ea5a4]'}`}
                >
                  <span>{item}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#0ea5a4] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'origin-left scale-x-0 group-hover:scale-x-100'}`}
                  />
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-70 bg-black/35 backdrop-blur-[2px] lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <aside
className="relative h-full w-[88%] max-w-sm border-r border-[#e6ddcc] bg-[#fffdf8] p-4 shadow-[0_24px_70px_rgba(17,24,39,0.18)]"

            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e6ddcc] pb-4">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="interactive-btn flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/25"
              >
                <img
                  src={logoAnimationSrc}
                  alt="Janasya"
                  className="h-10 w-auto object-contain"
                />
              </button>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileMenuOpen(false)}
                className="interactive-btn flex h-11 w-11 items-center justify-center rounded-full border border-[#e6ddcc] bg-white text-[#1d1d1d] shadow-[0_10px_22px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
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
                className="interactive-btn flex w-full items-center justify-between rounded-[20px] border border-[#e6ddcc] bg-white px-4 py-3 text-sm font-medium text-[#1d1d1d] shadow-[0_10px_24px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0ea5a4] hover:bg-[#f8f5ef] hover:text-[#0ea5a4]"
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
                    className="interactive-btn flex w-full items-center justify-between rounded-[18px] px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.16em] text-[#1d1d1d] transition-all duration-300 hover:bg-[#f8f5ef] hover:text-[#0ea5a4]"
                  >
                    <span>{item}</span>
                    <span className="text-xs text-[#0ea5a4]">→</span>
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
          className="interactive-btn fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#e6ddcc] bg-[#0b6b6b] text-xl text-white shadow-[0_14px_30px_rgba(11,107,107,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0ea5a4] sm:bottom-6 sm:right-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]/35"
        >
          ↑
        </button>
      )}
    </header>
  )
}
