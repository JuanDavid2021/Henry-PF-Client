import { remove } from '../../Reducers/cartReducer.js';


/**
 * `id`: ID del item a borrar del carrito.
 * 
 */


export const removeItem = async (dispatch, id) => {
  dispatch(remove(id));
};
