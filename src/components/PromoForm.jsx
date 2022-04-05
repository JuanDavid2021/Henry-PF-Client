import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Carousel,
  InputGroup,
} from "react-bootstrap";
import { getAllPromos } from "../actions";

function validate(toTest, toCompare) {
  let error = {};
  var pattern = new RegExp(/^[A-Za-z0-9\s]+$/g);
  if (!pattern.test(toTest)) {
    error.nombre = "Solo acepta números y letras";
  } else if (toTest.length < 3 || toTest.length > 20) {
    error.nombre = "Debe contener de 3 a 20 caracteres";
  }
  for (let i = 0; i < toCompare.length; i++) {
    if (toCompare[i].nombre.toLowerCase() === toTest.toLowerCase()) {
      error = "Ya existe otra promoción con ese nombre";
      break;
    }
  }
  return error;
}

function PromoForm({ edit = false, days = [], promoToView }) {
  const [promo, setPromo] = useState(promoToView);
  const [errors, setErrors] = useState("");
  const storeProducts = useSelector((state) => state.products);

  const handleChangeChecks = (e) => {
    console.log(e);
    // let name = e.target.name;
    // if (name === "day")
    //   setPromo({
    //     ...promo,
    //     [e.target.name]: e.target.checked,
    //   });
  };
  const handleChangeString = (e) => {
    console.log(e);
  };
  const promoProduct = (e) => {
    let id = e.target.id; 
    let isIn = parseInt(e.target.value)    
    if (isIn) {
      let newProducts = promo.productos.filter(pp => pp !== id)
      setPromo({
        ...promo,
        productos:newProducts
      })      
    } else {
      setPromo({
        ...promo,
        productos:[...promo.productos,id]
      })      
    }    
  };

  if (edit) {
    return (
      <Row className="mx-4 my-1">
        <Col sm="12" md="6">
          <Row>
            <Col className="col-10">
              <Form.Group>
                <Form.Label
                  className={
                    errors?.nombre?.length ? "mb-0 text-danger" : "mb-0"
                  }
                >
                  {errors?.nombre?.length ? errors?.nombre : "Nombre"}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    isInvalid={errors?.nombre?.length || ""}
                    type="text"
                    pattern="[a-zA-Z. ]{3,30}"
                    name="nombre"
                    placeholder="Nombre del producto"
                    aria-describedby="basic-addon2"
                    value={promo.promocion}
                    onChange={(e) => handleChangeString(e)}
                  />
                  <InputGroup.Text id="basic-addon2">
                    {promo.status ? (
                      <span className="text-success">
                        <FaEye className="pb-1" />
                      </span>
                    ) : (
                      <span className="text-danger">
                        <FaEyeSlash className="pb-1" />
                      </span>
                    )}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className="col-2">
              <Form.Group>
                <Form.Label className="mb-0">Desc. %</Form.Label>
                <Form.Control
                  isInvalid={errors?.porcentaje?.length || ""}
                  type="number"
                  pattern="^[0-9]+"
                  name="porcentaje"
                  placeholder="Descuento"
                  value={promo.porcentaje}
                  onChange={(e) => handleChangeString(e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="mb-0">Dias:</Form.Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {days?.map((d, i) => {
                    return (
                      <Form.Check
                        key={i}
                        label={d}
                        value={i}
                        name="day"
                        checked={promo.dias_semana.find(d=> d=== i)}
                        onChange={(e) => handleChangeChecks(e)}
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col
          
          sm="12"
          md="6"
        >
          <Form.Group>
            <Form.Label className="mb-0">Productos afectados:</Form.Label>
            <div style={{ maxHeight: "150px", display: "flex-col", overflowY: "auto" }} >
          {storeProducts?.map((p, i) => {
            return (
              <Form.Check
                      key={i}
                label={p.nombre}
                disabled={ !promo.status }
                value={p.id}
                in={ promo.productos.find((pp) => pp === p.id) ? 1 : 0 }
                      checked={promo.productos.find((pp) => pp === p.id)}
                      onChange={(e) => promoProduct(e)}
                    />
              // <div
              //   key={p.id}
              //   id={p.id}
              //   in={ promo.productos.find((pp) => pp === p.id) ? 1 : 0 }
              //   onClick={(e) => promoProduct(e)}
              //   className={
              //     promo.productos.find((pp) => pp === p.id) ? "text-danger in" : ""
              //   }
              // >
              //   {p.nombre}
              // </div>
            );
          })}
              </div>
            </Form.Group>
        </Col>
      </Row>
    );
  } else {
    return <Row></Row>;
  }
}

export default PromoForm;
