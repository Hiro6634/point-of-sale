import { formatMoney } from '../lib/money.js'

function TrashIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  )
}

export default function ProductList({
  products,
  quantities,
  isLocked,
  onAddProduct,
  onRemoveProduct,
}) {
  return (
    // Durante el envio de un cierre el catalogo queda inerte. No es solo estetico:
    // es lo que permite que el ticket vuelva a cero sin perder un item, porque
    // mientras se guarda no se puede sumar ni sacar nada.
    <table
      className={`product-table${isLocked ? ' product-table--locked' : ''}`}
      aria-busy={isLocked || undefined}
    >
      <thead>
        <tr>
          <th scope="col">Descripción</th>
          <th scope="col">Precio</th>
          <th scope="col">Cant</th>
          <th scope="col">S.Total</th>
          <th scope="col" aria-label="Acciones" />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const qty = quantities.get(product.id) ?? 0

          return (
            <tr
              key={product.id}
              className={`product-row${qty > 0 ? ' product-row--in-ticket' : ''}`}
              style={{ '--group-color': product.categoryColor }}
            >
              <td className="product-name">
                {/* El boton es lo unico pulsable de la fila y su ::after se
                    estira a toda la fila, asi que un toque en cualquier columna
                    suma el producto. Sin esto el target seria solo el ancho del
                    nombre, que es la parte chica de la fila. Tocar de nuevo el
                    mismo producto le suma otra unidad a la misma fila. */}
                <button
                  type="button"
                  className="product-add"
                  onClick={() => onAddProduct(product)}
                  disabled={isLocked}
                  aria-label={
                    qty > 0
                      ? `Sumar una unidad de ${product.name} al ticket. Ya hay ${qty} en el ticket`
                      : `Agregar ${product.name} al ticket`
                  }
                >
                  {/* El nombre queda limpio a proposito: la cantidad de la
                      linea se lee en la columna Cant, y Prefijarla al nombre
                      seria mostrarla dos veces en la misma fila. */}
                  {product.name}
                </button>
              </td>
              <td className="product-price">{formatMoney(product.price)}</td>
              {/* Cant y S.Total son la foto de la linea dentro del ticket: que
                  cantidad lleva este producto y cuanto aporta al total. El
                  subtotal parcial es el precio por esa cantidad, no el total
                  del ticket. */}
              <td className="product-qty">{qty > 0 ? qty : ''}</td>
              <td className="product-amount">
                {qty > 0 ? formatMoney(product.price * qty) : ''}
              </td>
              <td className="product-remove-cell">
                {/* Fuera del boton que estira la fila, en su propia celda: si
                    compartiera celda el area tactil del alta se comeria el
                    click. Ver el z-index en .product-remove. */}
                <button
                  type="button"
                  className="product-remove"
                  onClick={() => onRemoveProduct(product)}
                  disabled={qty === 0 || isLocked}
                  aria-label={`Quitar ${product.name} de la cuenta`}
                  title="Quitar de la cuenta"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
