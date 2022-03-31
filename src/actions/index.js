
import {
  POST_PEDIDO,
  ADD_PRODUCT,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  POST_PRODUCT,
  SET_PLATFORM_USER,
  LOADING,
  RATE_PRODUCT,
  UPDATE_USER,
  SEARCH_PRODUCT,
  SEARCHING_PRODUCT,
  PAGAR_PEDIDO,
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

  USERCREATE,
  LOGINFORGOT,
  USERLOGIN,
  USERLOGINOK,
  USERLOGOUT,
  DELIVERY_CART_ITEMS,
  ADD_ORDER_DATE,
  GET_PEDIDOS,
  GET_PEDIDO_ID,
  PUT_PEDIDO_STATE,
  PUT_CATEGORY

} from './../action-types/index';
const axios = require("axios");


//LOADING..
export function loading() {
  return {
    type: LOADING
  }
}


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

export function logoutuser(payload){

 return function(dispatch){
    return dispatch({
      type: USERLOGOUT,
      payload: payload
    })
 }
}




export const login=(payload)=>{
  
 return async function (dispatch){
   return dispatch({
     type: USERLOGINOK,
     payload:payload
   })
 } }


export const searchProduct = (producto) => {
  return async function (dispatch) {
    var busq = await axios("http://localhost:3001/api/product/all")
    return dispatch({
      type: SEARCH_PRODUCT,
      payload: { busq, producto }
    })
  }
}
export const loginUser=(data)=>{
 return async function (dispatch){
   var logUser= await axios.post("http://localhost:3001/api/user/login",data)
   console.log(logUser)
   return dispatch({
     type:USERLOGIN,
     payload: logUser.data
 })
}}

export const order=(payload)=>{
 return{
  type: ORDER_PRODUCTS,
  payload
 }
}


export const createUser = (payload) => {
  return async function (dispatch) {
    var create = await axios.post("http://localhost:3001/api/user/registro", payload)
    console.log(create)
    return create
    /*    return dispatch({
         type: USERCREATE,
         payload: create.data
       }) */
  }
}
// export const searchProduct = (producto) => {
//   return async function (dispatch) {
//     var busq = await axios("http://localhost:3001/api/product/all");
//     return dispatch({
//       type: SEARCH_PRODUCT,
//       payload: { busq, producto }
//     });
//   };
// };

// export const orderPrecio = (payload) => {
//   return {
//     type: ORDER_PRECIO,
//     payload
//   };
// };



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

