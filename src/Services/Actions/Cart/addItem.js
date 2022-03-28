import { add } from '../../Reducers/categoriesReducer.js';


/**
 * `data`: Item para agregar al carrito.
 * 
 */


export const addItem = async (dispatch, data) => {
  dispatch(add(data));
};
