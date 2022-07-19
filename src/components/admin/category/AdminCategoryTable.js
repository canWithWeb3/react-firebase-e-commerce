import React from 'react'
import AdminCategoryTableItem from './AdminCategoryTableItem'

const AdminCategoryTable = ({categories}) => {
  return (
    <table className="table table-striped table-bordered mb-0">
      <thead>
        <tr>
          <th>Adı</th>
          <th style={{ width:"80px" }}></th>
        </tr>
      </thead>
      <tbody>
        { categories.map(c => (
          <AdminCategoryTableItem key={c.id} c={c} />
        )) }
      </tbody>
    </table>
  )
}

export default AdminCategoryTable