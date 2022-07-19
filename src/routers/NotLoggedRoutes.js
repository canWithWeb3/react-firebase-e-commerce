import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router'
import Home from '../components/Home'
import UserContext from '../context/UserContext'

const NotLoggedRoutes = () => {
  const { getLogged, loggedUser } = useContext(UserContext)

  useEffect(() => {
    getLogged()
  }, [])

  return loggedUser === null ? <Outlet /> : <Home />
}

export default NotLoggedRoutes