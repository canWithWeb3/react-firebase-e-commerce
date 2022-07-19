import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryContext from "../../../context/CategoryContext"
import ProductContext from "../../../context/ProductContext"
import db from "../../../firebase/firebaseConfig"

const EditProduct = () => {
  const { getCategories, categories } = useContext(CategoryContext)
  const { getProductById, product } = useContext(ProductContext)

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice)
  const [discountPrice, setDiscountPrice] = useState(product.discountPrice)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { productId } = useParams()

  useEffect(() => {
    getProductById(productId)
    getCategories()
  }, [])

  const inputs = document.querySelectorAll("#categories-card input")
  inputs.forEach(input => {
    const id = input.getAttribute("id").substring(9)
    product.categories.forEach(c => {
      if(c.id === id){
        input.checked = true
      }
    })
  })


  const selectCategories = () => {
    let selectedCategories = []
    const inputs = document.querySelectorAll("#categories-card input")
    inputs.forEach((item) => {
      if(item.checked === true){
        selectedCategories.push({
          id: item.getAttribute("id").substring(9),
          name: item.value
        })
      }
    })

    return selectedCategories
  }

  const checkForm = () => {
    let checked = true;

    if(originalPrice === 0 || originalPrice < 1){
      setError("Orijinal Fiyat 0 dan büyük olmalıdır.")
      checked = false
    }

    if(discountPrice === 0 || originalPrice < discountPrice){
      setError("Orijinal Fiyat, indirimli fiyattan büyük olmalıdır")
      checked = false
    }

    return checked;
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(checkForm()){
      const selectedCategories = selectCategories()
      const newProduct = {
        name: name!=="" ? name : product.name,
        image: image!=="" ? image : product.image,
        description: description!=="" ? description : product.description,
        originalPrice: originalPrice!=="" ? Number(originalPrice) : Number(product.originalPrice),
        discountPrice: discountPrice!=="" ? Number(discountPrice) : Number(product.discountPrice),
        categories: selectedCategories,
        created_at: Date.now()
      }
      if(selectedCategories.length > 0){
        db.ref(`products/${product.id}`).update(newProduct)
          .then(res => {
          navigate("/admin/urunler")
        })
      }else{
        setError("Kategori seçmediniz")
      }

    }else{
      console.log("checkForm: no")
    }

  }

  return (
    <section id="edit-product">
      
      <div className="card">
        <div className="card-header">Ürün Düzenle</div>
        <div className="card-body">
          { error && (
            <div className="alert alert-warning">
              { error }
            </div>
          ) }

          <form onSubmit={onSubmit}>
            <div className="row">

              {/* text inputs */}
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Ürün Adı:</label>
                  <input placeholder={product.name} onChange={e => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Ürün Resim:</label>
                  <input placeholder={product.image} onChange={e => setImage(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Ürün Açıklama:</label>
                  <textarea placeholder={product.description} onChange={e => setDescription(e.target.value)} className='form-control' id="description" rows="3"></textarea>
                </div>
                <div className="d-flex mb-3 gap-3">
                  <div>
                    <label htmlFor="originalPrice" className="form-label">Orjinal Fiyat:</label>
                    <input placeholder={product.originalPrice} onChange={e => setOriginalPrice(e.target.value)} type="text" className="form-control" />
                  </div>
                  <div>
                    <label htmlFor="discountPrice" className="form-label">İndirimli Fiyat:</label>
                    <input placeholder={product.discountPrice} onChange={e => setDiscountPrice(e.target.value)} type="text" className="form-control" />
                  </div>
                </div>
              </div>

              {/* checkbox inputs */}
              <div className="ms-auto col-md-3">
                <div id="categories-card" className="card">
                  <div className="card-header">Kategoriler</div>
                  <div className="card-body">
                    { categories.map(c => (
                      <div key={`category_${c.id}`} className="form-check mb-2">
                        <label htmlFor={`category_${c.id}`} className="form-check-label">{c.name}</label>
                        <input type="checkbox" id={`category_${c.id}`} value={c.name} className="form-check-input" />
                      </div>
                    )) }
                  </div>
                </div>
              </div>

            </div>

            <button type="submit" className="btn btn-primary">Ürün Ekle</button>
          </form>

        </div>
      </div>

    </section>
  )
}

export default EditProduct