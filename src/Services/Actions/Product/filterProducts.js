import Config from '../../../Config/config.js';
import { filterProductsFailure, filterProductsStart, filterProductsSuccess } from '../../Reducers/productsReducer.js';


export const filterProducts = async (dispatch, id) => {
  dispatch(filterProductsStart());

  const request = await Config.apiUrl.get(`/product/get/${id}`).catch(() => false);

  if (request.status === 200) {
    dispatch(filterProductsSuccess(request.data));
  } else {
    dispatch(filterProductsFailure());
  }

};