import React from 'react'
import { useNavigate } from 'react-router';
import img from '../img/logo2.png'

function PageNotFound() {
  
  const navigate = useNavigate()

  setTimeout(() => {
    navigate("/shop")
  }, 2000);

  return (
    <div className="py-3 bg-dark" style={{ display: "flex", minHeight: "70vh", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
      <div className="alert align-middle bg-dark text-light bg-opacity-75 mt-3" style={{ display: "flex",flexDirection: "column", alignItems: "center", minWidth: "300px", maxWidth: "300px" }}>
        <h2 className="text-white my-2" style={{ textAlign: "center" }}>Página no encontrada</h2>
        <img src={img} alt="beefShop" style={{ width: "20vh" }}/>
        <h2 className="text-white my-2" style={{ textAlign: "center" }}>Será redirigido a la tienda</h2>
      </div>
    </div>
  )
}

export default PageNotFound