import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiMapPin2Line, RiTruckLine, RiMoneyDollarCircleLine, RiEyeLine, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { setDelivery } from './../actions';
import { Form, Col, Row } from 'react-bootstrap';
import { Resume } from './CartDetails';

function CartDetailsCheckout() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validate, setValidate] = useState(false);
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    direccion_despacho: "",
    localidad: "",
    celular: "",
    zip: "",
    comentario: "",
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
              <Row className="mb-4">
                <Form.Group as={Col} md={6} className="col-md-6 mb-3" controlId="validationCustom01">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    pattern="[a-zA-Z ]{2,254}"
                    value={input.nombre} 
                    onChange={handleChangeInputs}
                    placeholder="Quien recibirá el pedido"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} className="col-md-6 mb-3" controlId="validationCustom01">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="apellido" 
                    pattern="[a-zA-Z ]{2,254}"
                    value={input.apellido} 
                    onChange={handleChangeInputs}
                    placeholder="Quien recibirá el pedido"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} className="col-md-6 mb-3" controlId="validationCustom03">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text" 
                    name="direccion_despacho" 
                    value={input.direccion_despacho} 
                    onChange={handleChangeInputs} 
                    placeholder="Dirección de entregar del pedido"
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} sm={3} className="col-sm-3 mb-3 col-lg-3" controlId="validationCustom05">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="number" 
                    name="celular" 
                    value={input.celular} 
                    onChange={handleChangeInputs}
                    placeholder="Celular"
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={3} md={3} className="col-sm-3 mb-3 col-lg-3" controlId="validationCustom06">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="zip" 
                    name="zip" 
                    value={input.zip} 
                    onChange={handleChangeInputs}
                    required
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} mb={3} className="col-md-6 mb-3" controlId="validationCustom07">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="comentario" 
                    value={input.comentario} 
                    onChange={handleChangeInputs} placeholder="Comentario que aporte detalles"
                  />
                <Form.Control.Feedback type="invalid">Ingrese un dato válido</Form.Control.Feedback>
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
                  user?.email?.length===0 
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
          <Resume />
        </Row>
      </div>
    </section>
  );
}


export default CartDetailsCheckout;