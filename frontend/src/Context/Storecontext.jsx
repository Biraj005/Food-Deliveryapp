import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {


    const [cardItems, setCardItems] = useState({});
    const addToCart = (itemId) => {

        if (!cardItems[itemId]) {
            setCardItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCardItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

    }
    const removeFromCart = (itemId) => {

        setCardItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))

    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const [key, val] in cardItems) {
            let price = food_list.find((item) => item._id == key);
            totalAmount += Number(price.price) * cardItems[key];
        }
        return totalAmount;
    }
    const contextValue = {
        food_list,
        cardItems,
        setCardItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount

    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}