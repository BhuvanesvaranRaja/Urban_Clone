import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: localStorage.getItem("location") || null,
    address: JSON.parse(localStorage.getItem("address")) || null,
    locationMethod: localStorage.getItem("LocationMethod") || null,
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
      console.log("from redux", lat, lng);
      localStorage.setItem("address", JSON.stringify({ lat, lng }));
    },
    locationMethod: (state, action) => {
      state.locationMethod = action.payload;
      localStorage.setItem("LocationMethod", action.payload);
    },
  },
});

export const { location, address, locationMethod } = locationSlice.actions;
export default locationSlice.reducer;
