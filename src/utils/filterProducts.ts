import type { Product } from '@/types'

export function filterProducts(
  catalog: Product[],
  searchTerm: string,
  categoryFilter?: string,
): Product[] {
  let results = catalog

  if (categoryFilter) {
    results = results.filter(
      (product) => product.category.toLowerCase() === categoryFilter.toLowerCase(),
    )
  }

  const keyword = searchTerm.trim().toLowerCase()
  if (keyword) {
    results = results.filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword),
    )
  }

  return results
}
