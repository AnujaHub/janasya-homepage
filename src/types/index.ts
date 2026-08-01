export type Product = {
  id: number
  img: string
  discount: string
  views: string
  title: string
  price: string
  original: string
  category: string
  description: string
  sizes: string[]
}

export type CartItem = Product & { qty: number }

export type CategoryItem = {
  label: string
  img: string
  sectionId: string
  alt: string
}

export type HeroSlide = {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  alt: string
  cta?: string
  ctaTarget?: 'categories' | 'products'
}

export type InstagramPost = {
  img: string
  likes: string
  comments: string
  href: string
}

export type ToastMessage = {
  id: number
  text: string
  type: 'success' | 'info'
}
