import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasketContext from '../../context/BasketContext'
import UserContext from '../../context/UserContext'
import { login } from "./auth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)

  const { getUsers, users, getLogged, loggedUser, userDispatch } = useContext(UserContext)
  const { getUserBasket } = useContext(BasketContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [])

  const checkForm = () => {
    let checked = false

    if(email.trim() !== ""){
      if(email.indexOf("@") > 0 && email.indexOf(".com") > 0){
        if(password.trim() !== ""){
          checked = true
        }else{
          setError("Parola boş bırakılamaz.")
        }
      }else{
        setError("Email biçiminde değil.")
      }
    }else{
      setError("Email boş bırakılamaz.")
    }

    return checked
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(!loadingBtn){
      setLoadingBtn(true)
      if(checkForm()){
        users.map(user => {
          if(user.email == email){
            if(user.password == password){
              localStorage.setItem("user_id", JSON.stringify(user.id))
              getLogged()
              getUserBasket()
              if(user.type == "admin"){
                userDispatch({
                  type: "IS_ADMIN",
                  isAdmin: true
                })
              }
              navigate("/")
            }
          }
        })
      }
    }

    setTimeout(() => {
      setError("Email veya parola hatalı")
      setLoadingBtn(false)
    }, 1600);
  }

  return (
    <section id="login" className='container'>
      
      <div className="col-lg-6 col-md-8 mx-auto">
        <div className="card">
          <div className="card-header">Giriş Yap</div>
          <div className="alert alert-warning">
            <strong>Admin Email:</strong> admin@gmail.com <br />
            <strong>Admin Parola:</strong> admin1
          </div>
          <div className="card-body">
            {/* <button onClick={login} className="btn btn-danger d-block w-100 circle">
              <i className="fab fa-google fs-5 me-3"></i> <span className='fs-5'>Google ile giriş yapın</span>
            </button> */}
            {/* <hr /> */}

            { error && (
              <div className="alert alert-warning">
                { error }
              </div>
            ) }

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Parola:</label>
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
              </div>

              <button type="submit" className={ loadingBtn ? "btn btn-secondary" : "btn btn-primary" }>
                { loadingBtn ? (
                  <span>Bekleyiniz...</span>
                ) : (
                  <span>Giriş Yap</span>
                ) }
              </button>
            </form>
            

            
          </div>
        </div>
      </div>

    </section>
  )
}

export default Login