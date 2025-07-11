import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../CartSlice/cartSlice';
import authReducer from "../Authentication/authSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
