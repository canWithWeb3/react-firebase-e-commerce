import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryContext from "../../../context/CategoryContext"
import db from "../../../firebase/firebaseConfig"

const AddProduct = () => {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const { getCategories, categories } = useContext(CategoryContext)

  useEffect(() => {
    getCategories()
  }, [])

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

    if(name.trim() !== ""){
      if(image.trim() !== ""){
        if(description.trim() !== ""){
          if(Number(originalPrice) > 0){
            if(Number(originalPrice) > Number(discountPrice)){
              checked = true;
            }else{
              setError("Asıl Fiyat, indirimli fiyattan küçük olamaz.")
            }
          }else{
            setError("Asıl Fiyat boş geçilemez.")
          }
        }else{
          setError("Ürün Açıklama boş geçilemez.")
        }
      }else{
        setError("Ürün Image boş geçilemez.")
      }
    }else{
      setError("Ürün Adı boş geçilemez.")
    }

    return checked;
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(checkForm()){
      
      const selectedCategories = selectCategories()
      if(selectedCategories.length > 0){
        db.ref("products").push({
          name: name,
          image: image,
          description: description,
          originalPrice: Number(originalPrice),
          discountPrice: Number(discountPrice),
          categories: selectedCategories,
          created_at: Date.now()
        }).then(res => {
          // navigate("/admin/urunler")
        })
      }else{
        setError("Kategori seçmediniz")
      }

    }else{
      console.log("checkForm: no")
    }

  }

  return (
    <section id="add-product">
      
      <div className="card">
        <div className="card-header">Ürün Ekle</div>
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
                  <input onChange={e => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Ürün Resim:</label>
                  <input onChange={e => setImage(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Ürün Açıklama:</label>
                  <textarea onChange={e => setDescription(e.target.value)} className='form-control' id="description" rows="3"></textarea>
                </div>
                <div className="d-flex mb-3 gap-3">
                  <div>
                    <label htmlFor="originalPrice" className="form-label">Asıl Fiyat:</label>
                    <input onChange={e => setOriginalPrice(e.target.value)} type="text" className="form-control" placeholder='0' />
                  </div>
                  <div>
                    <label htmlFor="discountPrice" className="form-label">İndirimli Fiyat:</label>
                    <input onChange={e => setDiscountPrice(e.target.value)} type="text" className="form-control" placeholder='0' />
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

export default AddProduct