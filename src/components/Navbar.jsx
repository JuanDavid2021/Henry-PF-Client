import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiShoppingCartLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BsCardList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { logoutuser, setPlatformUser, apiUpdateUser, flushCart } from "../actions/index";
import img from '../img/logo2.png';
import { motion } from 'framer-motion';


const variants = {
    open: { rotate: 90},
    closed: { rotate: 0},
  }

function NavBar({ setAuth }) {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userAuthenticated = useSelector(state => state.userAuthenticated)
    const itemsCart = useSelector(state => state.cart)
    const currentUser = useSelector(state => state.user);


    useEffect(() => {
        if (currentUser.email === "beefshophenry@gmail.com") {
            currentUser.administrador = true;
        } else {
            currentUser.administrador = false;
        }
    }, [])
    /*      const handleLogin = () => {
            user ? setUser(false) : setUser(true)
        }  */

    const dashboard = () => {
        navigate('/dashboard')
    }

    const toProfile = () => {
        navigate('/profile')
    }

    // const toList = () => {
    //     navigate('/wishlist')
    // }

    const logout = (e) => {
        e.preventDefault()
        if (itemsCart.length > 0) {
            const shoppingCart = itemsCart.map(i => {
                return JSON.stringify({
                    id: i.id,
                    nombre: i.nombre,
                    // idItemFront: i.idItemFront,
                    precio: i.precio,
                    precioFinal: i.precioFinal,
                    tipo_corte: i.tipo_corte,
                    peso: i.peso,
                    cantidad: i.cantidad,
                    precioTotal: i.precioTotal,
                    stock: i.stock,
                    arrFotos: i.arrFotos //foto
                })
            }
            )
            
            apiUpdateUser({ correo: currentUser.email, shoppingCart: shoppingCart })
            dispatch(flushCart())
        } else {
            apiUpdateUser({ correo: currentUser.email, shoppingCart: [] })
        }
        localStorage.removeItem("token")
        localStorage.removeItem("mail")
        localStorage.removeItem("loginData")
        setAuth(false)
        dispatch(setPlatformUser({ administrador: false, nombre: "Invitado", email: "invitado@invitado.com", shoppingCart: null }))
        swal({
            text: "has cerrado la sesion",
            icon: "success",
            timer: "2000",
        })
        dispatch(logoutuser({ state: "user_out" }))
    }

    document.addEventListener("scroll", () => {
        let navcontent = document.getElementById("navbarSupportedContent")
        setIsOpen(false)
        navcontent.classList.remove("show")
    })

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        var ignoreClickOnMeElement = document.getElementById("navbarSupportedContent");

        document.addEventListener("click", (evt) => {

            if (evt.target.nodeName !== "A" && evt.target.nodeName !== "BUTTON" && evt.target.nodeName !== "IMG") {
                var isClickInsideElement = ignoreClickOnMeElement.contains(evt.target);
                if (!isClickInsideElement) {
                    ignoreClickOnMeElement.classList?.remove("show")
                    setIsOpen(false)
                }
            }
        })
    }, [])
    

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-dark" style={{ height: "10vh" }}>
            <div className="container-fluid bg-dark" >
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/" style={{ width: "5vh" }}>
                    <img src={img} alt="logo" style={{ width: "100%" }} />
                </Link>
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/">Beef Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={() => setIsOpen(isOpen => !isOpen)} data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="btnHamburger" style={{ zIndex: "100"}}>
                    <motion.span style={{position: "relative", zIndex:"-1"}} className="navbar-toggler-icon" animate={isOpen ? "open" : "closed"} variants={variants} ><GiHamburgerMenu size={"30px"} color={"white"} /></motion.span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="text-light text-decoration-none py-0 fw-light fs-5 mx-2 nav-link" to='/shop'>Tienda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-light text-decoration-none py-0 fw-light fs-5 mx-2 nav-link" to="/about">Sobre nosotros</Link>
                        </li>

                    </ul>
                    {
                        (localStorage.token !== undefined || localStorage.loginData !== undefined) ?
                            <div className="flex-column py-2">
                                <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none position-relative mx-2">Carrito <RiShoppingCartLine />
                                    {
                                        itemsCart.length !== 0 ?
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {itemsCart?.length}
                                                <span className="visually-hidden">{itemsCart?.length}</span>
                                            </span> :
                                            <span></span>
                                    }
                                </Link>
                                {/* {currentUser.administrador ?
                                    null
                                    :
                                    <button className="btn btn-danger text-light mx-2" onClick={toList}>Lista de deseos <BsCardList size={20} style={{ marginBottom: "3px" }} /> </button>
                                } */}
                                <button className="btn btn-primary text-light mx-2" onClick={e => logout(e)}>Salir</button>
                                {currentUser.administrador ?
                                    <button className="btn btn-secondary text-light mx-2" onClick={dashboard}>Dashboard</button>
                                    :
                                    <button className="btn btn-secondary text-light mx-2" onClick={toProfile}>Mi perfil <CgProfile size={20} style={{ marginBottom: "3px" }} /> </button>
                                }
                            </div>
                            :
                            <div>
                                <div className="flex-column py-2">
                                    <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none position-relative mx-2" >Carrito <RiShoppingCartLine />
                                        {
                                            itemsCart.length !== 0 ?
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {itemsCart?.length}
                                                    <span className="visually-hidden">{itemsCart?.length}</span>
                                                </span> :
                                                <span></span>
                                        }
                                    </Link>

                                    <Link to="/loginuser"><button className="btn btn-primary text-light text-decoration-none mx-2" >Ingresar</button></Link>
                                    <Link to="/register"><button className="btn btn-success text-light text-decoration-none mx-2" >Registrate</button></Link>

                                </div>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar