import UserModel from "../Models/UserModel.js";

const addToCart = async (req, res) => {

  try {
    const userId = req.body.userId;
    const { itemId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = { ...user.cartdate };

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await UserModel.findByIdAndUpdate(userId, { cartdate: cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};


// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = { ...user.cartdate };

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }

      await UserModel.findByIdAndUpdate(userId, { cartdate: cartData });
    }

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:",'[', error,']');
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get cart data
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartdate });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart };
