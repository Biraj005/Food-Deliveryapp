import React, { useContext } from 'react'
import './Fooddisplay.css'
import { StoreContext } from '../../Context/Storecontext'
import Fooditem from '../FoodItem/Fooditem'

function Fooddisplay({ category }) {

    const { food_list } = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if(category ==="All" || category===item.category){
                         return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} img={item.image} />
                    }
                   
                })}
            </div>
        </div>
    )
}

export default Fooddisplay