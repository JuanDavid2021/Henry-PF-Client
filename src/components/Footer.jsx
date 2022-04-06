import React from 'react'
import { Link } from 'react-router-dom'
import img from '../img/logo2.png'


function Footer() {
    return (
        <div className="bg-dark px-1 py-2" style={{ height: "20vh", padding: "5vh 0", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <img src={img} alt="logo" style={{ width: "10vh" }} />
            <div className='d-flex flex-column align-items-end'>
                <a href='/about' className='link-light px-2 mb-2'>Sobre nosotros.</a>
                <span className='text-light px-2 mb-0' style={{textAlign:"end"}}>Copyright © 2022 Beef Shop, Todos los derechos reservados.</span>
            </div>
        </div>
    )
}

export default Footer