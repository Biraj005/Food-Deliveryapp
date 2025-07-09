import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './LogInPopup.css'
function LogInPopup({setShowLogin}) {

    const [currState,setCurrState] = useState('Login')
  return (
    <div className='login-popup'>
         <form className="login-pop-up-container">
            <div className="log-in-pop-up-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currState==='Login'?<></>: <input type="text" name="name" placeholder='Enter Your Name' required />}
                <input type="email" name="email" placeholder='Enter Your Email' required/>
                <input type="password" name="password" required placeholder='Enter Password' />
            </div>
            <button>{currState=='sign-up'?"Create Acccount":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required  />
                <p>By continuing, i agree to the use & policy .</p>
            </div>
            {currState==='Login'?
            <p>Create a new account ? <span onClick={()=>setCurrState('sign-up')}>Click here</span></p>
            :<p>Already have an account ? <span onClick={()=>setCurrState('Login')}>Login here</span></p>}
            
         </form>
    </div>
  )
}

export default LogInPopup