import FoodModel from "../Models/FoodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const image_filename = req.file?.filename;

    if (!image_filename) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newFood = new FoodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await newFood.save();
    res.json({ success: true, message: "Food added" });
  } catch (err) {
    console.error("Error adding food:", err);
    res.status(500).json({ success: false, message: "Food not added" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.error("❌ Error fetching food list:", err);
    res.status(500).json({ success: false, message: "Error" });
  }
};
const removFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);
    if (food) {
      fs.unlink(`uploads/${food.image}`, () => {});
      await FoodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Deleted" });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (err) {
    console.error("❌ Error deleting food:", err);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

export { addFood, listFood, removFood };
