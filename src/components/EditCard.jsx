import React, { useState } from "react";
import { Button, Card as CardBootstrap, Col } from "react-bootstrap";


function EditCard({ product, edit }) {
  
  const nombreCap = product.nombre?.[0].toUpperCase() + product.nombre?.slice(1).toLowerCase();
  let randomPic = Math.floor(Math.random() * product.fotos?.length)
  
  return (
    <Col xs={12} sm={12} md={6} lg={4} >
      <CardBootstrap style={{ height: "100%"}}>
        <Col style={{ display:"flex", justifyContent:"center" }}>
          <CardBootstrap.Img variant="top" style={{ height: "12em", width: "12em" , alignItems: "center" }} src={product.fotos && product.fotos[randomPic]} />
        </Col>
        <CardBootstrap.Body>
          <CardBootstrap.Title>{nombreCap}</CardBootstrap.Title>
          <CardBootstrap.Subtitle>$ {product.precio}/kg</CardBootstrap.Subtitle>
          {/* s */}
        </CardBootstrap.Body>
        <Col>
          <button className="bg-dark rounded-bottom text-light p-1" style={{ border: "none", width: "100%"}} onClick={()=>edit(product.id)}>
            Editar
          </button>
        </Col>
      </CardBootstrap>      
    </Col>
  );
}

export default EditCard;