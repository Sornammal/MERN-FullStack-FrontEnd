// src/context/CartContext.js
import { createContext, useContext, useState } from "react";
import {
  getCartService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
} from "../services/homeService";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const { data } = await getCartService();
    setCartItems(data);
  };

  const addToCart = async (product,qty) => {
    await addToCartService(product._id, qty);
    fetchCart();
  };

  const updateQty = async (id,qty) => {
    await updateCartItemService(id, qty);
    fetchCart();
  };

  const removeFromCart = async (id) => {
    await removeCartItemService(id);
    fetchCart();
  };

  const value = { cartItems, addToCart, updateQty, removeFromCart,fetchCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
