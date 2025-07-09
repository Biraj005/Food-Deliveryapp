import React, { useState } from 'react'
import './Home.css' 
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/Exploremenu/ExploreMenu'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay';
import AppDownLoad from '../../components/MobileDownload/AppDownLoad';
function Home() {
  const [category,setCategory] = useState('All');
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category}/>
        <AppDownLoad/>
    </div>
  )
}

export default Home