import React, { useState } from "react";
import { Button, Card as CardBootstrap, Col } from "react-bootstrap";
import DetailProductModal from './DetailProductModal';

function Card({id, nombre, stock, presentacion, precio, arrFotos, descripcion }) {
  const nombreCap = nombre?.[0].toUpperCase() + nombre?.slice(1).toLowerCase();
  let randomPic = Math.floor(Math.random() * arrFotos?.length)

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  return (
    <Col xs={12} sm={12} md={6} lg={4} >
      <CardBootstrap style={{ height: "100%"}}>
        <Col style={{ display:"flex", justifyContent:"center" }}>
          <CardBootstrap.Img variant="top" style={{ height: "12em", width: "12em" , alignItems: "center" }} src={arrFotos && arrFotos[randomPic]} />
        </Col>
        <CardBootstrap.Body>
          <CardBootstrap.Title>{nombreCap}</CardBootstrap.Title>
          <CardBootstrap.Subtitle>$ {precio}/kg</CardBootstrap.Subtitle>
          <Col>
            <CardBootstrap.Text>{descripcion}</CardBootstrap.Text>
          </Col>
        </CardBootstrap.Body>
        <Col>
            <Button style={{ width: "100%" }} variant="dark" onClick={handleShow}>
              Detalle
            </Button>
        </Col>
      </CardBootstrap>
      <DetailProductModal id={id} nombreCap={nombreCap} stock={stock} precio={precio} presentacion={presentacion} arrFotos={arrFotos} show={show} handleClose={handleClose} descripcion={descripcion}/>
    </Col>
  );
}

export default Card;
