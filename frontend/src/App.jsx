import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Place order/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LogInPopup from './components/LogIn/LogInPopup'

function App() {
  const [showLogin,setShowLogin] = useState(false);
  return <>
      {
        showLogin?<LogInPopup setShowLogin={setShowLogin}/>:<></>
      }
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/order' element={<Placeorder/>} />
      </Routes>

    </div>
    <Footer/>
  </>
}

export default App