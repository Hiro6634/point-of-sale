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
          // Firestore guarda el nombre en minusculas, que es la forma canonica
          // para consultar, ordenar y deduplicar. Las mayusculas son una
          // decision de presentacion y se aplican aca, en el borde, y no en cada
          // componente: asi el ticket, que congela el nombre al tocar el
          // producto, muestra exactamente lo mismo que el catalogo.
          name: String(data.name ?? '').toUpperCase(),
          // El producto no guarda el id del documento de la categoria sino su
          // nombre, asi que el campo se llama category y no categoryId. El
          // categoryId queda como alternativa por si el dato migra a referencia.
          category: data.category ?? data.categoryId ?? null,
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
          // El orden de las categorias lo define el backend con este campo.
          // Antes no se leia y el listado se armaba por nombre, que salia al
          // reves de como lo pide el dato. Se normaliza a numero porque en
          // Firestore el campo puede haber quedado guardado como texto.
          order: Number.isFinite(Number(data.order)) && data.order != null
            ? Number(data.order)
            : null,
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