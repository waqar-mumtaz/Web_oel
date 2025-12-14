import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("cart");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading cart from storage:", error);
  }
  return { items: [], totalItems: 0, totalAmount: 0 };
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, name, price, image, stockQuantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        // Check stock limit
        if (existingItem.quantity < stockQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          _id,
          name,
          price,
          image,
          quantity: 1,
          stockQuantity,
        });
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item._id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== productId);
        } else if (quantity <= item.stockQuantity) {
          item.quantity = quantity;
        }
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
