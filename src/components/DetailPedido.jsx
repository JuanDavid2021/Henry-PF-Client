import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Modal
} from "react-bootstrap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPedidos, putPedidos } from "../actions";

function DetailPedido() {

  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(true);
  const [s, setS] = useState();

  const pedido = useSelector(state => state.pedidoId);

  let { id } = useParams();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(() => {
    dispatch(getPedidos(id));
  }, [dispatch, s])

  useEffect(() => {;
  }, [s])

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleProcesar = () => {
    if (pedido.status === "Approbed") {
      dispatch(putPedidos({
        id: id,
        status: "Processed"
      }));
    }
    setS("procesará");
    handleShowModal();
  };

  const handleCancelar = () => {
    if ((pedido.status === "Approbed") || (pedido.status === "Processed")) {
      dispatch(putPedidos({
        id: id,
        status: "Cancelled"
      }));
    }
    setS("cancelará");
    handleShowModal();
  };

  const handleDespachar = () => {
    if (pedido.status === "Processed") {
      dispatch(putPedidos({
        id: id,
        status: "Dispatched"
      }));
    }
    setS("despachará");
    handleShowModal();
  };

  return (
    (!pedido.UsuarioCorreo) ? (<>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>) : (<>
      <Container className="my-2">
        <Card>
          <Card.Header>
            <Card.Title>Pedido (Usuario: {pedido.UsuarioCorreo})</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><b>Fecha de pedido:</b> {pedido.f_pedido.substring(0, 10)}</p>
                <p><b>Fecha requerida:</b> {pedido.f_requerida.substring(0, 10)}</p>
                <p><b>Fecha despacho o cancelación:</b> </p>
                <p><b>Usuario:</b> {pedido.Usuario.nombre + ' ' + pedido.Usuario.apellido}</p>
                <p><b>Status:</b> {pedido.status}</p>
              </Col>
              <Col md={6} className="mb-3">
                  {(pedido.status === 'Approbed')?(
                    <button className="btn btn-warning text-light w-100 mt-2" onClick={handleProcesar}>Procesar</button>
                  ):(
                    <button className="btn btn-warning text-light w-100 mt-2" disabled="disabled">Procesar</button>
                  )}

                  {(pedido.status === 'Approbed' || pedido.status === 'Processed')?(
                  <button className="btn btn-danger text-light w-100 mt-2" onClick={handleCancelar}>Cancelar</button>
                  ):(
                  <button className="btn btn-danger text-light w-100 mt-2" disabled="disabled">Cancelar</button>
                  )} 

                  {(pedido.status === 'Processed')?(
                  <button className="btn btn-success text-light w-100 mt-2" onClick={handleDespachar}>Despachar</button>
                  ):(
                  <button className="btn btn-success text-light w-100 mt-2" disabled="disabled">Despachar</button>
                  )}

                  <Button variant="secondary" className="w-100 mt-2" onClick={handleClose}>
                    Dashboard <RiArrowGoBackFill />
                  </Button>
              </Col>
            </Row>
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {
                  pedido.ItemsPedidos.map((i, el) => (
                    <Col>
                      <Card className="mt-2">
                        <Card.Header className="bg-dark" style={{height: "4rem"}}>
                          <p className="text-light fs-6">Nombre: {i.nombre}</p>
                        </Card.Header>
                        <Card.Body>
                          <p>Peso: {i.peso} kg</p>
                          <p>Tipo de corte: {i.tipo_corte}</p>
                          <p>Cantidad: {i.cantidad}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                }
            </Row>
          </Card.Body>
        </Card>

        <Modal
          show={show}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Cambio de estado del pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Se {s} el pedido.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>)
  );
}

export default DetailPedido;
