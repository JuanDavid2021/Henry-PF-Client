import Config from '../../../Config/config.js';
import { updateProductFailure, updateProductStart, updateProductSuccess } from '../../Reducers/productsReducer.js';


export const updateProduct = async (dispatch, data) => {
  dispatch(updateProductStart());

  const request = await Config.apiUrl.put(`/product/${data.id}`, data).catch(() => false);

  if (request.status === 200) {
    dispatch(updateProductSuccess(request.data));
  } else {
    dispatch(updateProductFailure());
  }

};