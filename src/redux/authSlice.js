// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null, // store JWT token
  accountType: null, // 'admin' or 'user'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
     
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.accountType = action.payload.accountType; 

      //Adding to local storage
      localStorage.setItem("authUser",JSON.stringify(action.payload.user))
      localStorage.setItem("accountType",action.payload.accountType);
      localStorage.setItem("authToken",action.payload.token);


    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.accountType = null;

      //removing from local storage
      localStorage.removeItem("authUser");
      localStorage.removeItem("accountType");
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
