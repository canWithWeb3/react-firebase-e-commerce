import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section id="not-found">

      <div className='text-center'>
        <h3 className='mb-3'>Sayfa Bulunamadı.</h3>

        <Link to="/" className='btn btn-primary'>Ana Sayfaya Dön</Link>
      </div>

    </section>
  )
}

export default NotFoundPage