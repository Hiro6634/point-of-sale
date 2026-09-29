import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { TICKETS_PATH } from '../config.js'
import { toTicketDocument } from '../lib/closing.js'
import { createTicketId } from '../lib/ticket-id.js'
import { withTimeout } from '../lib/timeout.js'
import { db } from './firebase.utils.js'

const ticketsCollection = collection(db, TICKETS_PATH)

// Margen para una red lenta pero viva. Alto a proposito: un timeout corto
// declararia caída una venta que si sale, y el reintento del cajero la
// registraria dos veces.
const WRITE_TIMEOUT_MS =
  Number(import.meta.env.VITE_WRITE_TIMEOUT_MS) || 15_000

export const WRITE_ERRORS = {
  OFFLINE: 'app/offline',
  TIMEOUT: 'app/write-timeout',
}

function taggedError(code, message) {
  const error = new Error(message)
  error.code = code
  return error
}

// Resuelve con el id del documento creado, para confirmar cual venta quedo
// registrada. Rechaza con el error de Firestore tal cual o con uno propio
// marcado por code, y el presentador traduce igual.
export function saveClosedTicket(payload) {
  // Corta en seco sin red declarada, en vez de esperar el timeout. Asi el
  // aviso es inmediato en el caso mas comun y no llega a encolarse nada.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return Promise.reject(
      taggedError(WRITE_ERRORS.OFFLINE, 'El dispositivo no tiene conexion.'),
    )
  }

  // El id sale del closedAt del propio payload y no de un new Date() suelto, para
  // que el numero de ticket y el campo closedAt cuenten el mismo instante. Si
  // se generaran por separado, un id y una fecha pueden discrepar por un
  // segundo y la trazabilidad deja de servir.
  const ticketId = createTicketId(new Date(payload.closedAt))

  // setDoc con id propio y no addDoc, que genera ids automaticos opacos.
  const ref = doc(ticketsCollection, ticketId)
  const write = setDoc(ref, {
    ...toTicketDocument(payload),
    // Se repite como campo ademas de estar en el id: permite buscar por numero
    // de ticket y que aparezca en los exports, sin tener que reconstruir el
    // path de la coleccion.
    ticketId,
    // createdAt lo pone el servidor, no el reloj del navegador: la terminal
    // puede tener la hora corrida y asi las ventas quedan ordenadas igual.
    createdAt: serverTimestamp(),
  }).then(() => ref.id)

  return withTimeout(
    write,
    WRITE_TIMEOUT_MS,
    taggedError(
      WRITE_ERRORS.TIMEOUT,
      `La escritura supero los ${WRITE_TIMEOUT_MS / 1000}s.`,
    ),
  )
}
