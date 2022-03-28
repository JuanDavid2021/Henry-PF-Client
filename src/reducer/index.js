import {
  ADD_PRODUCT,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  POST_PRODUCT,
  RATE_PRODUCT,
  SEARCH_PRODUCT,
  SEARCH_LOCAL_PRODUCT,
  PAGAR_PEDIDO,
  GETTING_PRODUCTS,
  SET_PRODUCTS,
  SET_FILTERED_PRODUCTS,
  ORDER_PRODUCTS,
  GETTING_PRODUCT_DETAILS,
  SET_PRODUCT_DETAILS,
  SET_PRODUCT_DETAILS_FRONT,
  ADD_CART_ITEM,
  UPDATE_USER,
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
  USERLOGIN,
  USERCREATE,

  USERLOGINOK,

  USERLOGOUT,
  
  DELIVERY_CART_ITEMS,
  ADD_ORDER_DATE,
  POST_PEDIDO,
  LOADING,
  GET_PEDIDOS,
  GET_PEDIDO_ID
 
} from './../action-types/index';


const initialState = {
  user: { nombre: "asd", email: "minnie.bator@funholding.com" }, //usuario actual usando la app
  // user: [], //usuario actual usando la app
  userLogin:[],
  userAuthenticated:{},

  gettingProducts: false,
  products: [],
  filteringProducts: false,
  filteredProducts: [],
  adminFilteredProducts :[],
  productDetails: { id: null },
  cart: [],
  despacho: null,
  categories: [],//[{id:XXX,name:'sadasd'},...]

  userRegistred: [],
  pedido: {},
  pedidoId: {},
  pedidos: [],
  idPago: {},

  sales: [],//lista de ventas
  users: [],//lista de usuarios para borrar / forzar password
  categoryFilterStatus: true,
  searchFilterStatus: true,
  loading: false
};

//establece el valor inicial del carrito. Si el usuario estuvo cargando productos, quedaran en el localStorage
localStorage.getItem("cart")
  ? initialState.cart = JSON.parse(localStorage.getItem("cart"))


  : initialState.cart = [];


