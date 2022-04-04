import React, { useState } from "react";
import { Card as CardBootstrap, Col } from "react-bootstrap";
import DetailProductModal from './DetailProductModal';
import { motion } from "framer-motion"
import { useSelector } from "react-redux";

function Card({ id, prod, nombre, stock, presentacion, precio, arrFotos, descripcion, precioDesc, promocion }) {
  const nombreCap = nombre?.[0].toUpperCase() + nombre?.slice(1).toLowerCase();
  const pics = arrFotos.filter(el => el.length > 0)
  let randomPic = Math.floor(Math.random() * pics?.length)
  const productOnSale = useSelector((state) => state.productOnSale);


  if(id === "bc35eabd-2caa-423a-afd6-1299ee2527a0"){
    console.log("------------producot-------------\n",prod)
  }

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Col xs={12} sm={12} md={6} lg={4} >
      <motion.div style={{ height: "100%"}} whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.14)"}} whileTap={{ scale: 0.95 }}>
        <CardBootstrap style={{ height: "100%", cursor:"pointer"}} onClick={handleShow}>
          <Col style={{ display: "flex", justifyContent: "center" }}>
          {
              promocion !== null ? 
            <div className="w-100 d-flex flex-column align-items-center">
            <div className="w-100 d-flex justify-content-end bg-white"><span className="badge bg-danger mt-2 me-2 position-absolute" style={{height:"24px"}}>promo {productOnSale.filter(p => p.promocion === promocion )[0].porcentaje}%</span></div>
            <CardBootstrap.Img variant="top" style={{ height: "12em", width: "12em", alignItems: "center" }} src={pics && pics[randomPic]} />
            </div>
              :
            <CardBootstrap.Img variant="top" style={{ height: "12em", width: "12em", alignItems: "center" }} src={pics && pics[randomPic]} />
            }
          </Col>
          <CardBootstrap.Body>
            <CardBootstrap.Title>{nombreCap}</CardBootstrap.Title>
            {
              promocion !== null ?
            <CardBootstrap.Subtitle style={{display:"flex", flexDirection:"column"}}><p className="text-muted text-decoration-line-through fw-light m-0">$ {precio}/kg</p> <p className="fs-5 d-flex justify-content-between">$ {precioDesc}/kg</p></CardBootstrap.Subtitle>
            :
            <CardBootstrap.Subtitle>$ {precio}/kg</CardBootstrap.Subtitle> 
            }
            {/* s */}
          </CardBootstrap.Body>
          <Col className="d-flex">
            <button className="bg-dark rounded-bottom text-light p-1" style={{ border: "none", width: "100%", }} >
              Detalle
            </button>
          </Col>
        </CardBootstrap>
      </motion.div>
        <DetailProductModal id={id} promocion={promocion} nombreCap={nombreCap} stock={stock} precio={precio} precioDesc={precioDesc} presentacion={presentacion} arrFotos={pics} show={show} handleClose={handleClose} descripcion={descripcion} />
    </Col>
  );
}

export default Card;
