import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasketContext from '../../context/BasketContext'
import UserContext from '../../context/UserContext'
import db from "../../firebase/firebaseConfig"

const BasketTableItem = ({ub}) => {
  const [loadingBtn, setLoadingBtn] = useState(false)

  const { getUserBasket, userBasket, clearBasket } = useContext(BasketContext)
  const { getLogged, loggedUser } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getLogged()
  }, [])

  const decreaseCount = () => {
    setLoadingBtn(true)
    if(ub.count > 1){
      db.ref(`baskets/${loggedUser.id}/${ub.basket_id}`).update({
        count: ub.count - 1
      }).then(() => {
        getUserBasket()
        setLoadingBtn(false)
      })
    }else{
      setLoadingBtn(false)
    }
  }

  const increaseCount = () => {
    setLoadingBtn(true)
    db.ref(`baskets/${loggedUser.id}/${ub.basket_id}`).update({
      count: ub.count + 1
    }).then(() => {
      getUserBasket()
      setLoadingBtn(false)
    })
  }

  const deleteBasket = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    db.ref(`baskets/${user_id}/${ub.basket_id}`).remove()
    getUserBasket()
    if(userBasket.length === 1){
      clearBasket()
    }
  }

  return (
    <tr>
      <td className='m-0 p-0'><img src={`/img/${ub.image}`} alt="" className="img-fluid" /></td>
      <td>
        <h5>{ub.name}</h5>
        <div className="d-flex gap-3 fs-6">
        { ub.discountPrice > 0 ? (
          <>
            <span className='text-secondary'>{ub.originalPrice} TL</span>
            <span className="text-primary">{ub.discountPrice} TL</span>
          </>
        ) : (
          <>
            <span className='text-primary'>{ub.originalPrice} TL</span>
          </>
        ) }
        </div>
      </td>
      <th>
        <div className="input-group mb-3">
          <button onClick={decreaseCount} className={ loadingBtn ? "btn btn-warning" : "btn btn-primary" }>-</button>
          <input type="text" disabled className="form-control text-center" placeholder={`${ub.count}`} />
          <button onClick={increaseCount} className={ loadingBtn ? "btn btn-warning" : "btn btn-primary" }>+</button>
        </div>
      </th>
      <td>
        <button onClick={deleteBasket} className="btn btn-danger"><i className="fas fa-times"></i></button>
      </td>
    </tr>
  )
}

export default BasketTableItem