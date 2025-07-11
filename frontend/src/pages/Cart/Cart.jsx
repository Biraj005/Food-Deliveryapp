import { useContext } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/Storecontext'

function Cart() {
  const {
    food_list,
    cardItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const deliveryFee = 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee;

  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="card-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cardItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="card-item-title card-item-items">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${Number(item.price).toFixed(2)}</p>
                  <p>{cardItems[item._id]}</p>
                  <p>${(item.price * cardItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          } else return null;
        })}
      </div>

      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button type='submit'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
