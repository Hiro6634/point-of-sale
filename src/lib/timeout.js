// Promise.race entre la promesa original y un reloj.
//
// Sin esto la app queda trabada para siempre. Firestore no rechaza cuando no
// hay red: encola la escritura para reintentar solo y la promesa no resuelve
// ni rechaza nunca, asi que el boton de cerrar queda en "Registrando" y el
// ticket no se puede reintentar ni cancelar. El reject del timeout es lo que
// le devuelve el control al cajero.
export function withTimeout(promise, ms, error) {
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(error), ms)
  })

  // La escritura original queda escuchando despues de que gane el timeout. Si
  // se encoló y falla cuando vuelve la red, ese rechazo no lo agarra nadie y
  // sale como unhandled rejection. Se descarta aca a proposito: al cajero ya se
  // le aviso, y no hay nada que hacer con una promesa que ya no importa.
  promise.catch(() => {})

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}
