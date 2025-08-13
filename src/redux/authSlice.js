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
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.accountType = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
