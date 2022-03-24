// handle categories
import { createSlice } from "@reduxjs/toolkit";


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    all: [],
    loading: false,
    failed: false
  },
  reducers: {
    // todas las categorias
    getAllCategoriesStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    getAllCategoriesFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    getAllCategoriesSuccess: (state, action) => {
      state.all = action.payload;
      state.loading = false;
      state.failed = false;
    },

    // crear nueva categoria
    postNewCategoryStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    postNewCategoryFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    postNewCategorySuccess: (state, action) => {
      // nepundir: logica provisional
      state.all = [...state.all, action.payload];
      state.loading = false;
      state.failed = false;
    },

    // actualizar una categoria
    updateCategoryStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    updateCategoryFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    updateCategorySuccess: (state, action) => {
      // nepundir: logica provisional
      state.all = state.all.filter(category => category.id !== action.payload.id).concat(action.payload);
      state.loading = false;
      state.failed = false;
    },

    // desactivar una categoria
    deactivateCategoryStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    deactivateCategoryFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    deactivateCategorySuccess: (state, action) => {
      // nepundir: logica provisional
      state.all = state.all.filter(product => product.id !== action.payload);
      state.loading = false;
      state.failed = false;
    },
  }
});


export const { 
  getAllCategoriesStart,
  getAllCategoriesFailure,
  getAllCategoriesSuccess,
  postNewCategoryStart,
  postNewCategoryFailure,
  postNewCategorySuccess,
  updateCategoryStart,
  updateCategoryFailure,
  updateCategorySuccess,
  deactivateCategoryStart,
  deactivateCategoryFailure,
  deactivateCategorySuccess
} = categoriesSlice.actions;


export default categoriesSlice.reducer;