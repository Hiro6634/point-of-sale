export const UNCATEGORIZED_NAME = 'Sin categoría'

export const FALLBACK_GROUP_COLOR = '#7c7c86'

function byName(a, b) {
  return a.localeCompare(b, 'es', { sensitivity: 'base' })
}

// El listado del POS es plano: una sola grilla de tiles, sin un titulo por
// categoria. El agrupado no desaparece, pasa a ser invisible: los productos de
// una misma categoria salen pegados y comparten color de fondo, asi que el
// cajero igual los lee como un bloque, pero la pantalla no se parte en
// secciones. Por eso la funcion devuelve una lista y no un arbol de grupos.
export function listProductsByCategory(products, categories = []) {
  const categoriesById = new Map(
    categories.map((category) => [category.id, category]),
  )
  const byCategory = new Map()

  for (const product of products) {
    const category = categoriesById.get(product.categoryId)
    const key = category?.id ?? UNCATEGORIZED_NAME

    if (!byCategory.has(key)) {
      byCategory.set(key, {
        label: category?.name?.trim() || UNCATEGORIZED_NAME,
        color: category?.color || FALLBACK_GROUP_COLOR,
        products: [],
      })
    }

    byCategory.get(key).products.push(product)
  }

  return [...byCategory.values()]
    .sort((a, b) => byName(a.label, b.label))
    .flatMap((category) =>
      category.products
        .sort((a, b) => byName(a.name ?? '', b.name ?? ''))
        .map((product) => ({ ...product, categoryColor: category.color })),
    )
}
