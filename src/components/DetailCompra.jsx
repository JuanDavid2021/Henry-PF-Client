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
import { getPedidos } from "../actions";

function DetailCompra() {

    const dispatch = useDispatch();
    const [waiting, setWaiting] = useState(true);

    const pedido = useSelector(state => state.pedidoId);

    let { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPedidos(id));
        console.log("pedido", pedido)
    }, [dispatch])

    const handleClose = () => {
        navigate("/profile");
    };

    return (
        (!pedido.UsuarioCorreo) ? (<>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>) : (<>
            <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>

                <div style={{width:"70%" , display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "40px" }}>
                    <div style={{ width: "100%", marginTop: "30px", display: "flex", justifyContent: "center" }}>
                        <Button style={{ width: "120px" }} variant="dark" onClick={handleClose}>
                            Mi perfil <RiArrowGoBackFill />
                        </Button>
                    </div>
                    <Card style={{ marginBottom: "30px", marginTop: "30px" }}>
                        <Card.Header>
                            {pedido.ItemsPedidos.map(p => p.nombre).join(" || ")}
                        </Card.Header>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col
                                    lg={6}
                                    xl={6}
                                    style={{ display: "flex", flexDirection: "column" }}
                                >
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                        {pedido.status === "Aprobada" ?
                                            <b className="text-success mb-3">{pedido.status}</b>
                                            :
                                            <p>{pedido.status}</p>
                                        }

                                    </Row>
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                        <p className="fs-4">Fecha de entrega {pedido.f_requerida.substring(0, 10)}</p>
                                    </Row>
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                        <p className="fs-6">La compra fue realizada el {pedido.f_pedido.substring(0, 10)}</p>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Row className="mt-3">
                        <p><b>Productos:</b></p>
                    </Row>
                    {
                        pedido.ItemsPedidos.map((i, el) => (
                            <Card className="mb-3">
                                <img src={i.Producto.fotos[0]} className="position-absolute top-0 end-0 rounded-circle" style={{ maxWidth: "100px", marginTop: "80px", marginRight: "40px" }}></img>
                                <Card.Header as="h5">{i.nombre}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Peso: {i.peso} kg</Card.Title>
                                    <Card.Text>
                                        <p>Cantidad: {i.cantidad}</p>
                                        <p>Tipo de corte: {i.tipo_corte}</p>
                                    </Card.Text>
                                    <Button variant="primary">Opinar sobre el producto</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
                <div className="sticky-top" style={{ width: "14%", height: "100%", marginLeft: "40px" }}>
                    <div className="sticky-top" style={{ paddingLeft: "20px", marginTop: "140px" }}>
                    <div className="border-bottom border-2">

                        <p className="fw-bolder fs-5 mb-0" >
                            Detalle de compra
                        </p>
                        <p className="fw-light">
                            {pedido.f_pedido.substring(0, 10)} # {pedido.pago_id}
                        </p>
                    </div>
                        <div className="d-flex justify-content-between border-bottom mt-4">
                            <p className="mb-0">
                                Total en productos:
                            </p>
                            <p> ${pedido.ItemsPedidos.reduce((i, p) => i += p.precioTotal, 0)}</p>
                        </div>
                        <div className="d-flex justify-content-between border-bottom mt-2">
                            <p className="mb-0">
                                Envio:
                            </p>
                            <p>
                                $3220
                            </p>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <p className="mb-0">
                                Total:
                            </p>
                        <p>
                            ${pedido.ItemsPedidos.reduce((i, p) => i += p.precioTotal, 0) + 3220}
                        </p>
                        </div>


                    </div>


                </div>
            </div>
        </>)
    );
}

export default DetailCompra;