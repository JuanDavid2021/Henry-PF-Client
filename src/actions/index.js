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
  GET_PORDUCT_PROMO,
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
  ACT_CART,
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
  FILTER_PEDIDO,
  PUT_CATEGORY,
  ADD_PRESENTATION,
  PUT_PRESENTATION,
  SET_PRESENTATIONS,
  FILTER_AUTO,
  ADD_REVIEW,
  GET_USER_BY_ID,
  RESET_ADMIN,
  SET_PROMOCIONES,
  PUT_PROMOCION,
  ADD_PROMOCION,
  GET_WISHLIST,

} from './../action-types/index';
const axios = require("axios");
const  REACT_APP_API_URL  = process.env.REACT_APP_API_URL;


//LOADING..
export function loading() {
  return {
    type: LOADING
  };
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

export function logoutuser(payload) {

  return function (dispatch) {
    return dispatch({
      type: USERLOGOUT,
      payload: payload
    });
  };
}

export const resetAdmin = async (payload) => {
  console.log(payload);
  let userPass = await axios.post(`${REACT_APP_API_URL}/user/resetPasswordAdmin`, payload);
  return userPass;
};


export const login = (payload) => {

  return async function (dispatch) {
    return dispatch({
      type: USERLOGINOK,
      payload: payload
    });
  };
};


export const searchProduct = (producto) => {
  return async function (dispatch) {
    var busq = await axios(`${REACT_APP_API_URL}/product/all`);
    return dispatch({
      type: SEARCH_PRODUCT,
      payload: { busq, producto }
    });
  };
};
export const loginUser = (data) => {
  return async function (dispatch) {
    var logUser = await axios.post(`${REACT_APP_API_URL}/user/login`, data);
    // console.log(logUser)
    return dispatch({
      type: USERLOGIN,
      payload: logUser.data
    });
  };
};

export const order = (payload) => {
  return {
    type: ORDER_PRODUCTS,
    payload
  };
};


export const createUser = (payload) => {
  return async function (dispatch) {
    var create = await axios.post(`${REACT_APP_API_URL}/user/registro`, payload);
    // console.log(create)
    return create;
    /*    return dispatch({
         type: USERCREATE,
         payload: create.data
       }) */
  };
};
// export const searchProduct = (producto) => {
//   return async function (dispatch) {
//     var busq = await axios(`${REACT_APP_API_URL`}/product/all");
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
    const response = await axios.get(`${REACT_APP_API_URL}/user/all`);
    return response.data;
  } catch (error) {
    console.log(`error en /actions apiGetAllUsers, ${error}`);
    return [];
  }
}

async function apiGetUser(id) {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/user/get/${id}`);
    return response.data;
  } catch (error) {
    console.log(`error en /actions apiGetUser: ${error}`);
    return {};
  }
}

async function apiAddUser(data) {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/user/create`, { data });
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiDeleteUser, ${error}`;
    return { error: err };
  }
}

export async function apiUpdateUser(data) {
  try {
    const response = await axios.put(`${REACT_APP_API_URL}/user/update/${data.correo}`, { data });
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiUpdateUser, ${error}`;
    return { error: err };
  }
}

async function apiDeleteUser(id) {
  try {
    const response = await axios.delete(`${REACT_APP_API_URL}/user/delete/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiDeleteUser, ${error}`;
    return { error: err };
  }
}

async function apiGetAllProducts() {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/product/all`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiGetAllProducts, ${error}`;
    return { error: err };
  }
}

async function apiDeleteProduct(id) {
  try {
    const response = await axios.delete(`${REACT_APP_API_URL}/product/delete/${id}`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiGetAllProducts, ${error}`;
    return { error: err };
  }
}

async function apiUpdateProduct(data) {
  try {
    const response = await axios.put(`${REACT_APP_API_URL}/product/update/${data.id}`);
    return response.data;
  } catch (error) {
    let err = `error en FRONT /actions apiGetAllProducts, ${error}`;
    return { error: err };
  }
}

async function apiGetProductDetails(id, currentUser) {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/product/get/${id}`, {
      headers: {
        token: currentUser.token || "invitado"
      }
    });
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetProductDetails, ${error}`;
    return { error: err, id: null };
  }
}

async function apiGetAllCategories() {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/category/all`);
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetAllCategories, ${error}`;
    return { error: err };
  }
}

async function apiPutCategory(data) {
  try {
    const response = await axios.put(`${REACT_APP_API_URL}/category/${data.id}`, data);
    return response;
  } catch (error) {
    return error;
  }
}

async function apiAddCategory(data) {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/category/new`, data);
    return response;
  } catch (error) {
    return error;
  }
}

