const formatter = new Intl.NumberFormat('es-AR', {
  // Sin centavos: en este POS el importe es un peso entero, asi que los
  // decimales no aportan nada. Ojo que alcanza con maximumFractionDigits: poner
  // solo minimum no alcanza, porque el maximum no declarado cae en 2 y un total
  // con resto decimal seguia mostrando centavos.
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  // Sin separador de miles. El cajero lee el importe de un vistazo y "$ 12.500"
  // lo obliga a contar los grupos para saber cuanto es; el numero pelado tambien
  // hace que la columna no cambie de ancho segun la cantidad de digitos.
  useGrouping: false,
})

// La moneda del POS es el dolar y no se configura. El total multiplica floats
// (precio * cantidad), asi que sin el redondeo de maximumFractionDigits un
// ticket de tres cafes terminaria mostrando $8 por $7,77. Redondear a entero
// tambien resuelve esa basura de coma flotante.
export function formatMoney(amount) {
  return `$${formatter.format(Number.isFinite(amount) ? amount : 0)}`
}
