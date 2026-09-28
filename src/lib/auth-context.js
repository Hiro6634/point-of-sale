import { createContext } from 'react'

// LOADING no es lo mismo que ANONYMOUS, y la diferencia es toda la historia de
// esta puerta: hasta que Firebase no responde no sabemos si hay sesion o no.
// Si arrancamos en ANONYMOUS mandamos a /login a un cajero que si la tiene y
// que solo tardo un instante en restaurarse.
export const SESSION_STATUS = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  ANONYMOUS: 'anonymous',
}

// Un solo objeto de sesion para toda la app. Si cada componente que la necesita
// se suscribiera por su cuenta al listener de Firebase, cada uno tendria su
// propio estado de carga y podrian discrepar en un mismo render.
export const AuthContext = createContext(null)
