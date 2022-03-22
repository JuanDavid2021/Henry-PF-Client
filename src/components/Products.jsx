import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import EditCard from "./EditCard";
//import arrProductos from './../dataSimulate';
import { Container, Row, Col } from "react-bootstrap";
import img from "../img/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions";
import { NotFound } from "./NotFound";
import EditUpdateForm from "./EditUpdateForm"

function Products() {
  const dispatch = useDispatch();
  const arrProductos = useSelector((state) => state.products);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const emptyProduct = {
    id: "",
    nombre: "",
    descripcion: "",    
    precio: "",
    stock: "", 
    fotos: [],
    presentacion: [],
    Categoria:[]
  }
  const [editingProduct, setEditingProduct] = useState(emptyProduct)

  const [inview, setInview] = useState(12);

  useEffect(() => {
    if (!arrProductos.length) dispatch(getProducts());
  }, [dispatch, arrProductos,editingProduct]);

  let arrProducts = filteredProducts?.slice(0, inview);

  const showMoreItems = () => {
    setInview((value) => value + 12);
  };

  const showLessItems = () => {
    setInview((value) => value - 12);
  };

  function setProduct(id) {    
    if (id.length>0) {
      setEditingProduct(arrProducts.find(p=>p.id===id))
    } else {
      setEditingProduct(emptyProduct)
    }    
  } 

  return (
    <div className="mx-4 mb-5">   
      <Row className="mt-2">
        <Col>
          <EditUpdateForm product={ editingProduct } cancelFunction={setProduct} />
        </Col>
      </Row>    
       <SearchBar />     
        {arrProducts.length > 0 ? (
          <Row xs={1} md={2} xl={4} className="g-4 mx-4">
            {arrProducts?.map((p) => (
              <EditCard edit={ setProduct } product={p} key={p.id}
              />
            ))}
          </Row>
        ) : (
          <Row className="mt-3">
            <Col className="col-12 text-center">
              <h3>No se encuentran coincidencias, verifique el filtrado</h3>
            </Col>
          </Row>
        )}      
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >        
          <button
            className="btn btn-dark text-light text-decoration-none fs-6 mx-3"
          disabled={filteredProducts.length <= arrProducts.length}
          onClick={showMoreItems}
          >
            Ver más
          </button>                
          
            <button
              disabled={arrProducts.length < 13}
              className="btn btn-dark text-light text-decoration-none fs-6 mx-3"
              onClick={showLessItems}
            >
              Ver menos
            </button>
          
        
      </div>
    </div>
  );
}

export default Products;
