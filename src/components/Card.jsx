import React, { useState } from "react";
import { Button, Card as CardBootstrap, Carousel, Col, Container, } from "react-bootstrap";
import { RiShoppingCartLine } from 'react-icons/ri';
/* import { useDispatch } from "react-redux"; */
/* import { Link } from "react-router-dom"; */
import DetailProductModal from './DetailProductModal';

function Card({ nombre, presentacion, precio, arrFotos }) {
  const Nombre = nombre?.[0].toUpperCase() + nombre.slice(1).toLowerCase();
  /* const dispatch = useDispatch(); */
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
      <CardBootstrap style={{ alignItems: "center", height: "fit-content" }}>
        <Carousel fade variant="dark" style={{ width: "10em" }}>
          {arrFotos?.map((el) => (
            <Carousel.Item style={{ width: "10em" }} key={el}>
              <img
                className="d-block w-100"
                src={el}
                alt={el}
                style={{ height: "10em" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <CardBootstrap.Body>
          <CardBootstrap.Title>{Nombre}</CardBootstrap.Title>
          <CardBootstrap.Subtitle>$ {precio}</CardBootstrap.Subtitle>
          <CardBootstrap.Text>{presentacion}</CardBootstrap.Text>
          <Container>
              <Button variant="dark" size="sm" onClick={handleShow}>
                Detalle
              </Button>{" "}
            <Button variant="dark" size="sm" /* onClick={()=>{dispatch()}} */>
              Carrito <RiShoppingCartLine />
            </Button>
          </Container>
        </CardBootstrap.Body>
      </CardBootstrap>
      <DetailProductModal Nombre={Nombre} precio={precio} presentacion={presentacion} arrFotos={arrFotos} show={show} handleClose={handleClose}/>
    </Col>
  );
}

export default Card;
