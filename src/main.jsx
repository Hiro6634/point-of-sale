import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* El router va arriba de todo para que /login y /settings sean URLs de
        verdad, y no un estado de React que se pierde al recargar. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      // Sin service worker no hay PWA instalable ni modo standalone. Casi siempre
      // es que se sirvio por HTTP: el registro solo funciona en contexto seguro.
      console.error('No se pudo registrar el service worker', error)
    })
  })
}
