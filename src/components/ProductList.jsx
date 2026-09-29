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
                    mismo producto lo deja en 1: no hay forma de subirlo. */}
                <button
                  type="button"
                  className="product-add"
                  onClick={() => onAddProduct(product)}
                  aria-label={
                    qty > 0
                      ? `Agregar ${product.name} al ticket. Ya agregados: ${qty}`
                      : `Agregar ${product.name} al ticket`
                  }
                >
                  {product.name}
                </button>
              </td>
              <td className="product-price">{formatMoney(product.price)}</td>
              {/* Cant y S.Total son la foto de la linea dentro del ticket: lo
                  que este producto ya aporta a la cuenta. */}
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
