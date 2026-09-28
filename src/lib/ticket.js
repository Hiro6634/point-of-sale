// Una linea del ticket es una foto del producto en el momento en que se toco:
// { productId, name, price, qty }.
//
// Guardamos name/price en la linea a proposito y no los leemos del catalogo en
// cada render. Si el catalogo cambia mientras se esta armando la cuenta (un
// recargo, un producto que se deshabilita), la linea que ya esta en pantalla no
// debe mutar sola: el cajero confirmo ese precio al tocarlo.
//
// En esta instancia la cantidad es fija: tocar una linea la pone en 1 y no hay
// forma de bajarla. Todo lo que este en 1 o mas va al ticket, y como nada
// guarda cantidades en 0, con las lineas que hay alcanza para el total.

export function addProductToTicket(lines, product) {
  if (lines.some((line) => line.productId === product.id)) {
    return lines
  }

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

export function ticketUnits(lines) {
  return lines.reduce((units, line) => units + line.qty, 0)
}

export function ticketTotal(lines) {
  return lines.reduce((total, line) => total + line.price * line.qty, 0)
}
