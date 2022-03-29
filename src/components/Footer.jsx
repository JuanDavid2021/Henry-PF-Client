import React from 'react'
import img from '../img/logo2.png'


function Footer() {
    return (
        <div className="bg-dark px-1" style={{height:"20vh", padding: "5vh 0", display: "flex", alignItems: "flex-end", justifyContent: "space-around" }}>
            <img src={img} alt="logo" style={{ width: "10vh" }} />
            <span className='text-light px-2 mb-0'>Copyright © 2022 Beef Shop, Todos los derechos reservados.</span>
        </div>
    )
}

export default Footer