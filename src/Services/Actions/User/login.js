import Config from '../../../Config/config.js';
import { loginFailure, loginStart, loginSuccess } from '../../Reducers/userReducer.js';


/**
 * `correo`: Correo del usuario.
 * 
 * `contraseña`: Contraseña del usuario.
 * 
 */


export const login = async (dispatch, { correo, contraseña }) => {
  dispatch(loginStart());

  const request = await Config.apiUrl.post('/user/login', { correo, contraseña }).catch(() => false);

  if (request.status === 200) {
    dispatch(loginSuccess(request.data));
  } else {
    dispatch(loginFailure());
  }
};