async function apiGetAllPresentations() {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/presentation/all`);
    return response.data;
  } catch (error) {
    let err = `error en /actions apiGetAllPresentations, ${error}`;
    return { error: err };
  }
}

async function apiPutPresentation(data) {
  try {
    const response = await axios.put(`${REACT_APP_API_URL}/presentation/${data.id}`, data);
    return response;
  } catch (error) {
    return error;
  }
}

async function apiAddPresentation(data) {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/presentation/new`, data);
    return response;
  } catch (error) {
    return error;
  }
}

async function apiAddReview(data, user) {
  try {

    const created = axios.post(`${REACT_APP_API_URL}/review/create/${data.id}`, data, {
      headers: {
        token: user.token
      }
    });
    return created;
  } catch (error) {
    return error;
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


export function addReview(data, user) {
  return async (dispatch) => {
    try {
      const created = await apiAddReview(data, user);
      if (created.status === 200) {
        dispatch({ type: ADD_REVIEW, payload: created.data });
      }
      return created;
    } catch (error) {
      return error;
    }
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

export function filterProductsAuto(name) {
  return (dispatch) => {
    dispatch({ type: FILTER_AUTO, payload: name });
  };
}

export function setPlatformUser(user) {
  return async (dispatch) => {
    return dispatch({ type: SET_PLATFORM_USER, payload: user });
  };
}

export function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_PRODUCTS, payload: true });
      const categories = await apiGetAllCategories();
      if (!categories.error) {
        dispatch({ type: SET_CATEGORIES, payload: categories });
      }
      const presentations = await apiGetAllPresentations();
      if (!presentations.error) {
        dispatch({ type: SET_PRESENTATIONS, payload: presentations });
      }
      const products = await apiGetAllProducts();
      if (products.error) {
        return dispatch({ type: GETTING_PRODUCTS, payload: false });
      } else {
        dispatch({ type: SET_FILTERED_PRODUCTS, payload: products });
        return dispatch({ type: SET_PRODUCTS, payload: products });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDetails(id, currentUser) {
  return async (dispatch) => {
    try {
      dispatch({ type: GETTING_PRODUCT_DETAILS, payload: true });
      const productDetails = await apiGetProductDetails(id, currentUser);
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
      const allCategories = await apiGetAllCategories();
      if (!allCategories.error) {
        dispatch({ type: SET_CATEGORIES, payload: allCategories });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function putCategory(payload) {
  return async (dispatch) => {
    try {
      const editedCategory = await apiPutCategory(payload);
      if (editedCategory.status === 200) {
        dispatch({ type: PUT_CATEGORY, payload: payload });
      }
      return editedCategory;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

export function addCategory(payload) {
  return async (dispatch) => {
    try {
      const createdCategory = await apiAddCategory(payload);
      if (createdCategory.status === 200) {
        dispatch({ type: ADD_CATEGORY, payload: createdCategory.data });
      }
      return createdCategory;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

export function getAllPresentations() {
  return async (dispatch) => {
    try {
      const allPresentations = await apiGetAllPresentations();
      console.log(allPresentations);
      if (!allPresentations.error) {
        dispatch({ type: SET_PRESENTATIONS, payload: allPresentations });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function putPresentation(payload) {
  return async (dispatch) => {
    try {
      const editedPresentation = await apiPutPresentation(payload);
      if (editedPresentation.status === 200) {
        dispatch({ type: PUT_PRESENTATION, payload: payload });
      }
      return editedPresentation;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

export function addPresentation(payload) {
  return async (dispatch) => {
    try {
      const createdPresentation = await apiAddPresentation(payload);
      if (createdPresentation.status === 200) {
        dispatch({ type: ADD_PRESENTATION, payload: createdPresentation.data });
      }
      return createdPresentation;
    } catch (error) {
      console.log(error);
      return error;
    }
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


export function getUser(id) {
  return async (dispatch) => {
    try {
      const response = await apiGetUser(id);
      dispatch({ type: GET_USER_BY_ID, payload: response });
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
  return (dispatch) => {
    dispatch({
      type: ADD_ORDER_DATE,
      payload: data,
    });
  };
}

export function setDelivery(data) {
  return (dispatch) => {
    dispatch({
      type: DELIVERY_CART_ITEMS,
      payload: data,
    });
  };
}

export function flushCart() {
  return (dispatch) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart"));
    cartLocal = [];
    localStorage.setItem("cart", JSON.stringify(cartLocal));

    dispatch({
      type: FLUSH_CART,
      payload: cartLocal,
    });
  };
}

export function actCart(payload) {
  return (dispatch) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart")||[]);
    const cartLocal2 = cartLocal?.concat(payload);
    localStorage.setItem("cart", JSON.stringify(cartLocal2));
    dispatch({
      type: ACT_CART,
      payload
    });
  };
}


export function postProduct(payload) {

  return async function (dispatch) {
    try {
      const newProduct = await axios.post(`${REACT_APP_API_URL}/product/create`, payload);
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
      const updatedProduct = await axios.put(`${REACT_APP_API_URL}/product/update/${payload.id}`, payload);
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

export function postPedido(currenuser, pedidoData) {
  return async function (dispatch) {
    try {
      const newPedido = await axios({
        url: `${REACT_APP_API_URL}/pedido/create`,
        method: 'post',
        headers: { token: currenuser.token },
        data: { ...pedidoData, ...currenuser }
      });
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
    dispatch(loading());
    try {
      const pagoPedido = await axios({
        url: `${REACT_APP_API_URL}/mercadopago`,
        method: 'post',
        headers: { token: payload.currenuser.token },
        data: payload
      });
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

export function getAllPromos(userData) {
  return async dispatch => {
    try {
      const promos = await axios.get(`${REACT_APP_API_URL}/promocion/all?activas=0`, {
        headers: {
          token: userData.token
        }
      });
      if (promos.status === 200) {        
        dispatch({ type: SET_PROMOCIONES, payload: promos.data });
      }
      
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPedidos(userData, productoId) {
  return async function (dispatch) {
    try {
      if (!productoId && userData.token) {
        const pedidos = await axios.get(`${REACT_APP_API_URL}/pedido/all`, {
          headers: {
            token: userData.token
          }
        });
        if (pedidos.status === 200) {
          dispatch({
            type: GET_PEDIDOS,
            payload: pedidos.data
          });
        }
      } else if (productoId && userData.token) {
        
        const pedido = await axios.get(`${REACT_APP_API_URL}/pedido/get/` + productoId, {
          headers: {
            token: userData.token
          }
        });
        if (pedido.status === 200) {
          dispatch({
            type: GET_PEDIDO_ID,
            payload: pedido.data
          });
        }
      }
      //console.log('no entró', productoId, '\nToken: ', userData.token);
    } catch (error) {
      console.log(error);
    }

  };
}

export function putPedidos(payload) {
  return async function (dispatch) {
    try {
      const pedido = await axios({
        url: `${REACT_APP_API_URL}/pedido/update/` + payload.id,
        method: 'put',
        headers: { token: payload.currenuser.token },
        data: payload
      });
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

export function putPromo(payload) {
  return async function (dispatch) {
    try {
      const newPromo = await axios({
        url: `${REACT_APP_API_URL}/promocion/update/` + payload.data.id,
        method: 'put',
        headers: { token: payload.currentUser.token },
        data: payload.data
      });  
      if (newPromo.status === 200) {
        dispatch({
          type: PUT_PROMOCION,
          payload: newPromo.data
        });
      }
      return newPromo
    } catch (error) {
      console.log(error);
    }

  };
}

export function addPromo(payload) {
  return async function (dispatch) {
    try {
      const newPromo = await axios({
        url: `${REACT_APP_API_URL}/promocion/create`,
        method: 'post',
        headers: { token: payload.currentUser.token },
        data: payload.data
      });
      if (newPromo.status === 200) {        
        dispatch({
        type: ADD_PROMOCION,
        payload: newPromo.data
        });
      }
      return newPromo
    } catch (error) {
      console.log(error);
    }

  };
}

export function filterPedidos(filter) {
  return (dispatch) => {
    dispatch({ type: FILTER_PEDIDO, payload: filter });
  };
}

//SALES...


export function getProductPromo() {
  return async (dispatch) => {
    const productsOnSale = await axios.get(`${REACT_APP_API_URL}/promocion/all`);
    dispatch({
      type: GET_PORDUCT_PROMO,
      payload: productsOnSale.data
    });
  };
}

//WISHLIST

// export function getWishlist(userId) {
//   return async (dispatch) => {
//     const wishlist = await axios.get(`${REACT_APP_API_URL}/wishlist/get?user=${userId}`);
//     dispatch({
//       type: GET_WISHLIST,
//       payload: wishlist.data
//     });
//   };
// }
