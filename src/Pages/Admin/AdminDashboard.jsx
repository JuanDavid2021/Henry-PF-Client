import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, deleteUser, editProduct, getProducts, getUsers, updateUser } from '../../actions/index.js';

export default function AdminDashboard() {

  const { users, products, sales } = useSelector(state => state);
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
  }, []);


  const sendRequest = (action, data, type) => {
    // enviar update, o delete
    if (action === 'delete') {
      if (type === 'user') dispatch(deleteUser(data));
      if (type === 'product') dispatch(deleteProduct(data));
    } else {
      if (type === 'user') dispatch(updateUser(data));
      if (type === 'product') dispatch(editProduct(data));
    }
  };

  const handleEditButton = (e) => {
    const id = e.target.value;
    const type = e.target.name;
    const entry = users.find(user => user.correo === id) || products.find(product => product.id === id);

    // abrir modal y permitir editar datos.
    // click en boton submit llama la function sendRequest('edit', info)
    console.log('edit =>', entry);

  };

  const handleDeleteButton = (e) => {
    const id = e.target.value;
    const type = e.target.name;
    const entry = users.find(user => user.correo === id) || products.find(product => product.id === id);

    sendRequest('delete', id, type);
  };

  return (
    <div className="container-fluid">
      <h1>Admin dashboard</h1>
      <div className="container-fluid col-md-6">
        <Table bordered size="sm">
          <thead>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Celular</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.correo}>
                <td>{`${user.nombre}, ${user.apellido}`}</td>
                <td>{user.correo}</td>
                <td>{user.celular}</td>
                <td>{user.direccion}</td>
                <button name="user" value={user.correo} className="btn btn-danger text-light text-decoration-none fs-6 mx-3" onClick={handleDeleteButton}>
                  Delete
                </button>
                <button name="user" value={user.correo} className="btn btn-success text-light text-decoration-none fs-6 mx-3" onClick={handleEditButton}>
                  Edit   
                </button>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="container-fluid col-md-6">
        <Table bordered size="sm">
          <thead>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categorias</th>
            <th>Presentaciones</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {products && products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>{product.Categoria.map(c => c.nombre).join(' ')}</td>
                <td>{product.Presentacions.map(p => p.nombre).join(' ')}</td>
                <button name="product" value={product.id} className="btn btn-danger text-light text-decoration-none fs-6 mx-3" onClick={handleDeleteButton}>
                  Delete
                </button>
                <button name="product" value={product.id} className="btn btn-success text-light text-decoration-none fs-6 mx-3" onClick={handleEditButton}>
                  Edit    
                </button>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div>
        <h4>Ventas:</h4>
        {/*nepundir: datos de ventas en el store estan incompletos.*/}
        {sales && sales.map(sale => (
          <>
            {Object.keys(sale).join(' ')}
          </>
        ))}
      </div>
    </div>

  );
}