import { formatMoney } from '../lib/money.js'
import { ticketUnits } from '../lib/ticket.js'

// Solo se monta con la cuenta armada: el estado vacio vive en el llamador, que
// no renderiza nada mientras no haya lineas. Asi el papel nunca aparece en
// blanco con un "Vacio" al pie de un catalogo recien abierto.
export default function TicketSummary({
  lines,
  total,
  isClosing,
  registerSales,
  onClose,
  onCancel,
}) {
  const units = ticketUnits(lines)
  // Durante el envio no se toca nada: un segundo toque cerraria otra cuenta
  // con la misma lista.
  const isLocked = isClosing

  return (
    <section className="ticket-section">
      {/* El recuadro es el documento: encabezado, items con su subtotal y el
          total en la ultima linea. Los botones quedan afuera del papel porque
          no son parte de el, son lo que se hace con el. */}
      <article className="ticket" aria-label="Resumen del ticket">
        <header className="ticket-header">
          <h2 className="ticket-title">Ticket</h2>
          {/* Aviso permanente mientras el modo sin registro esta activo. El toast
              del cierre lo dice, pero si el cajero no lo lee, lo unico que
              queda para saber que esas ventas no van a existir es verlo aqui
              antes de cobrar. */}
          {!registerSales && <span className="ticket-offline-tag">Sin registrar</span>}
          <span className="ticket-count">
            {units} {units === 1 ? 'ítem' : 'ítems'}
          </span>
        </header>

        {/* El resumen no se edita: no tiene steppers ni vaciado. Solo mirror de
          lo que se fue tocando, para revisarlo antes de cobrar. */}
        <ul className="ticket-lines" aria-live="polite">
          {lines.map((line) => (
            <li className="ticket-line" key={line.productId}>
              <span className="ticket-line-qty">{line.qty}</span>
              <span className="ticket-line-name">{line.name}</span>
              <span className="ticket-line-amount">
                {formatMoney(line.price * line.qty)}
              </span>
            </li>
          ))}
        </ul>

        {/* Ultima linea del documento, y lo unico que hay que leer antes de
            cobrar. */}
        <div className="ticket-total">
          <span>Total</span>
          <strong>{formatMoney(total)}</strong>
        </div>
      </article>

      <div className="ticket-actions">
        <button
          type="button"
          className="button primary ticket-close-button"
          onClick={onClose}
          disabled={isLocked}
        >
          {isClosing ? 'Registrando…' : 'Cerrar cuenta'}
        </button>
        <button
          type="button"
          className="button secondary ticket-cancel-button"
          onClick={onCancel}
          disabled={isLocked}
        >
          Cancelar
        </button>
      </div>
    </section>
  )
}
