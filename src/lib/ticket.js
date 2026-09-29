// Una linea del ticket es una foto del producto en el momento en que se toco:
// { productId, name, price, qty }.
//
// Guardamos name/price en la linea a proposito y no los leemos del catalogo en
// cada render. Si el catalogo cambia mientras se esta armando la cuenta (un
// recargo, un producto que se deshabilita), la linea que ya esta en pantalla no
// debe mutar sola: el cajero confirmo ese precio al tocarlo.
//
// Tocar es sumar una unidad. Si la linea ya existe se le incrementa la
// cantidad en 1 y no se abre una fila nueva: dos toques sobre el mismo producto
// dan una sola linea con qty 2, no dos lineas con qty 1. Una linea por producto
// es lo que hace util la tabla, porque el total se lee linea por linea.
//
// Al incrementar no se releen name ni price del catalogo, por la misma razon de
// arriba: el cajero confirmo ese precio la primera vez que toco.
//
// La cantidad solo sube. No hay forma de bajarla, asi que un toque de mas se
// corrige con Cancelar, que tira la operacion entera.

export function addProductToTicket(lines, product) {
  const index = lines.findIndex((line) => line.productId === product.id)

  if (index === -1) {
    return [
      ...lines,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
      },
    ]
  }

  return lines.map((line, i) =>
    i === index ? { ...line, qty: line.qty + 1 } : line,
  )
}

// Poner la cuenta a cero de un item es sacarlo del ticket: la linea desaparece
// y la fila del catalogo vuelve a su estado de "no esta en la cuenta". Es la
// unica operacion que toca una sola linea, el resto de la cuenta queda como
// estaba. Por eso el boton va en la fila del catalogo y no en el ticket, que es
// de solo lectura.
export function removeProductFromTicket(lines, productId) {
  return lines.filter((line) => line.productId !== productId)
}

export function ticketUnits(lines) {
  return lines.reduce((units, line) => units + line.qty, 0)
}

export function ticketTotal(lines) {
  return lines.reduce((total, line) => total + line.price * line.qty, 0)
}
