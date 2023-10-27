import { createSlice } from "@reduxjs/toolkit";
const addToCartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { service, centerName } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.service.service_name === service.service_name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ service, quantity: 1, centerName });
      }
    },
    removeFromCart: (state, action) => {
      const { service } = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.service.service_name === service.service_name
      );
      if (index !== -1) {
        if (state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity -= 1;
        } else {
          state.cartItems.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default addToCartSlice.reducer;
