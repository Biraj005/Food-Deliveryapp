import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LogInPopup.css'
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios'



function LogInPopup({ setShowLogin }) {

  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",

  });

  const onChangeHanler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(prev => ({ ...prev, [name]: value }));

  }
  const onLogin = async (e) => {
    e.preventDefault();

    let newUrl = url;

    if (currState === 'Login') {
      newUrl += "/api/user/login";
    } else if (currState === 'sign-up') {
      newUrl += "/api/user/register";
    }


    console.log("POST to:", newUrl);

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
      
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error during login/signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-pop-up-container">
        <div className="log-in-pop-up-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState === 'Login' ? <></> : <input type="text" name="name" onChange={onChangeHanler} value={data.name} placeholder='Enter Your Name' required />}
          <input type="email" onChange={onChangeHanler} value={data.email} name="email" placeholder='Enter Your Email' required />
          <input autoComplete="current-password" type="password" onChange={onChangeHanler} value={data.password} name="password" required placeholder='Enter Password' />
        </div>
        <button type='submit'>{currState == 'sign-up' ? "Create Acccount" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the use & policy .</p>
        </div>
        {currState === 'Login' ?
          <p>Create a new account ? <span onClick={() => setCurrState('sign-up')}>Click here</span></p>
          : <p>Already have an account ? <span onClick={() => setCurrState('Login')}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LogInPopup