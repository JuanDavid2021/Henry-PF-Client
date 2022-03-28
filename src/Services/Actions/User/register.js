import Config from '../../../Config/config.js';
import { registerFailure, registerStart, registerSuccess } from '../../Reducers/userReducer.js';


/**
 * `correo`: Correo del usuario.
 * 
 * `contraseña`: Contraseña del usuario.
 * 
 */


export const register = async (dispatch, { correo, contraseña }) => {
  dispatch(registerStart());

  const request = await Config.apiUrl.post('/user/register', { correo, contraseña }).catch(() => false);

  if (request.status === 200) {
    dispatch(registerSuccess(request.data));
  } else {
    dispatch(registerFailure());
  }
};
