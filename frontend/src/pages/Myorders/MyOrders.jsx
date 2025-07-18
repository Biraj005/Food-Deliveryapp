import React from 'react'
import "./MyOrders.css"
import { useState } from 'react'
import { useContext } from 'react';
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';


function MyOrders() {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const FetchOrders = async ()=>{

        const response = await axios.post(url+"/api/userorders",{},{headers:{token}});
        setData(response.data.data);
    }
    useEffect(()=>{

        if(token){
            FetchOrders();
        }

    },[token])



  return (
    <div className='myorders'>
        <h2>My orders</h2>
        <div className="container">
            {data.map((item1,index)=>{
                return <div key={index} className='my-orders-order'> 
                     <img src={assets.parcel_icon} alt="" />
                     <p>{item1.items.map((item,index2)=>{
                        if(index2==item.items.lenght-1){
                            return item.name+"x"+item.quantity
                        }else{
                            return item.name+"x"+item.quantity+","
                        }

                     })}</p>
                     <p>${item1.amount}</p>
                     <P>Items : {item1.items.lenght}</P>
                     <p><span>&#x25cf</span><b>{item1.status}</b></p>
                     <button>Track Order</button>
                </div>
            })}
        </div>
    </div>

  )
}

export default MyOrders