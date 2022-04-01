import React from 'react';
import Pedidos from '../../components/Pedidos';
import Products from './Views/Products';
import UserList from './Views/UserList';

export default function AdminDashboard() {


  return (
    <div className="col-12">
      <Products />      
      <Pedidos />
      <UserList />
    </div>
  );
}