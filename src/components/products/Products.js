import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import ProductContext from "../../context/ProductContext"
import ProductCard from './ProductCard'

const Products = () => {
  const { getProducts, products } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  }, [])

  

  return (
    <div id="home-products" className='mb-5'>
      
      <h2>Ürünler</h2>
      <hr />

      <div className="row">

        { products.map(p => (
          <ProductCard key={p.id} p={p} />
        )) }
        

      </div>

    </div>
  )
}

export default Products