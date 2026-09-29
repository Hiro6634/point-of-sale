import { formatMoney } from '../lib/money.js'

export default function ProductList({ products, quantities, onAddProduct }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th scope="col">Descripción</th>
          <th scope="col">Precio</th>
          <th scope="col">Cant</th>
          <th scope="col">S.Total</th>
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
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
