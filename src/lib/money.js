const formatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

// La moneda del POS es el dolar y no se configura. El total multiplica floats
// (precio * cantidad), asi que sin esto un ticket de tres cafes terminaria
// mostrando $7,770000000000001.
export function formatMoney(amount) {
  return `$${formatter.format(Number.isFinite(amount) ? amount : 0)}`
}
