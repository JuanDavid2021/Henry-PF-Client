import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Card from './Card'
import arrProductos from './../dataSimulate';
import { Container, Row } from 'react-bootstrap'
import img from '../img/logo2.png'


function Shop() {

    const [inview, setInview] = useState(4)


    let arrProducts = arrProductos?.slice(0, inview)


    const handleChange = (e) => {
        e.preventDefault()
    }

    const showMoreItems = () => {
        setInview((value) => value + 4)
    }
    const showLessItems = () => {
        setInview((value) => value - 4)
    }



    return (
        <div>
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
            <div style={{ display: "flex", height: "38px", justifyContent: "space-evenly", marginTop: "30px", marginBottom: "30px" }}>
                <SearchBar />
                <select className="form-select" aria-label="Default select example" style={{ width: "15%" }}>
                    <option selected>Organize by</option>
                    <option onChange={handleChange} value="A-Z">A to Z</option>
                    <option onChange={handleChange} value="Z-A">Z to A</option>
                    <option onChange={handleChange} value="priceLower-Higher">Price (lower-higher)</option>
                    <option onChange={handleChange} value="priceHigher-Lower">Price (higher-lower)</option>
                </select>
            </div>
            <Container>
                <Row xs={1} md={2} className="g-4">
                    {arrProducts.map((p) => (
                        <Card
                            key={p.id}
                            nombre={p.nombre}
                            presentacion={p.presentacion}
                            precio={p.precio}
                            arrFotos={p.fotos}
                        />
                    ))}
                </Row>
            </Container>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                {
                    arrProductos.length <= arrProducts.length ?
                        <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" disabled>Load More</button>
                        :
                        <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" onClick={showMoreItems}>Load More</button>
                }
                {
                    arrProducts.length > 5 ?
                        <div>
                            <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" onClick={showLessItems}>Load Less</button>
                        </div>
                        :
                        <div>
                            <button className="btn btn-dark text-light text-decoration-none fs-6 mx-3" disabled>Load Less</button>
                        </div>
                }
            </div>
            <div className="bg-dark" style={{ padding: "100px 0 100px 0", marginTop: "30px", display:"flex", alignItems:"baseline", justifyContent:"space-around" }}>
                    <img src={img} alt="logo" style={{ width: "8%" }} />
                <p className='text-light'>Copyright © 2022 Beef Shop, Todos los derechos reservados.</p>
            </div>
        </div>

    )
}

export default Shop