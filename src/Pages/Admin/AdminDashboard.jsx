import React, { useEffect } from 'react';
import Pedidos from '../../components/Pedidos';
import Products from '../../components/Products';
import EditCategory from "../../components/EditCategory"

export default function AdminDashboard() {


  return (
    <div className="col-12">
      <Products />
      <EditCategory />
      <Pedidos />
    </div>
  );
}