import React, { useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function NavBar() {

    const [user, setUser] = useState(false)

    const handleLogin = () => {
        user ? setUser(false) : setUser(true)
    }

    return (
            <nav className="navbar navbar-expand-lg flex-column bg-dark">
                <div className="container-fluid">
                    <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/">Beef Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon btn-outline-light" type="button"><GiHamburgerMenu /></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent" >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" to='/shop'>Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        {
                            user === false ?
                                <div>
                                    <button className="btn btn-primary text-light text-decoration-none fs-6" onClick={handleLogin} >Login</button>
                                    <button className="btn btn-success text-light text-decoration-none fs-6 mx-3">Register</button>
                                </div>
                                :
                                <div>
                                    <a className="btn btn-outline-success text-decoration-none fs-6">Carrito <RiShoppingCartLine /></a>
                                    <a className="btn btn-primary text-light text-decoration-none fs-6 mx-3" onClick={handleLogin}>Log out</a>
                                </div>
                        }
                    </div>
                </div>
            </nav>
    )
}

export default NavBar