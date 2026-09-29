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

export function ticketUnits(lines) {
  return lines.reduce((units, line) => units + line.qty, 0)
}

export function ticketTotal(lines) {
  return lines.reduce((total, line) => total + line.price * line.qty, 0)
}
