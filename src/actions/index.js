const action = require("../action-types");

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

//SALES...

module.exports = {
  addProduct,
  deleteProduct,
  editProduct,
  addCategory,
  deleteCategory,
  rateProduct,
  addProductComment,
  deleteProductComment,

  addCartItem,
  deleteCartItem,
  flushCart,
};
