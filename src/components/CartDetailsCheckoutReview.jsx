import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiMapPin2Line, RiTruckLine, RiEyeLine, RiMoneyDollarCircleLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { TrItemCart, Resume } from './CartDetails';

function CartDetailsCheckoutReview() {
  const arrCartProducts = useSelector(state => state.cart);
  const despacho = useSelector(state => state.despacho)
  const navigate = useNavigate()

  const handleNavigatePayment = (e) => {
    navigate("/cartDetailsCheckoutPaymentMethod")
  }

  let arrSuma = []

  arrCartProducts.map((p) => arrSuma.push(p.precioTotal * p.cantidad))
  
  let suma = arrSuma?.reduce((a, b) => Number(a) + Number(b), 0)

  return (
    <section className="py-5">
      <div className="container py-4">
        <div className="row gy-5">
          <div className="col-lg-9">
            {/* Header */}
            <ul className="nav nav-pills flex-column flex-md-row nav-fill border-bottom border-primary">
              <li className="nav-item">
                <Link to={"/cartDetailsCheckout"} className="nav-link" aria-current="page"> 
                  <RiMapPin2Line/>
                  <p className="mb-0 pt-1">Dirección</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cartDetailsCheckoutDelivery"} className="nav-link" aria-current="page">
                  <RiTruckLine/>
                  <p className="mb-0 pt-1">Método de envío</p>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="noopener noreferrer" tabIndex="-1" aria-disabled="false">
                  <RiEyeLine/>
                  <p className="mb-0 pt-1">Revisión del pedido</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="noopener noreferrer" aria-disabled="true">
                  <RiMoneyDollarCircleLine/>
                  <p className="mb-0 pt-1">Método de pago</p>
                </a>
              </li>
            </ul>
            {/* <!-- CHECKOUT REVIEW TABLE --> */}
            <div className="table-responsive ">
              <table className="table text-nowrap ">
                <thead  >
                  <tr className="text-sm ">
                    <th className="border-gray-300 border-top py-3" colSpan="2">Producto</th>
                    <th className="border-gray-300 border-top py-3">Presentación</th>
                    <th className="border-gray-300 border-top py-3">Cantidad</th>
                    <th className="border-gray-300 border-top py-3">Precio</th>
                    <th className="border-gray-300 border-top py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    arrCartProducts.length > 0 ?
                    /* Mapeo de las filas de la tabla con los items del carrito */
                      arrCartProducts.map((p) => {
                        return (
                          <TrItemCart key={p.idItemFront} el={p} inputRender={false}/>
                        )
                      }
                      )
                      : <p className="lead text-center fs-3 fw-normal mt-3">
                        No tiene productos en el carrito
                      </p>
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th className="py-3 border-0" colSpan="5"> <span className="h4 text-gray-700 mb-0">Total</span></th>
                    <th className="py-3 border-0 text-end" colSpan="2"> <span className="h4 text-gray-700 mb-0">$ {suma}</span></th>
                  </tr>
                </tfoot>
              </table>
              <div>
                <h5>
                  Método de envío: {despacho.tipo_entrega.toUpperCase()}
                </h5>
              </div>
            </div>
            {/* Navegacion */}
              <div className="align-items-center bg-light px-4 py-3 text-center mb-5">
                <div className="row">
                  <div className="col-md-6 text-md-start py-1">
                    <Link to={"/cartDetailsCheckoutDelivery"} className="btn btn-dark my-1">
                      <RiArrowLeftSLine/> Volver a Dirección
                    </Link>
                  </div>
                  <div className="col-md-6 text-md-end py-1">
                      <button className="btn btn-primary my-1" onClick={handleNavigatePayment}>Método de pago<RiArrowRightSLine/></button>
                  </div>
                </div>
              </div>
          </div>
          {/* Resumen */}
          <Resume/>
        </div>
      </div>
    </section>
  )
}

export default CartDetailsCheckoutReview;