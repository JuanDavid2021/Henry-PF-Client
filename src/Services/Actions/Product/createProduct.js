import Config from '../../../Config/config.js';
import { createProductFailure, createProductStart, createProductSuccess } from '../../Reducers/productsReducer.js';


/**
 * 
 * `categoria`: `STRING` categoria del producto a crear.
 * 
 * `nombre`: `STRING` nombre del producto a crear.
 * 
 * `precio`: `INT` precio del producto a crear.
 * 
 * `descripcion`: `STRING` descripcion del producto a crear.
 * 
 * `stock`: `INT` stock del producto a crear.
 * 
 * `fotos`: `ARRAY(STRING)` fotos del producto a crear.
 * 
 * `presentacion`: `STRING` presentacion del producto a crear.
 * 
 */


export const createProduct = async (dispatch, { id, categoria, nombre, precio, descripcion, stock, fotos, presentacion }) => {
  dispatch(createProductStart());

  const request = await Config.apiUrl.post('/product/create', { id, categoria, nombre, precio, descripcion, stock, fotos, presentacion }).catch(() => false);

  if (request.status === 200) {
    dispatch(createProductSuccess(request.data));
  } else {
    dispatch(createProductFailure());
  }
};
