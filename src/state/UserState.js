import React from 'react'
import { useReducer } from 'react'
import UserReducer from "../reducer/UserReducer"
import UserContext from "../context/UserContext"
import db from "../firebase/firebaseConfig"

const UserState = ({children}) => {
  const initialState = {
    users: [],
    loggedUser: null,
    isAdmin: false,
  }

  const [state, userDispatch] = useReducer(UserReducer, initialState)

  const getUsers = () => {
    db.ref("users").on("value", (snapshot) => {
      const users = []

      snapshot.forEach(user => {
        users.push({
          id: user.key,
          ...user.val()
        })
      })

      userDispatch({
        type: "GET_USERS",
        users: users
      })
    })
  }

  const getLogged = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    if(user_id){
      db.ref(`users/${user_id}`).on("value", (snapshot) => {
        if(snapshot.val() !== null){
          const user = {
            id: snapshot.key,
            ...snapshot.val()
          }
          userDispatch({
            type: "GET_LOGGED_USER",
            loggedUser: user
          })
        }else{
          userDispatch({
            type: "GET_LOGGED_USER",
            loggedUser: null
          })
        }
      })
    }
  }

  const checkIsAdmin = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    if(user_id){
      db.ref(`users/${user_id}`)
      .once("value")
      .then((snapshot) => {
        if(snapshot.val().type === "admin"){
          userDispatch({
            type: "IS_ADMIN",
            isAdmin: true
          })
        }
      })
      .catch(err => console.log("hata: ", err))
    }
  }

  const logoutNormal = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    userDispatch({
      type: "LOGOUT",
      loggedUser: null,
      isAdmin: false
    })
  }

  return (
    <UserContext.Provider value={{
      users: state.users,
      loggedUser: state.loggedUser,
      isAdmin: state.isAdmin,
      getUsers,
      getLogged,
      checkIsAdmin,
      logoutNormal,
      userDispatch,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState