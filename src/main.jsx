import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
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
