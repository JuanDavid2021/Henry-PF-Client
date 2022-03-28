import Config from '../../../Config/config.js';
import { sortProductsFailure, sortProductsStart, sortProductsSuccess } from '../../Reducers/productsReducer.js';


/**
 * 
 * `field`: Nombre de la propiedad a usar.
 * 
 * `value`: Valor a usar. puede ser: `asc` o `desc`.
 * 
 */


export const sortProducts = async (dispatch, { field, value }) => {
  dispatch(sortProductsStart());

  const request = await Config.apiUrl.get(`/product/all?option=sort&field=${field}&value=${value}`).catch(() => false);

  if (request.status === 200) {
    dispatch(sortProductsSuccess(request.data));
  } else {
    dispatch(sortProductsFailure());
  }
};
