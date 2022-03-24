import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddImageAlt from "../img/AddImageAlt.jpg";
import { Row, Col, Image, Form, Button } from "react-bootstrap";

function validate(input) {
  let errors = {};
  let pattern = /[0-9]+/;
  if (!input.nombre.length) {
    errors.nombre = "Nombre es requerido";
  } else if (pattern.test(input.nombre)) {
    errors.nombre = "Nombre inválido, no acepta números";
  }
  if (!input.descripcion.length || input.descripcion.length < 5) {
    errors.descripcion = "Descripción es requerido, mínimo 5 caracteres";
  }
  // if (input.precio < 1 || !pattern.test(input.precio)) {
  //   errors.precio = 'El precio no puede ser menor que 1'
  // }
  // if (input.stock < 0 || !pattern.test(input.stock)) {
  //   errors.stock = 'El stock no puede ser negativo'
  // }
  return errors;
}

function CreateProductForm({ product, createFunction }) {
  const [errors, setErrors] = useState("");
  const [input, setInput] = useState({
    id: product.id || "",
    nombre: product.nombre || "",
    descripcion: product.descripcion || "",
    precio: product.precio || "",
    stock: product.stock || "",
  });

  const [presentacion, setPresentacion] = useState(product.Presentacions || []);

  const [fotos, setFotos] = useState(product.fotos || []);

  const storeCategories = useSelector((state) => state.categories);

  const [categorias, setCategrorias] = useState(product.Categoria || []);

  useEffect(() => {
    let pattern = /[0-9]+/;
    if (product && product?.id !== input.id) {
      setInput(product);
      setPresentacion(product.Presentacions);
      setFotos(product.fotos);
      setCategrorias(product.Categoria);
      setErrors({ nombre: "Nombre inválido, no acepta números" });
    }
    if (input.stock < 0 || !pattern.test(input.stock)) {
      setInput({
        ...input,
        stock: 0,
      });
    }
    if (input.precio < 1 || !pattern.test(input.precio)) {
      setInput({
        ...input,
        precio: 1,
      });
    }
  }, [product, input, categorias, errors]);

  function discardChanges() {
    setInput({
      id: product.id || "",
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
    });
    setPresentacion([]);
    setFotos([]);
    setCategrorias([]);
  }

  const handleChangeString = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.replace(/<[^>]+>/g, ""),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value.replace(/<[^>]+>/g, ""),
      })
    );
  };
  
  const handleCreate = (e) => {
    //e.preventDefault();
    if (!Object.keys(errors).length) {
      const finalProduct = {
        ...input,
        id: "",
        presentacion: presentacion.map(p=>p.id),
        categoria: categorias.map(c => c.id),
        fotos: fotos,
      };
      createFunction(finalProduct);
    } else {
      alert(`Existen errores ${errors}`);
    }
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();

  //   const finalProduct = {
  //     ...input,
  //     presentacion: presentacion,
  //     categoria: categorias,
  //     fotos: fotos,
  //   };
  //   console.log(finalProduct)
  //   updateFunction(finalProduct)
  // };

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

  return (
    <Row style={{ borderTop: "2px solid", marginTop: "10px" }}>
      <Col className="col-12">
        <Row>
          <Col sm="6" xs="12">
            <Form.Group>
              <Form.Label
                className={errors?.nombre?.length ? "mb-0 text-danger" : "mb-0"}
              >
                {errors?.nombre?.length ? errors?.nombre : "Nombre"}
              </Form.Label>
              <Form.Control
                isInvalid={errors?.nombre?.length || ""}
                type="text"
                pattern="[a-zA-Z. ]{3,30}"
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
                isInvalid={errors?.stock?.length || ""}
                type="number"
                pattern="^[0-9]+"
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
                isInvalid={errors?.precio?.length || ""}
                type="number"
                pattern="^[0-9]+"
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
                      checked={categorias.filter((ca) => ca.id === c.id).length}
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
                      checked={categorias.filter((ca) => ca.id === c.id).length}
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
              <Form.Label
                className={
                  errors?.descripcion?.length ? "mb-0 text-danger" : "mb-0"
                }
              >
                {errors?.descripcion?.length
                  ? errors?.descripcion
                  : "Descripción"}
              </Form.Label>
              <Form.Control
                isInvalid={errors?.descripcion?.length || ""}
                as="textarea"
                name="descripcion"
                pattern="[a-zA-Z ]{2,500}"
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
                disabled={
                  Object.keys(errors)?.length || input.nombre.length < 3
                }
                onClick={handleCreate}
              >
                Crear
              </Button>
            </Col>
            <Col className="col-12">
              <Button className="col-12" onClick={() => discardChanges()}>
                Cancelar
              </Button>
            </Col>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CreateProductForm;
