// handle user
import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    failed: false
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    loginSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.failed = false;
    },
    logout: (state) => {
      state.data = null;
      state.loading = false;
      state.failed = false;
    }
  }
});


export const { loginStart, loginFailure, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;