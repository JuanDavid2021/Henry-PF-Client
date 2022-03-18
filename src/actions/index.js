const axios = require("axios");
const action = require("../action-types");

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

async function apiGetAllUsers() {
  try {
    const response = await axios.get(`http://localhost:3001/user/all`);
    return response.data;
  } catch (error) {
    console.log(`error en /actions apiGetAllUsers, ${error}`);
    return [];
  }
}

async function apiAddUser(data) {
  try {
    const response = await axios.post(`http://localhost:3001/user/create`, { data });
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiDeleteUser, ${error}`;
    return { error: err };
  }
}

async function apiUpdateUser(data) {
  try {
    const response = await axios.put(`http://localhost:3001/user/update`, { data });
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiUpdateUser, ${error}`;
    return { error: err };
  }
}

async function apiDeleteUser(id) {
  try {
    const response = await axios.delete(`http://localhost:3001/user/delete/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiDeleteUser, ${error}`;
    return { error: err };
  }
}

async function apiGetAllProducts() {
  try {
    const response = await axios.get(`http://localhost:3001/product/all`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiGetAllProducts, ${error}`;
    return { error: err };
  }
}

async function apiGetProductDetails(id) {
  try {
    const response = await axios.get(`http://localhost:3001/product/get/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetProductDetails, ${error}`;
    return { error: err, id: null };
  }
}

async function apiGetAllCategories() {
  try {
    const response = await axios.get(`http://localhost:3001/category/all`);
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetAllCategories, ${error}`;
    return { error: err };
  }
}

//PRODUCT...

function addProduct(data) {
  return (dispatch) => {
    dispatch({
      type: action.addProduct,
      payload: data,
    });
  };
}

function deleteProduct(data) {
  return (dispatch) => {
    dispatch({
      type: action.deleteProduct,
      payload: data,
    });
  };
}

function editProduct(data) {
  return (dispatch) => {
    dispatch({
      type: action.editProduct,
      payload: data,
    });
  };
}

function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: action.gettingProducts, payload: true });
      const products = await apiGetAllProducts();
      if (products.error) {
        return dispatch({ type: action.gettingProducts, payload: false });
      } else {
        return dispatch({ type: action.setProducts, payload: products });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

function getProductDetails(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: action.gettingProductDetails, payload: true });
      const productDetails = await apiGetProductDetails(id);
      if (productDetails.error) {
        return dispatch({ type: action.gettingProductDetails, payload: false });
      } else {
        return dispatch({ type: action.setProductDetails, payload: productDetails });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

function addCategory(data) {
  return (dispatch) => {
    dispatch({
      type: action.addCategory,
      payload: data,
    });
  };
}

function deleteCategory(data) {
  return (dispatch) => {
    dispatch({
      type: action.deleteCategory,
      payload: data,
    });
  };
}

function rateProduct(data) {
  return (dispatch) => {
    dispatch({
      type: action.rateProduct,
      payload: data,
    });
  };
}

function addProductComment(data) {
  return (dispatch) => {
    dispatch({
      type: action.addProductComment,
      payload: data,
    });
  };
}

function deleteProductComment(data) {
  return (dispatch) => {
    dispatch({
      type: action.deleteProductComment,
      payload: data,
    });
  };
}

//USER...
function getUsers() {
  return async (dispatch) => {
    try {
      dispatch({ type: action.gettingUsers, payload: true });
      const users = await apiGetAllUsers();
      if (users.error) {
        return dispatch({ type: action.gettingUsers, payload: false });
      } else {
        return dispatch({ type: action.setUsers, payload: users });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

//CART
function addCartItem(data) {
  return (dispatch) => {
    dispatch({
      type: action.addCartItem,
      payload: data,
    });
  };
}

function deleteCartItem(data) {
  return (dispatch) => {
    dispatch({
      type: action.deleteCartItem,
      payload: data,
    });
  };
}

function flushCart() {
  return (dispatch) => {
    dispatch({
      type: action.flushCart,
      payload: null,
    });
  };
}

function postNewProducts(payload){
 return async function(dispatch){
   const newProduct= await axios.post("api/product/create", payload)
   return newProduct
 }
}

//SALES...

module.exports = {
  getProducts,
  getUsers,
  addProduct,
  deleteProduct,
  editProduct,
  addCategory,
  deleteCategory,
  rateProduct,
  addProductComment,
  deleteProductComment,
  getProductDetails,
  postNewProducts,

  addCartItem,
  deleteCartItem,
  flushCart,

  orderProducts
};
