import React, { useState } from 'react'
import { Button, Modal, Container, Row, Col, Carousel, Form, Stack } from 'react-bootstrap';
import { RiShoppingCartLine, RiSearchEyeLine, RiShoppingCartFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addCartItem } from '../actions';

function DetailProductModal({id, show, stock, handleClose, nombreCap, precio, arrFotos, presentacion }) {
  const [valoresDetalleProducto, setValoresDetalleProducto] = useState({
    id,
    arrFotos,
    nombre: nombreCap,
    precio,
    peso:"",
    tipo_corte:"",
    precioTotal: "",
    cantidad: 1,
    idItemFront:""
  })
  
  const handleDetailst = () => {
    navigate(`/product/${id.toString()}`)
  }

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      [e.target.name]: e.target.value,
      precioTotal: valoresDetalleProducto.peso * valoresDetalleProducto.precio,
    })
  }

  const navigate = useNavigate()

  const handleViewCart = () => {
    navigate("/cartDetails")
  }

  const handleAddProductInCart = (e) => {
    const form = e.currentTarget;
    let itemToAdd = {
      ...valoresDetalleProducto,
      idItemFront:( valoresDetalleProducto.id + valoresDetalleProducto.tipo_corte + valoresDetalleProducto.peso )
    }
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else if( stock === 0 || valoresDetalleProducto.tipo_corte === "" || valoresDetalleProducto.peso === "" ){
      return
    }else{
      dispatch(addCartItem(itemToAdd))
      setConfirmModal(true)
    }
  }

  const [confirmModal, setConfirmModal] = useState(false)

  const handleCloseModal = () => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      peso: "",
      tipo_corte:""
    })
    setConfirmModal(false)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{nombreCap}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="mb-2 p-0">
            <Row>
              <Col style={{ display: "flex", justifyContent:"center" }}>
                <Carousel fade variant="dark" style={{ width: "12em" }}>
                  {arrFotos?.map((el) => (
                    <Carousel.Item style={{ width: "12em"}} key={el}>
                      <img
                        className="d-block w-100"
                        src={el}
                        alt={el}
                        style={{ height: "12em" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
            <Row>
              <Col>Precio por kg: $ {precio}</Col>
            </Row>
          </Container>

          <Form /* noValidate validated={validated} */>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control 
                required 
                as="select" 
                type="select" 
                onChange={handleChange} 
                name="peso" 
                value={valoresDetalleProducto.peso} 
              >
                <option value="" disabled>Seleccione un peso</option>
                <option value="0.5">0.5 kg</option>
                <option value="1">1.0 kg</option>
                <option value="1.5">1.5 kg</option>
              </Form.Control>  
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de presentación</Form.Label>
              <Form.Control 
                required 
                as="select" 
                type="select" 
                onChange={handleChange} 
                name="tipo_corte" 
                value={valoresDetalleProducto.tipo_corte} 
              >
                <option value="" disabled>Seleccione un tipo de presentación</option>
                {
                  presentacion?.length > 0
                  ? presentacion.map(el => <option key={el.nombre} value={el.nombre}>{el.nombre}</option>) 
                  : <option value="Unidad">Unidad</option>
                }
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Stack gap={2} >
                  <Button disabled={(stock === 0 || valoresDetalleProducto.tipo_corte === "" || valoresDetalleProducto.peso === "") && true} variant="dark" onClick={handleAddProductInCart} >
                    Agregar al Carrito <RiShoppingCartLine />
                  </Button>
                  <Button variant="dark" onClick={handleViewCart}>
                    Ver Carrito <RiShoppingCartFill />
                  </Button>
                  <Button variant="dark" onClick={ handleDetailst }>
                    Ver más detalles <RiSearchEyeLine />
                  </Button>
              </Stack>
              {
                stock === 0 
                  && 
                <Form.Text muted>
                  Sin stock. Sentimos las molestias
                </Form.Text>
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
        {/* modal confirmación */}
        <Modal 
          show={confirmModal}
          size="sm"
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title><p style={{ textAlign: "center" }}>Producto agregado con éxito!</p></Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>Aceptar</Button>
          </Modal.Footer>
        </Modal>
      </Modal>
    </>
  );
}

export default DetailProductModal;
