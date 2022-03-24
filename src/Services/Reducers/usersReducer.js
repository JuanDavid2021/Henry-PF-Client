// handle users
import { createSlice } from "@reduxjs/toolkit";


export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: null,
    loading: false,
    failed: false
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.failed = false;
    }
  }
});


export const { fetchStart, fetchFailure, fetchSuccess } = usersSlice.actions;
export default usersSlice.reducer;