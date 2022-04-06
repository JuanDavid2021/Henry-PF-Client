import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";
//import arrProductos from './../dataSimulate';
import { Container, Row, Col } from "react-bootstrap";
import img from "../img/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { getProductPromo, getProducts } from "../actions";
import { NotFound } from "./NotFound";
import CarouselShop from './CarouselShop';
import { PacmanLoader } from 'react-spinners'

function Shop() {
    const dispatch = useDispatch();
    const arrProductos = useSelector((state) => state.products);
    const loading = useSelector((state) => state.gettingProducts);
    const productOnSale = useSelector((state) => state.productOnSale);
    const filteredProducts = useSelector((state) => state.filteredProducts);

    const [inview, setInview] = useState(12);

    useEffect(() => {
      if (!arrProductos.length) dispatch(getProducts());
      if (!productOnSale.length) dispatch(getProductPromo())
    }, [dispatch, arrProductos]);

    let arrProducts = filteredProducts?.slice(0, inview);

    const showMoreItems = () => {
      setInview((value) => value + 12);
    };

    const showLessItems = () => {
      setInview((value) => value - 12);
    };

    return (
      <div style={{ marginBottom: "30px" }}>

        <CarouselShop />

        <SearchBar />

        <Container>
          {loading ?
            <Row className="my-3 " style={{display:"flex" , justifyContent: "center"}}>
              <Col className="mb-5" style={{display:"flex" , justifyContent: "center"}} >
              <PacmanLoader color={"#212529"}/>
              </Col>
            </Row>
            :
            arrProducts.length > 0 ? (
              <Row xs={1} md={2} xl={4} className="g-4 mx-2 px-1">
                {arrProducts?.map((p) => (
                  <Card
                    prod={p}
                    promocion={p.promocion ? p.promocion : null}
                    key={p.id}
                    id={p.id}
                    precioDesc={p.precio_descuento}
                    precio={p.precio}
                    nombre={p.nombre}
                    descripcion={p.descripcion}
                    presentacion={p.Presentacions}
                    stock={p.stock}
                    arrFotos={p.fotos}
                  />
                ))}
              </Row>
            ) : (
              <Row className="mt-3">
                <Col className="col-12 text-center">
                  <h3>No se encuentran coincidencias, verifique el filtrado</h3>
                </Col>
              </Row>
            )
          }
        </Container>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          {filteredProducts.length <= arrProducts.length ? (
            <button
              className="btn btn-dark text-light text-decoration-none fs-6 mx-3"
              disabled
            >
              Ver mas
            </button>
          ) : (
            <button
              className="btn btn-dark text-light text-decoration-none fs-6 mx-3"
              onClick={showMoreItems}
            >
              Ver mas
            </button>
          )}
          {arrProducts.length > 13 ? (
            <div>
              <button
                className="btn btn-dark text-light text-decoration-none fs-6 mx-3"
                onClick={showLessItems}
              >
                Ver menos
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-dark text-light text-decoration-none fs-6 mx-3"
                disabled
              >
                Ver menos
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

export default Shop;
