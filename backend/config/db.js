import mongoose from "mongoose";

export const connetDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Biraj:Biraj0000@cluster0.keesbbw.mongodb.net/food-delivary"
    )
    .then(() => {
      console.log("Db connected");
    });
};
