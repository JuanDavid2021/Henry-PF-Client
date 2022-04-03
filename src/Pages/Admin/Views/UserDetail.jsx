import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { deleteUser, getUser, updateUser } from '../../../actions/index';

export default function UserDetail() {

  const [data, setData] = useState({});

  const { id } = useParams();
  const target = useSelector(state => state.userDetail);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const prop = e.target.id;
    const val = e.target.value;

    if (val) {
      // si hay datos en el input, reemplazar
      setData({ ...target, [prop]: val });
    } else {
      // si no hay datos en el input, resetear
      setData({ ...target, [prop]: target[prop] });
    }
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    dispatch(updateUser(data));
  };

  const handleCancel = (e) => {
    e?.preventDefault();
    setData(target);
  };

  const handleDelete = (e) => {
    e?.preventDefault();
    dispatch(deleteUser(target.correo));
  };

  return (
    <div className="container">
      <h1>Details for user: {id}</h1>
      <form onChange={handleChange} className="col-md-6 center">
        <span className="row col-md-5">
          Nombre:
          <input id="nombre" placeholder={target.nombre} />
        </span>
        <span className="row col-md-5">Apellido:
          <input id="apellido" placeholder={target.apellido} />
        </span>
        <span className="row col-md-5">Celular:
          <input id="celular" placeholder={target.celular} />
        </span>
        <span className="row col-md-5">Direccion:
          <input id="direccion" placeholder={target.direccion} />
        </span>
        <span className="row col-md-5">Tipo:
          <BootstrapSwitchButton checked={target.admin} onlabel='admin' offlabel='usuario' onChange={(checked) => setData({ ...data, admin: checked })} />
        </span>
        <span className="row col-md-5">
          <button value={target.correo} className="btn btn-success text-light text-decoration-none" onClick={handleSubmit}>Actualizar</button>
          <button value={target.correo} className="btn btn-info text-light text-decoration-none" onClick={handleCancel}>Cancelar</button>
          <button value={target.correo} className="btn btn-warning text-light text-decoration-none" onClick={handleDelete}>Desactivar</button>
        </span>
      </form>
    </div>
  );
}