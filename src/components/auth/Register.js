import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import db from "../../firebase/firebaseConfig"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  const [error, setError] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)

  const { getUsers, users, getLogged } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [])

  const checkForm = () => {
    let checked = false

    if(username.trim() !== ""){
      if(email.trim() !== ""){
        if(email.indexOf("@") > 0 && email.indexOf(".com") > 0){
          if(password.trim() !== ""){
            if(password.trim() === repassword.trim()){
              checked = true
            }else{
              setError("Parolalar eşleşmiyor.")
            }
          }else{
            setError("Parola boş geçilemez.")
          }
        }else{
          setError("Email @ ve .com içermelidir.")
        }
      }else{
        setError("Email boş geçilemez.")
      }
    }else{
      setError("Kullanıcı Adı boş geçilemez.")
    }

    return checked
  }

  const checkDB = () => {
    let checked = true
    users.map(user => {
      if(user.username == username.trim()){
        setError("Bu kullanıcı adı kullanılmaktadır.")
        return checked = false
      }

      if(user.email == email.trim()){
        setError("Bu email kullanılmaktadır.")
        return checked = false
      }
    })

    return checked
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    if(!loadingBtn && !loadingBtn){
      if(checkForm()){
        if(checkDB()){
          setLoadingBtn(true)
          db.ref("users").push({
            username: username.trim(),
            email: email.trim(),
            password: password.trim(),
            type: "user",
            created_at: Date.now()
          }).then(res => {
            localStorage.setItem("user_id", JSON.stringify(res.key))
            localStorage.setItem("username", JSON.stringify(username.trim()))
            
            getLogged()
            navigate("/")
          })
          setLoadingBtn(false)
        }
      }
    }
  }

  return (
    <section id="register" className='container'>
      
      <div className="col-lg-6 col-md-8 mx-auto">
        <div className="card">
          <div className="card-header">Kayıt Ol</div>
          <div className="card-body">

            {/* <button className="btn btn-danger d-block w-100 circle">
              <i className="fab fa-google fs-5 me-3"></i> <span className='fs-5'>Google ile kayıt olun</span>
            </button>
            <hr /> */}

            { error && (
              <div className="alert alert-warning">
                { error }
              </div>
            ) }

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Kullanıcı Adı:</label>
                <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Parola:</label>
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="repassword" className="form-label">Parola (Tekrar):</label>
                <input onChange={e => setRepassword(e.target.value)} type="password" className="form-control" />
              </div>

              <button type="submit" className={ loadingBtn ? "btn btn-secondary" : "btn btn-primary" }>
                { loadingBtn ? (
                  <span>Bekleyiniz...</span>
                ) : (
                  <span>Kayıt Ol</span>
                ) }
              </button>
            </form>
            
          </div>
        </div>
      </div>

    </section>
  )
}

export default Register