import React from 'react'
import {Button, Card, Col} from 'react-bootstrap';

function Cards({image, name, description, price}) {
  return (
    <Col xs={10} sm={12} md={4} lg={3}>
      <Card style={{ alignItems:"center", height: "25em" }}>
        <Card.Img variant="top" src={image} style={{ width: "10em", height: "10em" }} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>
            {price}
          </Card.Subtitle>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary">Añadir al carrito</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Cards