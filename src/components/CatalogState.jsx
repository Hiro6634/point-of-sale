import { CATALOG_STATUS } from '../hooks/useCatalogSubscription.js'
import Spinner from './Spinner.jsx'

export default function CatalogState({ status, errorMessage, isEmpty, onRetry }) {
  if (status === CATALOG_STATUS.LOADING) {
    return <Spinner label="Cargando catálogo…" />
  }

  if (status === CATALOG_STATUS.ERROR) {
    return (
      <div className="catalog-state" role="alert">
        <p className="catalog-state-message catalog-state-error">
          {errorMessage}
        </p>
        <button type="button" className="button secondary" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="catalog-state">
        <p className="catalog-state-message">
          No hay productos en el catálogo.
        </p>
      </div>
    )
  }

  return null
}
