import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
//import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteCartItem } from '../actions';

function CartDetails() {

  const dispatch = useDispatch();
  const arrCartProducts = useSelector(state => state.cart);

  
  let obj = {}
  
  useEffect(() => {
    arrCartProducts.forEach((product) => {
      obj[product.nombreCap + product.tipo_corte] = "1"
    })
  }, [arrCartProducts])
  
  const [changeQuantity, setChangeQuantity] = useState(obj)
  
  const handleChangeQuantity = (e) => {
    setChangeQuantity({
      ...changeQuantity,
      [e.target.name]: e.target.value
    })
  }

  const sumPrice = arrCartProducts?.map(el => el.precio).reduce((a, b) => Number(a) + Number(b), 0)



  return (
    <section className="py-5">
      <div className="container py-4">
        <p className="text-muted lead mb-5">Actualmente tiene {arrCartProducts?.length} artículo(s) en su carrito.</p>
        <div className="row">
          <div className="col-lg-9">
            {/* Tabla de productos */}
            <form >
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <tr className="text-sm">
                      <th className="border-gray-300 border-top py-3" colSpan="2">Producto</th>
                      <th className="border-gray-300 border-top py-3">Presentación</th>
                      <th className="border-gray-300 border-top py-3">Cantidad</th>
                      <th className="border-gray-300 border-top py-3">Precio</th>
                      <th className="border-gray-300 border-top py-3">Descuento</th>
                      <th className="border-gray-300 border-top py-3">Total</th>
                      <th className="border-gray-300 border-top py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      arrCartProducts?.length &&
                      arrCartProducts.map(p => (
                        <tr key={p.id + p.tipo_corte} className="text-sm">
                          <td className="align-middle border-gray-300 py-3"><a href="noopener noreferrer"><img className="img-fluid flex-shrink-0" src={p.arrFotos[0]} alt={p.nombreCap} style={{ minWidth: "50px" }} width="50" /></a></td>
                          <td className="align-middle border-gray-300 py-3">{p.nombreCap}</td>
                          <td className="align-middle border-gray-300 py-3">{p.tipo_corte}</td>
                          <td className="align-middle border-gray-300 py-3">
                            <input className="form-control" min={1} type="number" name={p.nombreCap + p.tipo_corte} value={changeQuantity.nombreCap} onChange={handleChangeQuantity} defaultValue="1" style={{ maxWidth: "3.5rem" }} />
                          </td>
                          <td className="align-middle border-gray-300 py-3">{p.precio}</td>
                          <td className="align-middle border-gray-300 py-3">$0.00</td>
                          <td className="align-middle border-gray-300 py-3">{p.precio}</td>
                          <td className="align-middle border-gray-300 py-3">
                            <button
                              className="btn p-0"
                              type="button"
                              onClick={() => {
                                dispatch(deleteCartItem(p))
                              }}
                            >
                              <RiDeleteBin5Fill />
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className="py-3 border-0" colSpan="5"> <span className="h4 text-gray-700 mb-0">Total</span></th>
                      <th className="py-3 border-0 text-end" colSpan="2"> <span className="h4 text-gray-700 mb-0">$ {sumPrice}</span></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* Navegación */}
              <div className="row gx-lg-0 align-items-center bg-light px-4 py-3 text-center mb-5">
                <div className="col-md-6 text-md-start py-1">
                  <Link to={"/shop"} className="btn btn-dark my-1">
                    <RiArrowLeftSLine /> Seguir comprando
                  </Link>
                </div>
                <div className="col-md-6 text-md-end py-1">
                  <button className="btn btn-dark my-1"><i className="fas fa-sync-alt me-1"></i> Actualizar Carrito</button>
                  <Link to={"/cartDetailsCheckout"}>
                    <button className="btn btn-outline-primary my-1">Verificación <RiArrowRightSLine /></button>
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
                        <th> <span className="d-block py-1 fw-normal text-end">{sumPrice}</span></th>
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
                        <th className="py-3 border-bottom-0"> <span className="lead fw-bold text-end">$ {sumPrice}</span></th>
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
                    <input className="form-control" type="text" />
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