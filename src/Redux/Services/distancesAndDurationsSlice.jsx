// distancesAndDurationsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const distancesAndDurationsSlice = createSlice({
  name: "distancesAndDurations",
  initialState: {
    distance: [],
  },
  reducers: {
    setDistancesAndDurations: (state, action) => {
      state.distance = action.payload;
      localStorage.setItem(
        "distanceAndDuration",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setDistancesAndDurations } = distancesAndDurationsSlice.actions;
export default distancesAndDurationsSlice.reducer;
