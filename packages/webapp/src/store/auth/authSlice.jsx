import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loggedInUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.token = ''; 
      state.loggedInUser = null;

    },

  },
});

export const { setToken, setLoggedInUser, logout } = authSlice.actions;
export default authSlice.reducer;


