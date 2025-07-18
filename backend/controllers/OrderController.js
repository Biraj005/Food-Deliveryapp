import orderModel from "../Models/OrderModel.js";
import UserModel from "../Models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const placeOrder = async (req, res) => {
  const frontend_url = `http://localhost:5173`;

  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear cart
    await UserModel.findByIdAndUpdate(userId, { cartdate: {} });

    // Build Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // in paise
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 5000, // ₹50.00
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe order error:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

const verifyOrder  =async (req,res)=>{
   
    const {orderId,success} = req.body;
    try {

      if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"});

      }else{
         await orderModel.findByIdAndUpdate(orderId);
         res.json({success:false,message:"Not paid"})
      }
      
    } catch (error) {

      console.log(error);
      res.json({success:false,message:"Error"});
      
    }

}

export { placeOrder ,verifyOrder};
