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
} from "react-bootstrap";
import { searchProduct, filterProducts } from "../actions";

function SearchBar() {
  const [input, setInput] = useState("");
  const categories = useSelector((state) => state.categories);
  const [typing, setTyping] = useState(false);
  const categoryFilterStatus = useSelector(
    (state) => state.categoryFilterStatus
  );
  const searchFilterStatus = useSelector((state) => state.searchFilterStatus);

  const [filter, setFilter] = useState({
    category: "all",
    order: "",
    input: "",
  });

  const setTheFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    dispatch(
      filterProducts({
        ...filter,
        [e.target.name]: e.target.value,
      })
    );
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setInput(e.target.value);
    setTyping(true);
  };

  useEffect(() => {
    let timeout = null;
    if (typing) {
      timeout = setTimeout(() => {
        setTyping(false);
        if (categoryFilterStatus) {
          dispatch(filterProducts(filter));
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [typing, dispatch, setTyping, categoryFilterStatus, filter]);
  return (
    <Row className="mx-4 mt-3 center justify-content-center">
      <Col sm="12" md="4" lg="4" xl="3" className="mb-2">
        <InputGroup>
          <FormControl
            isInvalid={!searchFilterStatus}
            placeholder="Buscar por nombre..."
            aria-label="Recipient's username"
            type="text"
            id="search"
            name="input"
            aria-describedby="search-input"
            value={filter.input}
            onChange={handleChange}
          />
          {typing ? (
            <Button
              onClick={setTheFilter}
              variant="dark outline-secondary"
              id="search-local-input"
            >
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          ) : (
            ""
          )}
        </InputGroup>
      </Col>
      <Col sm="12" md="4" lg="4" xl="3" className="mb-2">
        <Form.Select
          isValid={categoryFilterStatus}
          isInvalid={!categoryFilterStatus}
          name="category"
          onChange={(e) => setTheFilter(e)}
          className={categoryFilterStatus ? "isValid" : "isInvalid"}
          aria-label="Default select example"
        >
          <option selected value="all">
            Todas las carnes
          </option>
          {categories.map((e, i) => {
            return (
              <option key={i} value={e.id}>
                Carne de {e.nombre}
              </option>
            );
          })}
        </Form.Select>
      </Col>
      <Col sm="12" md="4" lg="4" xl="3" className="mb-2">
        <Form.Select
          name="order"
          onChange={(e) => setTheFilter(e)}
          className="form-select"
          aria-label="Default select example"
        >
          <option selected value="">
            Ordenar por
          </option>
          <option value="A-Z">Nombre de A a Z</option>
          <option value="Z-A">Nombre de Z a A</option>
          <option value="priceLower-Higher">Baratos primero</option>
          <option value="priceHigher-Lower">Caros primero</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SearchBar;
