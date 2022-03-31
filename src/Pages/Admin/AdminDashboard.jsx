import React from 'react';
import Pedidos from '../../components/Pedidos';
import Products from '../../components/Products';
import EditCategory from "../../components/EditCategory"
import UserList from './Views/UserList';


export default function AdminDashboard() {


  return (
    <div className="col-12">
      <Products />
      <EditCategory />
      <Pedidos />
      <UserList />
    </div>
  );
}