import Config from '../../../Config/config.js';
import { deactivateCategoryFailure, deactivateCategoryStart, deactivateCategorySuccess } from '../../Reducers/categoriesReducer.js';


/**
 * `id`: ID de la categoria a borrar.
 * 
 */


export const deleteCategory = async (dispatch, id) => {
  dispatch(deactivateCategoryStart());

  const request = await Config.apiUrl.delete(`/delete/${id}`).catch(() => false);

  if (request.status === 200) {
    dispatch(deactivateCategorySuccess(request.data));
  } else {
    dispatch(deactivateCategoryFailure());
  }
};
