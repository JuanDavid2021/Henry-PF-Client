import Config from '../../../Config/config.js';
import { sortProductsFailure, sortProductsStart, sortProductsSuccess } from '../../Reducers/productsReducer.js';


export const sortProducts = (dispatch, { field, value }) => {
  dispatch(sortProductsStart());

  const request = await Config.apiUrl.get(`/product/all?option=sort&field=${field}&value=${value}`).catch(() => false);

  if (request.status === 200) {
    dispatch(sortProductsSuccess(request.data));
  } else {
    dispatch(sortProductsFailure());
  }

};