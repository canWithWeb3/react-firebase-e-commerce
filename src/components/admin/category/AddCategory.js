import React from 'react'
import { useState } from 'react'
import firebase from "../../../firebase/firebaseConfig"
import { useNavigate } from "react-router-dom"

const AddCategory = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [error, setError] = useState("")


  const onSubmit = (e) => {
    e.preventDefault();

    if(name.trim() !== ""){
      firebase.ref("categories").push({
        name: name,
        created_at: Date.now()
      }).then(res => 
        navigate("/admin/kategoriler")
      )
    }else{
      setError("Kategori Adı girmediniz.")
    }
  }

  return (
    <section id="add-category">
      
      <div className="card">
        <div className="card-header">Kategori Ekle</div>
        <div className="card-body">
          <div className="row">
            { error && (
              <div className="alert alert-warning">
                { error }
              </div>
            ) }
            <div className="col-md-9">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Kategori Adı:</label>
                  <input onChange={e => setName(e.target.value)} type="text" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Kategori Ekle</button>
              </form>
            </div>

            <div className="col-md-3"></div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default AddCategory