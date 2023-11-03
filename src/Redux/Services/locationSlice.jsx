import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: localStorage.getItem("location") || null,
    address: localStorage.getItem("address") || null,
  },
  reducers: {
    location: (state, action) => {
      const { city } = action.payload;
      state.location = city;
      localStorage.setItem("location", city);
    },
    address: (state, action) => {
      const { lat, lng } = action.payload;
      state.address = { lat, lng };
      localStorage.setItem("address", `${lat},${lng}`);
    },
  },
});

export const { location, address } = locationSlice.actions;
export default locationSlice.reducer;
