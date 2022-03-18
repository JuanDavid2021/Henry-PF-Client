import React from 'react'
import { Link } from 'react-router-dom';

function CartDetailsCheckout() {

  return (
    <section className="py-5">
        <div className="container py-4">
          <div className="row gy-5">
            <div className="col-lg-9">
              {/* header  */}
              <ul className="nav nav-pills flex-column flex-md-row nav-fill border-bottom border-primary">
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#"> <i className="fas fa-map-marker-alt"></i>
                    <p className="mb-0 pt-1">Dirección</p></a></li>
                <li className="nav-item"><a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true"> <i className="fas fa-truck"></i>
                    <p className="mb-0 pt-1">Método de envío</p></a></li>
                <li className="nav-item"><a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true"> <i className="far fa-money-bill-alt"></i>
                    <p className="mb-0 pt-1">Método de pago</p></a></li>
                <li className="nav-item"><a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true"> <i className="far fa-eye"></i>
                    <p className="mb-0 pt-1">Revisión del pedido</p></a></li>
              </ul>
              {/* datos de comprador */}
              <form className="py-4" method="get" action="shop-checkout2.html">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="firstname">Nombre</label>
                    <input className="form-control" id="firstname" type="text" name="firstname"/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="lastname">Apellido</label>
                    <input className="form-control" id="lastname" type="text" name="lastname"/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="street">Calle</label>
                    <input className="form-control" id="street" type="text" name="street"/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="country">Provincia / Estado</label>
                    <input className="form-control" id="country" name="country" type="text"/>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 col-lg-3">
                    <label className="form-label" htmlFor="phone">Teléfono</label>
                    <input className="form-control" id="phone" type="tel" name="phone"/>
                  </div>
                  <div className="col-md-6 mb-3 col-lg-3">
                    <label className="form-label" htmlFor="zip">Código Postal</label>
                    <input className="form-control" id="zip" type="text" name="zip"/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="email_account">Email</label>
                    <input className="form-control" id="email_account" type="email" name="email_account"/>
                  </div>
                </div>
                {/* Navegacion */}
                <div className="align-items-center bg-light px-4 py-3 text-center mb-5">
                  <div className="row">
                    <div className="col-md-6 text-md-start py-1">
                    <Link to={"/cartDetails"} className="btn btn-secondary my-1">
                      <i className="fas fa-angle-left me-1"></i> Volver al resumen
                    </Link>
                  </div>
                  <div className="col-md-6 text-md-end py-1">
                    <Link to={"/cartDetailsCheckoutDelibery"}>
                      <button className="btn btn-primary my-1">Método de envío <i className="fas fa-angle-right ms-1"></i></button>
                    </Link>
                  </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- Resumen--> */}
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

export default CartDetailsCheckout;