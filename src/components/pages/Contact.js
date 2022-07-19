import React, { useState } from 'react'
import { toast } from "react-toastify"

const Contact = () => {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    if(subject.trim() !== "" && message.trim() !== ""){
      toast.success("Gönderildi.")
      setSubject("")
      setMessage("")
      setError("")
    }else{
      setError("Boş alan bırakılamaz.")
    }
  }


  return (
    <section id="contact">
      
      <div className="bg-primary text-white text-center py-3 mb-5">
        <h3>İletişim</h3>
      </div>

      <iframe className='d-block w-100 mb-5' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d807882.7561766816!2d27.933811999999996!3d37.7245595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b92b7a19c62dd5%3A0x62dc45d4e8bbe21e!2zQXlkxLFu!5e0!3m2!1str!2str!4v1657965432499!5m2!1str!2str" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>


      <div className='row'>

        {/* address */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h3>Adres:</h3>
              <hr />
              <div className="w-100 mb-2">
                <i className="fas fa-map-pin mr-1"></i> Hacı Hüsrev Mahallsesi Nergis Sokak No: 13/6 Kızılca/UŞAK
              </div>
              <div className="w-100 mb-2">
                <i className="fas fa-phone mr-1"></i> 0 202 333 55 33
              </div>
              <div className="w-100 mb-2">
                <i className="far fa-envelope-open mr-1"></i> info@birsirket.com
              </div>
              <div className="w-100 mb-2">
                <i className="fas fa-globe-americas mr-1"></i> www.birsirket.com
              </div>
            </div>
          </div>
        </div>

        {/* send us a message form */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Bize Mesaj Atınız!</div>
            <div className="card-body">

              { error && (
                <div className="alert alert-warning">
                  { error }
                </div>
              ) }

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Konu:</label>
                  <input value={subject} onChange={e => setSubject(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Mesajınız:</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" className="form-control"></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Gönder</button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Contact