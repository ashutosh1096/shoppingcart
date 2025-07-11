import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
    },
    login(state, action) {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        state.user = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      } else {
        alert("Invalid credentials");
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('cart'); 
      state.loading = false;
    },
    loadUserFromStorage(state) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) state.user = user;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  },
});

export const { register, login, logout, loadUserFromStorage, startLoading, stopLoading } = authSlice.actions;
export default authSlice.reducer;
