import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Card from './Card'
//import arrProductos from './../dataSimulate';
import { Container, Row, Col } from 'react-bootstrap'
import img from '../img/logo2.png'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, order, orderPrecio } from '../actions';
import { NotFound } from "./NotFound"


function Shop() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const arrProductos = useSelector(state => state.products)

    const [inview, setInview] = useState(12)
    const [orden, setOrden] = useState('')

    let arrProducts = arrProductos?.slice(0, inview)


    /* const handleChange = (e) => {
        e.preventDefault()
    }
 */
    const showMoreItems = () => {
        setInview((value) => value + 12)
    }

    const showLessItems = () => {
        setInview((value) => value - 12)
    }

    const ordenamiento = (e) => {

        if (e.target.value === "priceLower-Higher" || e.target.value === "priceHigher-Lower") {
            dispatch(orderPrecio(e.target.value))
            setOrden(e.target.value)
        }

        else if (e.target.value === "A-Z" || e.target.value === "Z-A") {
            dispatch(order(e.target.value))
            setOrden(e.target.value)
        }
    }


    return (
        <div style={{ marginBottom: "30px" }}>
            <div style={{ width: "50%", height: "500px", margin: "auto", marginTop: "30px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div style={{ height: "100%" }} id="carouselExampleSlidesOnly" className="carousel slide img-thumbnail" data-bs-ride="carousel">
                    <div style={{ height: "100%" }} className="carousel-inner">
                        <div style={{ height: "100%" }} className="carousel-item active bg-dark">
                            <img style={{ height: "100%" }} src="https://www.pequerecetas.com/wp-content/uploads/2009/09/partes-de-la-vaca-o-ternera.jpg" className="d-block w-100" alt="carne"></img>
                        </div>
                        <div style={{ height: "100%" }} className="carousel-item bg-dark">
                            <img style={{ height: "100%" }} src="https://www.lavanguardia.com/files/article_main_microformat/uploads/2019/04/29/5e9981cfb3538.jpeg" className="d-block w-100" alt="chancho" />
                        </div>
                        <div style={{ height: "100%" }} className="carousel-item bg-dark">
                            <img style={{ height: "100%" }} src="https://www.quirocarne.com/wp-content/uploads/2018/08/cordero-carne-quirocarme.jpg" className="d-block w-100" alt="cordero" />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "30px", marginBottom: "30px" }}>
                <Row sm={1} xl={2} className="g-4 justify-content-center" style={{width:"100%"}}>
                    <Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <SearchBar />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <select onChange={e => ordenamiento(e)} className="form-select" aria-label="Default select example" style={{ width: "100%" }}>
                            <option value="">Organizar por</option>
                            <option value="A-Z">A a Z</option>
                            <option value="Z-A">Z a A</option>
                            <option value="priceLower-Higher">Precio (menor-mayor)</option>
                            <option value="priceHigher-Lower">Precio (mayor-menor)</option>
                        </select>
                    </Col>
                </Row>
            </div>
            <Container>
                <Row xs={1} md={2} xl={4} className="g-4">
                    {arrProducts?.map((p) => (
                        <Card
                            key={p.id}
                            id={p.id}
                            precio={p.precio}
                            nombre={p.nombre}
                            descripcion={p.descripcion}
                            stock={p.stock}
                            arrFotos={p.fotos}
                        />
                    ))}
                </Row>
            </Container>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                {
                    arrProductos.length <= arrProducts.length ?
                        <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" disabled>Ver mas</button>
                        :
                        <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" onClick={showMoreItems}>Ver mas</button>
                }
                {
                    arrProducts.length > 13 ?
                        <div>
                            <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" onClick={showLessItems}>Ver menos</button>
                        </div>
                        :
                        <div>
                            <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" disabled>Ver menos</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Shop