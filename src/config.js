export const DEFAULT_TERMINAL_ID = 'TERM-001'

export const CATALOG_ROOT = import.meta.env.VITE_CATALOG_ROOT ?? 'env/dev'

export const CATALOG_PRODUCTS_PATH = `${CATALOG_ROOT}/products`

export const CATALOG_CATEGORIES_PATH = `${CATALOG_ROOT}/categories`

export const STORAGE_KEYS = {
  terminalId: 'pos:terminalId',
  currentUser: 'pos:currentUser',
  theme: 'pos:theme',
}