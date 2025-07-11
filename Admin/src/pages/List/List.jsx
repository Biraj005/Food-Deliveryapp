import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
function List() {

  const base_url = 'http://localhost:4000'
  const [list, setList] = useState([]);


  const fetchList = async () => {

    const respons = await axios.get(`${base_url}/api/food/list`);

    if (respons.data.success) {
        setList(respons.data.data);

    } else {
        toast.error(respons.data.message);

    }

  }
  const removeFood  = async (foodId)=>{
      console.log(foodId);
      const respons = await axios.post(`${base_url}/api/food/remove`,{id:foodId});
      await fetchList();

      if(respons.data.success){
            toast.success(respons.data.message);

      }else{
            toast.error(respons.data.message);

      }
     
  }

  useEffect(() => {
    fetchList();

  }, [])

  return (

    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-formate title ">
          <b>Image</b>
          <b >Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-formate'>
              <img src={`${base_url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>$ {item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List