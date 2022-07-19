import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../components/auth/auth"
import UserContext from '../context/UserContext'
import BasketContext from '../context/BasketContext'

const Header = () => {
  const { getLogged, loggedUser, logoutNormal, checkIsAdmin, isAdmin } = useContext(UserContext)
  const { getUserBasket, basketLength, clearBasket } = useContext(BasketContext)

  const navigate = useNavigate()

  useEffect(() => {
    getLogged()
    getUserBasket()
    checkIsAdmin()
  }, [])
  
  
  const LogoutNormal = () => {
    logoutNormal()
    clearBasket()
    navigate("/")
  }

  // const googleLogout = () => {
  //   logout()
  // }



  return (
    <header>
      { !isAdmin && (
        <div className="alert alert-warning mb-0 text-center border-warning border-bottom">
          Admin paneline gitmek için giriş yaptaki admin girişini sağlayınız.
        </div>
      ) }
      <nav className="mb-5 navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">React</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* admin */}
            <ul className="navbar-nav mb-2 mb-lg-0">
              { isAdmin && (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/admin/urunler">Ürünler</Link></li>
                    <li><Link className="dropdown-item" to="/admin/kategoriler">Kategoriler</Link></li>
                  </ul>
                </li>
              ) }
              <li className="nav-item">
                <Link to="/hakkimizda" className="nav-link">Hakkımızda</Link>
              </li>
              <li className="nav-item">
                <Link to="/iletisim" className="nav-link">İletişim</Link>
              </li>
            </ul>

            {/* user */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              { loggedUser ? (
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      { loggedUser.username }
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><button onClick={LogoutNormal} className="dropdown-item">Çıkış yap</button></li>
                      {/* <li><button onClick={googleLogout} className="dropdown-item">google Çıkış yap</button></li> */}
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-user"></i>
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/giris-yap">Giriş yap</Link></li>
                      <li><Link className="dropdown-item" to="/kayit-ol">Kayıt ol</Link></li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/sepet">Sepetim <span className="badge bg-secondary">{basketLength}</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header