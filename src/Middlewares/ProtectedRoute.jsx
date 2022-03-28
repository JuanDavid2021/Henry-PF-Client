import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * `isAllowed`: Condicion que se debe cumplir para renderizar los componentes.
 * 
 * `redirectPath`: (opcional) URL de redireccion en caso `isAllowed === false`. 
 * 
 * `children`: (opcional) Los componentes a renderizar en caso `isAllowed === true`.
 * 
 */

export default function ProtectedRoute({ isAllowed, redirectPath = '/', children }) {

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;

}