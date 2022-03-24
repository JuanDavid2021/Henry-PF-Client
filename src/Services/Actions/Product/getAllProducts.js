import Config from '../../../Config/config.js';
import { getAllProductsFailure, getAllProductsStart, getAllProductsSuccess } from '../../Reducers/productsReducer.js';


export const getAllProducts = async (dispatch) => {
  dispatch(getAllProductsStart());

  const request = await Config.apiUrl.get('/product/all').catch(() => false);

  if (request.status === 200) {
    dispatch(getAllProductsSuccess(request.data));
  } else {
    dispatch(getAllProductsFailure());
  }

};