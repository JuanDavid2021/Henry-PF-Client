import Config from '../../../Config/config.js';
import { deactivateProductFailure, deactivateProductStart, deactivateProductSuccess } from '../../Reducers/productsReducer.js';


export const deactivateProduct = async (dispatch, productId) => {
  dispatch(deactivateProductStart());

  const request = await Config.apiUrl.delete(`/product/${productId}`).catch(() => false);

  if (request.status === 200) {
    dispatch(deactivateProductSuccess(request.data));
  } else {
    dispatch(deactivateProductFailure());
  }

};