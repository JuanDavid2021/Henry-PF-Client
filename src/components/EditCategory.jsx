import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, putCategory } from "../actions"
import { Row, Col, Form, Button } from "react-bootstrap";

function EditCategory() {
  const dispatch = useDispatch()
  const storeCategories = useSelector((state) => state.categories);
  const [inputs, setInputs] = useState([])
  const [editing, setEditing] = useState({ id: null, nombre: null })
  const [errors, setErrors] = useState('')
  useEffect(() => {
    if (!storeCategories.length) dispatch(getAllCategories)
    if (storeCategories.length !== inputs.length) {
      setInputs([...storeCategories])
    } 
  }, [storeCategories, dispatch, inputs])
  function validate(inputs) {
    let errors = {}
    let pattern = /[0-9]/
    for (let i = 0; i < inputs.length; i++) {
      errors[i] = ""
      if (!inputs[i].nombre.length) {
        
      }
      if (!pattern.test(inputs[i].nombre)) {
        errors[i]+="Solo acepta letras"
      }
      if(!errors[i].length) delete errors[i]
    }
    console.log(errors)
  }
  
  function putModifiedCategory(c) {
    
  }
  function handleChangeString(e) {
    let newValues = [...inputs]
    newValues.map(c => {
      if (c.id === parseInt(e.target.name)) {
        c.nombre = e.target.value
        return c
      }
      return c
    })
    setInputs(newValues)
    validate(newValues)
  }

  return (
    <>
      {inputs?.map((c, i) => (
              <Row>
          <Col className="col-10">
            <Form.Group>
              <Form.Label className="mb-0 col-2">ID: {c.id}</Form.Label>
              {editing.id === c.id ?
                <Form.Control
                  className="col-8"
                  isInvalid={errors[c.id]?.length || ""}
                  type="text"
                  name={c.id}
                  placeholder={`Categoria ${c.id}`}
                  value={inputs.find(ci => ci.id === c.id).nombre}
                  onChange={handleChangeString}
                /> : c.nombre}
            </Form.Group>
          </Col>
          {editing.id===c.id ? <Button onClick={()=>putCategory(c)}>Aplicar</Button> : <Button onClick={()=>setEditing(c)}>Editar</Button>}
          <Col>
          </Col>
        </Row>
            ))}      
    </>
  )
}

export default EditCategory