import React, { useEffect, useState } from "react";
import {
  Modal,
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
import { RiShoppingCartLine, RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails, addCartItem } from "../actions";
import Evaluation from "./Evaluation"
import Review from "./Review"

function DetailProduct() {
  const [valoresDetalleProducto, setValoresDetalleProducto] = useState({
    peso: "",
    tipo_corte: "",
    cantidad: 1
  });

  const dispatch = useDispatch();

  const [confirmModal, setConfirmModal] = useState(false)

  const productDetails = useSelector((state) => state.productDetails);

  const [validated, setValidated] = useState(false);

  const [waiting, setWaiting] = useState(true);

  let { id } = useParams();

  const navigate = useNavigate();


  const handleChange = (e) => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      [e.target.name]: e.target.value,
      precioTotal: valoresDetalleProducto.peso * productDetails.precio,
    });
  };

  const handleCloseModal = () => {
    setValoresDetalleProducto({
      ...valoresDetalleProducto,
      peso: "",
      tipo_corte:""
    })
    setConfirmModal(false)
  }


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
    return () => { };
  }, [id, productDetails, dispatch]);

  const handleAddProductInCart = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setConfirmModal(true)
    setValidated(true);
    const alCarrito = {
      ...valoresDetalleProducto,
      id: productDetails.id,
      precio: productDetails.precio,
      arrFotos: productDetails?.fotos?.filter( e=> e.length > 0 ),
      nombre: productDetails.nombre,
      idItemFront:( productDetails.id + valoresDetalleProducto.tipo_corte + valoresDetalleProducto.peso )
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
        <Container className="my-2">
          <Card>
            <Card.Header closeButton>
              <Card.Title>{productDetails.nombre}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>

                <Col
                  lg={6}
                  xl={6}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Carousel fade /* variant="dark" */ style={{ width: "10em" }}>
                      {productDetails?.fotos?.filter( e => e.length > 0 ).map((el) => (
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
                  </Row>

                  <Row>
                    <Col>{productDetails.descripcion}</Col>
                  </Row>
                </Col>
                <Col lg={6} xl={6}>

                  <Row className="mb-2">
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
                            {
                              productDetails?.Presentacions?.length > 0
                                ? productDetails?.Presentacions?.map(el => <option key={el.nombre} value={el.nombre}>{el.nombre}</option>)
                                : <option value="Unidad">Unidad</option>
                            }
                          </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          {/* <Stack gap={2}>
                            
                            
                          </Stack> */}
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
              <Row >
                <Col className="mb-2" sm="12" md="6" lg="6">
                  <Button className="col-12" variant="secondary" onClick={handleClose}>
                    Seguir comprando <RiArrowGoBackFill />
                  </Button>
                </Col>
                <Col className="mb-2" sm="12" md="6" lg="6">
                  <Button
                    className="col-12"
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
                  {/* <Button className="col-12" variant="dark" onClick={handleViewCart}>
                    Ver Carrito <RiShoppingCartLine />
                  </Button> */}
                </Col>
              </Row>
              <Row style={{ maxHeight: "100px" }}>

                {productDetails.Reviews.length ? (
                  productDetails.Reviews.map((review, i) => (
                    <Card.Text key={i}>
                      <Evaluation ev={review.evaluacion} cm={review.comentario} />
                    </Card.Text>
                  ))
                ) : (
                  <h4>No existen Reviews</h4>
                )}
              </Row>
            </Card.Body>
            <Card.Footer>
              <Review
                id={productDetails.id}
                available="ver de donde sacar el dato para habilitar/no habilitar el comentario"
                califications={["Pasable", "Regular", "Bueno", "Muy bueno", "Exelente"]}
                toDispatch={"aca va la funcion a despachar por el review"} />
            </Card.Footer>
          </Card>
          <Modal
            show={confirmModal}
            size="sm"
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title><p style={{ textAlign: "center" }}>Producto agregado con éxito!</p></Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>Aceptar</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}

export default DetailProduct;
