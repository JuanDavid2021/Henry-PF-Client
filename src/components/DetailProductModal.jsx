import React, { useState } from 'react'
import { Button, Modal, Container, Row, Col, Carousel, Form, Stack } from 'react-bootstrap';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
const {addCartItem} = require('../actions');

function DetailProductModal({id, show, stock, handleClose, nombreCap, presentacion, precio, arrFotos }) {
  const [valoresDetalleProducto, setValoresDetalleProducto] = useState({
    id,
    arrFotos,
    presentacion,
    nombreCap,
    precio,
    peso: "",
    tipo_corte:"",
  })

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      [e.target.name]: e.target.value,
    })
  }
  const navigate = useNavigate()

  const handleViewCart = () => {
    navigate("/cartDetails")
  }

  const handleAddProductInCart = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    dispatch(addCartItem(valoresDetalleProducto))
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
          <Container>
            <Row>
              <Col lg={12} xl={6} style={{ display: "flex", justifyContent:"center" }}>
                <Carousel fade /* variant="dark" */ style={{ width: "10em" }}>
                  {arrFotos?.map((el) => (
                    <Carousel.Item style={{ width: "10em"}} key={el}>
                      <img
                        className="d-block w-100"
                        src={el}
                        alt={el}
                        style={{ height: "10em" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col xl={6}>{presentacion}</Col>
            </Row>
            <Row>
              <Col>Precio por kg: $ {precio}</Col>
            </Row>
          </Container>

          <Form noValidate validated={validated}>
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
              <Form.Label>Tipo de corte</Form.Label>
              <Form.Control 
                required 
                as="select" 
                type="select" 
                onChange={handleChange} 
                name="tipo_corte" 
                value={valoresDetalleProducto.tipo_corte} 
              >
                <option value="" disabled>Seleccione un tipo de corte</option>
                <option value="Bloque">Bloque</option>
                <option value="Bife">Bife</option>
                <option value="Mariposa">Mariposa</option>
              </Form.Control>  
            </Form.Group>

            <Form.Group className="mb-3">
              <Stack gap={2} >
                  <Button disabled={(stock === 0 || valoresDetalleProducto.tipo_corte === "" || valoresDetalleProducto.peso === "") && true} variant="dark" onClick={handleAddProductInCart} >
                    Agregar al Carrito <RiShoppingCartLine />
                  </Button>
                  <Button variant="dark" onClick={handleViewCart}>
                    Ver Carrito <RiShoppingCartLine />
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
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailProductModal;
