import { formatMoney } from '../lib/money.js'
import { ticketUnits } from '../lib/ticket.js'

export default function TicketSummary({ lines, total, onClose, onCancel }) {
  const units = ticketUnits(lines)
  const isEmpty = lines.length === 0

  return (
    <section className="ticket" aria-label="Resumen del ticket">
      <header className="ticket-header">
        <h2 className="ticket-title">Ticket</h2>
        <span className="ticket-count">
          {isEmpty ? 'Vacío' : `${units} ${units === 1 ? 'ítem' : 'ítems'}`}
        </span>
      </header>

      {/* El resumen no se edita: no tiene steppers ni vaciado. Solo mirror de
          lo que se fue tocando, para revisarlo antes de cobrar. */}
      <div className="ticket-body" aria-live="polite">
        {isEmpty ? (
          <p className="ticket-empty">Tocá un producto para sumarlo.</p>
        ) : (
          <ul className="ticket-lines">
            {lines.map((line) => (
              <li className="ticket-line" key={line.productId}>
                <span className="ticket-line-name">{line.name}</span>
                <span className="ticket-line-qty">{line.qty}</span>
                <span className="ticket-line-amount">
                  {formatMoney(line.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="ticket-total">
        <span>Total</span>
        <strong>{formatMoney(total)}</strong>
      </div>

      <div className="ticket-actions">
        <button
          type="button"
          className="button primary ticket-close-button"
          onClick={onClose}
          disabled={isEmpty}
        >
          Cerrar cuenta
        </button>
        <button
          type="button"
          className="button secondary ticket-cancel-button"
          onClick={onCancel}
          disabled={isEmpty}
        >
          Cancelar
        </button>
      </div>
    </section>
  )
}
