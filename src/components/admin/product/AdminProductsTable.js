import React from 'react'
import AdminProductsTableItem from './AdminProductsTableItem'

const AdminProductsTable = ({products}) => {

  

  return (
    <table className="table table-striped table-bordered mb-0">
      <thead>
        <tr>
          <th style={{ width:"80px" }}>Resim</th>
          <th>Adı</th>
          <th>Açıklama</th>
          <th>Asıl Fiyat</th>
          <th>İndirimli Fiyat</th>
          <th>Kategoriler</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { products.map((p) => (
          <AdminProductsTableItem key={p.id} p={p} />
        )) }
      </tbody>
    </table>
  )
}

export default AdminProductsTable