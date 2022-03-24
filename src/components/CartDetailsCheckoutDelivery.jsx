import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiTruckLine, RiMoneyDollarCircleLine, RiEyeLine, RiMapPin2Line, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addOrderDate } from '../actions';
import { Resume } from './CartDetails';

function CartDetailsCheckoutDelibery() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const f = new Date()
  const mes = (f.getMonth() +1) < 9 ? "0" + (f.getMonth() +1) : (f.getMonth() +1)
  const dia = (f.getDate() +1) < 9 ? "0" + (f.getDate() +1) : (f.getDate() +1)
  const fecha = ( f.getFullYear() + "/" + mes + "/" + dia )

  const [checked, setChecked] = useState("")
  
  const [day, setDay] = useState({
    f_pedido: fecha,
    f_requerida:"",
  })
  
  const handleChangeDeliveryType = (e) => {
    setChecked(e.target.name)
  }
  
  const handleChangeDate = (e) => {
    setDay({
      ...day,
      f_requerida: e.target.value,
    })
  }

  const [modal, setModal] = useState({show:false, message:""})

  const handleNavigateCheckoutReview = (e) => {
    e.preventDefault()
    let typeAndDayOrder = {
      ...day,
      tipo_entrega: checked
    }
    if (checked === ""){
      setModal({show:true, message:""})
    }else if ( day.f_requerida === "" && checked === "selectDate" ) {
      setModal({show:true, message:"Seleccione una fecha"})
      return
    }else{
      dispatch(addOrderDate(typeAndDayOrder))
      navigate("/CartDetailsCheckoutReview")
    }
  }

  const handleCloseModal = () => {
    setModal({show:false, message:""})
  }

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
                <a className="nav-link active" href="noopener noreferrer" aria-disabled="false"> 
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
                  <RiMoneyDollarCircleLine/>
                  <p className="mb-0 pt-1">Método de pago</p>
                </a>
              </li>
            </ul>
            {/* Envío */}
            <section className="py-4">
              <div className="row mb-4 gy-4">
                <div className="col-md-4">
                  <div className="h-100 bg-light p-3 p-xl-4">
                    <div className="form-check d-flex align-items-center">
                      <input 
                        className="form-check-input flex-shrink-0" 
                        id="delivery1" 
                        type="radio" 
                        name="express" 
                        checked={checked==="express" ? true : false} 
                        onChange={handleChangeDeliveryType}
                      />
                      <label className="cursor-pointer d-block ms-3" htmlFor="delivery1"><span className="h4 d-block mb-1 text-uppercase">Express</span><span className="text-sm d-block mb-0 text-muted">Entrega en el día de la compra.</span></label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="h-100 bg-light p-3 p-xl-4">
                    <div className="form-check d-flex align-items-center">
                      <input 
                        className="form-check-input flex-shrink-0" 
                        id="delivery2" 
                        type="radio" 
                        name="estandar" 
                        checked={checked==="estandar" ? true : false} 
                        onChange={handleChangeDeliveryType}
                      />
                      <label className="cursor-pointer d-block ms-3" htmlFor="delivery2"><span className="h4 d-block mb-1 text-uppercase">Estandar</span><span className="text-sm d-block mb-0 text-muted">Entrega al día siguiente de la compra.</span></label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="h-100 bg-light p-3 p-xl-4">
                    <div className="form-check d-flex align-items-center">
                      <input 
                        className="form-check-input flex-shrink-0" 
                        id="delivery3" 
                        type="radio" 
                        name="selectDate" 
                        checked={checked==="selectDate" ? true : false} 
                        onChange={handleChangeDeliveryType}
                      />
                      <label className="cursor-pointer d-block ms-3" htmlFor="delivery3"><span className="h4 d-block mb-1 text-uppercase">Exacta</span><span className="text-sm d-block mb-0 text-muted">Entrega en una fecha posterior a la compra.</span></label>
                    </div>
                    <div className="input-group date d-flex justify-content-around mt-2">
                      <input 
                        className="form-control datepicker" 
                        type="date" 
                        id="start" 
                        name="date" 
                        onChange={handleChangeDate}
                        min={fecha}
                      />
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
                    <button className="btn btn-primary my-1" onClick={handleNavigateCheckoutReview}>Revisión del pedido <RiArrowRightSLine/></button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Resumen */}
          <Resume/>
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
          <p>Seleccione un tipo de envío.</p>
          <p>{modal.message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default CartDetailsCheckoutDelibery;