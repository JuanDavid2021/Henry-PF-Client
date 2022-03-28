import Config from '../../../Config/config.js';
import { createCategoryFailure, createCategoryStart, createCategorySuccess } from '../../Reducers/categoriesReducer.js';


/**
 * `nombre`: Nombre de la categoria a crear.
 * 
 */


export const postCategory = async (dispatch, { nombre }) => {
  dispatch(createCategoryStart());

  const request = await Config.apiUrl.post('/category/create', { nombre }).catch(() => false);

  if (request.status === 200) {
    dispatch(createCategorySuccess(request.data));
  } else {
    dispatch(createCategoryFailure());
  }
};