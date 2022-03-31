import React, { useEffect, useState } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers, updateUser } from '../../../actions';
import GenericModal from '../../../components/GenericModal';


export default function UserList() {

  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [target, setTarget] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleEdit = (e) => {
    const target = e.target.value;
    setTarget(users.find(user => user.correo === target));
  };

  const handleRemove = (e) => {
    const target = e.target.value;
    console.log('remove =>', target);
  };

  const handleSubmit = () => {
    dispatch(updateUser(target));
  };

  console.log('target =>', target);

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
                      <button value={user.correo} className="btn btn-success text-light text-decoration-none fs-6 mx-2" onClick={handleEdit}>Editar</button>
                      <button value={user.correo} className="btn btn-danger text-light text-decoration-none fs-6 mx-2" onClick={handleRemove}>Eliminar</button>
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