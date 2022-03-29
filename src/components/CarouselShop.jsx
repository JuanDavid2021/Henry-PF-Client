import React from 'react'
import { Col } from 'react-bootstrap';

function CarouselShop() {
  return (
<Col xl={2} sm={1} className="carrusel"
        style={{
          width: "50%",
          height: "400px",
          margin: "auto",
          marginTop: "30px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div
          style={{ height: "100%" }}
          id="carouselExampleSlidesOnly"
          className="carousel slide img-thumbnail"
          data-bs-ride="carousel"
        >
          <div style={{ height: "100%" }} className="carousel-inner carousel-item-shop">
            <div
              style={{ height: "100%" }}
              className="carousel-item active bg-dark"
            >
              <img
                style={{ height: "100%" }}
                src="https://www.pequerecetas.com/wp-content/uploads/2009/09/partes-de-la-vaca-o-ternera.jpg"
                className="d-block w-100"
                alt="carne"
              ></img>
            </div>
            <div style={{ height: "100%" }} className="carousel-item bg-dark ">
              <img
                style={{ height: "100%" }}
                src="https://www.lavanguardia.com/files/article_main_microformat/uploads/2019/04/29/5e9981cfb3538.jpeg"
                className="d-block w-100"
                alt="chancho"
              />
            </div>
            <div style={{ height: "100%" }} className="carousel-item bg-dark ">
              <img
                style={{ height: "100%" }}
                src="https://www.quirocarne.com/wp-content/uploads/2018/08/cordero-carne-quirocarme.jpg"
                className="d-block w-100"
                alt="cordero"
              />
            </div>
          </div>
        </div>
      </Col>
  )
}

export default CarouselShop