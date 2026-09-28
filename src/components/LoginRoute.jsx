import { Navigate } from 'react-router'
import { useAuthSession } from '../hooks/useAuthSession.js'
import { SESSION_STATUS } from '../lib/auth-context.js'
import LoginForm from './LoginForm.jsx'
import SessionLoading from './SessionLoading.jsx'

// /login es publica, pero si ya hay sesion no tiene sentido quedarse ahi. El
// rebote lo dispara el propio listener de Firebase, asi que no hace falta que
// el formulario le avise a nadie: el login correcto y el login fallido se
// distinguen solos.
export default function LoginRoute() {
  const { status } = useAuthSession()

  if (status === SESSION_STATUS.LOADING) {
    return <SessionLoading />
  }

  if (status === SESSION_STATUS.AUTHENTICATED) {
    return <Navigate to="/" replace />
  }

  return <LoginForm />
}
