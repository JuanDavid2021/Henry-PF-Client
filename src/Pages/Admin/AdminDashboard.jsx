import React, { useState } from 'react';
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

  const [show, setShow] = useState({home: true
  })


  const handleClick = (str) => {
    if (str === "Pedidios") {
      setShow({...show, pedidios: true, usuarios: false, productos: false, promociones:false})
    }
    if (str === "Usuarios") {
      setShow({...show, usuarios: true, pedidios: false, productos: false, promociones:false})
    }
    if (str === "Productos") {
      setShow({...show, usuarios: false, pedidios: false, productos: true, promociones:false})
    }
    if (str === "Promociones") {
      setShow({...show, usuarios: false, pedidios: false, productos: false, promociones:true})
    }
  }

  return (
    <div className="container-fluid justify-content-between">
      <div className="row flex-nowrap" style={{ minHeight: "70vh" }}>
        <Sidebar handleClick={handleClick} stateActive={show}/>
        <div className="col-sm-11 col-md-11 col-lg-10 col-xl-10 px-0 contentAdmin">
          {show?.home ? <HomeAdmin />: null}
          {show?.productos ? <Products /> : null}
          {show?.pedidios ? <Pedidos /> : null}
          {show?.usuarios ? <UserList /> : null}
          { show?.promociones ? <Promos /> : null }
          {Object.keys(show)?.length === 0 && <div style={{height:"70vh"}}></div>}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ handleClick, stateActive }) {
  //console.log(stateActive);
  return(
    <div className="col-auto d-flex justify-content-center col-md-1 col-lg-2 col-xl-2 px-0 bg-dark sidebarAdmin">
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
          </li> */}
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

