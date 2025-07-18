import React from 'react'
import './Placeorder.css'
import { useState } from 'react'
import { StoreContext } from '../../Context/Storecontext'
import { useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Placeorder() {

  const { food_list,
    cardItems,
    setCardItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken, } = useContext(StoreContext);

    const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",

  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({ ...prev, [name]: value }));

  }

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {

      if (cardItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cardItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems);
    let orderData = {
      address:data,
      item:orderItems,
      amount:getTotalCartAmount()+2,

    }
    let response  = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{

     if(!token){
         navigate("/cart");
     }else if(getTotalCartAmount()==0){
              navigate("/cart");
     }

  },[token])

  const deliveryFee = 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee;
  return (
    <form onSubmit={placeOrder} className='place-order' action="#">
      <div className="place-order-left">
        <p className="title">Delivary information</p>
        <div className="multi-field">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='Fist Name' />
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Second Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email add' />
        <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
        <div className="multi-field">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-field">
          <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
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
              <p>${subtotal === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${subtotal === 0 ? 0 : total}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>


      </div>

    </form>
  )
}

export default Placeorder