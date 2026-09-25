export const CATALOG_ERROR_FALLBACK =
  'No se pudo cargar el catálogo. Intentá de nuevo.'

export const CATALOG_ERROR_MESSAGES = {
  'permission-denied': 'No tenés permisos para leer el catálogo.',
  unauthenticated: 'Tu sesión venció. Volvé a iniciar sesión.',
  unavailable:
    'No pudimos conectar con la base de datos. Revisá tu conexión a internet.',
  'deadline-exceeded': 'La consulta tardó demasiado. Intentá de nuevo.',
  'not-found': 'No se encontró el catálogo configurado.',
  'failed-precondition':
    'El catálogo no está disponible en este momento. Intentá en un rato.',
}
