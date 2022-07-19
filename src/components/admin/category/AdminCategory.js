import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CategoryContext from '../../../context/CategoryContext'
import AdminCategoryTable from './AdminCategoryTable'

const AdminCategory = () => {
  const { getCategories, categories } = useContext(CategoryContext)

  useEffect(() => {
    getCategories()
  }, [])

  


  return (
    <section id='admin-category'>
      
      <div className="card mb-3">
        <div className="card-body">
          <Link to="/admin/kategori-ekle" className='btn btn-primary'>Kategori Ekle</Link>
        </div>
      </div>

      { categories.length > 0 && (
        <AdminCategoryTable categories={categories} />
      ) }
      
    </section>
  )
}

export default AdminCategory