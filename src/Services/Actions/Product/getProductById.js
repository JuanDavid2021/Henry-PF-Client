import Config from '../../../Config/config.js';
import { getProductByIdFailure, getProductByIdStart, getProductByIdSuccess } from '../../Reducers/productsReducer.js';


/**
 * 
 * `id`: ID del producto a traer.
 * 
 */


export const getProductById = async (dispatch, id) => {
  dispatch(getProductByIdStart());

  const request = await Config.apiUrl.get(`/product/get/${id}`).catch(() => false);

  if (request.status === 200) {
    dispatch(getProductByIdSuccess(request.data));
  } else {
    dispatch(getProductByIdFailure());
  }
};
