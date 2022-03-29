import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiShoppingCartLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { logoutuser, setPlatformUser } from "../actions/index";
import img from '../img/logo2.png';


function NavBar({ setAuth }) {


    const dispatch = useDispatch()


    const navigate = useNavigate();


    const itemsCart = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userAuthenticated)
    const currentUser = useSelector(state => state.user);
    console.log("hola", localStorage.token)
    console.log("hola33", localStorage.mail)

    console.log(userLogin)

    useEffect(() => {
        if (localStorage.mail === "beefshophenry@gmail.com") {
            currentUser.token= localStorage.token;
            currentUser.administrador= true;
            console.log(currentUser)
        } 
        currentUser.token= localStorage.token;
        console.log(currentUser)
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
    

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("mail")
        localStorage.removeItem("loginData")
        setAuth(false)
        dispatch(setPlatformUser({ administrador: false, nombre: "Invitado", email: "invitado@invitado.com" }))
        swal({
            text: "has cerrado la sesion",
            icon: "success",
            timer: "2000",
        })
        dispatch(logoutuser({ state: "user_out" }))
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark sticky-top" style={{ height: "10vh" }}>
            <div className="container-fluid" style={{ background: "#212529 "}}>
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/" style={{ width: "5vh" }}>
                    <img src={img} alt="logo" style={{ width: "100%" }} />
                </Link>
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/">Beef Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon btn-outline-light" type="button"><GiHamburgerMenu /></span>
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
                                <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none position-relative">Carrito <RiShoppingCartLine />
                                    {
                                        itemsCart.length !== 0 ?
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {itemsCart?.length}
                                                <span className="visually-hidden">{itemsCart?.length}</span>
                                            </span> :
                                            <span></span>
                                    }
                                </Link>
                                <button className="btn btn-primary text-light mx-2" onClick={e => logout(e)}>Log out</button>
                                {currentUser.administrador ? 
                                <button className="btn btn-secondary text-light" onClick={dashboard}>Dashboard</button> 
                                :
                                <button className="btn btn-secondary text-light" onClick={toProfile}>Mi perfil <CgProfile size={20} style={{marginBottom: "3px"}}/> </button> 
                                }
                            </div>
                            :
                            <div>
                                <div className="flex-column py-2">
                                    <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none" >Carrito <RiShoppingCartLine />
                                        {
                                            itemsCart.length !== 0 ?
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {itemsCart?.length}
                                                    <span className="visually-hidden">{itemsCart?.length}</span>
                                                </span> :
                                                <span></span>
                                        }
                                    </Link>

                                    <Link to="/loginuser"><button className="btn btn-primary text-light text-decoration-none  mx-2" >Ingresar</button></Link>
                                    <Link to="/register"><button className="btn btn-success text-light text-decoration-none" >Registrate</button></Link>

                                </div>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar