import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteCartItem, setCartItem } from '../actions';
import { Modal, Button } from 'react-bootstrap';

function Pedidos() {
  const arrCartProducts = useSelector(state => state.cart);

  const [modal, setModal] = useState({ show: false, msg: "" })

  const navigate = useNavigate()

  const handleNavigateDelibery = (e) => {
    e.preventDefault()
    if (arrCartProducts.length > 0) {
      let stock = false
      arrCartProducts.forEach((p) => {
        if (p.cantidad > p.stock) {
          stock = true
        }
      })
      if (stock) {
        setModal({
          show: true,
          msg: "La cantidad supera el stock"
        })
      } else {
        navigate("/cartDetailsCheckout")
      }
    } else {
      setModal({
        show: true,
        msg: "No posee productos en su carrito"
      })
    }
  }




  const handleCloseModal = () => {
    setModal(false)
  }

  let arrSuma = []

  arrCartProducts.map((p) => arrSuma.push(p.precioTotal * p.cantidad))

  let suma = arrSuma?.reduce((a, b) => Number(a) + Number(b), 0)

  return (
    <section className="py-5">
      <div className="container py-4">
        <p className="text-muted lead mb-5">Actualmente tiene {arrCartProducts?.length} artículo(s) en su carrito.</p>
        <div className="row">
          <div className="col-lg-9">
            {/* Tabla de productos */}
            <form >
              <div className="table-responsive ">
                <table className="table text-nowrap ">
                  <thead  >
                    <tr className="text-sm ">
                      <th className="border-gray-300 border-top py-3" colSpan="2">Producto</th>
                      <th className="border-gray-300 border-top py-3">Presentación</th>
                      <th className="border-gray-300 border-top py-3">Cantidad</th>
                      <th className="border-gray-300 border-top py-3">Precio</th>
                      <th className="border-gray-300 border-top py-3">Total</th>
                      <th className="border-gray-300 border-top py-3">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      arrCartProducts.length > 0 ?
                        /* Mapeo de las filas de la tabla con los items del carrito */
                        arrCartProducts.map((p) => {
                          return (
                            <TrItemCart key={p.idItemFront} el={p} inputRender={true} />
                          )
                        }
                        )
                        : <tr className="lead text-center fs-3 fw-normal mt-3">
                          <td>
                            No tiene productos en el carrito
                          </td>
                        </tr>
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className="py-3 border-0" colSpan="5"> <span className="h4 text-gray-700 mb-0">Total</span></th>
                      <th className="py-3 border-0 text-end" colSpan="2"> <span className="h4 text-gray-700 mb-0">$ {suma}</span></th>
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
                  {
                    <button className="btn btn-primary my-1" onClick={handleNavigateDelibery}>Verificación <RiArrowRightSLine /></button>
                  }
                </div>
              </div>
            </form>
          </div>
          {/* Resumen */}
          <Resume />
        </div>
      </div>
      {/* Modal */}
      <Modal
        show={modal.show}
        size="sm"
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title><p style={{ textAlign: "center" }}>Error</p></Modal.Title>
        </Modal.Header>
            <Modal.Body>
              <p>{modal.msg}</p>
            </Modal.Body>
    

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export function Resume() {
  const arrCartProducts = useSelector(state => state.cart);

  let arrSuma = []

  arrCartProducts.map((p) => arrSuma.push(p.precioTotal * p.cantidad))

  let suma = arrSuma?.reduce((a, b) => Number(a) + Number(b), 0)

  return (
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
                  <th> <span className="d-block py-1 fw-normal text-end">$ {suma}</span></th>
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
                  <th className="py-3 border-bottom-0 text-end"> <span className="lead fw-bold text-end">$ {suma}</span></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TrItemCart({ el, inputRender }) {
  const dispatch = useDispatch()
  const [changeQuantityItem, setChangeQuantityItem] = useState({
    ...el,
    cantidad: el?.cantidad
  })

  const handleChangeQuantityItem = (e) => {

    setChangeQuantityItem({
      ...changeQuantityItem,
      cantidad: e.target.value
    })
    let elem = {
      ...el,
      cantidad: e.target.value
    }
    dispatch(setCartItem(elem))
  }

  return (
    <tr className="text-sm">
      <td className="align-middle border-gray-300 py-3"><a href="noopener noreferrer"><img className="img-fluid flex-shrink-0" src={el.arrFotos[0]} alt={el.nombre} style={{ minWidth: "50px" }} width="50" /></a></td>
      <td className="align-middle border-gray-300 py-3">{el.nombre}</td>
      <td className="align-middle border-gray-300 py-3">{el.tipo_corte} - {el.peso} kg</td>
      {
        inputRender

          ? <td className="align-middle border-gray-300 py-3">
            <input className="form-control" min={1} max={el.stock} type="number" name={el.idItemFront} value={changeQuantityItem.cantidad} onChange={handleChangeQuantityItem} style={{ maxWidth: "3.5rem", padding: "2px" }} />
          </td>

          : <td className="align-middle border-gray-300 py-3">{el.cantidad}</td>
      }
      <td className="align-middle border-gray-300 py-3">${el.precio}</td>
      <td className="align-middle border-gray-300 py-3">${(el.precioTotal * changeQuantityItem.cantidad)}</td>
      {
        inputRender

          ? <td className="align-middle border-gray-300 py-3">
            <button className="btn mx-2" type="button" onClick={() => { dispatch(deleteCartItem(el)) }}>
              <RiDeleteBin5Fill />
            </button>
          </td>

          : null
      }
    </tr>
  )
}

export default Pedidos;