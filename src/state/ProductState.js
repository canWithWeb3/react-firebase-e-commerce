import React from 'react'
import { useReducer } from 'react'
import ProductContext from '../context/ProductContext'
import ProductReducer from '../reducer/ProductReducer'
import db from "../firebase/firebaseConfig"

const ProductState = ({children}) => {
  const initialState = {
    products: [],
    product: {}
  }

  const [state, productDispatch] = useReducer(ProductReducer, initialState)

  const getProducts = () => {
    db.ref("products").on("value", (snapshot) => {
      const products = []

      snapshot.forEach(product => {
        products.push({
          id: product.key,
          ...product.val()
        })
      })

      productDispatch({
        type: "GET_PRODUCTS",
        products: products
      })
    })
  }

  const getProductById = (productId) => {
    db.ref(`products/${productId}`).on("value", (snapshot) => {
      productDispatch({
        type: "GET_PRODUCT",
        product: { id: snapshot.key, ...snapshot.val() }
      })
    })
  }

  return (
    <ProductContext.Provider value={{
      products: state.products,
      product: state.product,
      getProducts,
      getProductById,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductState