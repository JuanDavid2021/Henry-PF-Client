import React, { useState } from 'react';
import Pedidos from '../../components/Pedidos';
import Products from './Views/Products';
import UserList from './Views/UserList';
import { FaUsersCog, FaShippingFast } from 'react-icons/fa'
import { RiListOrdered } from 'react-icons/ri'
import { GiMeat, GiMeatHook } from 'react-icons/gi'
import { MdCategory } from 'react-icons/md'

export default function AdminDashboard() {

  const [show, setShow] = useState({
  })

  const handleClick = (str) => {
    if (str === "Pedidios") {
      setShow({...show, pedidios: true, usuarios: false, productos: false,})
    }
    if (str === "Usuarios") {
      setShow({...show, usuarios: true, pedidios: false, productos: false})
    }
    if (str === "Productos") {
      setShow({...show, usuarios: false, pedidios: false, productos: true})
    }
  }

  return (
    <div className="container-fluid justify-content-between">
      <div className="row flex-nowrap">
        <Sidebar handleClick={handleClick}/>
        <div className="col-sm-11 col-md-11 col-lg-10 col-xl-10 px-0 contentAdmin">
          {show?.productos ? <Products /> : null}
          {show?.pedidios ? <Pedidos /> : null}
          {show?.usuarios ? <UserList /> : null}
          {Object.keys(show)?.length === 0 && <div style={{height:"70vh"}}></div>}
        </div>
      </div>
    </div>
  );
}

function Sidebar({handleClick}) {
  return(
    <div className="col-auto d-flex justify-content-center col-md-1 col-lg-2 col-xl-2 px-0 bg-dark sidebarAdmin">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 position-fixed">
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
            <a href="#" className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-lg-inline">Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link  px-0 align-middle" onClick={()=>handleClick("Pedidios")}>
              <RiListOrdered /> <span className="ms-1 d-none d-lg-inline">Pedidos</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-0 align-middle " onClick={()=>handleClick("Productos")}>
              <GiMeat /> <span className="ms-1 d-none d-lg-inline">Productos</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-0 align-middle" onClick={()=>handleClick("Categorías")}>
              <MdCategory /> <span className="ms-1 d-none d-lg-inline">Categorías</span> 
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-0 align-middle"onClick={()=>handleClick("Usuarios")}>
              <FaUsersCog /> <span className="ms-1 d-none d-lg-inline">Usuarios</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

