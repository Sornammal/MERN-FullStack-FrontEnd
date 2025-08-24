import api from "../client/axios";

// Example service function to fetch home data
export const fetchHomeDataService = async () => {
  const response = await api.get('/products/getProductsData');
  console.log(response, "response")
  return response.data;
};

export const registerUserService = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUserService = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
// Get cart items
export const getCartService = async () => {
  try {
    const response = await api.get("/cart");
    return response;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Add item to cart
export const addToCartService = async (productId, qty) => {
  try {
    const response = await api.post("/cart", { productId, qty });
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Update cart item
export const updateCartItemService = async (productId, qty) => {
  try {
    const response = await api.put(`/cart`, { productId, qty });
    return response;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

// Remove item from cart
export const removeCartItemService = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}`);
    return response;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};
