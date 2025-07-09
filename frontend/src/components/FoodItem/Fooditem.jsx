import React, { useContext, useState } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/Storecontext'
function Fooditem({ id, name, price, description, img }) {

  

  const { cardItems,
    setCardItems,
    addToCart,
    removeFromCart
  } = useContext(StoreContext);

  return (
    <div className='food-item' >
      <div className="food-item-img-container">
        <img className='food-item-image' src={img} alt="fooditem" />
        {
          !cardItems[id]?
          <img className='add' src={assets.add_icon_white} onClick={()=>addToCart(id)}/>
          :<div className='food-item-counter'>
            <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} />
            <p>{cardItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green}/>
            </div>
        }
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>

        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>

      </div>
    </div>
  )
}

export default Fooditem