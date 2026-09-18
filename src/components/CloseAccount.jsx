import { useState } from 'react'

export default function CloseAccount({ payload, onCancel, onClosed }) {
  const [status, setStatus] = useState('idle')

  function handleSubmit() {
    setStatus('sending')
    window.setTimeout(() => {
      console.info('close account payload', payload)
      setStatus('sent')
    }, 600)
  }

  return (
    <div
      className="modal-backdrop"
      onClick={status === 'idle' ? onCancel : undefined}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-label="Cierre de cuenta">
        <header>
          <h2>Cierre de cuenta</h2>
          <span className="terminal-chip">Terminal: {payload.terminalId}</span>
        </header>

        <pre className="payload">{JSON.stringify(payload, null, 2)}</pre>

        {status === 'sent' && (
          <p className="status-success">Cierre enviado correctamente.</p>
        )}

        <footer>
          {status === 'idle' && (
            <button type="button" className="button secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
          {status === 'idle' && (
            <button type="button" className="button primary" onClick={handleSubmit}>
              Enviar cierre
            </button>
          )}
          {status !== 'idle' && (
            <button type="button" className="button primary" onClick={onClosed} disabled={status === 'sending'}>
              Cerrar
            </button>
          )}
        </footer>
      </section>
    </div>
  )
}