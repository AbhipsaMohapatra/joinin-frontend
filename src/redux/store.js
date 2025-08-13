// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// Load from localStorage
const persistedAuth = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  token: localStorage.getItem('authToken'),
  accountType: localStorage.getItem('accountType'),
  user: JSON.parse(localStorage.getItem('authUser')),
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState:{
    auth:persistedAuth
  },
});

export default store;