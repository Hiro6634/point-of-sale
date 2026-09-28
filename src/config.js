export const DEFAULT_TERMINAL_ID = 'TERM-001'

export const CATALOG_ROOT = import.meta.env.VITE_CATALOG_ROOT

if (!CATALOG_ROOT) {
  throw new Error(
    'Falta VITE_CATALOG_ROOT. Copiá .env.example a .env y completá el valor.',
  )
}

export const CATALOG_PRODUCTS_PATH = `${CATALOG_ROOT}/products`

export const CATALOG_CATEGORIES_PATH = `${CATALOG_ROOT}/categories`

export const STORAGE_KEYS = {
  terminalId: 'pos:terminalId',
  theme: 'pos:theme',
}