import React from 'react'
import './Verify.css'
import { useState } from 'react'

function Verify() {

    const [searchparams,setSearchparams] = useState();
    const success = searchparams.get("success");
    const orderId = searchparams.get("orderId");
    
    console.log(success,orderId);

  return (
    <div>Verify</div>
  )
}

export default Verify