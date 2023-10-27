import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loginMethod: localStorage.getItem("loginMethod") || null,
    user: JSON.parse(localStorage.getItem("userDetails")) || {
      name: null,
      email: null,
      contact: null,
      profile: null,
    },
  },
  reducers: {
    login: (state, action) => {
      const { token, loginMethod, user } = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      state.loginMethod = loginMethod;
      localStorage.setItem("loginMethod", loginMethod);
      state.user = user;
      localStorage.setItem("userDetails", JSON.stringify(user));
    },
    loginGoogle: (state, action) => {
      const { token, loginMethod, user } = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      state.loginMethod = loginMethod;
      localStorage.setItem("loginMethod", loginMethod);
      state.user = user;
      localStorage.setItem("userDetails", JSON.stringify(user));
    },
    loginFacebook: (state, action) => {
      const { token, loginMethod, user } = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      state.loginMethod = loginMethod;
      localStorage.setItem("loginMethod", loginMethod);
      state.user = user;
      localStorage.setItem("userDetails", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.loginMethod = null;
      localStorage.removeItem("loginMethod");
      state.user = null;
      localStorage.removeItem("userDetails");
    },
    updateContactNumber: (state, action) => {
      state.user.contact = action.payload;
    },
  },
});

export const {
  login,
  loginGoogle,
  loginFacebook,
  logout,
  Googlelogout,
  updateContactNumber,
} = authSlice.actions;
export default authSlice.reducer;
