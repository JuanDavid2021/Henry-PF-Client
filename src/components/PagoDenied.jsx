import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useQueryParams } from "./useQuery";

function PagoDenied() {

    const query = useQueryParams()


    return (
        <div className="bg-light" style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
            <div className='alert align-middle bg-danger text-light bg-opacity-75' style={{ display: "flex", height: "30vh", flexDirection: "column", alignItems: "center" }}>
                <h1 className="text-center fw-normal pd-2">PAGO RECHAZADO!</h1>
                <h4 className="text-center fw-light pd-2">Verifique su informacion y reintente la compra</h4>
                <div className='mt-5'>
                <Link to="/shop" className="btn btn-dark text-decoration-none fs-6 px-4 mx-2">Tienda</Link>
                <Link to="/cartDetails" className="btn btn-outline-light text-decoration-none fs-6 px-4 mx-2">Carrito</Link>
                </div>


            </div>

        </div>
    )
}

export default PagoDenied