import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import EditCard from "./EditCard";
//import arrProductos from './../dataSimulate';
import { Container, Row, Col, Card, Image, Carousel, Form, Modal, Button } from "react-bootstrap";
import img from "../img/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions";
import { NotFound } from "./NotFound";
import EditUpdateForm from "./EditUpdateForm"
import EditDeleteProductForm from "./EditDeleteProductForm"
import CreateProductForm from "./CreateProductForm"
import { postProduct, putProduct } from "../actions/index"

function Products() {
  const dispatch = useDispatch();
  const arrProductos = useSelector((state) => state.products);
  const filteredProducts = useSelector((state) => state.adminFilteredProducts);
  const emptyProduct = {
    id: "",
    nombre: "",
    descripcion: "",   
    precio: "",
    stock: "", 
    fotos: [],
    Presentacions: [],
    Categoria:[]
  }
  const [copiedProduct, setCopiedProduct] = useState(emptyProduct)

  const [editingProduct, setEditingProduct] = useState(emptyProduct)

  const [errorModal, setErrorModal] = useState({ show: false })

  const [inview, setInview] = useState(12);

  const [confirmModal, setConfirmModal] = useState(false)
  useEffect(() => {
    let timeout = null
    if (confirmModal) {
      timeout = setTimeout(() => {        
        setConfirmModal(false)
      }, 500);
    }
      if (!arrProductos.length) dispatch(getProducts());
    return () => clearTimeout(timeout)
  }, [dispatch, arrProductos,editingProduct, confirmModal]);

  let arrProducts = filteredProducts?.slice(0, inview);

  const showMoreItems = () => {
    setInview((value) => value + 12);
  };

  const showLessItems = () => {
    setInview((value) => value - 12);
  };

  async function createProduct(product) {    
    const createdProduct = await dispatch(postProduct(product))    
    if (createdProduct.status === 200) {       
      setConfirmModal(true)
      setCopiedProduct(emptyProduct)
      setEditingProduct(emptyProduct)
    } else {
      setErrorModal({
        show: true,
        data:createdProduct})      
    }    
  }

  async function updateProduct(product) {    
    const updatedProduct = await dispatch(putProduct(product))
    if (updatedProduct.status === 200) {     
      setEditingProduct(emptyProduct)
      setConfirmModal(true)
    } else {
      setErrorModal({
        show: true,
        data:updatedProduct.error.response.data.error})
    }    
  }

  function setProduct(id) {    
    if (id.length>0) {
      setEditingProduct(arrProducts.find(p=>p.id===id))
    } else {
      setEditingProduct(emptyProduct)
    }    
  } 

  function loadCopy(id) {
    setEditingProduct(emptyProduct)
    let productToCopy = { ...arrProducts.find(p => p.id === id) }
    productToCopy.nombre=productToCopy.nombre+Math.floor(Math.random() * 100)    
    setCopiedProduct(productToCopy)
    window.scrollTo(0, 0)
  }

  return (
    <div className="mx-4 mb-5">  
      <Modal 
          show={confirmModal}
          size="sm"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title><p style={{ textAlign: "center" }}>Producto creado con éxito!</p></Modal.Title>
          </Modal.Header>          
      </Modal>
      <Modal 
        show={errorModal.show}
        onHide={()=>setErrorModal({show:false}) }
        backdrop="static"
        keyboard={false}
        size="sm"        
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error en backend</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          {errorModal.data}
        </Modal.Body>      
        </Modal>
    <SearchBar />   
      <Row className="mx-4">
        <Col>
          <CreateProductForm product={copiedProduct} createFunction={createProduct} />
          {/* <EditUpdateForm product={ editingProduct } cancelFunction={setProduct} /> */}
        </Col>
      </Row>    
           
      {arrProducts.length > 0 ? (  
        <Row className="mx-4">
          <Col>
            {arrProducts?.map((p,i) => (
              <EditDeleteProductForm key={i} product={editingProduct} productToView={p} copyFunction={loadCopy} updateFunction={ updateProduct } selectProduct={ setProduct } cancelFunction={setProduct} />
              
            ))}
            </Col>
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
