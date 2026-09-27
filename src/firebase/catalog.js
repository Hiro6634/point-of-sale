import { collection, onSnapshot } from 'firebase/firestore'
import {
  CATALOG_CATEGORIES_PATH,
  CATALOG_PRODUCTS_PATH,
} from '../config.js'
import { db } from './firebase.utils.js'

const productsCollection = collection(db, CATALOG_PRODUCTS_PATH)
const categoriesCollection = collection(db, CATALOG_CATEGORIES_PATH)

export function subscribeToCatalogProducts({ onProducts, onError }) {
  return onSnapshot(
    productsCollection,
    (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          categoryId: data.categoryId ?? data.category ?? null,
          price: data.price,
          qty: data.qty ?? 0,
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

export function subscribeToCatalogCategories({ onCategories, onError }) {
  return onSnapshot(
    categoriesCollection,
    (snapshot) => {
      const categories = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          color: data.color,
        }
      })
      onCategories(categories)
    },
    (error) => {
      console.error('Error leyendo las categorías', error)
      onError(error)
    },
  )
}