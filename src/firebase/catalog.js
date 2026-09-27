import { collection, onSnapshot } from 'firebase/firestore'
import { CATALOG_PRODUCTS_PATH } from '../config.js'
import { db } from './firebase.utils.js'

const productsCollection = collection(db, CATALOG_PRODUCTS_PATH)

export function subscribeToCatalogProducts({ onProducts, onError }) {
  return onSnapshot(
    productsCollection,
    (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          qty: data.qty ?? 1,
          enabled: data.enabled ?? data.enable ?? true,
        }
      })
      onProducts(products)
    },
    (error) => {
      console.error('Error leyendo el catálogo', error)
      onError(error)
    },
  )
}