import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasketContext from '../../context/BasketContext'
import ProductContext from '../../context/ProductContext'
import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from "../../firebase/firebaseConfig"

const ProductDetail = () => {
  const [loadingBtn, setLoadingBtn] = useState(false)

  const { getProductById, product } = useContext(ProductContext)
  const { getLogged, loggedUser } = useContext(UserContext)
  const { getUserBasket } = useContext(BasketContext)

  const { productId } = useParams()

  useEffect(() => {
    getProductById(productId)
    getLogged()
  }, [])

  const selectImage = (e) => {
    const bigImage = document.getElementById("big-image")
    const images = document.querySelectorAll("#small-images .col-md-3 img")
    
    images.forEach(image => {
      if(image.classList.contains("img-active")){
        image.classList.remove("img-active")
      }
    })

    e.target.classList.add("img-active")

    const selectedImage = e.target.getAttribute("src")
    bigImage.setAttribute("src", selectedImage)
  }

  const addBasket = () => {
    if(loggedUser && !loadingBtn){
      setLoadingBtn(true)
      db.ref(`baskets/${loggedUser.id}`).once("value")
      .then((snapshot) => {
        if(snapshot.val() === null){
          db.ref(`baskets/${loggedUser.id}`).push({
            productId: product.id, productName: product.name, count: 1
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
              if(item.productId === product.id){
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
                productId: product.id, productName: product.name, count: 1
              })
            }
            getUserBasket()
            toast.success(`${product.name} eklendi.`)
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
    <section id="product-detail">
      
      <div className="card">
        <div className="row">
          <div className="col-md-3">
            <div className="row g-0">
              <img id='big-image' src={`/img/${product.image}`} alt="" className="col-md-12 mb-3 img-fluid" />
              <div id="small-images" className="row g-0">
                <div className="col-md-3">
                  <img onClick={selectImage} src={`/img/${product.image}`} alt="" className="img-fluid img-active" />
                </div>
                <div className="col-md-3">
                  <img onClick={selectImage} src={`/img/gallery-1.jpg`} alt="" className="img-fluid" />
                </div>
                <div className="col-md-3">
                  <img onClick={selectImage} src={`/img/gallery-2.jpg`} alt="" className="img-fluid" />
                </div>
                <div className="col-md-3">
                  <img onClick={selectImage} src={`/img/gallery-3.jpg`} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h4>{product.name}</h4>
              <p className="card-text mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur doloribus assumenda accusamus beatae vitae doloremque cupiditate nisi rerum modi voluptatum in odio officiis qui laborum, blanditiis minus deserunt et quas ipsa reiciendis adipisci pariatur. Illum.</p>
              <div className="d-flex gap-3 mb-5 fs-4">
                { product.discountPrice > 0 ? (
                  <>
                    <span className='text-secondary'>{product.originalPrice} TL</span>
                    <span className="text-primary">{product.discountPrice} TL</span>
                  </>
                ) : (
                  <>
                    <span className='text-primary'>{product.originalPrice} TL</span>
                  </>
                ) }
              </div>
              <button onClick={addBasket} className="btn btn-primary d-block w-100">Sepete Ekle</button>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default ProductDetail