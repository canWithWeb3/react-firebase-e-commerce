import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CategoryContext from "../../../context/CategoryContext"
import db from "../../../firebase/firebaseConfig"

const EditCategory = () => {
  const { getCategoryById, category, getCategories, categories } = useContext(CategoryContext)

  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const { categoryId } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    getCategoryById(categoryId)
    getCategories()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    const newCategory = {
      name: name!=="" ? name : category.name,
      created_at: Date.now()
    }
    db.ref(`categories/${category.id}`).update(newCategory)
    .then(res => {
      navigate("/admin/kategoriler")
    })
  }

  return (
    <section id="add-category">
      
      <div className="card">
        <div className="card-header">Kategori Düzenle</div>
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
                  <input placeholder={category.name} onChange={e => setName(e.target.value)} type="text" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Kategori Düzenle</button>
              </form>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-header">Kategoriler</div>
                <ul className="list-group list-group-flush">
                { categories.map(c => (
                  <li key={c.id} className="list-group-item">{c.name}</li>
                )) }
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default EditCategory