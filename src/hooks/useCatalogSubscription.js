import { useCallback, useEffect, useState } from 'react'
import { subscribeToCatalogProducts } from '../firebase/catalog.js'
import {
  CATALOG_ERROR_FALLBACK,
  CATALOG_ERROR_MESSAGES,
} from '../lib/catalog-errors.js'

export const CATALOG_STATUS = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
}

export function useCatalogSubscription({ enabled, onProducts }) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!enabled) return undefined

    let active = true

    const unsubscribe = subscribeToCatalogProducts({
      onProducts: (products) => {
        if (!active) return
        onProducts(products)
        setResult({ attempt, status: CATALOG_STATUS.READY, errorMessage: null })
      },
      onError: (error) => {
        if (!active) return
        onProducts([])
        setResult({
          attempt,
          status: CATALOG_STATUS.ERROR,
          errorMessage:
            CATALOG_ERROR_MESSAGES[error?.code] ?? CATALOG_ERROR_FALLBACK,
        })
      },
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [enabled, attempt, onProducts])

  const isPending =
    !enabled || result === null || result.attempt !== attempt

  const retry = useCallback(() => {
    setAttempt((current) => current + 1)
  }, [])

  return {
    status: isPending ? CATALOG_STATUS.LOADING : result.status,
    errorMessage: isPending ? null : result.errorMessage,
    retry,
  }
}
