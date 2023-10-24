// distancesDurationsActions.js
export const setDistancesAndDurations = (data) => ({
  type: "SET_DISTANCES_DURATIONS",
  payload: data,
});

// distancesDurationsReducer.js
const initialState = [];
export const distancesDurationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DISTANCES_DURATIONS":
      return action.payload;
    default:
      return state;
  }
};
