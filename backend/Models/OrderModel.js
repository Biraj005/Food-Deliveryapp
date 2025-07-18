import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const orderModel = mongoose.model.order || mongoose.model("order", orderShema);

export default orderModel;