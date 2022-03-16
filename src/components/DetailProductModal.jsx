import React, { useState } from 'react'
import { Button, Modal, Container, Row, Col, Carousel, Form } from 'react-bootstrap';
import { RiShoppingCartLine } from 'react-icons/ri';

function DetailProductModal({show, handleClose, Nombre, presentacion, precio, arrFotos }) {
  const [valoresDetalleProducto, setValoresDetalleProducto] = useState({
    Nombre,
    peso:"",
    tipo_corte:"",
  })

  const handleChange = (e) => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      [e.target.name]: e.target.value,
    })
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
          <Modal.Title>{Nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col lg={12} xl={6} style={{ display: "flex", justifyContent:"center" }}>
                <Carousel fade variant="dark" style={{ width: "10em" }}>
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
          <Container>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Select onChange={handleChange} name="peso" value={valoresDetalleProducto.peso}  aria-label="Default select example">
                  <option value="" disabled>Seleccione un peso</option>
                  <option value="500">500</option>
                  <option value="1.000">1.000</option>
                  <option value="1.500">1.500</option>
                </Form.Select>  
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de corte</Form.Label>
                <Form.Select onChange={handleChange} name="tipo_corte" value={valoresDetalleProducto.tipo_corte} aria-label="Default select example">
                  <option value="" disabled>Seleccione un tipo de corte</option>
                  <option value="Bloque">Bloque</option>
                  <option value="Bife">Bife</option>
                  <option value="Mariposa">Mariposa</option>
                </Form.Select>  
              </Form.Group>

              <Form.Group className="mb-3">
                <Button variant="dark" type="submit">
                  Carrito <RiShoppingCartLine />
                </Button>
              </Form.Group>
            </Form>
          </Container>
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

