import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

function Orders({ url }) {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    const response = await axios.get("http://localhost:4000/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);


    } else {
      toast.error("Error");
    }

  }
  const statusHanler = async (event, orderId) => {
    const respons = await axios.post("http://localhost:4000/api/order/status", {
      orderId,
      status: event.target.value
    })

    if (respons.data.success) {
      await fetchAllOrders();

    } else {


    }


  }
  useEffect(() => {
    fetchAllOrders();

  }, [])


  return (
    <div className='order add'>
      <h3>Order page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>

            <img src={assets.parcel_icon} alt="" />
            <div>

              <p className="order-item-food">
                {order.items.map((item, index) => {

                  if (index == order.item.lenght - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantit + ",";

                  }

                })}
              </p>

              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country}</p>

              </div>
              <p className="order-item-phone">{order.address.phone}</p>

            </div>
            <p>Items : {order.items.lenght}</p>
            <p>$ {order.amount}</p>

            <select onChange={(e) => statusHanler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">"Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        )
        )}
      </div>

    </div>
  )
}

export default Orders