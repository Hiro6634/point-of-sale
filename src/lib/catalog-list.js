export const UNCATEGORIZED_NAME = 'Sin categoría'

export const FALLBACK_GROUP_COLOR = '#7c7c86'

function byName(a, b) {
  return a.localeCompare(b, 'es', { sensitivity: 'base' })
}

// El campo category de los productos se carga a mano en la consola de
// Firestore, asi que llega con diferencias de mayusculas y espacios: CERVEZA
// tiene "BEBIDAS" y el documento de la categoria se llama "bebidas". Con una
// busqueda exacta esas filas no encontraban su categoria y caian en "Sin
// categoria", quedar con el gris de respaldo y perder el color. Normalizar
// antes de comparar hace que el color no dependa de como se escribio el dato.
function normalize(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

// El listado del POS es plano: una sola grilla de filas, sin un titulo por
// categoria. El agrupado no desaparece, pasa a ser invisible: los productos de
// una misma categoria salen pegados y comparten color de fondo, asi que el
// cajero igual los lee como un bloque, pero la pantalla no se parte en
// secciones. Por eso la funcion devuelve una lista y no un arbol de grupos.
export function listProductsByCategory(products, categories = []) {
  // Un indice por id y por nombre, los dos normalizados, para que el producto
  // enlace contra la categoria este este donde este escrita. Con los datos
  // actuales id y name coinciden, pero no hacen falta iguales para que ande.
  const categoriesByKey = new Map()
  for (const category of categories) {
    for (const key of [normalize(category.id), normalize(category.name)]) {
      if (key) categoriesByKey.set(key, category)
    }
  }

  const byCategory = new Map()

  for (const product of products) {
    const category = categoriesByKey.get(normalize(product.category)) ?? null
    const key = category ? `id:${category.id}` : UNCATEGORIZED_NAME

    if (!byCategory.has(key)) {
      byCategory.set(key, {
        label: category?.name?.trim() || UNCATEGORIZED_NAME,
        color: category?.color || FALLBACK_GROUP_COLOR,
        order: category?.order ?? null,
        products: [],
      })
    }

    byCategory.get(key).products.push(product)
  }

  return [...byCategory.values()]
    .sort((a, b) => {
      // El orden lo manda el backend con su campo order. Las categorias que no
      // lo tienen van al final, y en cualquier empate se desempata por nombre
      // para que la lista no se reordene sola entre snapshots.
      if (a.order !== b.order) {
        if (a.order === null) return 1
        if (b.order === null) return -1
        return a.order - b.order
      }
      return byName(a.label, b.label)
    })
    .flatMap((category) =>
      category.products
        .sort((a, b) => byName(a.name ?? '', b.name ?? ''))
        .map((product) => ({ ...product, categoryColor: category.color })),
    )
}
