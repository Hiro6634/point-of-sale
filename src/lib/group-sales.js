export const UNCATEGORIZED_NAME = 'Sin categoría'

export const FALLBACK_GROUP_COLOR = '#7c7c86'

function byName(a, b) {
  return a.localeCompare(b, 'es', { sensitivity: 'base' })
}

export function groupSalesByCategory(sales, categories = []) {
  const categoriesById = new Map(
    categories.map((category) => [category.id, category]),
  )
  const groups = new Map()

  for (const sale of sales) {
    const category = categoriesById.get(sale.categoryId)
    const key = category?.id ?? UNCATEGORIZED_NAME

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: category?.name?.trim() || UNCATEGORIZED_NAME,
        color: category?.color || FALLBACK_GROUP_COLOR,
        items: [],
      })
    }

    groups.get(key).items.push(sale)
  }

  return [...groups.values()]
    .sort((a, b) => byName(a.label, b.label))
    .map((group) => ({
      ...group,
      items: group.items.sort((a, b) => byName(a.name ?? '', b.name ?? '')),
    }))
}
