import React, { useState } from "react";
import { Card as CardBootstrap, Col } from "react-bootstrap";
import DetailProductModal from './DetailProductModal';
import { motion } from "framer-motion"

function Card({ id, nombre, stock, presentacion, precio, arrFotos, descripcion }) {
  const nombreCap = nombre?.[0].toUpperCase() + nombre?.slice(1).toLowerCase();
  const pics = arrFotos.filter(el => el.length > 0)
  let randomPic = Math.floor(Math.random() * pics?.length)

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Col xs={12} sm={12} md={6} lg={4} >
      <motion.div style={{ height: "100%", }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <CardBootstrap style={{ height: "100%", cursor:"pointer", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.14)" }} onClick={handleShow}>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <CardBootstrap.Img variant="top" style={{ height: "12em", width: "12em", alignItems: "center" }} src={pics && pics[randomPic]} />
          </Col>
          <CardBootstrap.Body>
            <CardBootstrap.Title>{nombreCap}</CardBootstrap.Title>
            <CardBootstrap.Subtitle>$ {precio}/kg</CardBootstrap.Subtitle>
            {/* s */}
          </CardBootstrap.Body>
          <Col>
            <button className="bg-dark rounded-bottom text-light p-1" style={{ border: "none", width: "100%" }} >
              Detalle
            </button>
          </Col>
        </CardBootstrap>
      </motion.div>
        <DetailProductModal id={id} nombreCap={nombreCap} stock={stock} precio={precio} presentacion={presentacion} arrFotos={pics} show={show} handleClose={handleClose} descripcion={descripcion} />
    </Col>
  );
}

export default Card;
