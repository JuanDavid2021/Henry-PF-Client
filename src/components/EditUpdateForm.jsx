import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  FormControl,
  Spinner,
  Table
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

function EditUpdateForm({ product, createFunction, updateFunction, cancelFunction }) {
  
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

  const storeCategories = useSelector(state=>state.categories)

  const [categorias, setCategrorias] = useState(product.Categoria || []);

  useEffect(() => {
    if (product && product?.id !== input.id) {
      setInput(product)
      setPresentacion(product.presentacion)
      setFotos(product.fotos)
      setCategrorias(product.Categoria)      
    }     
    console.log(categorias)
  }, [product, input,categorias])
  
  function discardChanges() {
    setInput({
      id: product.id || "",
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",      
      precio: product.precio || "",
      stock: product.stock || ""      
    });
    setPresentacion(product.presentacion || [])
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
      fotos:fotos
    }
    dispatch(createFunction(finalProduct));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const finalProduct = {
      ...input,
      presentacion: presentacion,
      categoria: categorias,
      fotos:fotos
    }
    dispatch(updateFunction(finalProduct));
  };

  const handleCheck = (e) => {    
    if (e.target.checked) {
      if (!categorias.find(c => c === parseInt(e.target.value))) {
        setCategrorias([...categorias, { id:parseInt(e.target.value)} ])
      }      
    } else {
      if (categorias.find(c=>c.id===parseInt(e.target.value))) {
        setCategrorias(categorias.filter(c=>c.id!==parseInt(e.target.value)))
      }
    }    
  }

  return (
    <Row className="mx-4">
      <Col className="col-12">
        <Row>
          <Col lg="4" sm="12">
            <Form.Group>
              <Form.Label className="mb-0">Nombre de producto</Form.Label>
              <Form.Control
                type="text"                
                pattern="[a-zA-Z ]{3,30}"
                name="nombre"
                aria-describedby="nombre"
                value={ input.nombre }
                onChange={ handleChangeString }
              />              
            </Form.Group>
          </Col>
          <Col lg="4" sm="6" xs="6">
            <Form.Group>
               <Form.Label className="mb-0">Precio</Form.Label>
              <Form.Control
                type="number"                
                name="precio"                
                aria-describedby="precio"
                value={ input.precio }
                onChange={ handleChangeString }
              />              
            </Form.Group>
          </Col>
           <Col lg="4" sm="6" xs="6">
            <Form.Group>
               <Form.Label className="mb-0">Stock</Form.Label>
              <Form.Control
                type="number"                
                name="stock"
                aria-describedby="stock"
                value={ input.stock }
                onChange={ handleChangeString }
              />              
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Form.Group>
               <Form.Label className="mb-0">Descripción</Form.Label>
              <Form.Control
                as="textarea"                
                name="descripcion"
                rows="3"
                aria-describedby="descripcion"
                value={ input.descripcion }
                onChange={ handleChangeString }
              />              
            </Form.Group>
          </Col>
        </Row>
         
        <Form.Group >  
           <Form.Label className="mb-0">Categorias</Form.Label>  
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {storeCategories.map(c => {
            return (              
              <Form.Check                
                key={c.id}                
                label={c.nombre}                
                value={c.id}
                checked={categorias.filter(ca => ca.id === c.id).length }
                onChange={ (e)=>handleCheck(e) }
        />
            )
          })}
            </div>
          </Form.Group>
       
        
        <Row>
          <Col>
            <Button
              disabled={ input.nombre.length<3 }
              
              onClick={input.id.length > 0 ? handleUpdate : handleCreate}
            >
              {input.id.length > 0 ? "Actualizar" : "Crear"}
            </Button>
          </Col>
          <Col>
            {input.id.length!==0 ? <Button
              disabled={input.id.length===0}
              
              onClick={()=>cancelFunction("")}
            >
              Cancelar
            </Button> : <></>}
            
            
          </Col>
        </Row>
        </Col>
      </Row>
  );
}

export default EditUpdateForm;
