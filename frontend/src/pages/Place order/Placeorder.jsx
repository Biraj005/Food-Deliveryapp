import React from 'react'
import './Placeorder.css'
import {useState} from 'react'
import { StoreContext } from '../../Context/Storecontext'
import { useContext } from 'react'
function Placeorder() {

  const {getTotalCartAmount} = useContext(StoreContext);

  const deliveryFee = 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee;
  return (
    <form className='place-order' action="#">
      <div className="place-order-left">
        <p className="title">Delivary information</p>
        <div className="multi-field">
          <input type="text" placeholder='Fist Name' />
          <input type="text" placeholder='Second Name' />
        </div>
        <input type="email" placeholder='Email add' />
        <input type="text" placeholder='Street' />
        <div className="multi-field">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-field">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${subtotal===0?0:deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${subtotal===0?0:total}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>


      </div>

    </form>
  )
}

export default Placeorder