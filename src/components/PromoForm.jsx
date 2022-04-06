import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./PromoForm.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
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

function validate(toTest, toCompare) {
  let error = {};
  let letternumber = new RegExp(/^[A-Za-z0-9\sZñÑáéíóú]+$/g);
  let number = new RegExp(/[0-9]/g);
  if (!letternumber.test(toTest.promocion) && toTest.promocion.length) {
    error.promocion = "Solo acepta números y letras";
  } else if (toTest.promocion.length < 3 || toTest.promocion.length > 20) {
    error.promocion = "Debe contener de 3 a 20 caracteres";
  }
  if (!number.test(toTest.porcentaje)) {
    error.porcentaje = "Debe ser número del 1 al 100";
  }
  for (let i = 0; i < toCompare.length; i++) {
    if (
      toCompare[i].id !== toTest.id &&
      toCompare[i].promocion.toLowerCase() === toTest.promocion.toLowerCase()
    ) {
      error.promocion = "Ya existe otra promoción con ese nombre";
      break;
    }
  }
  return error;
}

function PromoForm({
  editingId = "",
  creationForm = false,
  days = [],
  promoToView,
  updatePromo,
  selectPromo,
  createPromo
}) {
  const [promo, setPromo] = useState(promoToView);
  const [load,setLoad] = useState(true)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(Date.parse(promoToView.f_inicio)), //promoToView.f_inicio.toLocaleString('es-AR', { timeZone: 'UTC' }),
      endDate: new Date(Date.parse(promoToView.f_final)), //promoToView.f_final.toLocaleString('es-AR', { timeZone: 'UTC' }),
      key: "selection",
    },
  ]);
  const [errors, setErrors] = useState("");
  const storeProducts = useSelector((state) => state.products);
  const storePromos = useSelector((state) => state.promos);

  const setRange = (item) => {
    setDateRange([item.selection]);
    setPromo({
      ...promo,
      f_inicio: item.selection.startDate.toISOString(),
      f_final: item.selection.endDate.toISOString(),
    });
  };
  const handleChangeDays = (e) => {
    let id = parseInt(e.target.value);
    let isIn = parseInt(e.target.getAttribute("in"));
    if (isIn) {
      setPromo({
        ...promo,
        dias_semana: promo.dias_semana.filter((ds) => ds !== id),
      });
    } else {
      setPromo({
        ...promo,
        dias_semana: [...promo.dias_semana, id],
      });
    }
  };

  const handleChangeString = (e) => {
    if (e.target.name === "porcentaje") {
      if (e.target.value > 99) {
        e.target.value = 99;
      }
      if (e.target.value < 1) {
        e.target.value = 1;
      }
    }

    setPromo({
      ...promo,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...promo,
          [e.target.name]: e.target.value,
        },
        storePromos
      )
    );
  };
  const promoProduct = (e) => {
    let id = e.target.value;
    let isIn = promo.productos.filter((pp) => pp === id).length//parseInt(e.target.getAttribute("in"));
    
    if (isIn) {      
      setPromo({
        ...promo,
        productos: promo.productos.filter((pp) => pp !== id),
      });
    } else {
      setPromo({
        ...promo,
        productos: [...promo.productos, id],
      });
    }
  };
  const apply = () => {
    updatePromo(promo);
  };
  const create = () => {
    createPromo(promo)
  }
  const toggle = () => {   
    if (!creationForm) {
      updatePromo({
        ...promo,
        status: !promoToView.status
      })
    } else {
       setPromo({
      ...promo,
      status: !promo.status,
       });      
    }    
  };
  const cancelChanges = () => {
    setPromo(promoToView);    
      setDateRange([
      {
        startDate: new Date(Date.parse(promoToView.f_inicio)), //promoToView.f_inicio.toLocaleString('es-AR', { timeZone: 'UTC' }),
        endDate: new Date(Date.parse(promoToView.f_final)), //promoToView.f_final.toLocaleString('es-AR', { timeZone: 'UTC' }),
        key: "selection",
      },
      ]);
    if (!creationForm) {
      setErrors("");
    } else {
      setErrors(validate(promo,storePromos))
    }
  };
  const toLocal = (date) => {
    return new Date(Date.parse(date)).toLocaleString("es-AR", {
            timeZone: 'UTC',
            hour12: false, dateStyle:"long",//timeStyle:"short"
            });
  }

  useEffect(() => {
    if (creationForm && load) {
    setErrors(
      validate(
        promo,
        storePromos
      )
      );
      setLoad(false)
    }
  }, [load, creationForm,storePromos,promo])
  if (editingId === promoToView.id || creationForm) {
    return (
      <Row className="mx-4 my-1" style={{borderTop: "2px solid", marginTop: "10px" }}>
        <Col md="12" lg="6">
          <Row>
            <Col className="col-9">
              <Form.Group>
                <Form.Label
                  className={
                    errors?.promocion?.length ? "mb-0 text-danger" : "mb-0"
                  }
                >
                  {errors?.promocion?.length ? errors?.promocion : "Nombre"}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    isInvalid={errors?.promocion?.length || ""}
                    className="col-12"
                    type="text"
                    pattern="[a-zA-Z. ]{3,30}"
                    name="promocion"
                    placeholder="Nombre del producto"
                    aria-describedby="basic-addon2"
                    value={promo.promocion}
                    onChange={(e) => handleChangeString(e)}
                  />
                  {creationForm ?
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
                  
                :
                    <InputGroup.Text id="basic-addon2">
                    {promoToView.status ? (
                      <span className="text-success">
                        <FaEye className="pb-1" />
                      </span>
                    ) : (
                      <span className="text-danger">
                        <FaEyeSlash className="pb-1" />
                      </span>
                    )}
                  </InputGroup.Text>
                }
                  
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className="col-3">
              <Form.Group>
                <Form.Label className="mb-0">Desc. %</Form.Label>
                <Form.Control
                  isInvalid={errors?.porcentaje?.length || ""}
                  type="number"
                  className="col-12"
                  pattern="^[0-9]+"
                  name="porcentaje"
                  placeholder="Desc."
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
                        in={promo.dias_semana.filter((pd) => pd === i).length}
                        checked={
                          promo.dias_semana.filter((pd) => pd === i).length
                        }
                        onChange={(e) => handleChangeDays(e)}
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Form.Label className="col-12 mb-0">
                  Rango de fechas:
                </Form.Label>
              </Row>
              <Row>
                <DateRange
                  //showMonthAndYearPickers={false}
                  minDate={new Date()}
                  shownDate={new Date()}
                  classNAme="col-12"
                  locale={es}
                  editableDateInputs={true}
                  onChange={(item) => setRange(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md="12" lg="6">
          <Row
            style={{
              height: "440px",
              //boxSizing:"100%",
              marginBottom: "10px",
            }}
          >
            <Form.Group>
              <Form.Label className="mb-1">
                Productos afectados: {promo.productos.length}
              </Form.Label>
              <div
                className="col-12 pl-3"
                style={{
                  display: "flex-col",
                  maxHeight: "410px",
                  overflowY: "auto",
                }}
              >
                {storeProducts?.map((p, i) => {
                  return (
                    <Form.Check
                      key={i}
                      
                      label={p.nombre}
                      disabled={!promoToView.status}
                      value={p.id}
                      //in={promo.productos.filter((pp) => pp === p.id).length}
                      checked={
                        promo.productos.filter((pp) => pp === p.id).length
                      }
                      onChange={(e) => promoProduct(e)}
                    />
                  );
                })}
              </div>
            </Form.Group>
          </Row>

          <Row style={{ display: "flex", justifyContent: "space-around" }}>
            {creationForm ? 
            <>
            <Button disabled={ promo.promocion.length<3 || Object.keys(errors)?.length }className="col-3" onClick={() => create()}>
              Crear
            </Button>
              <Button className={ promo.status ? "col-3 btn-success" : "col-3 btn-warning" } onClick={() => toggle()}>
              { promo.status ? "Activada" : "Desactivada" }
            </Button>
              </>
              :
              <>
              <Button className="col-3" onClick={() => apply()}>
              Aplicar
                </Button>
                <Button className={ promoToView.status ? "col-3 btn-success" : "col-3 btn-warning" } onClick={() => toggle()}>
              { promoToView.status ? "Activada" : "Desactivada" }
            </Button>
                </>
             }           
            <Button className="col-3" onClick={() => cancelChanges()}>
              Cancelar
            </Button>
          </Row>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row className="mx-4 my-1" style={{borderTop: "2px solid", marginTop: "10px", cursor:"pointer" }} onClick={() => selectPromo(promoToView.id)}>
        <Col md="12" lg="6">
          <Row>
            <Col className="col-9">
              <Form.Group>
                <Form.Label
                  className={
                    errors?.promocion?.length ? "mb-0 text-danger" : "mb-0"
                  }
                >
                  {errors?.promocion?.length ? errors?.promocion : "Nombre"}
                </Form.Label>
                <InputGroup>
                  <Form.Control readOnly className="col-12" value={promoToView.promocion} />
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
            <Col className="col-3">
              <Form.Group>
                <Form.Label className="mb-0">Desc. %</Form.Label>
                <Form.Control
                  className="col-12"
                  readOnly
                  type="number"
                  value={promoToView.porcentaje}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <Form.Group>
                <Form.Label className="mb-0">Dias:</Form.Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {days?.map((d, i) => {
                    return (
                      <Form.Check
                        key={i}
                        label={d}
                        checked={
                          promoToView.dias_semana.filter((pd) => pd === i)
                            .length
                        }
                        readOnly
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
                             <Form.Label className="col-12 mb-0">
                  Rango de fechas:
                </Form.Label>
                <Form.Control
                    className="col-12"
                    disabled={promoToView.status}
                    readOnly
                    value={`${toLocal(promoToView.f_inicio)} al ${toLocal(promoToView.f_final)}`}
                  />          
            </Col>
          </Row>
        </Col>
        <Col md="12" lg="6">
          <Row
            style={{
              height: "150px",
              //boxSizing:"100%",
              marginBottom: "10px",
            }}
          >
            <Form.Group>
              <Form.Label className="mb-0">
                Productos afectados: {promo.productos.length}
              </Form.Label>
              <div
                style={{
                  display: "flex-col",
                  maxHeight: "140px",
                  overflowY: "auto",
                }}
              >
                {storeProducts?.map((p, i) => {
                  return (
                    <Form.Check
                      key={i}
                      label={p.nombre}
                      disabled={!promoToView.status}
                      checked={
                        promo.productos.filter((pp) => pp === p.id).length
                      }
                      readOnly
                    />
                  );
                })}
              </div>
            </Form.Group>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default PromoForm;
