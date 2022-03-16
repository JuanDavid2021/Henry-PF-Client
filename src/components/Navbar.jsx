import React, { useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'

function NavBar() {

    const [user, setUser] = useState(false)

    const handleLogin = () => {
        user ? setUser(false) : setUser(true)
    }

    return (
            <nav className="navbar navbar-expand-lg flex-column bg-dark">
                <div class="container-fluid">
                    <a className="text-light text-decoration-none fs-4 mx-3 navbar-brand" href="#">Beef Shop</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon btn-outline-light" type="button"><GiHamburgerMenu /></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent" >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" data-bs-toggle="collapse" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" href="#">About</a>
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