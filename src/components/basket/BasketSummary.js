import React from 'react'

const BasketSummary = ({basketLength, basketTotalPrice}) => {

  return (
    <div className='card'>
      <div className="card-body">
        <h4>Sipariş Detay</h4>
        <hr />
        <div>
          <p className='mb-2'>Toplam Miktar: <span className="text-primary">{ basketLength }</span></p>
        </div> 
        <div>
          <p>Toplam Fiyat: <span className="text-primary">{ basketTotalPrice } TL</span></p>
        </div> 

        <button className="btn btn-primary w-100">Satın Al</button>
      </div>
    </div>
  )
}

export default BasketSummary