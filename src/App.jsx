import { useEffect, useState } from 'react'
import CatalogState from './components/CatalogState.jsx'
import CloseAccount from './components/CloseAccount.jsx'
import LoginForm from './components/LoginForm.jsx'
import ProductList from './components/ProductList.jsx'
import Settings from './components/Settings.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import TicketSummary from './components/TicketSummary.jsx'
import { DEFAULT_TERMINAL_ID, STORAGE_KEYS } from './config.js'
import {
  signOutAuthUser,
  subscribeToAuthStateChange,
} from './firebase/firebase.utils.js'
import {
  CATALOG_STATUS,
  useCatalogSubscription,
} from './hooks/useCatalogSubscription.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useTheme } from './hooks/useTheme.js'
import { buildClosePayload } from './lib/closing.js'
import { listProductsByCategory } from './lib/catalog-list.js'
import { addProductToTicket, removeProductFromTicket, ticketTotal } from './lib/ticket.js'
import viteLogo from './assets/vite.svg'
import './App.css'

function GearIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.484.484 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.61 3.61 0 1 1 12 8.4a3.61 3.61 0 0 1 0 7.2z" />
    </svg>
  )
}

function App() {
  const [view, setView] = useState('pos')
  // products viene de Firestore y lo reescribe el snapshot en cada cambio.
  // ticket es de la sesion local: el cajero lo arma tocando y nadie mas lo toca.
  const [products, setProducts] = useState([])
  const [ticket, setTicket] = useState([])
  const [terminalId, setTerminalId] = useLocalStorage(
    STORAGE_KEYS.terminalId,
    DEFAULT_TERMINAL_ID,
  )
  const [closingPayload, setClosingPayload] = useState(null)
  const [currentUser, setCurrentUser] = useLocalStorage(
    STORAGE_KEYS.currentUser,
    null,
  )

  const { status, errorMessage, categories, retry } = useCatalogSubscription({
    enabled: Boolean(currentUser),
    onProducts: setProducts,
  })

  const { theme, toggleTheme } = useTheme()

  const visibleProducts = products.filter((product) => product.enabled)
  const catalogProducts = listProductsByCategory(visibleProducts, categories)
  const quantities = new Map(
    ticket.map((line) => [line.productId, line.qty]),
  )
  const total = ticketTotal(ticket)
  const isCatalogReady = status === CATALOG_STATUS.READY

  useEffect(() => {
    return subscribeToAuthStateChange((user) => {
      setCurrentUser(user ? user.email : null)
      setView('pos')
    })
  }, [setCurrentUser])

  function handleAddProduct(product) {
    setTicket((current) => addProductToTicket(current, product))
  }

  // Deja el item en cero y solo ese: el total sale de ticketTotal(ticket), asi
  // que se recalcula solo con la linea afuera, sin ningun estado que sincronizar.
  function handleRemoveProduct(product) {
    setTicket((current) => removeProductFromTicket(current, product.id))
  }

  function handleCloseAccount() {
    setClosingPayload(buildClosePayload({ terminalId, items: ticket, total }))
  }

  // Abandona la operacion entera. No hay forma de sacar un solo producto: la
  // unica salida de una cuenta es cobrarla o tirar todo.
  function handleCancel() {
    setTicket([])
  }

  function handleClosingDone() {
    setClosingPayload(null)
    setTicket([])
  }

  function handleSignIn(userOrEmail) {
    const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail.email
    setCurrentUser(email)
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
        <img
          className="topbar-logo"
          src={viteLogo}
          alt="Punto de Venta"
          title="Punto de Venta"
        />
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
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
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
        <div className="catalog">
          {isCatalogReady && visibleProducts.length > 0 && (
            <ProductList
              products={catalogProducts}
              quantities={quantities}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
            />
          )}

          <CatalogState
            status={status}
            errorMessage={errorMessage}
            isEmpty={isCatalogReady && visibleProducts.length === 0}
            hasHiddenItems={products.length > 0}
            onRetry={retry}
          />
        </div>

        {/* Va al final del listado y no esta anclado a proposito: el cajero
            baja hasta el final para revisar la cuenta antes de cobrar. */}
        <TicketSummary
          lines={ticket}
          total={total}
          onClose={handleCloseAccount}
          onCancel={handleCancel}
        />
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
