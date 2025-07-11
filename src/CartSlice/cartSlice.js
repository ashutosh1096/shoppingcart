import { createSlice } from '@reduxjs/toolkit';

const getInitialCartState = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  return storedCart || {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialCartState(),
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalItems += 1;
      state.totalPrice = parseFloat((state.totalPrice + item.price).toFixed(2));
    },

    increaseQty(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice = parseFloat((state.totalPrice + item.price).toFixed(2));
      }
    },

    decreaseQty(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice = parseFloat((state.totalPrice - item.price).toFixed(2));

        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        state.totalItems -= item.quantity;
        state.totalPrice = parseFloat((state.totalPrice - item.price * item.quantity).toFixed(2));
        state.items = state.items.filter(i => i.id !== id);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
