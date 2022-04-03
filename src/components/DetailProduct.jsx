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
  Spinner,
} from "react-bootstrap";
import { RiShoppingCartLine, RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails, addCartItem, addReview } from "../actions";
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

  const productDetails = useSelector(state => state.productDetails);
  const currentUser = useSelector(state => state.user)

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

  useEffect(() => {
    if (
      (productDetails.id && productDetails.id.toString() !== id.toString()) ||
      productDetails.id === null
    ) {
      dispatch(getProductDetails(id, currentUser));
    } else {
      setWaiting(false);
    }
    return () => { };
  }, [id, productDetails, currentUser, dispatch]);

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
      <div className="d-flex justify-content-center align-items-center align-content-center" style={{height:"70vh"}}>
        <div>
          <Spinner style={{width:"20vh", height:"20vh"}} animation="border" role="status"/>
          <p style={{ textAlign: "center", fontSize:"2rem"}}>Cargando...</p>
        </div>
      </div>
    );
  } else {
    return (
      <Container className="my-2">
        <Card>
          <Card.Header>
            <Card.Title>{productDetails.nombre}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg={6} xl={6}>
                <Carousel fade style={{ width:"80%", margin:"auto"}}>
                  {productDetails?.fotos?.filter( e => e.length > 0 ).map((el) => (
                    <Carousel.Item  key={el}>
                      <img
                        className="d-block w-100"
                        src={el}
                        alt={el}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>

              <Col lg={6} xl={6}>
                <Row className="mb-2">
                  <Row>
                    <Col className="my-2">{productDetails.descripcion}</Col>
                  </Row>
                  <Col className="mt-3">Precio por kg: ${productDetails.precio}</Col>
                </Row>
                
                <Row>
                  <Col className="mt-3">
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
                          <option value="" disabled>
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
              </Col>
            </Row>

            <Row style={{ maxHeight: "100px", overflowY: "auto" }}>
              {
                productDetails.Reviews.length 
                  ?productDetails.Reviews.map((review, i) => (
                    <Col className="col-12" key={i}>
                      <Evaluation ev={review.evaluacion} cm={review.comentario} />
                    </Col>
                  ))
                  
                :<h4>No existen Reviews</h4>
              }
            </Row>
          </Card.Body>
          <Card.Footer>
            <Review
              id={productDetails.id}
              available={productDetails.comprado}
              califications={["Pasable", "Regular", "Bueno", "Muy bueno", "Exelente"]}
              toDispatch={addReview} />
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
    );
  }
}

export default DetailProduct;
