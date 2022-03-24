import Config from '../../../Config/config.js';
import { createProductFailure, createProductStart, createProductSuccess } from '../../Reducers/productsReducer.js';


export const createProduct = async (dispatch, data) => {
  dispatch(createProductStart());

  const request = await Config.apiUrl.post('/product/create', data).catch(() => false);

  if (request.status === 200) {
    dispatch(createProductSuccess(request.data));
  } else {
    dispatch(createProductFailure());
  }

};