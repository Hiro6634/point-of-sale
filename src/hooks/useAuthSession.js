import { useContext } from 'react'
import { AuthContext, SESSION_STATUS } from '../lib/auth-context.js'

export function useAuthSession() {
  const session = useContext(AuthContext)

  if (!session) {
    throw new Error('useAuthSession se uso fuera de <AuthProvider>.')
  }

  return {
    ...session,
    isAuthenticated: session.status === SESSION_STATUS.AUTHENTICATED,
  }
}
