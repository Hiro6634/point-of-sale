import { useNavigate } from 'react-router'
import Settings from './Settings.jsx'

// /settings es una ruta protegida mas, no un modo de la pantalla del POS. Ahora
// que el historial de navegacion es real, un reload en /settings vuelve a caer
// aca: con la sesion verificada, y no con la sesion cacheada de ayer.
export default function SettingsView({ terminalId, onSave }) {
  const navigate = useNavigate()

  return (
    <Settings
      terminalId={terminalId}
      onSave={(id) => {
        onSave(id)
        navigate('/')
      }}
      onBack={() => navigate('/')}
    />
  )
}
