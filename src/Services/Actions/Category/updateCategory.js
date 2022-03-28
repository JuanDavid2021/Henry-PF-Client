import Config from '../../../Config/config.js';
import { updateCategoryFailure, updateCategoryStart, updateCategorySuccess } from '../../Reducers/categoriesReducer.js';


/**
 * `id`: ID de la categoria.
 * 
 * `nombre`: Nuevo nombre de la categoria.
 * 
 */


export const updateCategory = async (dispatch, { id, nombre }) => {
  dispatch(updateCategoryStart());

  const request = await Config.apiUrl.put(`/category/${id}`, { nombre }).catch(() => false);

  if (request.status === 200) {
    dispatch(updateCategorySuccess(request.data));
  } else {
    dispatch(updateCategoryFailure());
  }
};
