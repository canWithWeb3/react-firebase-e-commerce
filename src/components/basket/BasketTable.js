import React, { useContext, useEffect } from 'react'
import BasketTableItem from './BasketTableItem'
import db from "../../firebase/firebaseConfig"
import BasketContext from '../../context/BasketContext'

const BasketTable = () => {
  const { getUserBasket, userBasket, basketDispatch } = useContext(BasketContext)

  const deleteAllBasket = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    if(user_id){
      db.ref(`baskets/${user_id}`).remove()
        .then(res => basketDispatch({
          type: "DELETE_ALL_BASKET",
          userBasket: [],
          basketTotalPrice: 0,
          basketLength: 0
        }))
    }
  }

  useEffect(() => {
    getUserBasket()
  }, [])
  
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th style={{ width:"80px" }}>Resim</th>
          <th>Ürün</th>
          <th style={{ width:"180px" }}>Miktar</th>
          <th style={{ width:"40px" }}>
            <button onClick={deleteAllBasket} className="btn btn-danger btn-sm">HEPSİNİ SİL</button>
          </th>
        </tr>
      </thead>
      <tbody>
        { userBasket.map(ub => (
          <BasketTableItem key={ub.id} ub={ub} />
        )) }
      </tbody>
    </table>
  )
}

export default BasketTable