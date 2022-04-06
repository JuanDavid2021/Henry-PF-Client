import React, { useEffect, useState } from 'react';
import Pedidos from '../../components/Pedidos';
import Products from './Views/Products';
import UserList from './Views/UserList';
import Promos from './Views/Promos';
import { FaUsersCog, } from 'react-icons/fa'
import { RiListOrdered } from 'react-icons/ri'
import { GiMeat, GiMeatHook } from 'react-icons/gi'
import { MdCategory } from 'react-icons/md'
import HomeAdmin from './Views/HomeAdmin';

export default function AdminDashboard() {

  const [show, setShow] = useState({ home: true })


  const handleClick = (str) => {
    if (str === "Pedidios") {
      setShow({...show, pedidios: true, usuarios: false, productos: false, promociones:false, home: false})
    }
    if (str === "Usuarios") {
      setShow({...show, usuarios: true, pedidios: false, productos: false, promociones:false, home: false})
    }
    if (str === "Productos") {
      setShow({...show, usuarios: false, pedidios: false, productos: true, promociones:false, home: false})
    }
    if (str === "Promociones") {
      setShow({...show, usuarios: false, pedidios: false, productos: false, promociones:true, home: false})
    }
    if (str === "Home") {
      setShow({...show, usuarios: false, pedidios: false, productos: false, promociones:false, home: true})
    }
  }

  return (
    <div className="container-fluid justify-content-between">
      <div className="row flex-nowrap" style={{ minHeight: "70vh" }}>
        <Sidebar handleClick={handleClick} stateActive={show}/>
        <div className="col-sm-11 col-md-11 col-lg-10 col-xl-10 px-0 contentAdmin">
          {show?.home ? <><h5 className="d-lg-none d-inline ms-4 font-weight-bold"><u>Home</u></h5> <HomeAdmin /></>: null}
          {show?.productos ? <><h5 className="d-lg-none d-inline ms-4 font-weight-bold"><u>Productos</u></h5> <Products /></> : null}
          {show?.pedidios ? <><h5 className="d-lg-none d-inline ms-4 font-weight-bold"><u>Pedidos</u></h5> <Pedidos /></> : null}
          {show?.usuarios ? <><h5 className="d-lg-none d-inline ms-4 font-weight-bold"><u>Usuarios</u></h5> <UserList /></> : null}
          { show?.promociones ? <><h5 className="d-lg-none d-inline ms-4 font-weight-bold"><u>Promociones</u></h5> <Promos /></> : null }
          {Object.keys(show)?.length === 0 && <div style={{height:"70vh"}}></div>}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ handleClick, stateActive }) {
  return(
    <div className="col-auto d-flex justify-content-center col-sm-1 col-md-1 col-lg-2 col-xl-2 px-0 bg-dark sidebarAdmin">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-1 pt-2 text-white min-vh-100 position-fixed" style={{ width:"inherit" }}>
        <ul className="nav nav-pills flex-column w-100 mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="w-100">
            <button className={`hoverBtn nav-link px-0 align-middle px-0 w-100 text-light ${ stateActive?.home ? "active":""}` } onClick={()=>handleClick("Home")}>
              <GiMeatHook /> <span className="ms-1 d-none d-lg-inline">Home</span>
            </button>
          </li>
          <li className="w-100">
            <button className={`hoverBtn nav-link px-0 align-middle px-0 w-100 text-light ${ stateActive?.productos ? "active":""}` } onClick={()=>handleClick("Productos")} >
              <GiMeat /> <span className="ms-1 d-none d-lg-inline">Productos</span>
            </button>
          </li>
          <li className="w-100">
            <button className={`hoverBtn nav-link px-0 align-middle px-0 w-100 text-light ${ stateActive?.pedidios ? "active":""}` } onClick={()=>handleClick("Pedidios")}>
              <RiListOrdered /> <span className="ms-1 d-none d-lg-inline">Pedidos</span>
            </button>
          </li>
          <li className="w-100">
            <button className={`hoverBtn nav-link px-0 align-middle px-0 w-100 text-light ${stateActive?.promociones ? "active":""}`} onClick={()=>handleClick("Promociones")}>
              <MdCategory /> <span className="ms-1 d-none d-lg-inline">Promociones</span> 
            </button>
          </li>
          <li className="w-100">
            <button className={`hoverBtn nav-link px-0 align-middle px-0 w-100 text-light ${ stateActive?.usuarios ? "active":""}` } onClick={()=>handleClick("Usuarios")}>
              <FaUsersCog /> <span className="ms-1 d-none d-lg-inline">Usuarios</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

