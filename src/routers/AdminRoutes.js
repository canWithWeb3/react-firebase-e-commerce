import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router'
import NotFoundPage from "../components/pages/NotFoundPage"
import UserContext from '../context/UserContext'

const AdminRoutes = () => {
  const { checkIsAdmin, isAdmin } = useContext(UserContext)

  useEffect(() => {
    checkIsAdmin()
  }, [])

  return isAdmin ? <Outlet /> : <NotFoundPage />
}

export default AdminRoutes