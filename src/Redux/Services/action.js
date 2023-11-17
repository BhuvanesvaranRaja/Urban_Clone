import axios from "axios";
import { getService } from "../../Api/getServices";

export const GET_ALLPRODUCT_DATA_REQUEST = "GET_ALLPRODUCT_DATA_REQUEST";
export const GET_ALLPRODUCT_DATA_SUCCESS = "GET_ALLPRODUCT_DATA_SUCCESS";
export const GET_ALLPRODUCT_DATA_FAILURE = "GET_ALLPRODUCT_DATA_FAILURE";

export const ADD_REQUEST = "ADD_REQUEST";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAILURE = "ADD_FAILURE";

export const getAllProductsDataRequest = () => ({
  type: GET_ALLPRODUCT_DATA_REQUEST,
});

export const getAllProductsDataSuccess = (data) => ({
  type: GET_ALLPRODUCT_DATA_SUCCESS,
  payload: data,
});

export const getAllProductsDataFailure = () => ({
  type: GET_ALLPRODUCT_DATA_FAILURE,
});

export const getAllProducts = (city) => (dispatch) => {
  dispatch(getAllProductsDataRequest());
  getService
    .get(`/cities?city=${city}`)
    .then((res) => {
      dispatch(getAllProductsDataSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getAllProductsDataFailure());
    });
};

//// service centers

export const GET_ALL_SERVICE_CENTERS_REQUEST =
  "GET_ALL_SERVICE_CENTERS_REQUEST";
export const GET_ALL_SERVICE_CENTERS_SUCCESS =
  "GET_ALL_SERVICE_CENTERS_SUCCESS";
export const GET_ALL_SERVICE_CENTERS_FAILURE =
  "GET_ALL_SERVICE_CENTERS_FAILURE";

export const getAllServiceCentersRequest = () => ({
  type: GET_ALL_SERVICE_CENTERS_REQUEST,
});

export const getAllServiceCentersSuccess = (data) => ({
  type: GET_ALL_SERVICE_CENTERS_SUCCESS,
  payload: data,
});

export const getAllServiceCentersFailure = () => ({
  type: GET_ALL_SERVICE_CENTERS_FAILURE,
});

export const getAllServiceCenters = (city) => (dispatch) => {
  dispatch(getAllServiceCentersRequest());
  getService
    .get(`/service_centers?city=${city}`)
    .then((res) => {
      dispatch(getAllServiceCentersSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getAllServiceCentersFailure());
    });
};
export const addRequest = () => ({
  type: ADD_REQUEST,
});

export const addSuccess = (data) => ({
  type: ADD_SUCCESS,
  payload: data,
});

export const addFailure = () => ({
  type: ADD_FAILURE,
});

// export const addProducts = (payload) => (dispatch) => {
//   dispatch(addRequest());
//   axios
//     .post("http://localhost:8080/cart", payload)
//     .then((res) => {
//       dispatch(addSuccess(res.data));
//     })
//     .catch((err) => {
//       dispatch(addFailure());
//     });
// };
