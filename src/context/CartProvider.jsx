import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemId = item._id || item.id;
      const alreadyInVault = prevCart.find((i) => (i._id || i.id) === itemId);
      if (alreadyInVault) {
        alert("This item is already in your Inquiry Vault!");
        return prevCart;
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};