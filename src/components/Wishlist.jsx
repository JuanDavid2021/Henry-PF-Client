import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    // Container,
    Row,
    Col,
    Spinner
} from "react-bootstrap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPedidos, getWishlist } from "../actions";
import ReviewModal from "./ReviewModal";

function Wishlist() {

    const dispatch = useDispatch();
    // const [waiting, setWaiting] = useState(true);

    const pedido = useSelector(state => state.pedidoId);
    const wishlist = useSelector(state => state.wishlist);
    const currenuser = useSelector(store => store.user)

    let pedidoId = useParams().id;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getWishlist(currenuser));

    }, [dispatch])

    console.log(wishlist)

    const [show, setShow] = useState(false);
    const [prod, setProd] = useState({nombre:"", ProductoId:""});


    const handleShow = () => {
        setShow(true);
    }
        const handleClosed = () => setShow(false);



    const handleClose = () => {
        navigate("/profile");
    };

    return (
        (!pedido.UsuarioCorreo) ? (<>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>) : (
            <div className="container">
                <div className="row justify-content-center displaySm">

                    <div className="col col-sm-9" style={{ marginBottom: "40px" }}>
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
                                    <Card.Header as="h5">{i.nombre}</Card.Header>
                                    <Card.Body>
                                        <Row className="row row-wrap">
                                            <Col className="col col-lg-10">
                                                <Card.Title>Peso: {i.peso} kg</Card.Title>
                                                <Card.Text>
                                                    <p>Cantidad: {i.cantidad}</p>
                                                    <p>Tipo de corte: {i.tipo_corte}</p>
                                                </Card.Text>
                                            </Col>
                                            <Col className="col col-lg-2 col-md-2 position-relative">
                                                <img src={i.Producto.fotos[0]} alt={i.nombre} className="rounded-circle img-fluid position-absolute" style={{ width: "15vh", top: "1rem", right: "1.25rem" }}></img>
                                            </Col>

                                        </Row>
                                        <Button onClick={() => {setProd({nombre: i.nombre, ProductoId: i.ProductoId}); handleShow()  }} variant="primary">Opinar sobre el producto</Button>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </div>
                    <div className="col col-sm-2 sticky-top resumeBuy" style={{ width: "15vw", height: "70vh", marginLeft: "1px" }}>
                        <div className="sticky-top resumeBuy1" style={{ padding: "5px", marginTop: "10vh" }}>
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
                        <ReviewModal nombreCap={prod.nombre} id={prod.ProductoId} status={pedido.status} show={show} handleClose={handleClosed} />
            </div>
        )
    );
}

export default Wishlist;