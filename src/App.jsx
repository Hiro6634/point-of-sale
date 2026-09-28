import { Navigate, Route, Routes } from 'react-router'
import AuthProvider from './components/AuthProvider.jsx'
import LoginRoute from './components/LoginRoute.jsx'
import PosView from './components/PosView.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import SettingsView from './components/SettingsView.jsx'
import { DEFAULT_TERMINAL_ID, STORAGE_KEYS } from './config.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import './App.css'

function App() {
  // El terminal vive arriba de las rutas porque lo escribe Ajustes y lo lee el
  // POS. Si cada ruta lo leyera por su cuenta, guardar en Ajustes no actualizaria
  // el chip del POS hasta recargar la pagina.
  const [terminalId, setTerminalId] = useLocalStorage(
    STORAGE_KEYS.terminalId,
    DEFAULT_TERMINAL_ID,
  )

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />

        {/* Todo lo de abajo cuelga de RequireAuth. Una sola puerta: agregar una
            ruta nueva es envolverla aca y ya no puede quedar abierta. */}
        <Route element={<RequireAuth />}>
          <Route
            path="/"
            element={<PosView terminalId={terminalId} />}
          />
          <Route
            path="/settings"
            element={
              <SettingsView
                terminalId={terminalId}
                onSave={setTerminalId}
              />
            }
          />
          {/* Cualquier URL desconocida se resuelve antes de decidir auth: sin
              sesion va a /login igual, y con sesion vuelve al POS. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
