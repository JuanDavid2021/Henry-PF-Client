import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import Card from './Card';
import { useSelector } from 'react-redux';
import arrProductos from './../dataSimulate';

function CartDetails() {
  //console.log("cartDetails", arrProducts);
  return (
    <Row >
      <Col style={{ display: "flex", justifyContent:"space-evenly",flexWrap:"wrap" }}>
        {arrProductos?.map((p) => (
            <Card
                key={p.id}
                id={p.id}
                precio={p.precio}
                nombre={p.nombre}
                presentacion={p.presentacion}
                stock={p.stock}
                arrFotos={p.fotos}
            />
        ))}
      </Col>
      
        {/* <Col  xs={12} sm={12} md={7} lg={9} xl={8}>
          {arrProductos?.map((p) => (
            <Col xl={3}>
              <Card
                key={p.id}
                id={p.id}
                nombre={p.nombreCap}
                precio={p.precio}
                arrFotos={p.arrFotos}
                presentacion={p.presentacion}
              />
            </Col>
          ))}
        </Col> */}
        <Col xs={12} sm={12} md={5} lg={3} xl={4} style={{ backgroundColor:"blue"}}>pago</Col>
      
    </Row>
  )
}

export default CartDetails