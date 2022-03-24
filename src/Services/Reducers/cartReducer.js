// handle cart
import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // cart actions
    add: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    remove: (state, action) => {
      state.items = state.items.filter(item => item.id === action.payload);
    },
    empty: (state) => {
      state.items = [];
    }
  }
});


export const { add, remove, empty } = cartSlice.actions;
export default cartSlice.reducer;