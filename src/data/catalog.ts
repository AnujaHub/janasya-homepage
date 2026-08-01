import type { CategoryItem, HeroSlide, InstagramPost, Product } from '@/types'

import instagramIcon from '@/imports/janasya-asset/INSTA_1.png'
import facebookIcon from '@/imports/janasya-asset/FB_1.png'
import youtubeIcon from '@/imports/janasya-asset/YOUTUBE_1.png'
import whatsappIcon from '@/imports/janasya-asset/WHATSAPP_1.png'

import hero from '@/imports/janasya-hero.png'
import heroWorkwear from '@/imports/janasya-hero2.png'
import heroFestive from '@/imports/janasya-hero3.png'
import dressCategory from '@/imports/janasya-asset/plus-size-yellow-georgette-floral-printed-tiered-dress.webp'
import coOrdCategory from '@/imports/janasya-asset/JAA26ST03649_jpg.jpg'
import topTunicCategory from '@/imports/janasya-asset/tops.webp'
import kurtaCategory from '@/imports/janasya-asset/MAC24KR01641.jpg'
import suitSetCategory from '@/imports/janasya-asset/green-cotton-A-Line-kurta-set.webp'
import productCoOrd from '@/imports/janasya-asset/co-ord.webp'
import productDress from '@/imports/janasya-asset/plus-size-yellow-georgette-floral-printed-tiered-dress.webp'
import productFestive from '@/imports/janasya-asset/green-cotton-A-Line-kurta-set.webp'
import productClassic from '@/imports/janasya-asset/black-rayon-solid-straight-kurt-set-printed-dupatta.webp'
import productDarkPink from '@/imports/janasya-asset/dark-pink-Chiffon-floral-printed-flared-kurta.webp'
import productOrangeTunic from '@/imports/janasya-asset/orange-cotton-floral-rpinted-flared-tunic.webp'
import productMustard from '@/imports/janasya-asset/mustard-yellow-kurta-set.webp'
import productRustDress from "@/imports/janasya-asset/rust-pure-cotton-ethic-motif's-printed-flared-dress.webp"
import productMagenta from '@/imports/janasya-asset/magenta-pink-kurta-set.webp'
import productOffWhite from '@/imports/janasya-asset/offWhite-rayon-solid-straight-kurta-set.webp'
import productMaternity from '@/imports/janasya-asset/M21002-KR-PP.jpg'
import productCoOrdTwo from '@/imports/janasya-asset/SET916-CO-ORDm11080x1440.jpg'
import productXlaOne from '@/imports/janasya-asset/XLA26DR03857.jpg'
import instaPostOne from '@/imports/janasya-asset/1080x1440_IMG_1883.jpg'
import instaPostTwo from '@/imports/janasya-asset/1080x1440_IMG_2120.jpg'
import instaPostThree from '@/imports/janasya-asset/1080x1440_IMG_2128_0fde8351-3463-44d4-88a6-d4c88619a7e0.jpg'
import instaPostFour from '@/imports/janasya-asset/1080x1440_IMG_2223_5e1a5fe5-9236-48bc-8a25-079f96f53442.jpg'
import instaPostFive from '@/imports/janasya-asset/JAA24ST00118_1080x1440_1.jpg'
import instaPostSix from '@/imports/janasya-asset/JAA24ST00105_3__1080x1440_90491812-a313-4dd2-8e13-c711ce56e9cb.jpg'
import instaPostSeven from '@/imports/janasya-asset/JAA26ST03652_4dc152c7-c121-40c0-a0b6-6196ce559761.jpg'
import instaPostEight from '@/imports/janasya-asset/Tezza-8218.jpg'

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: 'New Arrivals',
    title: 'Modern Ethnic',
    subtitle: 'Timeless silhouettes celebrating every woman',
    image: hero,
    alt: 'Indian woman in elegant modern ethnic wear for the Janasya hero collection',
    cta: 'SHOP NOW',
    ctaTarget: 'products',
  },
  {
    eyebrow: 'WORKWEAR',
    title: 'Workwear\nCollection',
    subtitle: 'Structured silhouettes for polished, modern dressing.',
    image: heroWorkwear,
    alt: 'Woman wearing refined workwear ethnic co-ord set in a premium lifestyle setting',
    cta: 'EXPLORE NOW',
    ctaTarget: 'categories',
  },
  {
    eyebrow: 'FESTIVE',
    title: 'Festive\nCollection',
    subtitle: 'Elevated heirloom-inspired pieces for the season.',
    image: heroFestive,
    alt: 'Woman wearing festive ethnic style with warm editorial styling',
    cta: 'EXPLORE NOW',
    ctaTarget: 'categories',
  },
]

