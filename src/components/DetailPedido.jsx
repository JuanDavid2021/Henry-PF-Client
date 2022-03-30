import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPedidos, putPedidos } from "../actions";

function DetailPedido() {

  const dispatch = useDispatch();

  const pedido = useSelector(state => state.pedidoId);

  const [s, setS] = useState();

  let { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {;
  }, [s])

  useEffect(() => {
    dispatch(getPedidos(id));
  }, [dispatch, s])

  useEffect(() => {;
  }, [s])

  const handleClose = () => {
    navigate("/pedidos");
  };

  const handleProcesar = () => {
    if (pedido.status === "Approbed") {
      dispatch(putPedidos({
        id: id,
        status: "Procesando"
      }));
    }
    setS("Procesando");
  };

  const handleCancelar = () => {
    if ((pedido.status === "Approbed") || (pedido.status === "Procesando")) {
      dispatch(putPedidos({
        id: id,
        status: "Cancelado"
      }));
    }
    setS("Cancelado");
  };

  const handleDespachar = () => {
    if (pedido.status === "Procesando") {
      dispatch(putPedidos({
        id: id,
        status: "Completo"
      }));
    }
    setS("Completo");
  };

  return (
    (!pedido.UsuarioCorreo) ? (<>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>) : (<>
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
                  <p><b>Fecha de pedido:</b> {pedido.f_pedido.substring(0, 10)}</p>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <p><b>Fecha requerido:</b> {pedido.f_requerida.substring(0, 10)}</p>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <p><b>Fecha despacho o cancelación:</b> </p>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <p><b>Usuario:</b> {pedido.Usuario.nombre + ' ' + pedido.Usuario.apellido}</p>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <p><b>Status:</b> {pedido.status}</p>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <p><b>Productos:</b></p>
                </Row>
                {
                  pedido.ItemsPedidos.map((i, el) => (
                    <>
                      <span className="border border-dark pt-2 ps-2">
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                          <p className="text-primary"><b>Producto {el + 1}</b></p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                          <p>Nombre: {i.nombre}</p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                          <p>Peso: {i.peso} kg</p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                          <p>Tipo de corte: {i.tipo_corte}</p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                          <p>Cantidad: {i.cantidad}</p>
                        </Row>
                      </span>
                    </>
                  ))
                }
              </Col>
              <Col lg={6} xl={6}>
                <Row className="mb-3 mt-3">
                  <button className="btn btn-warning text-light text-decoration-none fs-6 mx-2 w-25 position-relative start-50 translate-middle" onClick={handleProcesar}>Procesar</button>
                </Row>
                <Row className="mb-3">
                  <button className="btn btn-danger text-light text-decoration-none fs-6 mx-2 w-25 position-relative start-50 translate-middle" onClick={handleCancelar}>Cancelar</button>
                </Row>
                <Row>
                  <button className="btn btn-success text-light text-decoration-none fs-6 mx-2 w-25 position-relative start-50 translate-middle" onClick={handleDespachar}>Despachar</button>
                </Row>
              </Col>
            </Row>
            <Row >
              <Col className="mb-2" sm="12" md="6" lg="6">
                <Button className="col-12" variant="secondary" onClick={handleClose}>
                  Pedidos <RiArrowGoBackFill />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>)
  );
}

export default DetailPedido;
