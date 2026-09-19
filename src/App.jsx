import { useEffect, useState } from 'react'
import CloseAccount from './components/CloseAccount.jsx'
import LoginForm from './components/LoginForm.jsx'
import Settings from './components/Settings.jsx'
import { DEFAULT_TERMINAL_ID, STORAGE_KEYS } from './config.js'
import {
  signOutAuthUser,
  subscribeToAuthStateChange,
} from './firebase/firebase.utils.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { buildClosePayload } from './lib/closing.js'
import './App.css'

const INITIAL_SALES = [
  { id: 1, name: 'CafÃ©', price: 1200, qty: 2 },
  { id: 2, name: 'SÃ¡ndwich', price: 2500, qty: 1 },
  { id: 3, name: 'Jugo natural', price: 1800, qty: 3 },
]

function GearIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.484.484 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.61 3.61 0 1 1 12 8.4a3.61 3.61 0 0 1 0 7.2z" />
    </svg>
  )
}

function App() {
  const [view, setView] = useState('pos')
  const [sales, setSales] = useState(INITIAL_SALES)
  const [terminalId, setTerminalId] = useLocalStorage(
    STORAGE_KEYS.terminalId,
    DEFAULT_TERMINAL_ID,
  )
  const [closingPayload, setClosingPayload] = useState(null)
  const [currentUser, setCurrentUser] = useLocalStorage(
    STORAGE_KEYS.currentUser,
    null,
  )

  const total = sales.reduce((sum, sale) => sum + sale.price * sale.qty, 0)

  useEffect(() => {
    return subscribeToAuthStateChange((user) => {
      setCurrentUser(user ? user.email : null)
      setView('pos')
    })
  }, [setCurrentUser])

  function handleCloseAccount() {
    setClosingPayload(buildClosePayload({ terminalId, items: sales, total }))
  }

  function handleClosingDone() {
    setClosingPayload(null)
    setSales([])
  }

  function handleSignIn(userOrEmail) {
    const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail.email
    setCurrentUser(email)
    setOpenAccountModal(false)
    setView('pos')
  }

  async function handleSignOut() {
    try {
      await signOutAuthUser()
    } catch {
      // Si Firebase no responde, igual limpiamos la sesión local
    } finally {
      setCurrentUser(null)
      setView('pos')
    }
  }

  if (!currentUser) {
    return <LoginForm onSignIn={handleSignIn} />
  }

  if (view === 'settings') {
    return (
      <Settings
        terminalId={terminalId}
        onSave={(id) => {
          setTerminalId(id)
          setView('pos')
        }}
        onBack={() => setView('pos')}
      />
    )
  }

  return (
    <section className="pos-app">
      <header className="topbar">
        <h1>Punto de Venta</h1>
        <div className="topbar-actions">
          <span className="terminal-chip" title="Terminal activo">
            Terminal: {terminalId}
          </span>
          <button
            type="button"
            className="button secondary"
            onClick={handleSignOut}
          >
            Salir
          </button>
          <button
            type="button"
            className="button icon-button"
            aria-label="Ajustes"
            title="Ajustes"
            onClick={() => setView('settings')}
          >
            <GearIcon />
          </button>
        </div>
      </header>

      <main className="sales-view">
        <h2>Ventas del dÃ­a</h2>
        <ul className="sales-list">
          {sales.map((sale) => (
            <li key={sale.id} className="sale-row">
              <span className="sale-name">{sale.name}</span>
              <span className="sale-qty">
                {sale.qty} Ã— {sale.price}
              </span>
              <span className="sale-amount">{sale.price * sale.qty}</span>
            </li>
          ))}
        </ul>

        {sales.length === 0 && <p className="empty">Sin ventas registradas.</p>}

        <footer className="totals">
          <span>Total</span>
          <strong>{total}</strong>
        </footer>

        <button
          type="button"
          className="button primary close-button"
          onClick={handleCloseAccount}
          disabled={sales.length === 0}
        >
          Cerrar cuenta
        </button>
      </main>

      {closingPayload && (
        <CloseAccount
          payload={closingPayload}
          onCancel={() => setClosingPayload(null)}
          onClosed={handleClosingDone}
        />
      )}
    </section>
  )
}

export default App
