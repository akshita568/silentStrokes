import { createContext, useState } from "react";

// 1. Create the Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 2. The state that holds all cart items
  const [cart, setCart] = useState([]);

  // 3. Function to add an artwork to the cart
  const addToCart = (artwork) => {
    setCart((prevCart) => {
      // Prevent adding the exact same unique artwork twice
      const alreadyInCart = prevCart.find((item) => item._id === artwork._id);
      if (alreadyInCart) {
        alert("This artwork is already in your request list!");
        return prevCart;
      }
      return [...prevCart, artwork];
    });
  };

  // 4. Function to remove an item
  const removeFromCart = (artworkId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== artworkId));
  };

  // 5. Function to clear the cart entirely (useful after they submit a request)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};