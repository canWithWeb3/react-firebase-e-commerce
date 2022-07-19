import React, { useReducer } from 'react'
import BasketContext from "../context/BasketContext"
import BasketReducer from "../reducer/BasketReducer"
import db from "../firebase/firebaseConfig"
import { useEffect } from 'react'

const BasketState = ({children}) => {
  const initialState = {
    userBasket:[],
    basketTotalPrice: 0,
    basketLength: 0,
  }

  useEffect(() => {
    getUserBasket()
  }, [])

  const [state, basketDispatch] = useReducer(BasketReducer, initialState)

  const getUserBasket = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    db.ref(`baskets/${user_id}`)
    .once("value")
    .then((snapshot) => {
      const baskets = []
      snapshot.forEach(basket => {
        baskets.push({
          id: basket.key,
          ...basket.val()
        })
      })
      const products = []
      baskets.map(basket => {
        db.ref(`products/${basket.productId}`).once("value")
        .then((snapshot) => {
          products.push({
            id: snapshot.key,
            basket_id: basket.id,
            count: basket.count,
            ...snapshot.val()
          })
          basketDispatch({
            type: "GET_USER_BASKET",
            userBasket: products
          })
          getUserBasketTotalPrice(products)
          getUserBasketLength(products)
        })
      })
    })
  }

  const getUserBasketTotalPrice = (products) => {
    let total = 0
    products.forEach(item => {
      if(item.discountPrice > 0){
        total += item.discountPrice * item.count
        basketDispatch({
          type: "GET_BASKET_TOTAL_PRICE",
          basketTotalPrice: total
        })
      }else{
        total += item.originalPrice * item.count
        basketDispatch({
          type: "GET_BASKET_TOTAL_PRICE",
          basketTotalPrice: total
        })
      }
    })
  }

  const getUserBasketLength = (products) => {
    let length = 0
    products.forEach(item => {
      length += item.count
      basketDispatch({
        type: "GET_BASKET_LENGTH",
        basketLength: length
      })
    })
  }

  const clearBasket = () => {
    basketDispatch({
      type: "CLEAR_BASKET",
      userBasket: [],
      basketTotalPrice: 0,
      basketLength: 0,
    })
  }

  return (
    <BasketContext.Provider value={{
      userBasket: state.userBasket,
      basketTotalPrice: state.basketTotalPrice,
      basketLength: state.basketLength,
      getUserBasket,
      getUserBasketTotalPrice,
      clearBasket,
      basketDispatch,
    }}>
      {children}
    </BasketContext.Provider>
  )
}

export default BasketState