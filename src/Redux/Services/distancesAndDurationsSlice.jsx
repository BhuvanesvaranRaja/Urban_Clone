// distancesAndDurationsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const distancesAndDurations = createSlice({
  name: "distancesAndDurations",
  initialState: {
    distance: localStorage.getItem("distanceAndDuration") || [],
  },
  reducers: {
    distanceAndDuration: (state, action) => {
      state.distance = action.payload;
      localStorage.setItem(
        "distanceAndDuration",
        JSON.stringify(state.distance)
      );
    },
  },
});

export const { distanceAndDuration } = distancesAndDurations.actions;
export default distancesAndDurations.reducer;
