import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { RiMapPin2Line, RiTruckLine, RiMoneyDollarCircleLine, RiEyeLine, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CartDetailsCheckout() {
  const user = useSelector((state) => state.user)

  const [input, setInput] = useState({
    nombre:"",
    apellido:"",
    direccion:"",
    localidad:"",
    celular:"",
    zip:"",
    comentario:"",
  })

  const handleChangeInputs = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true)
  }

  const navigate = useNavigate()

  const handleChangeToDelibery = (e) => {
    e.preventDefault()
    navigate("/cartDetailsCheckoutDelibery")
  }

  return (
    <section className="py-5">
        <div className="container py-4">
          <div className="row gy-5">
            <div className="col-lg-9">
              {/* header  */}
              <ul className="nav nav-pills flex-column flex-md-row nav-fill border-bottom border-primary">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="noopener noreferrer">
                    <RiMapPin2Line/>
                    <p className="mb-0 pt-1">Dirección</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="noopener noreferrer" tabIndex="-1" aria-disabled="true"> 
                    <RiTruckLine/>
                    <p className="mb-0 pt-1">Método de envío</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                    <RiMoneyDollarCircleLine />
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
              {/* datos de comprador */}
              <form onSubmit={handleSubmit} className="py-4 needs-validation" noValidate  validated={validated ? true : undefined}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="firstname">Nombre</label>
                    <input className="form-control" id="firstname" type="text" name="nombre" value={input.nombre} onChange={handleChangeInputs} required placeholder="Nombre de quien recibirá el pedido"/>
                    <div className="invalid-tooltip">
                      mensaje
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="apellido">Apellido</label>
                    <input className="form-control" id="apellido" type="text" name="apellido" value={input.apellido} onChange={handleChangeInputs} required placeholder="Apellido de quien recibirá el pedido"/>
                    <div className="invalid-feedback">
                      mensaje
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="direccion">Dirección</label>
                    <input className="form-control" id="direccion" type="text" name="direccion" value={input.direccion} onChange={handleChangeInputs} required placeholder='Dirección de entregar del pedido'/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="localidad">Localidad</label>
                    <input className="form-control" id="localidad" name="localidad" type="text" value={input.localidad} onChange={handleChangeInputs} required placeholder='Localidad de entregar del pedido'/>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 col-lg-3">
                    <label className="form-label" htmlFor="phone">Teléfono</label>
                    <input className="form-control" id="phone" type="tel" name="celular" value={input.celular} onChange={handleChangeInputs} required/>
                  </div>
                  <div className="col-md-6 mb-3 col-lg-3">
                    <label className="form-label" htmlFor="zip">Código Postal</label>
                    <input className="form-control" id="zip" type="zip" name="zip" value={input.zip} onChange={handleChangeInputs}/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="comentario">Comentario</label>
                    <input className="form-control" id="comentario" type="text" name="comentario" value={input.comentario} onChange={handleChangeInputs} placeholder="Comentario que aporte detalles"/>
                  </div>
                </div>
                {/* Navegacion */}
                <div className="align-items-center bg-light px-4 py-3 text-center mb-5">
                  <div className="row">
                    <div className="col-md-6 text-md-start py-1">
                    <Link to={"/cartDetails"} className="btn btn-dark my-1">
                      <RiArrowLeftSLine/> Volver al resumen
                    </Link>
                  </div>
                  {
                    user?.length===0 
                    ? <div className="col-md-6 text-md-end py-1">
                        <button className="btn btn-success text-light text-decoration-none fs-6 mx-3">Registrate</button>
                    </div>
                    : <div className="col-md-6 text-md-end py-1">
                        <button className="btn btn-primary my-1" onClick={handleChangeToDelibery} >Método de envío <RiArrowRightSLine/></button>
                    </div>

                  }
                  
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