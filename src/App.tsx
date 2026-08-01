import { useCallback, useMemo, useState } from 'react'
import { BestSellers } from '@/components/BestSellers'
import { CartDrawer } from '@/components/drawers/CartDrawer'
import { WishlistDrawer } from '@/components/drawers/WishlistDrawer'
import { Footer } from '@/components/Footer'
import { HeroBanner } from '@/components/HeroBanner'
import { LoginModal } from '@/components/modals/LoginModal'
import { QuickModal } from '@/components/modals/QuickModal'
import { Navbar } from '@/components/Navbar'
import { ShopByCategory } from '@/components/ShopByCategory'
import { TrustSection } from '@/components/TrustSection'
import { ToastContainer } from '@/components/ui/Toast'
import { WatchAndBuy } from '@/components/WatchAndBuy'
import { WhatsAppChatButton } from '@/components/WhatsAppChatButton'
import {
  NEW_ARRIVALS,
  SCROLL_SPY_SECTIONS,
  SECTION_CATEGORY_MAP,
} from '@/data/catalog'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import type { CartItem, Product, ToastMessage } from '@/types'
import { filterProducts } from '@/utils/filterProducts'
import { scrollToSection } from '@/utils/scroll'

export default function App() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('janasya-cart', [])
  const [wishlist, setWishlist] = useLocalStorage<Product[]>('janasya-wishlist', [])
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>()
  const [loginOpen, setLoginOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const activeSection = useScrollSpy(SCROLL_SPY_SECTIONS)

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems],
  )

  const wishlistIds = useMemo(() => wishlist.map((item) => item.id), [wishlist])

  const displayedProducts = useMemo(
    () => filterProducts(NEW_ARRIVALS, searchTerm, categoryFilter),
    [searchTerm, categoryFilter],
  )

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return []
    return filterProducts(NEW_ARRIVALS, searchTerm).slice(0, 5)
  }, [searchTerm])

  const showToast = useCallback((text: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, text, type }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3500)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToCart = useCallback(
    (product: Product, _size = 'S', quantity = 1) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + quantity } : item,
          )
        }
        return [...prev, { ...product, qty: quantity }]
      })
      showToast(`${product.title} added to your cart.`)
    },
    [setCartItems, showToast],
  )

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id)
        if (exists) {
          showToast(`${product.title} removed from wishlist.`, 'info')
          return prev.filter((item) => item.id !== product.id)
        }
        showToast(`${product.title} saved to wishlist.`)
        return [...prev, product]
      })
    },
    [setWishlist, showToast],
  )

  const increaseQuantity = useCallback(
    (id: number) => {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)),
      )
    },
    [setCartItems],
  )

  const decreaseQuantity = useCallback(
    (id: number) => {
      setCartItems((prev) =>
        prev.flatMap((item) =>
          item.id === id ? (item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : []) : [item],
        ),
      )
    },
    [setCartItems],
  )

  const removeFromCart = useCallback(
    (id: number) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    },
    [setCartItems],
  )

  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === 'dresses') {
      setCategoryFilter(undefined)
      scrollToSection('dresses')
      return
    }

    if (sectionId === 'new-arrivals') {
      setCategoryFilter(undefined)
      scrollToSection('new-arrivals')
      return
    }

    if (sectionId === 'collections') {
      setCategoryFilter(undefined)
      scrollToSection('products')
      return
    }

    setCategoryFilter(SECTION_CATEGORY_MAP[sectionId])
    scrollToSection(sectionId)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <Navbar
        activeSection={activeSection}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchSuggestions}
        hasSearchQuery={Boolean(searchTerm.trim())}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onSelectCategory={handleNavigate}
      />
      <main>
        <HeroBanner />
        <TrustSection />
        <ShopByCategory onSelectCategory={handleNavigate} />
        <BestSellers
          products={displayedProducts}
          wishlistIds={wishlistIds}
          searchTerm={searchTerm.trim()}
          activeCategoryLabel={categoryFilter}
          onAddToCart={addToCart}
          onWishlistToggle={toggleWishlist}
          onQuickView={setQuickView}
        />
        <WatchAndBuy />
      </main>
      <Footer onNavigate={handleNavigate} onShowToast={showToast} />
      <WhatsAppChatButton />
      <QuickModal product={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <WishlistDrawer
        open={wishlistOpen}
        items={wishlist}
        onClose={() => setWishlistOpen(false)}
        onAddToCart={addToCart}
      />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onShowToast={showToast}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
