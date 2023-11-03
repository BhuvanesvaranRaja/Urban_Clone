// distancesAndDurationsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const distancesAndDurationsSlice = createSlice({
  name: "distancesAndDurations",
  initialState: {
    distance: [], // Initialize to an empty array
  },
  reducers: {
    setDistancesAndDurations: (state, action) => {
      state.distance = action.payload;
      // Update local storage here (optional)
      localStorage.setItem(
        "distanceAndDuration",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setDistancesAndDurations } = distancesAndDurationsSlice.actions;
export default distancesAndDurationsSlice.reducer;
