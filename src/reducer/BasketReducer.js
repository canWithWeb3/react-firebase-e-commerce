const BasketReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_BASKET":
      return {
        ...state,
        userBasket: action.userBasket
      }  
    case "DELETE_ALL_BASKET":
      return {
        ...state,
        userBasket: [],
        basketTotalPrice: 0,
        basketLength: 0
      }
    case "GET_BASKET_TOTAL_PRICE":
      return {
        ...state,
        basketTotalPrice: action.basketTotalPrice
      }
    case "GET_BASKET_LENGTH":
      return {
        ...state,
        basketLength: action.basketLength
      }
    case "CLEAR_BASKET":
      return {
        ...state,
        userBasket: [],
        basketTotalPrice: 0,
        basketLength: 0
      }
  
    default:
      return state
  }
}

export default BasketReducer