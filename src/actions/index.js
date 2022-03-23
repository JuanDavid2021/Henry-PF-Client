import {
  ADD_PRODUCT, 
  DELETE_PRODUCT, 
  EDIT_PRODUCT, 
  POST_PRODUCT, 
  RATE_PRODUCT, 
  SEARCH_PRODUCT, 
  SEARCHING_PRODUCT, 
  GETTING_PRODUCTS, 
  SET_PRODUCTS, 
  SET_FILTERED_PRODUCTS,
  ORDER_PRODUCTS,
  GETTING_PRODUCT_DETAILS, 
  SET_PRODUCT_DETAILS, 
  SET_PRODUCT_DETAILS_FRONT, 
  ADD_CART_ITEM, 
  DELETE_CART_ITEM, 
  FLUSH_CART, 
  ADD_PRODUCT_COMMENT, 
  ADD_CATEGORY, 
  SET_CATEGORIES,
  DELETE_CATEGORY, 
  DELETE_PRODUCT_COMMENT, 
  SET_USERS,
  DELETE_USER, 
  GETTING_USERS, 
  FILTER_PRODUCTS, 
  FILTERING_PRODUCTS, 
  FORCE_PASSWORD_RESET, 
  GET_COMMENTS, 
  GET_SALES, 
  EDIT_SALE_STATUS, 
  ORDER_PRECIO,
  SET_CART_ITEM,
  DELIVERY_CART_ITEMS,
} from './../action-types/index';
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

export function filterProducts(filter) {
  return (dispatch)=>{   
      dispatch({type:FILTER_PRODUCTS, payload:filter})    
  }
}

export function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_PRODUCTS, payload: true });
      const categories = await apiGetAllCategories()
      if (!categories.error) {
        dispatch({ type: SET_CATEGORIES, payload:categories })
      }            
      const products = await apiGetAllProducts();
      if (products.error) {
        return dispatch({ type: GETTING_PRODUCTS, payload: false });
      } else {        
        dispatch({ type:SET_FILTERED_PRODUCTS, payload:products.filter(e=>e.stock>0) })
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
    const cartLocal =  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : []

    const index = cartLocal.findIndex(e => e.id === data.id && e.tipo_corte === data.tipo_corte && e.peso === data.peso)
    
    if (index !== -1) {
      let itemMod = cartLocal[index]
      
      itemMod = {
        ...itemMod,
        precioTotal: itemMod.precio * itemMod.peso,
        cantidad: Number(itemMod.cantidad) + 1
      }
  
      cartLocal.splice(index,1,itemMod)
    }else{
      cartLocal.push(data)
    }
  
    localStorage.setItem("cart", JSON.stringify(cartLocal))

    dispatch({
      type: ADD_CART_ITEM,
      payload: cartLocal,
    });
  };
}

export function setCartItem(data) {
  return (dispatch) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart"))
    const index = cartLocal.findIndex(e => (e.id === data.id && e.tipo_corte === data.tipo_corte && e.peso === data.peso))

    if (index !== -1) {
      let itemMod = cartLocal[index]
      
      itemMod = {
        ...itemMod,
        cantidad: data.cantidad
      }
  
      cartLocal.splice(index,1,itemMod)
    }
    
    localStorage.setItem("cart", JSON.stringify(cartLocal))

    dispatch({
      type: SET_CART_ITEM,
      payload: cartLocal,
    });
  }
}

export function deleteCartItem(data) {
  
  let cartLocal = JSON.parse(localStorage.getItem("cart"))

  const index = cartLocal.findIndex(e => (e.id === data.id && e.tipo_corte === data.tipo_corte && e.peso === data.peso))

  cartLocal.splice(index,1)

  localStorage.setItem("cart", JSON.stringify(cartLocal))

  return (dispatch) => {
    dispatch({
      type: DELETE_CART_ITEM,
      payload: cartLocal,
    });
  };
}

export function setDelivery(data) {
  console.log("SET_DELIVERY", data);
  return (dispatch) => {
    dispatch({
      type: DELIVERY_CART_ITEMS,
      payload: data,
    })
  }
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
  console.log(payload)
 return async function(dispatch){
   const newProduct= await axios.post("http://localhost:3001/api/product/create", payload)
   return newProduct
 }
}

//SALES...

