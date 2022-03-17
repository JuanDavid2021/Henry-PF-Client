const reduxActions = require("../action-types");
import { orderProducts } from "../actions"
const initialState = {
  user: [], //usuario actual usando la app
  gettingProducts: false,
  products: [],
  filteringProducts: false,  
  filteredProducts: [],
  productDetails: { id: null },
  cart: [],
  categories: [],//[{id:XXX,name:'sadasd'},...]

  sales: [],//lista de ventas
  users: [],//lista de usuarios para borrar / forzar password
};

function rootReducer(state = initialState, action) {

  if (action.type === reduxActions.addProduct) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      products: [...state.products, action.payload],
    };
  }

  if (action.type === reduxActions.deleteProduct) {
    //borro el producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.filter(
      (e) => e.id !== action.payload
    );
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === reduxActions.setProductDetailsFront) {
    //selecciono producto del arreglo para mostrar los detalles
    const newProductDetail = state.products.find(
      (e) => e.id === action.payload
    ) || { id: null };
    return {
      ...state,
      productDetails: newProductDetail,
      gettingProductDetails: false

    };
  }

  if (action.type === reduxActions.editProduct) {
    //edito el producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.map((e) => {
      if (e.id === action.payload.id) {
        return action.payload;
      }
      return e;
    });
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === reduxActions.setProducts) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      products: action.payload,
      gettingProducts: false
    };
  } 

  if (action.type === reduxActions.gettingProducts) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingProducts: action.payload
    };
  } 

  if (action.type === reduxActions.setProductDetails) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      productDetails: action.payload,
      gettingProducts: false
    };
  } 

  if (action.type === reduxActions.gettingProductDetails) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingProductDetails: action.payload
    };
  } 

  if (action.type === reduxActions.rateProduct) {
    //edito el score del producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.map((e) => {
      if (e.id === action.payload.id) {
        e.score = action.payload.score
        return e
      }
      return e;
    });
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === reduxActions.setUsers) {
    //cargo el arreglo con todos los usuarios obtenidos
    return {
      ...state,
      allUsers: action.payload,
      gettingUsers: false
    };
  } 

  if (action.type === reduxActions.gettingUsers) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingUsers: action.payload
    };
  } 


  if (action.type === reduxActions.addCategory) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  }

  if (action.type === reduxActions.deleteCategory) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    const newCategories = state.categories.filter(
      (e) => e.id !== action.payload.id
    );
    return {
      ...state,
      categories: newCategories,
    };
  }

  if (action.type === "ORDER_BY_SCORE") {
    const orderedRecipes = orderByScore(
      [...state.filterResult],
      action.payload
    );

    return {
      ...state,
      filterResult: orderedRecipes,
    };
  }

  if (action.type === "SET_RECIPES_AND_FILTER") {
    if (action.payload.filter.title.length) {
      //aplico filtro de título
      action.payload.recipes = action.payload.recipes.filter((r) =>
        r.title
          .toLowerCase()
          .includes(action.payload.filter.title.toLowerCase())
      );
    }
    if (action.payload.filter.dietsArr.length) {
      //aplico filtro de dietas
      action.payload.filter.dietsArr.forEach((diet) => {
        action.payload.recipes = action.payload.recipes.filter((r) =>
          r.diets.includes(diet.toLowerCase())
        );
      });
    }
    const orderedRecipes = orderByAlpha(
      action.payload.recipes,
      action.payload.filter
    );
    return {
      ...state,
      filterResult: orderedRecipes,
    };
  }

  if (action.type === "SET_DIET_TYPES") {
    if (
      !Object.keys(state.dietTypes).length &&
      Object.keys(action.payload).length
    ) {
      return {
        ...state,
        dietTypes: action.payload,
      };
    }
  }

  if (action.type === "SET_FILTERING_STATUS") {
    return {
      ...state,
      filtering: action.payload,
    };
  }

  if (action.type === "SET_RECIPE_DETAIL") {
    return {
      ...state,
      recipeDetail: action.payload, //action.payload
    };
  }

  return state;
}

export default rootReducer;
