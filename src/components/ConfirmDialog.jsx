import { useEffect, useRef } from 'react'

// Dialogo de confirmacion. Vive aca y no en cada pantalla porque el patron
// "una accion destructiva pide confirmacion" se va a repetir.
//
// No hay createPortal: el overlay es fixed y el TicketSummary no tiene
// transform ni overflow escondido, asi que el fixed alcanza para tapar la
// pantalla entera sin portal.
export default function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Volver',
  tone = 'danger',
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null)

  useEffect(() => {
    confirmRef.current?.focus()
  }, [])

  // Escape cierra. El foco arranca en Confirmar y no en Cancelar a proposito:
  // el dialogo aparece por una accion dudosa, Enter tiene que ser el camino
  // corto, y un segundo Enter seguido sin querer no deberia cobrar la cuenta.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div
      className="confirm-overlay"
      // Tocar el fondo cierra, igual que tocar el fondo de cualquier dialogo.
      // El boton de cancelar esta explicitamente ahi por si no se cae en eso.
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <div
        className="confirm"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
      >
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-description">{description}</p>

        <div className="confirm-actions">
          <button
            type="button"
            className="button secondary confirm-cancel"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmRef}
            className={`button confirm-confirm confirm-confirm--${tone}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
