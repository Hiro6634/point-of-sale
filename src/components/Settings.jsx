import { useState } from 'react'

export default function Settings({
  terminalId,
  registerSales,
  onSave,
  onRegisterSalesChange,
  onBack,
}) {
  const [draft, setDraft] = useState(terminalId)

  function handleSubmit(event) {
    event.preventDefault()
    const id = draft.trim()
    if (!id) return
    onSave(id)
  }

  return (
    <section className="panel">
      <header className="panel-header">
        <h1>Ajustes</h1>
        <button type="button" className="button secondary" onClick={onBack}>
          Volver
        </button>
      </header>

      <form className="settings-form" onSubmit={handleSubmit}>
        <label htmlFor="terminal-id">Identificador de terminal</label>
        <input
          id="terminal-id"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ej: TERM-001"
          maxLength={20}
          required
        />
        <p className="hint">
          Se asocia a cada venta y viaja en el cierre de cuenta.
        </p>
        <button type="submit" className="button primary">
          Guardar
        </button>
      </form>

      {/* Sin form y sin boton: el toggle se guarda solo al cambiarlo, que es lo
          que uno espera de un interruptor. */}
      <div className="settings-section">
        <h2>Registro de ventas</h2>
        <label className="settings-toggle" htmlFor="register-sales">
          <input
            id="register-sales"
            type="checkbox"
            checked={registerSales}
            onChange={(event) => onRegisterSalesChange(event.target.checked)}
          />
          <span>Registrar ventas en Firestore</span>
        </label>
        <p className="hint">
          Apagado, la cuenta se cierra igual y el ticket queda vacío, pero no se
          guarda nada en Firestore. Para vender sin conexión o cuando la base no
          responde.
        </p>
      </div>

      <footer className="settings-footer">Versión {__APP_VERSION__}</footer>
    </section>
  )
}