import { useEffect, useState } from 'react'
import { subscribeToAuthStateChange } from '../firebase/firebase.utils.js'
import { AuthContext, SESSION_STATUS } from '../lib/auth-context.js'

export default function AuthProvider({ children }) {
  const [session, setSession] = useState({
    status: SESSION_STATUS.LOADING,
    email: null,
  })

  useEffect(() => {
    // onAuthStateChanged dispara una vez apenas Firebase restaura la sesion
    // persistida, y despues en cada cambio. Es la unica fuente de verdad: el POS
    // no se dibuja contra un email cacheado en localStorage, porque un email
    // cacheado dice quien fue el ultimo que entro, no si la sesion sigue viva.
    return subscribeToAuthStateChange((user) => {
      setSession({
        status: user
          ? SESSION_STATUS.AUTHENTICATED
          : SESSION_STATUS.ANONYMOUS,
        email: user ? user.email : null,
      })
    })
  }, [])

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  )
}