function rootReducer(state = initialState, action) {
  if (action.type === DELIVERY_CART_ITEMS) {
    return {
      ...state,
      despacho: action.payload
    };
  }

  if (action.type === ADD_ORDER_DATE) {
    return {
      ...state,
      despacho: { ...state.despacho, ...action.payload }


    };

  }

  if (action.type === ADD_CART_ITEM) {
    return {
      ...state,
      cart: [...action.payload]
    };
  }

  if (action.type === FLUSH_CART) {
    return {
      ...state,
      cart: action.payload
    }
  }

  if (action.type === POST_PEDIDO) {
    return {
      ...state,
      pedido: action.payload
    };
  }

  if (action.type === PAGAR_PEDIDO) {


    console.log(state.loading)
    return {
      ...state,
      idPago: action.payload,
      loading: false
    }
  }

  if (action.type === LOADING) {
    console.log(state.loading)
    return {
      ...state,
      loading: true
    }
  }

  if (action.type === SET_CART_ITEM) {
    return {
      ...state,
      cart: [...action.payload]
    };
  }

  if (action.type === DELETE_CART_ITEM) {
    return {
      ...state,
      cart: [...action.payload]
    };
  }

  if (action.type === USERCREATE) {
    return {
      ...state,
      userRegistred: [action.payload]
    }
  }


  if(action.type===USERLOGINOK){
       return{
        ...state,
        userAuthenticated: action.payload,
       }
  }
  if (action.type === USERLOGIN) {
    if (action.payload.userEmail) {
      return {
        ...state,
        userLogin: action.payload,
        user: action.payload.userEmail
      }
    }
    else {
      return {
        ...state,
        userLogin: action.payload
      }
    }

  }

  if(action.type===USERLOGOUT){
    return{
     ...state,
     userAuthenticated: action.payload,
    }
}

  if (action.type === ADD_PRODUCT) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back        
    return {
      ...state,
      products: [...state.products, action.payload],
      adminFilteredProducts: [action.payload, ...state.adminFilteredProducts]
    };
  }

  if (action.type === PUT_PRODUCT) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back 

    let newProducts = state.products.map(p => {
      if (p.id === action.payload.id) {

        return action.payload;
      }
      return p;
    });

    let filteredProducts = state.adminFilteredProducts.map(fp => {
      if (fp.id === action.payload.id) {
        return action.payload;

      }
      return fp;
    });
    return {
      ...state,
      products: newProducts,
      adminFilteredProducts: filteredProducts
    };
  }

  if (action.type === SET_CATEGORIES) {
    //seteo categorias desde el back
    return {
      ...state,
      categories: action.payload

    };

  }

  if (action.type === DELETE_PRODUCT) {
    //borro el producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.filter(
      (e) => e.id !== action.payload
    );
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === SET_PRODUCT_DETAILS_FRONT) {
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

  if (action.type === EDIT_PRODUCT) {
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

  if (action.type === SET_PRODUCTS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      products: action.payload,
      gettingProducts: false
    };
  }

  if (action.type === SET_FILTERED_PRODUCTS) {
    return {
      ...state,
      filteredProducts: action.payload.filter(p => p.stock > 0),
      adminFilteredProducts: action.payload
    };
  }

  if (action.type === GETTING_PRODUCTS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingProducts: action.payload
    };
  }

  if (action.type === SET_PRODUCT_DETAILS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      productDetails: action.payload,
      gettingProducts: false
    };
  }

  if (action.type === GETTING_PRODUCT_DETAILS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingProductDetails: action.payload
    };
  }

  if (action.type === RATE_PRODUCT) {
    //edito el score del producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.map((e) => {
      if (e.id === action.payload.id) {
        e.score = action.payload.score;
        return e;
      }
      return e;
    });
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === SET_USERS) {
    //cargo el arreglo con todos los usuarios obtenidos
    return {
      ...state,
      users: action.payload,
      gettingUsers: false
    };
  }

  if (action.type === GETTING_USERS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingUsers: action.payload
    };
  }

  if (action.type === UPDATE_USER) {
    return {
      ...state,
      users: state.users.filter(u => u.correo !== action.payload.correo).concat(action.payload)
    };
  }

  if (action.type === DELETE_USER) {
    return {
      ...state,
      users: state.users.filter(u => u.correo !== action.payload)
    };
  }


  if (action.type === ADD_CATEGORY) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  }

  if (action.type === DELETE_CATEGORY) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    const newCategories = state.categories.filter(
      (e) => e.id !== action.payload.id
    );
    return {
      ...state,
      categories: newCategories,
    };
  }

  if (action.type === FILTER_PRODUCTS) {

    let filteredProducts = [...state.products]//.filter(e => e.stock > 0);

    let categoryStatus = false;
    if (action.payload.category !== "all") {
      filteredProducts = filteredProducts.filter(e => e.Categoria.find(i => parseInt(i.id) === parseInt(action.payload.category)));
      if (filteredProducts.length !== 0) {
        categoryStatus = true;
      }
    } else {
      categoryStatus = true;
    }
    if (action.payload.order === "A-Z") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) return -1;
        return 0;
      });
    } else if (action.payload.order === "Z-A") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
      });
    } else if (action.payload.order === "priceLower-Higher") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return 1;
        if (Number(b.precio) > Number(a.precio)) return -1;
        return 0;
      });
    } else if (action.payload.order === "priceHigher-Lower") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return -1;
        if (Number(b.precio) > Number(a.precio)) return 1;
        return 0;
      });
    }

    let searchStatus = false;
    if (action.payload.input.length > 0) {
      filteredProducts = filteredProducts.filter(p => p.nombre.toLowerCase().includes(action.payload.input.toLowerCase()));
      if (filteredProducts.length !== 0) {
        searchStatus = true;
      }
    } else {
      searchStatus = true;
    }
    let userProducts = filteredProducts.filter(e => e.stock > 0) 

    return {
      ...state,
      filteredProducts: userProducts,
      adminFilteredProducts:filteredProducts,
      categoryFilterStatus: categoryStatus,
      searchFilterStatus: searchStatus
    };
  }

  if (action.type === ORDER_PRODUCTS) {

    console.log(action.type);
    let sortArray = action.payload === "A-Z" ?

      state.products.sort(function (a, b) {

        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) return -1;
        return 0;
      }) :
      state.products.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
      });

    return {
      ...state,
      products: sortArray,
    };

  }

  if (action.type === ORDER_PRECIO) {

    console.log(action.type);
    let sortArrayPrecio = action.payload === "priceLower-Higher" ?
      state.products.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return 1;
        if (Number(b.precio) > Number(a.precio)) return -1;
        return 0;
      }) :

      state.products.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return -1;
        if (Number(b.precio) > Number(a.precio)) return 1;
        return 0;
      });
    return {
      ...state,
      products: sortArrayPrecio
    };
  }

  if (action.type === SEARCH_PRODUCT) {
    const busqueda = action.payload.busq.data.filter(p => p.nombre.toLowerCase().includes(action.payload.producto.toLowerCase()));
    console.log(busqueda);
    return {
      ...state,
      products: busqueda
    };
  }

  if (action.type === GET_PEDIDOS) {
    return {
      ...state,
      pedidos: action.payload
    };
  }

  if (action.type === GET_PEDIDO_ID) {
    return {
      ...state,
      pedidoId: action.payload
    };
  }

  /*   if (action.type === "ORDER_BY_SCORE") {
      const orderedRecipes = orderByScore(
        [...state.filterResult],
        action.payload
      );
  
      return {
        ...state,
        filterResult: orderedRecipes,
      };
    } */

  /*if (action.type === "SET_RECIPES_AND_FILTER") {
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
  }*/

  return state;
}

export default rootReducer;
