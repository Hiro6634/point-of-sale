import { useState } from 'react'

export default function Settings({ terminalId, onSave, onBack }) {
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
    </section>
  )
}