import { createSlice } from "@reduxjs/toolkit";
  const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: (state, action) => {
      const { serviceData, centerData } = action.payload;
      state.push({ ...serviceData, quantity: 1, centerData });
      saveCartToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 0) {
          item.quantity -= 1;
          if (item.quantity === 0) {
            const index = state.indexOf(item);
            if (index !== -1) {
              state.splice(index, 1);
            }
          }
        }
        saveCartToLocalStorage(state);
      }
    },
    deleteItem: (state, action) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.length) {
        state.splice(index, 1);
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
