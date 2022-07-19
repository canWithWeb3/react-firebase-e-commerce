import React from 'react'
import { Link } from 'react-router-dom'
import db from "../../../firebase/firebaseConfig"

const AdminProductsTableItem = ({p}) => {

  const deleteProduct = () => {
    db.ref(`products/${p.id}`).remove()
  }

  return (
    <tr key={p.id}>
      <td className='p-0'><img src={`/img/${p.image}`} alt="" className="img-fluid" /></td>
      <td>{p.name}</td>
      <td>{p.description}</td>
      <td>{p.originalPrice}</td>
      <td>{p.discountPrice}</td>
      <td>
        <ul className='list-unstyled'>
          { p.categories.map(category => (
            <li key={category.id}>{category.name}</li>
          )) }
        </ul>
      </td>
      <td>
        <Link to={`/admin/urun-duzenle/${p.id}`} className="btn btn-warning btn-sm w-100 mb-3"><i className="fas fa-edit"></i></Link>
        <button onClick={deleteProduct} className="btn btn-danger btn-sm w-100"><i className="fas fa-times"></i></button>
      </td>
    </tr>
  )
}

export default AdminProductsTableItem