import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

function ExploreMenu({ category, setCategory }) {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Craving something tasty? Explore a variety of dishes from your favorite local
                restaurants. Order now and get fresh, hot meals delivered right to your door.</p>
            <div className="explore-menu-list">
                {menu_list.map((menuItem, idx) => {

                    return (
                        <div onClick={() => setCategory(prev => prev === menuItem.menu_name ? 'All' : menuItem.menu_name)} key={idx} className='explore-menu-list-item'>
                            <img className={category === menuItem.menu_name ? "active" : ""} src={menuItem.menu_image} alt="menuItem" />
                            <p>{menuItem.menu_name}</p>
                        </div>

                    )
                }
                )}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu