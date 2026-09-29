// Vive aca y no en el componente porque exportar una constante desde un .jsx
// rompe el Fast Refresh de Vite. Solo son dos valores, pero el color del aviso
// y el tono que se anuncia por screen reader tienen que ser el mismo string.
export const TOAST_TONE = {
  SUCCESS: 'success',
  ERROR: 'error',
}
