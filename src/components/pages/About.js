import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'

const About = () => {
  const { checkIsAdmin, isAdmin } = useContext(UserContext)

  useEffect(() => {
    checkIsAdmin()
  }, [])

  return (
    <section id="about">
      {/* { console.log(isAdmin) } */}
      <div className="bg-primary text-white text-center py-3 mb-5">
        <h3>Hakkımızda</h3>
      </div>

      <div className='mb-5'>

        <h3 className='mb-3'>En Yeni Bloglar</h3>
        <hr />

        <div className="row">

          <div className="col-lg-6 col-md-9 mx-auto">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <div className="card-img">
                      <img src="/img/category-1.jpg" className="img-fluid img-hover rounded-start" alt="..." />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Blog 1</h5>
                      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="col-lg-6 col-md-9 mx-auto">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <div className="card-img">
                      <img src="/img/category-2.jpg" className="img-fluid img-hover rounded-start" alt="..." />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Blog 2</h5>
                      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="col-lg-6 col-md-9 mx-auto">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <div className="card-img">
                      <img src="/img/category-3.jpg" className="img-fluid img-hover rounded-start" alt="..." />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Blog 3</h5>
                      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          
        </div>

      </div>

      <div className='mb-5'>
        <h3 className='mb-3'>Yorumlarınız</h3>
        <hr />

        <div className="row g-3">
          
          <div className="col-md-4">
            <div className="card">
              <img src="/img/pic-1.png" alt="" className="img-fluid d-block w-25 mx-auto rounded-circle my-3" />
              <div className="card-body">
                <h5 className="card-title text-decoration-underline fw-bold">Kevin</h5>
                <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odio nihil nemo recusandae dolorem explicabo?</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <img src="/img/pic-2.png" alt="" className="img-fluid d-block w-25 mx-auto rounded-circle my-3" />
              <div className="card-body">
                <h5 className="card-title text-decoration-underline fw-bold">Isabel</h5>
                <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odio nihil nemo recusandae dolorem explicabo?</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-5">
            <div className="card">
              <img src="/img/pic-3.png" alt="" className="img-fluid d-block w-25 mx-auto rounded-circle my-3" />
              <div className="card-body">
                <h5 className="card-title text-decoration-underline fw-bold">Joshua</h5>
                <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odio nihil nemo recusandae dolorem explicabo?</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default About