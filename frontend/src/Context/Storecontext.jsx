import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cardItems, setCardItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const url = "http://localhost:4000";

  const addToCart = (itemId) => {
    setCardItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCardItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const [key, val] of Object.entries(cardItems)) {
      const item = food_list.find((item) => item._id === key);
      if (item) {
        totalAmount += Number(item.price) * val;
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFood_list(response.data.data);
    } catch (err) {
      console.error("Error fetching food list:", err.message);
    }
  };

  useEffect(() => {
    fetchFoodList();
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const contextValue = {
    food_list,
    cardItems,
    setCardItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
