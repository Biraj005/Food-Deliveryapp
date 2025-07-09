import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext} from '../../Context/Storecontext';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState('Home');
  const { getTotalCartAmount} = useContext(StoreContext);


  return (
    <div className="navbar">

      <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('Home')} className={menu === 'Home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu('Menu')} className={menu === 'Menu' ? 'active' : ''}>Menu</a>
        <a href='#app-download' onClick={() => setMenu('Mobile-app')} className={menu === 'Mobile-app' ? 'active' : ''}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu('contact us')} className={menu === 'contact us' ? 'active' : ''}>contact us</a>
      </ul>

      <div className="nav-bar-right">
          <img className='nav-search' src={assets.search_icon} alt="search" />
          <div className="nav-bar-search-icon">
            <Link to='/cart'>  <img className="bag" src={assets.bag_icon} alt="" /> </Link>
            <div className={getTotalCartAmount()===0?'':'dot'}></div>
          </div>
          <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>

    </div>
  )
}

export default Navbar