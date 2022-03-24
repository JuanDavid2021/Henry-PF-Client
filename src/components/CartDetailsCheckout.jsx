import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiMapPin2Line, RiTruckLine, RiMoneyDollarCircleLine, RiEyeLine, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { setDelivery } from './../actions';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function CartDetailsCheckout() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validate, setValidate] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      dispatch(setDelivery(input))
      navigate("/cartDetailsCheckoutDelivery")
    }
    setValidate(true)
  }

  return (
    <section className="py-5">
      <div className="container py-4">
        <Row className="row gy-5">
          <Col className="col-lg-9">
            {/* Header */}
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
                    <RiEyeLine/>
                    <p className="mb-0 pt-1">Revisión del pedido</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                    <RiMoneyDollarCircleLine />
                    <p className="mb-0 pt-1">Método de pago</p>
                  </a>
                </li>
              </ul>
            <Form className='py-4 row g-3 needs-validation' noValidate validated={validate} onSubmit={handleSubmit}>
              <Row className="row">
                <Form.Group as={Col} md={6} mb={3} className="col-md-6 mb-3" controlId="validationCustom01">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={input.nombre} 
                    onChange={handleChangeInputs}
                    placeholder="Nombre de quien recibirá el pedido"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} mb={3} className="col-md-6 mb-3" controlId="validationCustom02">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text" 
                    name="apellido" 
                    value={input.apellido} 
                    onChange={handleChangeInputs} placeholder="Apellido de quien recibirá el pedido"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} mb={3} className="col-md-6 mb-3" controlId="validationCustom03">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text" 
                    name="direccion" 
                    value={input.direccion} 
                    onChange={handleChangeInputs} placeholder="Dirección de entregar del pedido"
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} mb={3} className="col-md-6 mb-3" controlId="validationCustom04">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control
                    name="localidad" 
                    type="text" 
                    value={input.localidad} 
                    onChange={handleChangeInputs} 
                    placeholder='Localidad de entregar del pedido'
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="row mb-4">
                <Form.Group as={Col} md={6} lg={3} className="col-md-6 mb-3 col-lg-3" controlId="validationCustom05">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="number" 
                    name="celular" 
                    value={input.celular} 
                    onChange={handleChangeInputs}
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} lg={3} className="col-md-6 mb-3 col-lg-3" controlId="validationCustom06">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="zip" 
                    name="zip" 
                    value={input.zip} 
                    onChange={handleChangeInputs}
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} mb={3} className="col-md-6 mb-3" controlId="validationCustom07">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="comentario" 
                    value={input.comentario} 
                    onChange={handleChangeInputs} placeholder="Comentario que aporte detalles"
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato</Form.Control.Feedback>
                </Form.Group>
              </Row>
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
                      <button className="btn btn-primary my-1" type="submit">Método de envío <RiArrowRightSLine/></button>
                  </div>
                }
                </div>
              </div>
            </Form>
          </Col>
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
        </Row>
      </div>
    </section>
  );
}


export default CartDetailsCheckout;