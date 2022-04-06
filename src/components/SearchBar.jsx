import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {motion} from 'framer-motion'
import "../components/styles.css/efectoList.css"
import {useClickOutside} from "react-click-outside-hook"
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

import { searchProduct, filterProducts,filterProductsAuto,filterPedidos } from "../actions";
import { SearchBarList } from "./SearchBarList";



function SearchBar({filtro}) {
  const [input, setInput] = useState("");
  const [promo, setPromo] = useState(false)
  const [filterPedido, setFilterPedido] = useState('all');
  const categories = useSelector((state) => state.categories);
  const productsAutoComplete = useSelector(state=> state.products)
  const productosFilter=useSelector(state=>state.filteredProducts)
  const categoryFilterStatus = useSelector((state) => state.categoryFilterStatus);
  const searchFilterStatus = useSelector((state) => state.searchFilterStatus);
  
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(true)
  const [typing, setTyping] = useState(false);
  const [expanding, setExpanding] = useState(false)
  const [ref, isClickedOutSide] = useClickOutside();

  const [filter, setFilter] = useState({
    category: "all",
    order: "",
    input: "",
    promo:false
  });


  const expandContainer=()=>{
    setExpanding(true)
  
  }

  const closeContainer =()=>{
    setExpanding(false) 
  }

  const conteinerVariants = {
    expanded:{
      position:"absolute",
      zIndex:30,
      height:"15em",
    },
    close:{  
      height:"2.5em",
    }
  }


  const search =(e,nombre)=>{
   e.preventDefault()
   setFilter({
     ...filter,
     input:nombre
   })
   dispatch(filterProductsAuto(nombre)) 
   closeContainer()
  }


  // const transition = {type:"spring", damping:50, stiffness:150}

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

  const handlePromos = () => {
    setPromo(!promo)
    setFilter({
      ...filter,
      promo:!promo
    })
    dispatch(
      filterProducts({
        ...filter,
        promo:!promo
      })
    );
  }

  const handleChange = (e) => {
    e.preventDefault();
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
  }, [typing, dispatch, setTyping, categoryFilterStatus, filter,loaded,filterPedido]); 

  useEffect(()=>{
     if(isClickedOutSide) closeContainer()
  },[isClickedOutSide])

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
            <option value="Approbed">
              Creado
            </option>
            <option value="Processed">
              Procesado
            </option>
            <option value="Cancelled">
              Cancelado
            </option>
            <option value="Dispatched">
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
        <Col sm="12" md="4" lg="4" xl="4" className="mb-2" >
          <InputGroup >
             <motion.div animate={expanding & filter.input.length>0 & productosFilter.length>0 ? "expanded":"close"}  ref={ref}  variants={conteinerVariants}  style={{ width:"400px", height:"100px", overflow:"hidden", backgroundColor:"white"}} >
            <FormControl
              isInvalid={!searchFilterStatus}
              placeholder="Buscar por nombre..."
              onFocus={expandContainer}
              aria-label="Recipient's username"
              type="text"
              id="search"
              name="input"
              aria-describedby="search-input"
              value={filter.input}
              onChange={handleChange}
            />
            <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", padding:"1em",overflowY:"scroll",alignItems:"center",}}>
               {filter.input==="" ? null : productosFilter?.map(p=>(
                 <span className="efecto" style={{display:"flex", minWidth:"100%", minHeight:"30%", alignItems:"auto", fontSize:"20px", hover:"color: red"}} value={p.nombre} onClick={(e)=>search(e, p.nombre)}>
                <SearchBarList producto={p.nombre}
                 foto={p.fotos}
                 value={p.nombre}
                />
                </span>
               ))}
            </div>
            </motion.div>
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
        <Col sm="12" md="3" lg="3" xl="3" className="mb-2">
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
                <option hidden={ !e.activo } key={i} value={e.id}>
                  Carne de {e.nombre}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col sm="12" md="3" lg="3" xl="3" className="mb-2">
          <Form.Select
            name="order"            
            onChange={(e) => setTheFilter(e)}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected value="">
              Ordenar por
            </option>
            <option value="priceLower-Higher">Menor precio</option>
            <option value="priceHigher-Lower">Mayor precio</option>
            <option value="A-Z">Nombre de A a Z</option>
            <option value="Z-A">Nombre de Z a A</option>
            
          </Form.Select>
        </Col>
        <Col sm="12" md="2" lg="2" xl="2" className="mb-2">
          <Form.Check   
            className="mt-1"  
            label="Solo ofertas"
            value={promo}
            checked={promo}
            onChange={(e) => handlePromos(e)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;
