import React from 'react'
import { Link } from "react-router-dom"
import firebase from "../../../firebase/firebaseConfig"

const AdminCategoryTableItem = ({c}) => {

  const deleteCategory = () => {
    firebase.ref(`categories/${c.id}`).remove()
  }

  return (
    <tr key={c.id}>
      <td>{c.name}</td>
      <td className='d-flex gap-3'>
        <Link to={`/admin/kategori-duzenle/${c.id}`} className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></Link>
        <button onClick={deleteCategory} className="btn btn-danger btn-sm"><i className="fas fa-times"></i></button>
      </td>
    </tr>
  )
}

export default AdminCategoryTableItem