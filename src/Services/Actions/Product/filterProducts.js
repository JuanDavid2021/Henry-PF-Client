import Config from '../../../Config/config.js';
import { filterProductsFailure, filterProductsStart, filterProductsSuccess } from '../../Reducers/productsReducer.js';


/**
 * 
 * `value`: Valor del filtro a usar.
 * 
 */


export const filterProducts = async (dispatch, value) => {
  dispatch(filterProductsStart());

  const request = await Config.apiUrl.get(`/product?option=filter&field=Categoria&value=${value}`).catch(() => false);

  if (request.status === 200) {
    dispatch(filterProductsSuccess(request.data));
  } else {
    dispatch(filterProductsFailure());
  }
};
