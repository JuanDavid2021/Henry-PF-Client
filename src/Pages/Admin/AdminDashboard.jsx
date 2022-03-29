import React, { useEffect } from 'react';
import Pedidos from '../../components/Pedidos';
import Products from '../../components/Products';

export default function AdminDashboard() {


  return (
    <div className="col-12">
      <Products />
      <Pedidos />
    </div>
  );
}