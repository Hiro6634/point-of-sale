export const DEFAULT_TERMINAL_ID = 'TERM-001'

export const CATALOG_ROOT = import.meta.env.VITE_CATALOG_ROOT

if (!CATALOG_ROOT) {
  throw new Error(
    'Falta VITE_CATALOG_ROOT. Copiá .env.example a .env y completá el valor.',
  )
}

export const CATALOG_PRODUCTS_PATH = `${CATALOG_ROOT}/products`

export const CATALOG_CATEGORIES_PATH = `${CATALOG_ROOT}/categories`

// Las ventas cerradas se acumulan al lado del catalogo, bajo el mismo raiz, para
// que un ticket quede junto a los productos quedre partio y no en un arbol
// separado que hay que ir a buscar.
export const TICKETS_PATH = `${CATALOG_ROOT}/tickets`

export const STORAGE_KEYS = {
  terminalId: 'pos:terminalId',
  currentUser: 'pos:currentUser',
  registerSales: 'pos:registerSales',
  theme: 'pos:theme',
}