import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

function Evaluation({ ev, cm }) {
  return (
    <Row className="my-1">
      <Col sm="auto" md="auto" lg="auto">
        {
          [1, 2, 3, 4, 5].map(icon => {
            return (              
              <FaStar                
                key={ icon }
                className="mb-1"
                strokeWidth="5"
                color="black"
                fill={ev >= icon ? "yellow" : "none"}            
              />
            )
          })
        }          
      </Col>
      <Col>{cm}</Col>
    </Row>
  );
}

export default Evaluation;
