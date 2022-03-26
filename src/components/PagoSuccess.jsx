import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useQueryParams } from "./useQuery";

function PagoSuccess() {

    const query = useQueryParams()


    return (
        <div className="bg-light" style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
            <div className='alert align-middle bg-success text-light ' style={{ display: "flex", height: "30vh", flexDirection: "column", alignItems: "center" }}>
                <h1 className="text-center fw-normal pd-2">PAGO RECIBIDO EXITOSAMENTE!</h1>
                <h4 className="text-center fw-light pd-2">Gracias por su compra, le enviamos un mail de confirmacion a "{query.correo}"</h4>
                <h4 className="text-center fw-light fs-5 mt-2">El id de su pago es: {query.id}</h4>

                <Link to="/shop" className="btn btn-dark text-decoration-none fs-6 position-relative px-4 mt-5">Tienda</Link>

            </div>

        </div>
    )
}

export default PagoSuccess