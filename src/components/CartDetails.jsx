import React from 'react'
import arrProductos from './../dataSimulate';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function CartDetails() {
  let arrProducts = arrProductos?.filter(p => p.id == 1)
  console.log(arrProducts);

  return (
    <section className="py-5">
        <div className="container py-4">
          <p className="text-muted lead mb-5">Actualmente tiene 2 artículo(s) en su carrito.</p>
          <div className="row">
            <div className="col-lg-9">
              {/* Tabla de productos */}
              <form >
                <div className="table-responsive">
                  <table className="table text-nowrap">
                    <thead>
                      <tr className="text-sm">
                        <th className="border-gray-300 border-top py-3" colSpan="2">Producto</th>
                        <th className="border-gray-300 border-top py-3">Cantidad</th>
                        <th className="border-gray-300 border-top py-3">Precio</th>
                        <th className="border-gray-300 border-top py-3">Descuento</th>
                        <th className="border-gray-300 border-top py-3">Total</th>
                        <th className="border-gray-300 border-top py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-sm">
                        <td className="align-middle border-gray-300 py-3"><a href="#"><img className="img-fluid flex-shrink-0" src="img/detailsquare.jpg" alt="Bife" style={{minWidth: "50px"}} width="50"/></a></td>
                        <td className="align-middle border-gray-300 py-3"><a href="#">Bife</a></td>
                        <td className="align-middle border-gray-300 py-3"> 
                          <input className="form-control" type="number" value="2" style={{maxWidth: "3.5rem"}}/>
                        </td>
                        <td className="align-middle border-gray-300 py-3">$900.00</td>
                        <td className="align-middle border-gray-300 py-3">$0.00</td>
                        <td className="align-middle border-gray-300 py-3">$1800.00</td>
                        <td className="align-middle border-gray-300 py-3">
                          <button className="btn btn-link p-0" type="button"><i className="fas fa-trash-alt"></i></button>
                        </td>
                      </tr>
                      <tr className="text-sm">
                        <td className="align-middle border-gray-300 py-3"><a href="#"><img className="img-fluid flex-shrink-0" src="img/basketsquare.jpg" alt="Carne de cerdo" style={{minWidth: "50px"}} width="50"/></a></td>
                        <td className="align-middle border-gray-300 py-3"><a href="#">Carne de cerdo</a></td>
                        <td className="align-middle border-gray-300 py-3"> 
                          <input className="form-control" type="number" value="1" style={{maxWidth: "3.5rem"}}/>
                        </td>
                        <td className="align-middle border-gray-300 py-3">$200.00</td>
                        <td className="align-middle border-gray-300 py-3">$0.00</td>
                        <td className="align-middle border-gray-300 py-3">$200.00</td>
                        <td className="align-middle border-gray-300 py-3">
                          <button className="btn btn-link p-0" type="button"><i className="fas fa-trash-alt"></i></button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th className="py-3 border-0" colSpan="5"> <span className="h4 text-gray-700 mb-0">Total</span></th>
                        <th className="py-3 border-0 text-end" colSpan="2"> <span className="h4 text-gray-700 mb-0">$2000.00</span></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* Navegación */}
                <div className="row gx-lg-0 align-items-center bg-light px-4 py-3 text-center mb-5">
                  <div className="col-md-6 text-md-start py-1">
                  <Link to={"/shop"} className="btn btn-secondary my-1">
                    <i className="fas fa-angle-left me-1"/> Seguir comprando
                  </Link>
                  </div>
                  <div className="col-md-6 text-md-end py-1">
                    <button className="btn btn-secondary my-1"><i className="fas fa-sync-alt me-1"></i> Actualizar Carrito</button>
                    <Link to={"/cartDetailsCheckout"}>
                      <button className="btn btn-outline-primary my-1">Verificación <i className="fas fa-angle-right ms-1"></i></button>
                    </Link>
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

export default CartDetails