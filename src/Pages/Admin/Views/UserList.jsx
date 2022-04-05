import React, { useEffect } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, resetAdmin } from '../../../actions';
import swal from "sweetalert"


export default function UserList() {

  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleRedirect = (id) => {
    navigate(`/user/${id}`)
  }

  const handleReset = (correo) => {
    swal({
      text: "password reset exitoso",
      icon: "success",
      timer: "2000",
    })
    dispatch(resetAdmin({correo: correo}))
  }

  return (
    <div className='container'>
      <div className="table-responsive">
        <table className="table text-nowrap">
          <thead  >
            <tr className="text-sm">
              <th className="border-gray-300 border-top py-3">Correo</th>
              <th className="border-gray-300 border-top py-3">Nombres</th>
              <th className="border-gray-300 border-top py-3">Telefono</th>
              <th className="border-gray-300 border-top py-3">Direccion</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ?
              users.map(user => {
                return (
                  <tr className="ltext-sm mt-3" key={user.correo}>
                    <td>{user.correo}</td>
                    <td>{user.nombre} {user.apellido}</td>
                    <td>{user.celular}</td>
                    <td>{user.direccion}</td>
                    <td>
                      <button value={user.correo} className="btn btn-success text-light text-decoration-none fs-6 mx-2" onClick={()=>handleRedirect(user.correo)}>Editar</button>
                      <button value={user.correo} className="btn btn-success text-light text-decoration-none fs-6 mx-2" onClick={()=>handleReset(user.correo)}>Reset</button>
                    </td>
                  </tr>
                );
              }) : <tr className="lead text-center fs-4 fw-normal mt-3">
                <td>
                  No hay usuarios
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div className="col-md-6 text-md-start py-1">
          <Link to={"/shop"} className="btn btn-dark my-1">
            <RiArrowLeftSLine /> Tienda
          </Link>
        </div>
      </div>
    </div>
  );
}