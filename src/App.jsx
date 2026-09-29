import { useCallback, useEffect, useState } from 'react'
import CatalogState from './components/CatalogState.jsx'
import LoginForm from './components/LoginForm.jsx'
import ProductList from './components/ProductList.jsx'
import Settings from './components/Settings.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import TicketSummary from './components/TicketSummary.jsx'
import Toast from './components/Toast.jsx'
import { DEFAULT_TERMINAL_ID, STORAGE_KEYS } from './config.js'
import {
  signOutAuthUser,
  subscribeToAuthStateChange,
} from './firebase/firebase.utils.js'
import { saveClosedTicket, WRITE_ERRORS } from './firebase/tickets.js'
import {
  CATALOG_STATUS,
  useCatalogSubscription,
} from './hooks/useCatalogSubscription.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useTheme } from './hooks/useTheme.js'
import { buildClosePayload } from './lib/closing.js'
import {
  CLOSING_ERROR_FALLBACK,
  CLOSING_ERROR_MESSAGES,
  CLOSING_ERROR_OFFLINE,
  CLOSING_ERROR_UNCONFIRMED,
} from './lib/closing-errors.js'
import { listProductsByCategory } from './lib/catalog-list.js'
import { addProductToTicket, removeProductFromTicket, ticketTotal } from './lib/ticket.js'
import { TOAST_TONE } from './lib/toast.js'
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
  const [currentUser, setCurrentUser] = useLocalStorage(
    STORAGE_KEYS.currentUser,
    null,
  )
  // Por defecto se registran las ventas. El modo sin envio es una decision
  // consciente del cajero, no el estado inicial: una caja que arranca sin
  // querer en modo sin registro venderia sin dejar rastro.
  const [registerSales, setRegisterSales] = useLocalStorage(
    STORAGE_KEYS.registerSales,
    true,
  )
  const [isClosing, setIsClosing] = useState(false)
  const [toast, setToast] = useState(null)

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

  // El id hace que dos avisos seguidos con el mismo texto se rendericen como
  // dos toasts distintos y el de exito reinicie su cuenta regresiva.
  const showToast = useCallback((tone, message, detail) => {
    setToast({ id: Date.now(), tone, message, detail })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

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

  // Cierra la cuenta y la registra en el acto: sin modal de confirmacion, un
  // toque y sale. El ticket se vacia recien cuando la escritura llego, no antes.
  async function handleCloseAccount() {
    if (isClosing) return

    const payload = buildClosePayload({ terminalId, items: ticket, total })

    // Modo sin envio: la cuenta se cierra igual, pero no queda registro. El
    // aviso NO dice "registrada" porque no lo esta, y el cajero tiene que
    // saber que esa venta no existe para nadie.
    if (!registerSales) {
      setTicket([])
      showToast(TOAST_TONE.SUCCESS, 'Ticket cerrado sin registrar.')
      return
    }

    const sentIds = new Set(ticket.map((line) => line.productId))
    setIsClosing(true)
    try {
      await saveClosedTicket(payload)
      // Se saca del ticket solo lo que se mando, no todo el ticket. Si el
      // cajero toco un producto mientras escribia, ese se queda: limpiar todo
      // a posteriori le borraria un item de la cara.
      setTicket((current) => current.filter((line) => !sentIds.has(line.productId)))
      showToast(TOAST_TONE.SUCCESS, 'Venta registrada.')
    } catch (error) {
      console.error('Error registrando la venta', error)
      // El ticket NO se toca. Queda abierto para reintentar con "Cerrar cuenta"
      // o descartar con "Cancelar", sin tener que armar la cuenta de nuevo.
      //
      // Sin conexion declarada se corta antes de escribir, asi que no hay nada
      // encolado y el reintento es limpio. El timeout es distinto: la escritura
      // pudo quedar encolada y aparecer mas tarde, asi que el aviso de venta no
      // confirmada sigue siendo obligatorio.
      if (error?.code === WRITE_ERRORS.OFFLINE) {
        showToast(TOAST_TONE.ERROR, CLOSING_ERROR_OFFLINE)
      } else {
        showToast(
          TOAST_TONE.ERROR,
          CLOSING_ERROR_MESSAGES[error?.code] ?? CLOSING_ERROR_FALLBACK,
          CLOSING_ERROR_UNCONFIRMED,
        )
      }
    } finally {
      setIsClosing(false)
    }
  }

  // Abandona la operacion entera. No hay forma de sacar un solo producto: la
  // unica salida de una cuenta es cobrarla o tirar todo.
  function handleCancel() {
    setTicket([])
    dismissToast()
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
        registerSales={registerSales}
        onSave={(id) => {
          setTerminalId(id)
          setView('pos')
        }}
        onRegisterSalesChange={setRegisterSales}
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

        {/* Solo aparece con la cuenta armada. Mientras esta vacio no hay nada
            que revisar ni cobrar, asi que el bloque entero se va y el catalogo
            ocupa el lugar. Va al final del listado y no esta anclado a
            proposito: el cajero baja hasta el final para revisar la cuenta
            antes de cobrar. */}
        {ticket.length > 0 && (
          <TicketSummary
            lines={ticket}
            total={total}
            isClosing={isClosing}
            registerSales={registerSales}
            onClose={handleCloseAccount}
            onCancel={handleCancel}
          />
        )}
      </main>

      {/* El aviso va suelto, arriba del todo y por encima de todo, porque el
          resultado del cierre importa al instante y no puede quedar escondido
          detras del catalogo. */}
      {toast && (
        <Toast
          key={toast.id}
          tone={toast.tone}
          message={toast.message}
          detail={toast.detail}
          onDismiss={dismissToast}
        />
      )}
    </section>
  )
}

export default App
