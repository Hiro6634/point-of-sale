export const CLOSING_ERROR_FALLBACK =
  'No se pudo registrar la venta. Intentá de nuevo.'

export const CLOSING_ERROR_MESSAGES = {
  'permission-denied': 'Tu usuario no tiene permiso para registrar ventas.',
  unauthenticated: 'Tu sesión venció. Volvé a iniciar sesión.',
  unavailable:
    'No pudimos conectar con la base de datos. Revisá tu conexión a internet.',
  'deadline-exceeded': 'El registro tardó demasiado. Intentá de nuevo.',
  'failed-precondition': 'No se puede registrar la venta en este momento.',
}

// El error de red de un ticket ya cobrado es el peor caso posible: el cajero
// tiene el dinero y la mercaderia, pero no quedo registro. Por eso el mensaje
// no dice "volve a intentar" a secas, dice que la venta no quedo registrada
// para que el cajero llame antes de cobrar de nuevo.
export const CLOSING_ERROR_UNCONFIRMED =
  'La venta NO quedó registrada. Anotá el total y avisá antes de cobrar de nuevo.'

// Se separa del caso de red de Firestore porque aca no se intento escribir: el
// dispositivo ya sabia que estaba sin conexion y se corto antes, asi que no
// hay nada encolado que pueda aparecer despues.
export const CLOSING_ERROR_OFFLINE =
  'Sin conexión: la venta no se envió. Reintentá cuando vuelvas a tener señal.'
