import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddImageAlt from "../img/AddImageAlt.jpg";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  Button,
  FormControl,
  Spinner,
  Table,
  Carousel,
} from "react-bootstrap";

function error(input) {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "se requiere ingresar un nombre de producto";
  } else if (!input.descripcion) {
    errors.descripcion = "se requiere ingresar la descripcion del producto";
  } else if (!input.presentacion.length) {
    errors.presentacion = "se requiere ingresar una presentacion del producto";
  } else if (!input.precio)
    errors.precio = "se requiere ingresar un valor del producto";
  else if (input.precio < 0) errors.precio = "el precio debe ser mayor a 0";
  else if (!input.stock)
    errors.stock = "se requiere ingresar un stock del producto";
  else if (input.stock < 0) errors.stock = "el stock debe ser mayor a 0";
  else if (!input.categoria)
    errors.categoria = "se requiere ingresar una categoria del producto";
  else if (!input.fotos.length)
    errors.fotos = "se requiere ingresar una imagen del producto";

  return errors;
}

function EditDeleteProductForm({
  product,
  productToView = {
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    fotos: [],
    presentacion: [],
    Categoria: [],
  },
  createFunction,
  updateFunction,
  cancelFunction,
  selectProduct,
  createForm = false,
  copyFunction
}) {
  const dispatch = useDispatch();
  //const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: product.id || "",
    nombre: product.nombre || "",
    descripcion: product.descripcion || "",
    precio: product.precio || "",
    stock: product.stock || "",
  });

  const [presentacion, setPresentacion] = useState(product.presentacion || []);

  const [fotos, setFotos] = useState(product.fotos || []);

  const storeCategories = useSelector((state) => state.categories);

  const [categorias, setCategrorias] = useState(product.Categoria || []);

  useEffect(() => {
    if (product && product?.nombre !== input.nombre) {
      setInput(product);
      setPresentacion(product.presentacion);
      setFotos(product.fotos);
      setCategrorias(product.Categoria);
    }
  }, [product, input, categorias]);

  function discardChanges() {
    setInput({
      id: product.id || "",
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",
      precio: product.precio || "",
      stock: product.stock || "",
    });
    setPresentacion(product.presentacion || []);
    setFotos(product.fotos || []);
    setCategrorias(product.Categoria || []);
  }

  const handleChangeString = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   error({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const handleChangeArray = (e) => {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
    // setErrors(
    //   error({
    //     ...input,
    //     [e.target.name]: [e.target.value],
    //   })
    // );
    console.log(input);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const finalProduct = {
      ...input,
      presentacion: presentacion,
      categoria: categorias,
      fotos: fotos,
    };
    dispatch(createFunction(finalProduct));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const finalProduct = {
      ...input,
      presentacion: presentacion,
      categoria: categorias,
      fotos: fotos,
    };
    dispatch(updateFunction(finalProduct));
  };

  const setFoto = (e) => {
    console.log("Seleccionar foto Nº " + e.target.id);
  };

  const handleCategories = (e) => {
    if (e.target.checked) {
      if (!categorias.find((c) => c === parseInt(e.target.value))) {
        setCategrorias([...categorias, { id: parseInt(e.target.value) }]);
      }
    } else {
      if (categorias.find((c) => c.id === parseInt(e.target.value))) {
        setCategrorias(
          categorias.filter((c) => c.id !== parseInt(e.target.value))
        );
      }
    }
  };
  
  const handleTypes = (e) => {
    if (e.target.checked) {
      if (!categorias.find((c) => c === parseInt(e.target.value))) {
        setCategrorias([...categorias, { id: parseInt(e.target.value) }]);
      }
    } else {
      if (categorias.find((c) => c.id === parseInt(e.target.value))) {
        setCategrorias(
          categorias.filter((c) => c.id !== parseInt(e.target.value))
        );
      }
    }
  };

  if (product.id !== productToView.id && !createForm) {
    return (
      <Row
        style={{ borderTop: "2px solid", marginTop: "10px" }}
        key={productToView.id}
        onClick={() => selectProduct(productToView.id)}
      >
        <Col className={"d-none d-lg-block"} lg="2">
          <Carousel controls={false} indicators={false} variant="dark" fade>
            {productToView.fotos?.map((f, i) => (
              <Carousel.Item
                style={{ display: "flex", justifyContent: "center" }}
                key={i}
              >
                <Image
                  src={f}
                  style={{ maxHeight: "150px", width: "auto" }}
                  fluid
                  alt="NO FOTO"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs="12" sm="12" lg="10">
          <Row>
            <Col className="border-bottom" sm="6" xs="12">
              <p className="mb-1">
                <b>Nombre: </b>
                {productToView.nombre}
              </p>
            </Col>
            <Col className="border-bottom" sm="3" xs="6">
              <p className="mb-1">
                <b>Stock: </b>
                {productToView.stock}
              </p>
            </Col>
            <Col className="border-bottom" sm="3" xs="6">
              <p className="mb-1">
                <b>Precio: $</b>
                {productToView.precio}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="border-bottom" xs="12" sm="6">
              <p className="mb-1">
                <b>Categorias: </b>
                {productToView.Categoria.nombre}
              </p>
            </Col>
            <Col className="border-bottom" xs="12" sm="6">
              <p className="mb-1">
                <b>Tipo de corte: </b>
                {productToView.presentacion.map((pr) => pr + ", ")}
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ maxHeight: "70px", overflowY: "auto" }}
              className="col-12"
            >
              <p className="mb-0">
                {`Descripción: ${productToView.descripcion}`}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row style={{ borderTop: "2px solid", marginTop: "10px" }}>
        <Col className="col-12">
          <Row>
            <Col sm="6" xs="12">
              <Form.Group>
                <Form.Label className="mb-0">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  pattern="[a-zA-Z ]{3,30}"
                  name="nombre"
                  placeholder="Nombre del producto"
                  aria-describedby="nombre"
                  value={input.nombre}
                  onChange={handleChangeString}
                />
              </Form.Group>
            </Col>
            <Col sm="3" xs="6">
              <Form.Group>
                <Form.Label className="mb-0">Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  aria-describedby="stock"
                  value={input.stock}
                  onChange={handleChangeString}
                />
              </Form.Group>
            </Col>
            <Col sm="3" xs="6">
              <Form.Group>
                <Form.Label className="mb-0">Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  placeholder="Precio"
                  aria-describedby="precio"
                  value={input.precio}
                  onChange={handleChangeString}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="pt-1">
            <Col
              xs="12"
              sm="4"
              style={{
                padding: "0px",
                margin: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={fotos[0] || AddImageAlt}
                id="0"
                height="150"
                width="150"
                alt="Product foto 0"
                onClick={setFoto}
              />
            </Col>
            <Col
              xs="12"
              sm="4"
              style={{
                padding: "0px",
                margin: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={fotos[1] || AddImageAlt}
                id="1"
                height="150"
                width="150"
                fluid
                alt="Product foto 1"
                onClick={setFoto}
              />
            </Col>
            <Col
              xs="12"
              sm="4"
              style={{
                padding: "0px",
                margin: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={fotos[2] || AddImageAlt}
                id="2"
                height="150"
                width="150"
                fluid
                alt="Product foto 2"
                onClick={setFoto}
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-12 border-top">
              <Form.Group>
                <Form.Label className="mb-0">Categorias:</Form.Label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {storeCategories.map((c) => {
                    return (
                      <Form.Check
                        key={c.id}
                        label={c.nombre}
                        value={c.id}
                        checked={
                          categorias.filter((ca) => ca.id === c.id).length
                        }
                        onChange={(e) => handleCategories(e)}
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </Col>
            <Col hidden className="col-12 border-top">
              <Form.Group>
                <Form.Label className="mb-0">Tipos de corte:</Form.Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {storeCategories.map((c) => {
                    return (
                      <Form.Check
                        key={c.id}
                        label={c.nombre}
                        value={c.id}
                        checked={
                          categorias.filter((ca) => ca.id === c.id).length
                        }
                        onChange={(e) => handleTypes(e)}
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="10" sm="8" xs="12">
              <Form.Group>
                <Form.Label className="mb-0">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  rows="3"
                  aria-describedby="descripcion"
                  value={input.descripcion}
                  onChange={handleChangeString}
                />
              </Form.Group>
            </Col>
            <Col lg="2" sm="4" xs="12">
              <br />
              <Col className="col-12 mb-2">
                <Button
                  className="col-12"
                  disabled={input.nombre.length < 3}
                  onClick={input.id.length > 0 ? handleUpdate : handleCreate}
                >
                  {input.id.length > 0 ? "Actualizar" : "Crear"}
                </Button>
              </Col>
              <Col className="col-12">                 
                  <Button
                    className="col-12"                   
                    onClick={input.id.length > 0 ? () => copyFunction(product.id) : ()=>discardChanges() }
                  >
                  {input.id.length > 0 ? "Copiar" : "Cancelar"}
                  </Button>                
              </Col>
            </Col>
          </Row>
        </Col>
        
      </Row>
    );
  }
}

export default EditDeleteProductForm;
