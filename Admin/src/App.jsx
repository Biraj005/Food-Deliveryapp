import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


export default function App() {


  return (
    <div>
      <ToastContainer />

      <Navbar />
      <hr />
      <div className="app-component">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}
