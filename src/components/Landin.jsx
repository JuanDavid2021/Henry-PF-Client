import React from 'react'
import { Link } from 'react-router-dom'
import img from '../img/logo2.png'



function Landin() {
    return (
        <div className="bg-dark" style={{height:"70vh", display:"flex", justifyContent:"center", alignItems:"center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)"}}>
            <div className='bg-dark bg-opacity-75 p-5 rounded ' style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h1 className="text-center text-light fw-normal pd-2">Comprar carne de calidad nunca fue tan fácil</h1>
                <h4 className="text-center text-light fw-light pd-2">garantizamos la mejor carne de calidad para tí a tan solo un click</h4>
                <img src={img} alt="logo" className='mt-5' style={{ width: "15%" }} />
                <Link to="/shop" className="btn btn-dark text-decoration-none fs-6 position-relative mt-5 px-4 p-2">Tienda</Link>
            
            </div>

        </div>
    )
}

export default Landin