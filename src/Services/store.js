import { combineReducers } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import cartReducer from './Reducers/cartReducer.js';
import categoriesReducer from './Reducers/categoriesReducer.js';
import productsReducer from './Reducers/productsReducer.js';
import salesReducer from './Reducers/salesReducer.js';
import userReducer from './Reducers/userReducer.js';
import usersReducer from './Reducers/usersReduce.js';


const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  sales: salesReducer,
  users: usersReducer
});


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
