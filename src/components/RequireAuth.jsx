import { Navigate, Outlet } from 'react-router'
import { useAuthSession } from '../hooks/useAuthSession.js'
import { SESSION_STATUS } from '../lib/auth-context.js'
import SessionLoading from './SessionLoading.jsx'

// La puerta unica de las rutas protegidas. Todo lo que cuelgue de este Outlet
// queda con sesion obligatoria, y no se puede saltar entrando por URL: la
// redireccion vive en el render, no en un click.
export default function RequireAuth() {
  const { status } = useAuthSession()

  if (status === SESSION_STATUS.LOADING) {
    return <SessionLoading />
  }

  if (status === SESSION_STATUS.ANONYMOUS) {
    // replace para que el boton atras no devuelva al POS: en el historial queda
    // /login, no una entrada protegida a la que volver.
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
