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
import { getProductDetails, addCartItem, getPedidos } from "../actions";
import Evaluation from "./Evaluation"
import Review from "./Review"

function DetailPedido() {
  const [valoresDetalleProducto, setValoresDetalleProducto] = useState({
    peso: "",
    tipo_corte: "",
    cantidad: 1
  });

  const dispatch = useDispatch();

  const [confirmModal, setConfirmModal] = useState(false)

  const productDetails = useSelector((state) => state.productDetails);
  const pedido = useSelector(state => state.pedidoId);

  const [validated, setValidated] = useState(false);

  const [waiting, setWaiting] = useState(true);

  let { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPedidos(id));
  }, [dispatch])

  console.log(pedido.UsuarioCorreo)

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
      tipo_corte: ""
    })
    setConfirmModal(false)
  }


  const handleClose = () => {
    navigate("/pedidos");
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
      arrFotos: productDetails.fotos,
      nombre: productDetails.nombre,
      idItemFront: (productDetails.id + valoresDetalleProducto.tipo_corte + valoresDetalleProducto.peso)
    };
    console.log(alCarrito)
    dispatch(addCartItem(alCarrito));
  };

  return (
    <>
      <Container className="my-2">
        <Card>
          <Card.Header closeButton>
            <Card.Title>Pedido (Usuario: {pedido.UsuarioCorreo})</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>

              <Col
                lg={6}
                xl={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Row style={{ display: "flex", justifyContent: "center" }}>
                </Row>

                <Row>
                  <Col>{productDetails.descripcion}</Col>
                </Row>
              </Col>
              <Col lg={6} xl={6}>
                <Row className="mb-3 mt-3">
                  <button className="btn btn-warning text-light text-decoration-none fs-6 mx-2 w-25 position-relative start-50 translate-middle">Procesar</button>
                </Row>
                <Row className="mb-3">
                  <button className="btn btn-danger text-light text-decoration-none fs-6 mx-2 w-25 position-relative start-50 translate-middle">Cancelar</button>
                </Row>
                <Row>
                  <button className="btn btn-success text-light text-decoration-none fs-6 mx-2 w-25 position-relative start-50 translate-middle">Despachar</button>
                </Row>
              </Col>
            </Row>
            <Row >
              <Col className="mb-2" sm="12" md="6" lg="6">
                <Button className="col-12" variant="secondary" onClick={handleClose}>
                  Pedidos <RiArrowGoBackFill />
                </Button>
              </Col>
              <Col className="mb-2" sm="12" md="6" lg="6">
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
                <h4>El usuario no ha hecho una Review</h4>
              )}
            </Row>
          </Card.Body>
          {/* <Card.Footer>
            <Review
              id={productDetails.id}
              available="ver de donde sacar el dato para habilitar/no habilitar el comentario"
              califications={["Pasable", "Regular", "Bueno", "Muy bueno", "Exelente"]}
              toDispatch={"aca va la funcion a despachar por el review"} />
          </Card.Footer> */}
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

export default DetailPedido;
