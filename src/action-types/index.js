const reduxActions = {
  gettingProducts: "gettingProducts",
  setProducts: "setProducts",  
  addProduct: "addProduct",//admin
  deleteProduct: "deleteProduct",//admin
  editProduct: "editProduct",//admin

  rateProduct: "rateProduct",
  addProductComment: "addProductComment",
  deleteProductComment: "deleteProductComment",//admin

  filterProducts: "filterProducts",
  filteringProducts: "filteringProducts",

  gettingProductDetails: "gettingProductDetails",
  setProductDetails: "setProductDetails",
  setProductDetailsFront: "setProductDetailsFront",//solo si lo hacemos por front sin solicitar la api

  addCategory: "addCategory",//admin
  deleteCategory: "deleteCategory",//admin

  gettingUsers: "gettingUsers",
  setUsers: "setUsers",//admin
  deleteUser: "deleteUser",//admin
  forcePasswordReset: "forcePasswordReset",//admin
  getSales: "getSales",//admin
  editSaleStatus: "editSaleStatus",//admin
  
  addCartItem: "addCartItem",
  deleteCartItem: "deleteCartItem",
  flushCart: "flushCart",  
  
  getComments: "getComments", 
  postProduct: "POST_PRODUCT" 
};

export default reduxActions;
