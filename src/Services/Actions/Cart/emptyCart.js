import { empty } from '../../Reducers/cartReducer.js';


/**
 * Borra todos los items del carrito.
 * 
 */


export const emptyCart = async (dispatch) => {
  dispatch(empty());
};
