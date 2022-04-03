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
import { searchProduct, filterProducts, filterPedidos } from "../actions";

function SearchBar({filtro}) {
  const [input, setInput] = useState("");
  const [filterPedido, setFilterPedido] = useState('all');
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

  const filterP = (e) => {
    dispatch(filterPedidos(e.target.value));
    setFilterPedido(e.target.value);
  }

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

  const [loaded, setLoaded] = useState(true)
  
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
    if (loaded) {
      setLoaded(false);
      setFilter({
        category: "all",
    order: "",
    input: ""})
      dispatch(filterProducts({
        category: "all",
    order: "",
    input: "",}))}
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
  }, [typing, dispatch, setTyping, categoryFilterStatus, filter,loaded, filterPedido]);

  if (filtro) {
    return (
      <div className="container px-0">
      <Row className="mx-4 mt-3">
        <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
          <p>Filtrar pedidos por :</p>
        </Col>
        <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
          <Form.Select
            name="pedidos"
            onChange={(e) => filterP(e)}
          >
            <option selected value="all">
              Todos los pedidos
            </option>
            <option selected value="Approbed">
              Creado
            </option>
            <option selected value="Processed">
              Procesado
            </option>
            <option selected value="Cancelled">
              Cancelado
            </option>
            <option selected value="Dispatched">
              Completo
            </option>
          </Form.Select>
        </Col>
      </Row>
    </div>
    )
  }

  return (
    <div className="container px-0">
      <Row className="mx-4 mt-3">
        <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
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
        <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
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
        <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
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
    </div>
  );
}

export default SearchBar;
