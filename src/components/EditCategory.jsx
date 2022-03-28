import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, putCategory } from "../actions"
import { Row, Col, Image, Form, Button, FormGroup } from "react-bootstrap";

function EditCategory() {
  const dispatch = useDispatch()
  const storeCategories = useSelector((state) => state.categories);
  useEffect(() => {
    if (!storeCategories.length) dispatch(getAllCategories)
  }, [storeCategories, dispatch])
  return (
    <>
      {storeCategories?.map((c, i) => (
              <Row>
          <Col className="col-10">
            <Form.Group>
              <Form.Label className="mb-0 col-2">ID: { c.id }</Form.Label>
              <Form.Control
                className="col-8"
                isInvalid={errors[c.id]?.length || ""}
                type="text"
                name={c.id}
                placeholder={ `Categoria ${c.id}` }                
                value={input[c.id]}
                onChange={handleChangeString}
              />
            </Form.Group>
          </Col>
          <Button onClick="">Aplicar</Button>
          <Col>
          </Col>
        </Row>
            ))}      
    </>
  )
}

export default EditCategory