export const CATEGORIES: CategoryItem[] = [
  { label: 'DRESSES', img: dressCategory, sectionId: 'dresses', alt: 'Woman wearing a graceful dress in a premium Indian ethnic fashion editorial' },
  { label: 'CO-ORDS', img: coOrdCategory, sectionId: 'co-ords', alt: 'Curvy Indian woman styled in a chic ethnic co-ord set' },
  { label: 'TOPS', img: topTunicCategory, sectionId: 'new-arrivals', alt: 'Woman wearing a modern tunic and premium everyday ethnic silhouette' },
  { label: 'KURTAS', img: kurtaCategory, sectionId: 'kurtas', alt: 'Woman in a classic kurta set with elegant Indian styling' },
  { label: 'SUIT SETS', img: suitSetCategory, sectionId: 'kurta-sets', alt: 'Plus-size woman wearing a soft pastel suit set with contemporary ethnic detailing' },
]

export const PRODUCT_CATALOG: Product[] = [
  { id: 1, img: productMaternity, discount: '34% OFF', views: '990', title: 'Maternity Comfort Set', price: '₹1,399', original: '₹2,099', category: 'Maternity', description: 'Ease, stretch, and elevated everyday support in one silhouette.', sizes: ['S', 'M', 'L'] },
  { id: 2, img: productCoOrd, discount: '40% OFF', views: '1.6k', title: 'Contour Co-ord Set', price: '₹1,799', original: '₹2,999', category: 'Office Wear', description: 'A polished co-ord set with refined structure.', sizes: ['S', 'M', 'L'] },
  { id: 3, img: productDress, discount: '30% OFF', views: '1.1k', title: 'Minimalist Dress', price: '₹1,599', original: '₹2,299', category: 'Vacation', description: 'Fluid silhouette for effortless day-to-night wear.', sizes: ['XS', 'S', 'M', 'L'] },
  { id: 4, img: productFestive, discount: '35% OFF', views: '2.0k', title: 'Festive Tunic Set', price: '₹1,499', original: '₹2,399', category: 'Festive', description: 'A luxe layering staple with rich texture.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, img: productClassic, discount: '45% OFF', views: '1.8k', title: 'Classic Kurtas', price: '₹1,099', original: '₹1,999', category: 'Daily Wear', description: 'Elevated comfort with premium finish and movement.', sizes: ['S', 'M', 'L'] },
  { id: 7, img: productDarkPink, discount: '38% OFF', views: '2.4k', title: 'Dark Pink Flared Kurta', price: '₹1,699', original: '₹2,799', category: 'Festive', description: 'An elegant festive silhouette designed for standout styling.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 8, img: productOrangeTunic, discount: '28% OFF', views: '1.8k', title: 'Orange Cotton Tunic', price: '₹1,250', original: '₹1,999', category: 'Daily Wear', description: 'Fresh, textural, and crafted for easy city-to-home dressing.', sizes: ['XS', 'S', 'M', 'L'] },
  { id: 9, img: productMustard, discount: '42% OFF', views: '2.1k', title: 'Mustard Kurta Set', price: '₹1,599', original: '₹2,699', category: 'New In', description: 'Warm tones, clean tailoring, and polished day-to-evening ease.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 10, img: productRustDress, discount: '33% OFF', views: '1.5k', title: 'Rust Printed Dress', price: '₹1,849', original: '₹2,799', category: 'Occasion', description: 'A richly textured printed dress with graceful drape.', sizes: ['S', 'M', 'L'] },
  { id: 11, img: productMagenta, discount: '36% OFF', views: '1.9k', title: 'Magenta Kurta Set', price: '₹1,799', original: '₹2,799', category: 'Sale', description: 'A bold yet refined statement set with premium finish.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 12, img: productOffWhite, discount: '29% OFF', views: '1.2k', title: 'Off-White Rayon Kurta', price: '₹1,450', original: '₹2,199', category: 'Workwear', description: 'Structured comfort for polished office-friendly styling.', sizes: ['S', 'M', 'L'] },
  { id: 13, img: productCoOrdTwo, discount: '26% OFF', views: '1.7k', title: 'Refined Co-ord Edit', price: '₹1,599', original: '₹2,149', category: 'Premium', description: 'A clean, premium two-piece edit for relaxed confidence.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 14, img: productXlaOne, discount: '41% OFF', views: '1.3k', title: 'Editorial Dress Story', price: '₹1,949', original: '₹3,199', category: 'New In', description: 'A luxe editorial-inspired dress meant for special moments.', sizes: ['XS', 'S', 'M', 'L'] },

]

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { img: instaPostOne, likes: '2.4k', comments: '146', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostTwo, likes: '3.1k', comments: '192', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostThree, likes: '2.8k', comments: '174', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostFour, likes: '1.9k', comments: '103', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostFive, likes: '2.7k', comments: '158', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostSix, likes: '4.2k', comments: '221', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostSeven, likes: '1.6k', comments: '88', href: 'https://www.instagram.com/janasyaclothing/' },
  { img: instaPostEight, likes: '2.0k', comments: '111', href: 'https://www.instagram.com/janasyaclothing/' },
]

export const NEW_ARRIVALS = PRODUCT_CATALOG.slice(0, 15)

export const TICKER_ITEMS = ['FREE SHIPPING ', '10% OFF FIRST ORDER', "SS'26 COLLECTION", 'EASY RETURNS']

export const FOOTER_SHOP = ["SS'26", 'Dresses', 'Tops & Tunic', 'Work Wear', 'Co-ord Sets', 'Maternity', 'Plus Size', 'Kurtas']

export const FOOTER_DISCOVER = ['About Us', 'Return/Exchange Portal', 'Blog', 'Contact', 'Track Your Order', 'Privacy Policy']

export const FOOTER_INFO = ['Shipping Policy', 'Return, Exchange & Refund Policy', 'Terms & Conditions', 'Privacy Policy']

export const NAV_ITEMS = ['NEW ARRIVALS', 'KURTAS', 'KURTA SETS', 'CO-ORDS', 'DRESSES', 'WORK WEAR', 'PLUS SIZE', 'MATERNITY', 'COLLECTIONS', 'SALE']

export const NAV_SECTION_IDS = [
  'new-arrivals',
  'kurtas',
  'kurta-sets',
  'co-ords',
  'dresses',
  'work-wear',
  'plus-size',
  'maternity',
  'collections',
  'sale',
]

export const SECTION_CATEGORY_MAP: Record<string, string | undefined> = {
  'new-arrivals': undefined,
  kurtas: 'Daily Wear',
  'kurta-sets': 'Festive',
  'co-ords': 'Office Wear',
  dresses: undefined,
  'work-wear': 'Workwear',
  'plus-size': 'Plus Size',
  maternity: 'Maternity',
  collections: undefined,
  sale: 'Sale',
}

export const FOOTER_SHOP_SECTION_MAP: Record<string, string> = {
  "SS'26": 'new-arrivals',
  Dresses: 'dresses',
  'Tops & Tunic': 'new-arrivals',
  'Work Wear': 'work-wear',
  'Co-ord Sets': 'co-ords',
  Maternity: 'maternity',
  'Plus Size': 'plus-size',
  Kurtas: 'kurtas',
}

export const SCROLL_SPY_SECTIONS = [
  'home',
  'new-arrivals',
  'kurtas',
  'kurta-sets',
  'co-ords',
  'dresses',
  'work-wear',
  'plus-size',
  'maternity',
  'collections',
  'sale',
]

export const FOOTER_SOCIALS = [
  { href: 'https://www.instagram.com/janasyaclothing/', image: instagramIcon, label: 'Instagram' },
  { href: 'https://www.facebook.com/janasyaclothing/', image: facebookIcon, label: 'Facebook' },
  { href: 'https://www.youtube.com/@janasyaclothing', image: youtubeIcon, label: 'YouTube' },
  { href: 'https://wa.me/917837796109', image: whatsappIcon, label: 'WhatsApp' },
]

export { whatsappIcon }

export const WHATSAPP_URL =
  'https://wa.me/917837796109?text=Hi%20Janasya%2C%20I%20would%20love%20to%20know%20more%20about%20your%20latest%20collections.'

export const INSTAGRAM_URL = 'https://www.instagram.com/janasyaclothing/'
