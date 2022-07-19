import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminProductsTable from './AdminProductsTable'
import ProductContext from "../../../context/ProductContext"

const AdminProducts = () => {

  const { getProducts, products } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section id='admin-products'>

      <div className="mb-3 card">
        <div className="card-body">
          <Link to="/admin/urun-ekle" className='btn btn-primary'>Ürün Ekle</Link>
        </div>
      </div>

      <AdminProductsTable products={products} />

    </section>
  )
}

export default AdminProducts