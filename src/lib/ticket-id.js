// El id del documento ES el numero de ticket, con formato YYYYMMDDHHMMSS-hash.
//
// Firestore devuelve las consultas sin orderBy ordenadas por id ascendente, y
// la comparacion de ids de texto es byte a byte. Prefijando con la fecha y
// completando con ceros a la izquierda, el orden lexicografico coincide con el
// cronologico, asi que un listado sale ordenado sin gastarse un orderBy ni un
// indice compuesto.

// 5 bits por caracter base36, leidos de crypto y no de Math.random porque el
// sufijo es lo unico que distingue dos ventas de la misma caja en el mismo
// segundo, y una colision hace fallar la escritura y con ella la venta.
//
// Diez caracteres, no seis, por una razon que conviene no olvidar: al pasar de
// addDoc a setDoc con id propio se perdio la garantia de que Firestore no
// repite un id. Ahora la unicidad la garantiza este codigo, y setDoc pisa en
// silencio el documento si se repite, es decir una venta seria devorada por otra
// sin que nadie se entere. Con 6 caracteres base36 el espacio son 30 bits, y por
// la paradoja de los cumpleaños unas 200.000 ventas dentro del mismo segundo ya
// PRODUCEN colisiones. Con 10 son 50 bits, y hacen falta del orden de 10^11
// ventas en un mismo segundo para que aparezca una: nunca va a pasar.
const SUFFIX_LENGTH = 10

function pad(value, size = 2) {
  return String(value).padStart(size, '0')
}

// En UTC y no en hora local, por dos motivos concretos:
//
//   - dos cajas en husos distintos generan el mismo instante en un segundo
//     distinto, asi que en hora local el listado las intercalaria mal;
//   - el cambio de horario de verano puede hacer que dos ventas distintas
//     compartan el mismo prefijo, y el listado las amontonaria al azar.
//
// Ojo: el reloj de la caja sigue mandando. Si una terminal tiene la hora
// corrida, sus ids quedan fuera de orden. Por eso el documento conserva
// createdAt del servidor: ese es el campo confiable, el id es el legible.
function timestampPrefix(date) {
  return [
    pad(date.getUTCFullYear(), 4),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
  ].join('')
}

// 5 bits por caracter base36, leidos de crypto y no de Math.random porque una
// colision hace fallar la escritura y con ella la venta.
function randomSuffix() {
  const bytes = new Uint8Array(Math.ceil((SUFFIX_LENGTH * 5) / 8))
  crypto.getRandomValues(bytes)
  let value = 0
  for (const byte of bytes) value = value * 256 + byte

  let out = ''
  for (let i = 0; i < SUFFIX_LENGTH; i += 1) {
    out = (value % 36).toString(36) + out
    value = Math.floor(value / 36)
  }
  return out
}

export function formatTicketId(date, suffix) {
  return `${timestampPrefix(date)}-${suffix}`
}

export function createTicketId(date) {
  return formatTicketId(date, randomSuffix())
}
