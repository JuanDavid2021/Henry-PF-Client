import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Carousel,
  Form,
  Stack,
  Spinner,
} from "react-bootstrap";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails, addCartItem } from "../actions";
import Evaluation from "./Evaluation"

function DetailProduct() {
  const [valoresDetalleProducto, setValoresDetalleProducto] = useState({
    peso: "",
    tipo_corte: "",
  });

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const [validated, setValidated] = useState(false);

  const [waiting, setWaiting] = useState(true);

  let { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    navigate("/shop");
  };

  const handleViewCart = () => {
    navigate("/cartDetails");
  };

  useEffect(() => {
    if (
      (productDetails.id && productDetails.id.toString() !== id.toString()) ||
      productDetails.id === null
    ) {
      dispatch(getProductDetails(id));
    } else {
      setWaiting(false);
    }
    return () => {};
  }, [id, productDetails, dispatch]);

  const handleAddProductInCart = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const alCarrito = {
      ...valoresDetalleProducto,
      id: productDetails.id,
      precio: productDetails.precio
    };
    console.log(alCarrito)
    dispatch(addCartItem(alCarrito));
  };

  if (waiting) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  } else {
    return (
      <>
        <Container className="mt-5">
          <Card>
            <Card.Header closeButton>
              <Card.Title>{productDetails.nombre}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col
                  lg={6}
                  xl={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Carousel fade /* variant="dark" */ style={{ width: "10em" }}>
                    {productDetails.fotos?.map((el) => (
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
                </Col>
                <Col lg={6} xl={6}>
                  <Row>
                    <Col>{productDetails.descripcion}</Col>
                  </Row>
                  <Row>
                    <Col>Precio por kg: ${productDetails.precio}</Col>
                  </Row>
                  <Row>
                    <Col>
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
                            <option value="" disabled>
                              Seleccione un peso
                            </option>
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
                            <option selected value="" disabled>
                              Seleccione un tipo de corte
                            </option>
                            <option value="Bloque">Bloque</option>
                            <option value="Bife">Bife</option>
                            <option value="Mariposa">Mariposa</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Stack gap={2}>
                            <Button
                              disabled={
                                (productDetails.stock === 0 ||
                                  valoresDetalleProducto.tipo_corte === "" ||
                                  valoresDetalleProducto.peso === "") &&
                                true
                              }
                              variant="dark"
                              onClick={handleAddProductInCart}
                            >
                              Agregar al Carrito <RiShoppingCartLine />
                            </Button>
                            <Button variant="dark" onClick={handleViewCart}>
                              Ver Carrito <RiShoppingCartLine />
                            </Button>
                          </Stack>
                          {productDetails.stock === 0 && (
                            <Form.Text muted>
                              Sin stock. Sentimos las molestias
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
               
                {productDetails.Reviews.length ? (                  
                  productDetails.Reviews.map((review, i) => (
                    <Card.Text key={i}>
                      <Evaluation ev={ review.evaluacion } cm={ review.comentario }/>
                    </Card.Text>
                  ))
                ) : (
                  <h4>No existen Reviews</h4>
                )}
              </Row>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Card.Footer>
          </Card>
        </Container>
      </>
    );
  }
}

export default DetailProduct;
