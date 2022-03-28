import Config from '../../../Config/config.js';
import { updateProductFailure, updateProductStart, updateProductSuccess } from '../../Reducers/productsReducer.js';


/**
 * Actualiza un producto. Debe enviar todos los datos, asi la mayoria no haya cambiado
 * 
 * `id`: `UID` ID del producto a actualizar.
 * 
 * `categoria`: `STRING` nueva categoria del producto a crear.
 * 
 * `nombre`: `STRING` nuevo nombre del producto a crear.
 * 
 * `precio`: `INT` nuevo precio del producto a crear.
 * 
 * `descripcion`: `STRING` nueva descripcion del producto a crear.
 * 
 * `stock`: `INT` nuevo stock del producto a crear.
 * 
 * `fotos`: `ARRAY( nuevo TRING)` fotos del producto a crear.
 * 
 * `presentacion`: `STRING` nuevo presentacion del producto a crear.
 * 
 */


export const updateProduct = async (dispatch, { id, categoria, nombre, precio, descripcion, stock, fotos, presentacion }) => {
  dispatch(updateProductStart());

  const request = await Config.apiUrl.put(`/product/${id}`, { categoria, nombre, precio, descripcion, stock, fotos, presentacion }).catch(() => false);

  if (request.status === 200) {
    dispatch(updateProductSuccess(request.data));
  } else {
    dispatch(updateProductFailure());
  }
};
