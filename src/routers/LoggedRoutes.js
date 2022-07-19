import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router'
import Login from '../components/auth/Login'
import UserContext from '../context/UserContext'

const LoggedRoutes = () => {
  const { getLogged, loggedUser } = useContext(UserContext)


  useEffect(() => {
    getLogged()
  }, [])

  return loggedUser !== null ? <Outlet /> : <Login />
}

export default LoggedRoutes