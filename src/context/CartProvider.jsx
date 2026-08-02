import { createContext, useState } from "react";

// 1. Create the Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 2. The state that holds all saved inquiry/vault items
  const [cart, setCart] = useState([]);

  // 3. Function to add an artwork/service to the vault
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

  // 4. Function to remove an item from the vault safely supporting both ID types
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== itemId));
  };

  // 5. Function to clear the vault entirely after a brief is submitted
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};