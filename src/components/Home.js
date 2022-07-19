import React from 'react'
import Products from './products/Products'
import Slider from './Slider'

const Home = () => {
  return (
    <section id="home">
      <Slider />
      <Products />
    </section>
  )
}

export default Home