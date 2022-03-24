// handle products
import { createSlice } from "@reduxjs/toolkit";


export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    all: [],
    filtered: [],
    currentProduct: {
      id: null
    },
    newProduct: {},
    loading: false,
    failed: false
  },
  reducers: {
    // todos los productos
    getAllProductsStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    getAllProductsFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.all = action.payload;
      state.loading = false;
      state.failed = false;
    },

    // pedir productos ordenados
    sortProductsStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    sortProductsFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    sortProductsSuccess: (state, action) => {
      state.all = action.payload;
      state.loading = false;
      state.failed = false;
    },

    // filtrar productos
    filterProductsStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    filterProductsFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    filterProductsSuccess: (state, action) => {
      // nepundor: tal vez deberia actualizar la propiedad 'all'
      state.filtered = action.payload;
      state.loading = false;
      state.failed = false;
    },

    // traer un producto por id
    getProductByIdStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    getProductByIdFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    getProductByIdSuccess: (state, action) => {
      state.currentProduct = action.payload;
      state.loading = false;
      state.failed = false;
    },

    // crear nuevo producto
    postNewProductStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    postNewProductFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    postNewProductSuccess: (state, action) => {
      // nepundir: logica provisional
      state.all = [...state.all, action.payload];
      state.loading = false;
      state.failed = false;
    },

    // actualizar un producto
    updateProductStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    updateProductFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    updateProductSuccess: (state, action) => {
      // nepundir: logica provisional
      state.all = [...state.all, action.payload];
      state.loading = false;
      state.failed = false;
    },

    // desactivar un producto
    deactivateProductStart: (state) => {
      state.loading = true;
      state.failed = false;
    },
    deactivateProductFailure: (state) => {
      state.loading = false;
      state.failed = true;
    },
    deactivateProductSuccess: (state, action) => {
      // nepundir: logica provisional
      state.all = state.all.filter(product => product.id !== action.payload.id).concat(action.payload);
      state.loading = false;
      state.failed = false;
    },
  }
});


export const { 
  getAllProductsStart,
  getAllProductsFailure,
  getAllProductsSuccess,
  sortProductsStart,
  sortProductsFailure,
  sortProductsSuccess,
  filterProductsStart,
  filterProductsFailure,
  filterProductsSuccess,
  getProductByIdStart,
  getProductByIdFailure,
  getProductByIdSuccess,
  postNewProductStart,
  postNewProductFailure,
  postNewProductSuccess,
  updateProductStart,
  updateProductFailure,
  updateProductSuccess,
  deactivateProductStart,
  deactivateProductFailure,
  deactivateProductSuccess
} = productsSlice.actions;


export default productsSlice.reducer;