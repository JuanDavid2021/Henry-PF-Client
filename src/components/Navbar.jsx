import React, { useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import img from '../img/logo2.png'
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert"
import {logoutuser} from "../actions/index"


function NavBar({setAuth}) {

    const dispatch = useDispatch()
    const itemsCart = useSelector(state => state.cart)
    const userLogin = useSelector(state=>state.userAuthenticated)
    console.log(userLogin)
    

/*      const handleLogin = () => {
        user ? setUser(false) : setUser(true)
    }  */

    const logout=(e)=>{
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        swal({
           text:"has cerrado la sesion",
           icon: "success",
           timer:"2000",
        })
        dispatch(logoutuser("user_out"))
        }

    return (
        <nav className="navbar navbar-expand-lg flex-column bg-dark">
            <div className="container-fluid">
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/" style={{ width: "3%" }}><img src={img} alt="logo" style={{ width: "100%" }} /></Link>
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/">Beef Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon btn-outline-light" type="button"><GiHamburgerMenu /></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" to='/shop'>Tienda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" to="/about">Sobre nosotros</Link>
                        </li>
 
                    </ul>
                   {
                        userLogin ==="user_ok" ?
                        <div>
                        <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none fs-6 position-relative">Carrito <RiShoppingCartLine />
                            {
                            itemsCart.length !== 0 ? 
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {itemsCart?.length}
                                    <span className="visually-hidden">{itemsCart?.length}</span>
                                </span> :
                                <span></span>
                            }
                        </Link>
                        <button className="btn btn-primary text-light text-decoration-none fs-6 mx-3" onClick={e=>logout(e)}>Log out</button>
                      </div>
                       :   
                         <div>
                            <div>
                                <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none fs-6 position-relative" style={ {left:"-17px"}}>Carrito <RiShoppingCartLine />
                                    {
                                    itemsCart.length !== 0 ? 
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {itemsCart?.length}
                                            <span className="visually-hidden">{itemsCart?.length}</span>
                                        </span> :
                                        <span></span>
                                    }
                                </Link>
                                <Link to="/loginuser"><button className="btn btn-primary text-light text-decoration-none fs-6" >Ingresar</button></Link>
                                <Link to="/register"><button className="btn btn-success text-light text-decoration-none fs-6 mx-3" >Registrate</button></Link>
                            </div>
                      </div>
                       }
                </div>
            </div>
        </nav>
    )
}

export default NavBar