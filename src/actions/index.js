import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GETTING_PRODUCTS, SET_PRODUCTS, GETTING_PRODUCT_DETAILS, SET_PRODUCT_DETAILS, ADD_CART_ITEM, ADD_PRODUCT_COMMENT, ADD_CATEGORY, DELETE_CART_ITEM, DELETE_CATEGORY, DELETE_PRODUCT_COMMENT, DELETE_USER, EDIT_SALE_STATUS, FILTERING_PRODUCTS, FILTER_PRODUCTS, FLUSH_CART, FORCE_PASSWORD_RESET, GETTING_USERS, GET_COMMENTS, GET_SALES, POST_PRODUCT, RATE_PRODUCT, SET_PRODUCT_DETAILS_FRONT, SET_USERS,ORDER_PRODUCTS,ORDER_PRECIO, SEARCH_PRODUCT } from './../action-types/index';
const axios = require("axios");

//HELPERS...

function orderProducts(products, orderType) {
  if (orderType === "asc") {
    products.sort(function (a, b) {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return -1;
      return 0;
    });
  } else {
    products.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
  }
  return products;
}

export const searchProduct =(producto)=>{
    return async function(dispatch){
      var busq=await axios("http://localhost:3001/api/product/all")
        return dispatch({
         type: SEARCH_PRODUCT,
         payload: {busq, producto}
        })
    }
  }

export const order=(payload)=>{
 return{
  type: ORDER_PRODUCTS,
  payload
 }
}
export const orderPrecio=(payload)=>{
  return{
   type: ORDER_PRECIO,
   payload
  }
 }

async function apiGetAllUsers() {
  try {
    const response = await axios.get(`http://localhost:3001/api/user/all`);
    return response.data;
  } catch (error) {
    console.log(`error en /actions apiGetAllUsers, ${error}`);
    return [];
  }
}

async function apiAddUser(data) {
  try {
    const response = await axios.post(`http://localhost:3001/api/user/create`, { data });
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiDeleteUser, ${error}`;
    return { error: err };
  }
}

async function apiUpdateUser(data) {
  try {
    const response = await axios.put(`http://localhost:3001/api/user/update`, { data });
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiUpdateUser, ${error}`;
    return { error: err };
  }
}

async function apiDeleteUser(id) {
  try {
    const response = await axios.delete(`http://localhost:3001/api/user/delete/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiDeleteUser, ${error}`;
    return { error: err };
  }
}

async function apiGetAllProducts() {
  try {
    const response = await axios.get(`http://localhost:3001/api/product/all`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiGetAllProducts, ${error}`;
    return { error: err };
  }
}

async function apiGetProductDetails(id) {
  try {
    const response = await axios.get(`http://localhost:3001/api/product/get/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetProductDetails, ${error}`;
    return { error: err, id: null };
  }
}

async function apiGetAllCategories() {
  try {
    const response = await axios.get(`http://localhost:3001/api/category/all`);
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetAllCategories, ${error}`;
    return { error: err };
  }
}

//PRODUCT...

export function addProduct(data) {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT,
      payload: data,
    });
  };
}

export function deleteProduct(data) {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: data,
    });
  };
}

export function editProduct(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_PRODUCT,
      payload: data,
    });
  };
}

export function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_PRODUCTS, payload: true });
      const products = await apiGetAllProducts();
      if (products.error) {
        return dispatch({ type: GETTING_PRODUCTS, payload: false });
      } else {
        return dispatch({ type: SET_PRODUCTS, payload: products });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDetails(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_PRODUCT_DETAILS, payload: true });
      const productDetails = await apiGetProductDetails(id);
      if (productDetails.error) {
        return dispatch({ type: GETTING_PRODUCT_DETAILS, payload: false });
      } else {
        return dispatch({ type: SET_PRODUCT_DETAILS, payload: productDetails });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function addCategory(data) {
  return (dispatch) => {
    dispatch({
      type: ADD_CATEGORY,
      payload: data,
    });
  };
}

export function deleteCategory(data) {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: data,
    });
  };
}

export function rateProduct(data) {
  return (dispatch) => {
    dispatch({
      type: RATE_PRODUCT,
      payload: data,
    });
  };
}

export function addProductComment(data) {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_COMMENT,
      payload: data,
    });
  };
}

export function deleteProductComment(data) {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT_COMMENT,
      payload: data,
    });
  };
}

//USER...
export function getUsers() {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_USERS, payload: true });
      const users = await apiGetAllUsers();
      if (users.error) {
        return dispatch({ type: GETTING_USERS, payload: false });
      } else {
        return dispatch({ type: SET_USERS, payload: users });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

//CART

export function addCartItem(data) {
  return (dispatch) => {
    dispatch({
      type: ADD_CART_ITEM,
      payload: data,
    });
  };
}

export function deleteCartItem(data) {
  return (dispatch) => {
    dispatch({
      type: DELETE_CART_ITEM,
      payload: data,
    });
  };
}

export function flushCart() {
  return (dispatch) => {
    dispatch({
      type: FLUSH_CART,
      payload: null,
    });
  };
}

export function postProducts(payload){
 return async function(dispatch){
   const newProduct= await axios.post("/crear", payload)
   return newProduct
 }
}

//SALES...

