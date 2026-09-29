// Cierre de cuenta. Lo que se guarda es exactamente lo que la caja mostro en
// pantalla: los importes van planos, sin la coma ni el signo de la moneda, y el
// subtotal se calcula y se persiste. Calcularlo en el momento del cierre y no
// derivarlo al leer es a proposito: si mañana se toca la regla de una venta, los
// tickets viejos tienen que seguir mostrando lo que se cobro ese dia.

export function buildClosePayload({ terminalId, items, total }) {
  return {
    terminalId,
    closedAt: new Date().toISOString(),
    items,
    total,
  }
}

// El ticket local guarda lineas { productId, name, price, qty }. El documento de
// la venta guarda cada item YA aplananado, con su subtotal explicito, que es lo
// que va a leer un reporte o una conciliacion despues.
export function toTicketDocument(payload) {
  const items = payload.items.map((line) => ({
    productId: line.productId,
    name: line.name,
    price: line.price,
    qty: line.qty,
    subtotal: line.price * line.qty,
  }))

  return {
    terminalId: payload.terminalId,
    // Firestore pone su propio createdAt al crear el documento y es el que
    // ordena las ventas en la consola. closedAt se guarda ademas porque es la
    // hora de caja: con la zona horaria del servidor, un ticket de la 23:30 se
    // puede fechar al dia siguiente.
    closedAt: payload.closedAt,
    items,
    itemCount: items.length,
    units: items.reduce((sum, item) => sum + item.qty, 0),
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
  }
}
