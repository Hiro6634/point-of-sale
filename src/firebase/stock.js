import { doc, increment, writeBatch } from 'firebase/firestore'
import { CATALOG_PRODUCTS_PATH } from '../config.js'
import { db } from './firebase.utils.js'

// Descuenta el stock de lo vendido con increment(), que se aplica en el servidor
// de forma atomica. La alternativa obvia, leer el stock, restar y escribir el
// valor, pierde actualizaciones: dos cajas que venden lo mismo al mismo tiempo
// parten del mismo numero y la segunda pisa a la primera.
//
// Un solo lote por venta: varias lineas, una sola ida y vuelta y un solo punto
// de falla en vez de uno por producto. El precio y la venta ya estan guardados
// para cuando esto se ejecute, asi que un error aqui no es una venta perdida.
export function decrementStock(items) {
  if (items.length === 0) return Promise.resolve()

  const batch = writeBatch(db)
  for (const item of items) {
    batch.update(doc(db, CATALOG_PRODUCTS_PATH, item.productId), {
      stock: increment(-item.qty),
    })
  }
  return batch.commit()
}
