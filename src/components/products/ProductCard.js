import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import UserContext from '../../context/UserContext'
import BasketContext from '../../context/BasketContext'
import db from "../../firebase/firebaseConfig"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ProductCard = ({p}) => {
  const [loadingBtn, setLoadingBtn] = useState(false)

  const { getLogged, loggedUser } = useContext(UserContext)
  const { getUserBasket } = useContext(BasketContext)

  useEffect(() => {
    getLogged()
  }, [])

  const addBasket = () => {
    if(loggedUser && !loadingBtn){
      setLoadingBtn(true)
      db.ref(`baskets/${loggedUser.id}`).once("value")
      .then((snapshot) => {
        if(snapshot.val() === null){
          db.ref(`baskets/${loggedUser.id}`).push({
            productId: p.id, productName: p.name, count: 1
          })
        }else{
          db.ref(`baskets/${loggedUser.id}`).once("value")
          .then((snapshot) => {
            const items = []
            snapshot.forEach(item => {
              items.push({
                id: item.key,
                ...item.val()
              })
            })

            let exist = false
            let addedProduct = null
            items.forEach(item => {
              if(item.productId === p.id){
                exist = true
                addedProduct = item
              }
            })

            if(exist){
              db.ref(`baskets/${loggedUser.id}/${addedProduct.id}`).update({
                count: addedProduct.count + 1
              })
            }else{
              db.ref(`baskets/${loggedUser.id}`).push({
                productId: p.id, productName: p.name, count: 1
              })
            }
            getUserBasket()
            toast.success(`${p.name} eklendi.`)
            setLoadingBtn(false)
          })
        }
      })
    }else{
      toast.error("Giriş Yapmadınız.")
      setLoadingBtn(false)
    }
  }

  return (
    <div key={p.id} className="col-lg-3 col-md-4 col-6 g-3">
      <div className="card">
        <Link to={`/urun-detay/${p.id}`} className="card-img">
          <img src={`/img/${p.image}`} alt="" className="img-fluid img-hover" />
        </Link>
        <div className="card-body">
          <h4 className='mb-2'>{p.name}</h4>
          <div className="d-flex gap-3 mb-2 fs-5">
            { p.discountPrice > 0 ? (
              <>
                <span className='text-secondary'>{p.originalPrice} TL</span>
                <span className="text-primary">{p.discountPrice} TL</span>
              </>
            ) : (
              <>
                <span className='text-primary'>{p.originalPrice} TL</span>
              </>
            ) }
          </div>
          <button onClick={addBasket} className={ loadingBtn ? "btn btn-warning" : "btn btn-primary" }>
            { loadingBtn ? "Bekleyiniz..." : "Sepete Ekle" }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard