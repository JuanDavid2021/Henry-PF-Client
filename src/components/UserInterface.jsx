import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPedidos, setPlatformUser } from '../actions'
import { tr, td, Card, Button, ProgressBar } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function UserInterface() {
        const dispatch = useDispatch()
        const pedidos = useSelector(state => state.pedidos)
        const currentuser = useSelector(state => state.user)
        const navigate = useNavigate()

        useEffect(async () => {
            console.log(currentuser)
            await dispatch(getPedidos(currentuser))
            console.log(pedidos)
        }, [dispatch])

        const handleDetailPedido = (id) => {
            navigate(`/compra/${id}`)
        }

        return (



            <div style={{ minHeight: "700px", display: "flex", justifyContent: "center", backgroundSize: "cover" }}>
                <div style={{ width: "80%", marginTop: "70px", marginBottom: "30px" }}><h3>Compras</h3>
                    {pedidos.pedidos?.length ?
                        pedidos?.pedidos?.filter(p => p.status !== "Created" ).map((p) => {
                            return (
                                <Card text="dark" bg-opacity="75%" style={{ marginTop: "30px" }}>
                                    <Card.Header as="h5" className="fw-normal">{p.ItemsPedidos.map(p => p.nombre).join(" || ").substring(0, 95) + "..."}</Card.Header>
                                    <Card.Body style={{ display: "flex", alignItems: "center" }}>
                                        <Card.Body>
                                            {p.status === "Approbed" || "Aprobada" ?
                                                <div style={{ display: "flex" }}>
                                                    <Card.Title style={{ marginRight: "4px" }}>Estado:</Card.Title>
                                                    <Card.Title className='text-success'> {p.status}</Card.Title>
                                                </div>
                                                :
                                                <div style={{ display: "flex" }}>
                                                    <Card.Title style={{ marginRight: "4px" }}>Estado:</Card.Title>
                                                    <Card.Title className='text-danger'> {p.status}</Card.Title>
                                                </div>
                                            }
                                            <Card.Text>
                                                Fecha de entrega: {p.f_requerida.substring(0, 10)}
                                            </Card.Text>
                                        </Card.Body>
                                        <Button variant="primary" style={{ height: "40%" }} onClick={()=>handleDetailPedido(p.id)}>Detalles</Button>
                                    </Card.Body>
                                    {/* <ProgressBar>
                                <ProgressBar striped variant="success" now={35} key={1} />
                                <ProgressBar variant="warning" now={20} key={2} />
                                <ProgressBar striped variant="danger" now={10} key={3} />
                            </ProgressBar> */}
                                </Card>
                            )

                        }) : <div className="lead text-center fs-3 fw-normal mt-3">
                            no tiene ningun pedido realizado
                        </div>


                    }




                </div>
            </div>
        )
    }

export default UserInterface