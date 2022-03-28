import Config from '../../../Config/config.js';
import { getAllCategoriesFailure, getAllCategoriesStart, getAllCategoriesSuccess } from '../../Reducers/categoriesReducer.js';


/**
 * Trae todas las categorias activas de la base de datos.
 * 
 */


export const getCategories = async (dispatch) => {
  dispatch(getAllCategoriesStart());

  const request = await Config.apiUrl.get('/category/all').catch(() => false);

  if (request.status === 200) {
    dispatch(getAllCategoriesSuccess(request.data));
  } else {
    dispatch(getAllCategoriesFailure());
  }
};