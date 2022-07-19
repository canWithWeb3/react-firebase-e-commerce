import React from 'react'

const Slider = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
      <div className="carousel-inner position-relative">
        <div className="carousel-item active">
          <img src="/img/banner1.jpg" className="d-block w-100" alt="..." />
          <div className='slider-content'>
            <h2>New Product 1</h2>
            <button className="btn btn-outline-primary">İncele</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/img/banner2.jpg" className="d-block w-100" alt="..." />
          <div className='slider-content'>
            <h2>New Product 2</h2>
            <button className="btn btn-outline-primary">İncele</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/img/banner3.jpg" className="d-block w-100" alt="..." />
          <div className='slider-content'>
            <h2>New Product 3</h2>
            <button className="btn btn-outline-primary">İncele</button>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Slider