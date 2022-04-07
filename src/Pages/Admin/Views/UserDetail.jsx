import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { deleteUser, getUser, updateUser } from '../../../actions/index';
import swal from 'sweetalert';

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
    e.preventDefault()
    dispatch(deleteUser(target.correo));
  };

  return (
    <div className="py-3 bg-dark" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
      <div className='alert align-middle bg-dark text-light bg-opacity-75 mb-0 mx-3' style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: "300px", maxWidth: "300px" }}>
        <h2 className='text-center mb-3'>Details for user:<p className="h6"> {id}</p></h2>
        <div className=" d-flex justify-content-center">
          <form onChange={handleChange} className="mt-3">
            <div className="mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" className='form-control' placeholder={target.nombre} />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido">Apellido</label>
              <input id="apellido" className='form-control' placeholder={target.apellido} />
            </div>
            <div className="mb-3">
              <label htmlFor="celular">Celular</label>
              <input id="celular" className='form-control' placeholder={target.celular} />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion">Dirección</label>
              <input id="direccion" className='form-control' placeholder={target.direccion} />
            </div>
            <div className="mb-3 d-flex flex-column">
              <span>Tipo</span>
              <BootstrapSwitchButton checked={target.admin} onlabel='admin' offlabel='usuario' onChange={(checked) => setData({ ...data, admin: checked })} />
            </div>
            
            <div className="btn-group mb-3 w-100">
              <button value={target.correo} className="btn btn-success" onClick={handleSubmit}>Actualizar</button>
              <button value={target.correo} className="btn btn-warning text-light" onClick={handleDelete}>{target.activo?'Desactivar' : 'Activar'}</button>
            </div>
              <button value={target.correo} className="btn btn-info text-light  w-100" onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
}