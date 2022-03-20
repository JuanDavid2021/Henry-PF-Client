import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

function Evaluation({ ev, cm }) {
  return (
    <>
      <Row className="my-1">
        <Col sm="auto" md="auto" lg="auto">
          <FaStar
            className="mb-1"
            stroke-width="5"
            color="black"
            fill={ev >= 1 ? "yellow" : "none"}
          />
          <FaStar
            className="mb-1"
            stroke-width="5"
            color="black"
            fill={ev >= 2 ? "yellow" : "none"}
          />
          <FaStar
            className="mb-1"
            stroke-width="5"
            color="black"
            fill={ev >= 3 ? "yellow" : "none"}
          />
          <FaStar
            className="mb-1"
            stroke-width="5"
            color="black"
            fill={ev >= 4 ? "yellow" : "none"}
          />
          <FaStar
            className="mb-1"
            stroke-width="5"
            color="black"
            fill={ev >= 5 ? "yellow" : "none"}
          />
        </Col>
        <Col>{cm}</Col>
      </Row>
    </>
  );
}

export default Evaluation;
