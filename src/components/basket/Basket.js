import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import BasketTable from './BasketTable'
import UserContext from "../../context/UserContext"
import BasketContext from '../../context/BasketContext'
import BasketSummary from './BasketSummary'

const Basket = () => {
  const { getLogged, loggedUser } = useContext(UserContext)
  const { getUserBasket, userBasket, basketTotalPrice, basketLength } = useContext(BasketContext)

  useEffect(() => {
    getLogged()
    getUserBasket()
  }, [])

  return (
    <section id='basket'>

      <div className="row">

        <div className="col-md-8">
          <BasketTable />
        </div>

        
        <div className="col-md-3 ms-auto">
          <BasketSummary basketLength={basketLength}  basketTotalPrice={basketTotalPrice} />
        </div>

      </div>
      

    </section>
  )
}

export default Basket