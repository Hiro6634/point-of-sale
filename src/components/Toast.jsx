import { useEffect } from 'react'
import { TOAST_TONE } from '../lib/toast.js'

const AUTO_DISMISS_MS = 4000

export default function Toast({ tone, message, detail, onDismiss }) {
  const isError = tone === TOAST_TONE.ERROR

  // El exito se va solo, que es lo que uno espera. El error no: si una venta no
  // quedo registrada, el aviso no puede desaparecer solo mientras el cajero
  // esta mirando el papel, asi que se queda hasta que lo cierre o hasta que
  // reintente.
  useEffect(() => {
    if (isError) return undefined
    const timer = window.setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [isError, onDismiss])

  return (
    <div
      // El error se anuncia con assertive porque hay que enterarse ya; el
      // exito con polite para no cortar lo que se esta leyendo.
      className={`toast toast--${tone}`}
      role={isError ? 'alert' : 'status'}
    >
      <div className="toast-content">
        <p className="toast-message">{message}</p>
        {detail && <p className="toast-detail">{detail}</p>}
      </div>
      <button
        type="button"
        className="toast-dismiss"
        onClick={onDismiss}
        aria-label="Cerrar aviso"
      >
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  )
}