export async function apiUpdateUser(data) {
  try {
    const response = await axios.put(`http://localhost:3001/api/user/update/${data.correo}`, { data });
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

async function apiDeleteProduct(id) {
  try {
    const response = await axios.delete(`http://localhost:3001/api/product/delete/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiGetAllProducts, ${error}`;
    return { error: err };
  }
}

async function apiUpdateProduct(data) {
  try {
    const response = await axios.put(`http://localhost:3001/api/product/update/${data.id}`);
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

async function apiPutCategory(data) {
  try {
    const response = await axios.put(`http://localhost:3001/api/category/${data.id}`, data);    
    return response;
  } catch (error) {    
    return error
  }
}

async function apiAddCategory(data) {
  try {
    const response = await axios.post(`http://localhost:3001/api/category/new`, data);    
    return response;
  } catch (error) {    
    return error
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

export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      await apiDeleteProduct(id);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (e) {
      console.log(e);
    }
  };
}

export function editProduct(data) {
  return async (dispatch) => {
    try {
      const updated = await apiUpdateProduct(data);
      dispatch({ type: EDIT_PRODUCT, payload: updated });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterProducts(filter) {
  return (dispatch) => {
    dispatch({ type: FILTER_PRODUCTS, payload: filter });
  };
}

export function setPlatformUser(user) {
  return async (dispatch)=>{
    return dispatch({type:SET_PLATFORM_USER, payload:user})
  }
}

export function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_PRODUCTS, payload: true });
      const categories = await apiGetAllCategories();
      if (!categories.error) {
        dispatch({ type: SET_CATEGORIES, payload: categories });
      }
      const products = await apiGetAllProducts();
      if (products.error) {
        return dispatch({ type: GETTING_PRODUCTS, payload: false });
      } else {
        dispatch({ type: SET_FILTERED_PRODUCTS, payload: products});
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

export function getAllCategories() {
  return async (dispatch) => {
    try {
      const allCategories = apiGetAllCategories
    if (!allCategories.error) {
        dispatch({ type: SET_CATEGORIES, payload: allCategories });
      }
    } catch (error) {
      console.log(error)
    }    
  }
}

export function putCategory(payload) {
  return async (dispatch) => {
    try {     
      const editedCategory = await apiPutCategory(payload)
      if (editedCategory.status === 200) {
        dispatch({ type: PUT_CATEGORY, payload: payload })
      }      
      return editedCategory            
    } catch (error) {
      console.log(error)
      return error
    }    
  }
}

export function addCategory(payload) {
  return async (dispatch) => {
    try {     
      const createdCategory = await apiAddCategory(payload)     
      if (createdCategory.status === 200) {
        dispatch({ type: ADD_CATEGORY, payload:createdCategory.data })
      }
      return createdCategory          
    } catch (error) {
      console.log(error)
      return error
    }    
  }
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

export function deleteUser(id) {
  return async (dispatch) => {
    try {
      await apiDeleteUser(id);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateUser(data) {
  return async (dispatch) => {
    try {
      const updated = await apiUpdateUser(data);
      dispatch({ type: UPDATE_USER, payload: updated });
    } catch (e) {
      console.log(e);
    }
  };
}

//CART

export function addCartItem(data) {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];


    const index = cartLocal.findIndex(e => e.id === data.id && e.tipo_corte === data.tipo_corte && e.peso === data.peso);

    if (index !== -1) {
      let itemMod = cartLocal[index];

      itemMod = {
        ...itemMod,
        precioTotal: itemMod.precio * itemMod.peso,
        cantidad: Number(itemMod.cantidad) + 1
      };

      cartLocal.splice(index, 1, itemMod);
    } else {
      cartLocal.push(data);
    }

    localStorage.setItem("cart", JSON.stringify(cartLocal));

    dispatch({
      type: ADD_CART_ITEM,
      payload: cartLocal,
    });
  };
}

export function setCartItem(data) {
  return (dispatch) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart"));
    const index = cartLocal.findIndex(e => (e.id === data.id && e.tipo_corte === data.tipo_corte && e.peso === data.peso));

    if (index !== -1) {
      let itemMod = cartLocal[index];

      itemMod = {
        ...itemMod,
        cantidad: data.cantidad
      };

      cartLocal.splice(index, 1, itemMod);
    }

    localStorage.setItem("cart", JSON.stringify(cartLocal));

    dispatch({
      type: SET_CART_ITEM,
      payload: cartLocal,
    });
  };
}

export function deleteCartItem(data) {

  let cartLocal = JSON.parse(localStorage.getItem("cart"));

  const index = cartLocal.findIndex(e => (e.id === data.id && e.tipo_corte === data.tipo_corte && e.peso === data.peso));

  cartLocal.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cartLocal));

  return (dispatch) => {
    dispatch({
      type: DELETE_CART_ITEM,
      payload: cartLocal,
    });
  };
}

export function addOrderDate(data) {
  console.log("data date", data);
  return (dispatch) => {
    dispatch({
      type: ADD_ORDER_DATE,
      payload: data,
    });
  };
}

export function setDelivery(data) {
  console.log("SET_DELIVERY", data);
  return (dispatch) => {
    dispatch({
      type: DELIVERY_CART_ITEMS,
      payload: data,
    });
  };
}

export function flushCart() {
  return (dispatch) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart"))
    cartLocal = []
    localStorage.setItem("cart", JSON.stringify(cartLocal))

    dispatch({
      type: FLUSH_CART,
      payload: cartLocal,
    });
  }
}



export function postProduct(payload) {

  return async function (dispatch) {
    try {
      const newProduct = await axios.post("http://localhost:3001/api/product/create", payload);
      if (newProduct.status === 200) {
        dispatch({
          type: ADD_PRODUCT,
          payload: { ...newProduct.data, new: true }
        });
      }
      return newProduct;
    } catch (error) {
      return { status: 400, error: error };
    }

  };
}
export function putProduct(payload) {

  return async function (dispatch) {
    try {
      const updatedProduct = await axios.put(`http://localhost:3001/api/product/update/${payload.id}`, payload);      
      if (updatedProduct.status === 200) {        
        dispatch({
          type: PUT_PRODUCT,
          payload: updatedProduct.data
        });
      }
      return updatedProduct;
    } catch (error) {
      return { status: 400, error: error };
    }

  };

}

export function postPedido(payload) {
  return async function (dispatch) {
    try {
      const newPedido = await axios.post("http://localhost:3001/api/pedido/create", payload);
      if (newPedido.status === 200) {
        dispatch({
          type: POST_PEDIDO,
          payload: newPedido.data
        });
      }
      return newPedido;
    } catch (error) {
      console.log(error);


    }
  };
}


export function pagarPedido(payload) {
  return async function (dispatch) {
    dispatch(loading())
    try {
      const pagoPedido = await axios.post("http://localhost:3001/api/mercadopago", payload);
      if (pagoPedido.status === 200) {
        dispatch({
          type: PAGAR_PEDIDO,
          payload: pagoPedido.data
        });
      }
      return pagoPedido;
    } catch (error) {
      console.log(error);
    }

  };
}

export function getPedidos(payload) {
  return async function (dispatch) {
    try {
      if (typeof payload === 'object') {
        const pedidos = await axios.get(`http://localhost:3001/api/pedido/all`, {
          headers: {
            token: payload.token
          }
        });
        if (pedidos.status === 200) {
          dispatch({
            type: GET_PEDIDOS,
            payload: pedidos.data
          });
        }
      } else {
        const pedido = await axios.get("http://localhost:3001/api/pedido/get/"+payload);
        if (pedido.status === 200) {
          dispatch({
            type: GET_PEDIDO_ID,
            payload: pedido.data
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

  };
}

export function putPedidos(payload) {
  return async function (dispatch) {
    try {
        const pedido = await axios.get("http://localhost:3001/api/pedido/update/"+payload);
        if (pedido.status === 200) {
          dispatch({
            type: PUT_PEDIDO_STATE,
            payload: pedido.data
          });
        }
    } catch (error) {
      console.log(error);
    }

  };
}

//SALES...

