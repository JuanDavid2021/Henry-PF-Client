import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { RiChatQuoteFill } from "react-icons/ri";

function Review({ id, califications, toDispatch }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("Debe contener de 10 a 120 caracteres");  
  const dispatch = useDispatch()
  
  function validate(input) {    
    let err = "";
    let textPattern = /[^a-zA-Z., ]/gm;    
    if (!input) {
      err = "Texto es requerido";
    } else if (textPattern.test(input)) {
      err = 'Solo se aceptan letras';
    } else if (input.length<10 || input.length>120 ) {
      err = 'Debe contener de 10 a 120 caracteres';
    }    
    return err;
  };

  const handleRating = (value) => {    
    rating === value ? setRating(0) : setRating(value);
  };

  const handleComment = (e) => {
    setError(validate(e.target.value))
    setComment(e.target.value)//.replace(/[^a-zA-Z]/gm,""));
  };

  const sendReview = () => {
    const toReview = {
      id: id,
      value: rating,
      comment:comment
    }
    console.log(toReview);
    dispatch(toDispatch(toReview))
  };

  return (
    <>
      <Row className="my-1">
        <Col>
          <Form noValidate validated={!error.length}>
            <Form.Group className="mb-3">
              <div className="mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="mt-1">
                  {califications.map((value, index) => {
                    return (
                      <FaStar
                        key={index}
                        style={{ marginRight: "10" }}
                        stroke-width="5"
                        color="black"
                        fill={rating >= index+1 ? "yellow" : "none"}
                        onClick={() => handleRating(index+1)}
                      />
                    );
                  })}
                  { rating>0 ? califications[rating-1] : "No lo se Rick..." }
                </div>
                <Button  
                  disabled={comment.length<10 || error.length!==0}  
                  className="mt-0"
                  variant="secondary"
                  onClick={sendReview}
                >
                  Publicar reseña <RiChatQuoteFill />
                </Button>
              </div>

              <Form.Control
                type="text"
                id="comment"
                name="comment"
                aria-describedby="comment"
                value={ comment }
                onChange={ handleComment }
              />
              <Form.Text id="commentHelpBlock" muted={ !error.length } className={ error.length? "text-danger font-weight-bold" : "" }>
                La reseña debe tener de 10 a 120 caracteres de largo y solo se aceptan letras puntos y comas.
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Review;
