import React from 'react'
import { Link } from 'react-router-dom';
import { RiTruckLine, RiMoneyDollarCircleLine, RiEyeLine, RiMapPin2Line, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

function CartDetailsCheckoutDelibery() {
  return (
    <section className="py-5">
      <div className="container py-4">
        <div className="row gy-5">
          <div className="col-lg-9">
            {/* header */}
            <ul className="nav nav-pills flex-column flex-md-row nav-fill border-bottom border-primary">
              <li className="nav-item">
                <Link to={"/cartDetailsCheckout"} className="nav-link" aria-current="page"> 
                  <RiMapPin2Line/>
                  <p className="mb-0 pt-1">Dirección</p>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="noopener noreferrer" tabIndex="-1" aria-disabled="true"> 
                  <RiTruckLine/>
                  <p className="mb-0 pt-1">Método de envío</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                  <RiMoneyDollarCircleLine/>
                  <p className="mb-0 pt-1">Método de pago</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                  <RiEyeLine/>
                  <p className="mb-0 pt-1">Revisión del pedido</p>
                </a>
              </li>
            </ul>
            {/* Envío */}
            <form className="py-4" method="get" action="shop-checkout3.html">
              <div className="row mb-4 gy-4">
                <div className="col-md-6">
                  <div className="bg-light p-4 p-xl-5">
                    <div className="form-check d-flex align-items-center">
                      <input className="form-check-input flex-shrink-0" id="delivery1" type="radio" name="delivery"/>
                      <label className="cursor-pointer d-block ms-3" htmlFor="delivery1"><span className="h4 d-block mb-1 text-uppercase">USPS Next Day</span><span className="text-sm d-block mb-0 text-muted">Get it right on next day - fastest option possible.</span></label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-light p-4 p-xl-5">
                    <div className="form-check d-flex align-items-center">
                      <input className="form-check-input flex-shrink-0" id="delivery2" type="radio" name="delivery"/>
                      <label className="cursor-pointer d-block ms-3" htmlFor="delivery2"><span className="h4 d-block mb-1 text-uppercase">USPS Next Day</span><span className="text-sm d-block mb-0 text-muted">Get it right on next day - fastest option possible.</span></label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Navegación */}
              <div className="align-items-center bg-light px-4 py-3 text-center mb-5">
                <div className="row">
                  <div className="col-md-6 text-md-start py-1">
                    <Link to={"/cartDetailsCheckout"} className="btn btn-dark my-1">
                      <RiArrowLeftSLine/> Volver a Direccón
                    </Link>
                  </div>
                  <div className="col-md-6 text-md-end py-1">
                    <Link to={"/cartDetailCheckoutPaymentMethod"}>
                      <button className="btn btn-primary my-1">Método de pago <RiArrowRightSLine/></button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Resumen */}
          <div className="col-lg-3">
            <div className="mb-5">
              <div className="p-4 bg-gray-200">
                <h3 className="text-uppercase mb-0">Resumen</h3>
              </div>
              <div className="bg-light py-4 px-3">
                <p className="text-muted">Los gastos de envío y adicionales se calculan en función de los valores que ha introducido.</p>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody className="text-sm">
                      <tr>
                        <th className="text-muted"> <span className="d-block py-1 fw-normal">Subtotal</span></th>
                        <th> <span className="d-block py-1 fw-normal text-end">$2000.00</span></th>
                      </tr>
                      <tr>
                        <th className="text-muted"> <span className="d-block py-1 fw-normal">Envío</span></th>
                        <th> <span className="d-block py-1 fw-normal text-end">$0.00</span></th>
                      </tr>
                      <tr>
                        <th className="text-muted"> <span className="d-block py-1 fw-normal">IVA</span></th>
                        <th> <span className="d-block py-1 fw-normal text-end">$0.00</span></th>
                      </tr>
                      <tr className="total">
                        <td className="py-3 border-bottom-0 text-muted"> <span className="lead fw-bold">Total</span></td>
                        <th className="py-3 border-bottom-0"> <span className="lead fw-bold text-end">$2000.00</span></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="p-4 bg-gray-200">
                <h4 className="text-uppercase mb-0">Código de descuento</h4>
              </div>
              <div className="bg-light py-4 px-3">
                <p className="text-muted">Si tiene un código de descuento, introdúzcalo en el cuadro a continuación.</p>
                <form action="#">
                  <div className="input-group">
                    <input className="form-control" type="text"/>
                    <button className="btn btn-primary" type="submit"><i className="fas fa-gift"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartDetailsCheckoutDelibery;