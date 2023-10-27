import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";

import thunk from "redux-thunk";
import { AllProductsReducer } from "./Services/reducer";
// import { AuthReducer } from "./AuthReducer/reducer";
import authReducer from "../Redux/Services/authSlice";
import { AppReducer } from "./AppReducer/reducer";
import { distancesDurationsReducer } from "./Services/distancesAndDurationsSlice";
const rootReducer = combineReducers({
  allProduct: AllProductsReducer,
  distancesDurations: distancesDurationsReducer,
  auth: authReducer,
  AppReducer,
});
// AuthReducer,

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
