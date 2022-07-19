import React from 'react'
import { useReducer } from 'react'
import CategoryContext from "../context/CategoryContext"
import CategoryReducer from "../reducer/CategoryReducer"
import db from "../firebase/firebaseConfig"

const CategoryState = ({children}) => {
  const initialState = {
    categories: [],
    category: {},
  }

  const [state, categoryDispatch] = useReducer(CategoryReducer, initialState)

  const getCategories = () => {
    db.ref("categories").on("value", (snapshot) => {
      let categories = []

      snapshot.forEach(category => {
        categories.push({
          id: category.key,
          ...category.val()
        })
      })

      categoryDispatch({
        type: "GET_CATEGORIES",
        categories: categories
      })
    })
  }

  const getCategoryById = (categoryId) => {
    db.ref(`categories/${categoryId}`).on("value", (snapshot) => {
      categoryDispatch({
        type: "GET_CATEGORY",
        category: { id: snapshot.key, ...snapshot.val() }
      })
    })
  }


  return (
    <CategoryContext.Provider value={{
      categories: state.categories,
      category: state.category,
      getCategories,
      getCategoryById,
    }}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryState