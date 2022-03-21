import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import { searchProduct, filterProducts } from "../actions";

function SearchBar() {
  const [input, setInput] = useState("");
  const categories = useSelector((state) => state.categories);
  const categoryFilterStatus = useSelector(
    (state) => state.categoryFilterStatus
  );
  const searchFilterStatus = useSelector((state) => state.searchFilterStatus);

  const [filter, setFilter] = useState({
    category: "all",
    order: "",
  });

  const setTheFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
      input: input,
    });
    dispatch(
      filterProducts({
        ...filter,
        [e.target.name]: e.target.value,
        input: input,
      })
    );
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(searchProduct(input));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "38px",
        justifyContent: "space-evenly",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <div style={{ width: "20%" }}>
        <InputGroup className="mb-3">
          <FormControl
            isInvalid={!searchFilterStatus}
                      
            placeholder="Buscar por nombre"
            aria-label="Recipient's username"
            type="text"
            id="search"
            name="search"
            aria-describedby="search-input"
            value={input}
            onChange={handleChange}
          />
          <Button
        onClick={setTheFilter}
        variant="dark outline-secondary"
        id="search-local-input"
      >
        Buscar
      </Button>
        </InputGroup>
      </div>
      
      <Form.Select
        isValid={categoryFilterStatus}
        isInvalid={!categoryFilterStatus}
        name="category"
        onChange={(e) => setTheFilter(e)}
        className={categoryFilterStatus ? "isValid" : "isInvalid"}
        aria-label="Default select example"
        style={{ width: "15%" }}
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
      <Form.Select
        name="order"
        onChange={(e) => setTheFilter(e)}
        className="form-select"
        aria-label="Default select example"
        style={{ width: "15%" }}
      >
        <option selected value="">
          Ordenar por
        </option>
        <option value="A-Z">Nombre de A a Z</option>
        <option value="Z-A">Nombre de Z a A</option>
        <option value="priceLower-Higher">Baratos primero</option>
        <option value="priceHigher-Lower">Caros primero</option>
      </Form.Select>
    </div>
  );
}

export default SearchBar;
