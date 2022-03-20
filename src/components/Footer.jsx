import React from 'react'
import img from '../img/logo2.png'


function Footer() {
    return (
        <div>
            <div className="bg-dark" style={{ padding: "100px 0 100px 0", display: "flex", alignItems: "baseline", justifyContent: "space-around" }}>
                <img src={img} alt="logo" style={{ width: "8%" }} />
                <p className='text-light'>Copyright © 2022 Beef Shop, Todos los derechos reservados.</p>
            </div>
        </div>
    )
}

export default Footer