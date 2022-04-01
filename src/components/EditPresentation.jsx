import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPresentations, putPresentation, addPresentation } from "../actions";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa"

function validate(toTest, toCompare) {
  let error = "";  
    
  var pattern = new RegExp(/^[A-Za-z0-9\s]+$/g);
  
  if (!pattern.test(toTest)) {
    error = "Solo acepta números y letras";
  } else if (toTest.length < 3 || toTest.length > 20) {
    error = "Debe contener de 3 a 20 caracteres"
  }
  for (let i = 0; i < toCompare.length; i++) {
    if (toCompare[i].nombre.toLowerCase() === toTest.toLowerCase()) {
      error = "Ya existe otra presentación con ese nombre"
      break
    }    
  }  
    

  return error;    
}

function EditPresentation() {
  const dispatch = useDispatch();
  const storePresentations = useSelector((state) => state.presentations);
  const [input, setInput] = useState({ id: 0, nombre: "", activo:true });
  const [editing, setEditing] = useState({ id: 0, nombre: "", activo:true });
  const [errors, setErrors] = useState("");
  useEffect(() => {
    if (!storePresentations.length) dispatch(getAllPresentations);
  }, [storePresentations, dispatch]);

  function selectToEdit(e) {
    let id = parseInt(e.target.value);
    setErrors("")
    if (id !== 0) {      
      let cat = storePresentations.find(
        (sC) => sC.id === parseInt(e.target.value)
      );      
      setEditing(cat);
      setInput(cat);   
    } else {      
      setEditing({ id: 0, nombre: "", activo:true });
      setInput({ id: 0, nombre: "", activo:true });      
    }
  }

  async function put(item) {    
    if (item.id === 0) {      
      const result = await dispatch(addPresentation(item))
      if (result.status === 200) {
        
        setEditing(result.data)
        setInput(result.data)
      }
    } else {      
      const result = await dispatch(putPresentation(item))
      if (result.status === 200) {
        setEditing(item)
        setInput(item)
      }
    }
  }
 
  function toggle(item) {
    item.activo = !item.activo
    put(item)
  }

  function handleChangeString(e) {
    let variable = e.target.value;    
    setInput({
      ...input,
      nombre: variable,
    })   
    setErrors(validate(variable, storePresentations));       
  }

  return (
    <Row className="mb-2 border-top">
      <Col className="col-12">
        <Row className="mb-2">
          <Col className="col-12 mb-0">{ errors.length>0 ? <Form.Label className="text-danger">{errors}</Form.Label> : <Form.Label>Presentaciones: </Form.Label> }</Col>
          <Col>
              <Form.Select
              onChange={(e) => selectToEdit(e)}
              value={ editing.id }
                aria-label="Default select example"
              >
                <option selected value={0}>
                  Crear nueva
                </option>
                {storePresentations?.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </Form.Select>
           
          </Col>
          <Col xs="3" sm="2">            
            <Button disabled={input.id === 0} variant={input.activo? "success" : "danger" } className="col-12" onClick={() => toggle(input)}>{ input.activo ? <FaEye className="pb-1"/> : <FaEyeSlash className="pb-1"/> }</Button>  
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              className="col-12"
              isInvalid={errors.length}
              type="text"
              name={input.id}
              placeholder={ editing.id !== 0 ? editing.nombre : `Crear Presentación` }
              value={input.nombre}
              onChange={(e) => handleChangeString(e)}
              trim
            />
          </Col>
          <Col xs="4" md="3">
            {input.id === 0
              ?
              <Button
              disabled={errors.length}
              className="col-12"
              onClick={() => put(input)}
            >
             Crear
              </Button>
              :             
              <Button
              disabled={errors.length || input.nombre===editing.nombre}
              className="col-12"
              onClick={() => put(input)}
            >
              Aplicar
              </Button>
            }            
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default EditPresentation;
