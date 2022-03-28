import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { FaCircle, FaEye, FaEyeSlash } from "react-icons/fa"
import AddImageAlt from "../img/AddImageAlt.jpg";
import {
  Row,
  Col,
  Image,
  Form,  
  Button,  
  Carousel,
  InputGroup 
} from "react-bootstrap";

function validate(input,fotos) {
  let errors = {};
  let pattern = /[0-9]+/;
  //let patternURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  let patternIMGURL = /(https:)([/|.|~\w|-])*\.(?:jpg|gif|png)([/|.|,~\w|-])*/
  if (!input.nombre.length || input.nombre.length<5) {
    errors.nombre = "Requerido, minimo 5 caracteres";
  } else if (pattern.test(input.nombre)) {
    errors.nombre = "Inválido, no acepta números";
  }
  if (!input.descripcion.length || input.descripcion.length < 5) {
    errors.descripcion = "Requerido, mínimo 5 caracteres";
  }    
  fotos.forEach((f, i) => { 
    if (f.length && !patternIMGURL.test(f)) {
      errors["foto" + i] = "Link inválido"      
    }
  }); 

  return errors;
}

function EditDeleteProductForm({
  product,
  productToView = {
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    fotos: [],
    Presentacions: [],
    Categoria: [],
    new: false,
    activo:true,
    stock_minimo:"0"
  },
  createFunction,
  updateFunction,
  deleteFunction,
  cancelFunction,
  toggleActiveFunction,
  selectProduct,
  createForm = false,
  copyFunction
}) {
  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: product.id || "",
    nombre: product.nombre || "",
    descripcion: product.descripcion || "",
    precio: product.precio || "",
    stock: product.stock || "",
    stock_minimo: product.stock_minimo || ""
  });

  const [presentacion, setPresentacion] = useState(product.Presentacions || []);

  const [fotos,setFotos] = useState([product.fotos[0] || "",product.fotos[1] || "", product.fotos[2] || ""])
  const storeCategories = useSelector((state) => state.categories);

  const [categorias, setCategrorias] = useState(product.Categoria || []);

  const [settingFoto, setSettingFoto] = useState({
    show: false,
    name: "0",
    placeholder: "Link de foto NºX",
    value: ""    
  })

  useEffect(() => {
    let pattern = /[0-9]+/;
    
    if (product && product?.id !== input.id) {
      setInput(product);
      setPresentacion(product.Presentacions); 
      setFotos([product.fotos[0] || "",product.fotos[1] || "", product.fotos[2] || ""])    
      setCategrorias(product.Categoria);
    }    
    if (input.stock < 0 || !pattern.test(input.stock)) {
      setInput({
        ...input,
        stock: 0,
      });
    }
    if (input.precio < 1 || !pattern.test(input.precio)) {
      setInput({
        ...input,
        precio: 1,
      });
    }   
    
  }, [product, input, categorias,fotos,errors]);

  function discardChanges() {
    setInput({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      stock_minimo: product.stock_minimo
    });
    setPresentacion(product.Presentacions);    
    setFotos([product.fotos[0] || "",product.fotos[1] || "", product.fotos[2] || ""])        
    setCategrorias(product.Categoria);
  }

  const handleFotoChange = (e) => {       
    setSettingFoto({
      ...settingFoto,
      value:e.target.value
    })    
    let newFotos=[...fotos]
    newFotos[parseInt(e.target.name)] = e.target.value
    setFotos(newFotos)    
    setErrors(validate(input, newFotos));  
  }

  const handleChangeString = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.replace(/<[^>]+>/g, ""),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value.replace(/<[^>]+>/g, ""),
      }, fotos)
    );
  };

 
  const handleCreate = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      const finalProduct = {
        ...input,
        id: "",
        presentacion: presentacion.map(p => p.id),        
        categoria: categorias.map((c) => c.id),
        fotos: fotos,
      };
      createFunction(finalProduct);
    } else {
      alert(`Existen errores ${errors}`);
    }
  };  

  const handleToggleON = (e) => {
    if (!Object.keys(errors).length) {
      const finalProduct = {
        ...input,
        presentacion: presentacion.map(p => p.id),        
        categoria: categorias.map((c) => c.id),
        fotos: fotos,
        activo:true
      };    
      //console.log(finalProduct)
      toggleActiveFunction(finalProduct)
    } else {
      alert(`Existen errores ${errors}`);
    }
  }

  const handleToggleOFF = (e) => {
    if (!Object.keys(errors).length) {
      const finalProduct = {
        ...input,
        presentacion: presentacion.map(p => p.id),        
        categoria: categorias.map((c) => c.id),
        fotos: fotos,
        activo:false
      };         
      //console.log(finalProduct)
      toggleActiveFunction(finalProduct)
    } else {
      alert(`Existen errores ${errors}`);
    }
  }

  const handleUpdate = (e) => {
    
    if (!Object.keys(errors).length) {
      const finalProduct = {
        ...input,
        presentacion: presentacion.map(p => p.id),        
        categoria: categorias.map((c) => c.id),
        fotos: fotos,
      };          
      updateFunction(finalProduct)
    } else {
      alert(`Existen errores ${errors}`);
    }
  };

  const selectFoto = (e) => {    
    setSettingFoto({
      show: true,
      name: e.target.id,
      placeholder: "Link de foto Nº " + e.target.id,
      value : fotos[parseInt(e.target.id)]
    })
    setErrors(validate(input, fotos));  

  };

  const handleCategories = (e) => {
    if (e.target.checked) {
      if (!categorias.find((c) => c === parseInt(e.target.value))) {
        setCategrorias([...categorias, { id: parseInt(e.target.value ) }]);
      }
    } else {
      if (categorias.find((c) => c.id === parseInt(e.target.value))) {
        setCategrorias(
          categorias.filter((c) => c.id !== parseInt(e.target.value))
        );
      }
    }
  };
  
  const handleTypes = (e) => {
    if (e.target.checked) {
      if (!categorias.find((c) => c === parseInt(e.target.value))) {
        setCategrorias([...categorias, { id: parseInt(e.target.value) }]);
      }
    } else {
      if (categorias.find((c) => c.id === parseInt(e.target.value))) {
        setCategrorias(
          categorias.filter((c) => c.id !== parseInt(e.target.value))
        );
      }
    }
  };

  if ((product.id !== productToView.id && !createForm) || product.id === "") {
    return (
      <Row
        className={productToView.new ? "text-success": ""}
        style={{ borderTop: "2px solid", marginTop: "10px" }}
        key={productToView.id}
        onClick={() => selectProduct(productToView.id)}
      >
        <Col className={productToView.new ? "text-success border-start d-none d-lg-block": "d-none d-lg-block"}lg="2">
          <Carousel controls={false} indicators={false} variant="dark" fade>
            {productToView.fotos?.map((f, i) => (
              <Carousel.Item
                style={{ display: "flex", justifyContent: "center" }}
                key={i}
              >
                <Image
                  src={f}
                  style={{ maxHeight: "150px", width: "auto" }}
                  fluid
                  alt="NO FOTO"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs="12" sm="12" lg="10">
          <Row >
            <Col className="border-bottom" md="6" sm="12" xs="12">
              <p className="mb-1">
                <b>Nombre: </b>
                {productToView.nombre} { productToView.activo?  <span className="text-success"><FaEye className="pb-1"/></span> : <span className="text-danger"><FaEyeSlash className="pb-1"/></span>}
              </p>
            </Col>
            <Col className="border-bottom" md="3" sm="6" xs="6">
              <p className="mb-1">
                <b>Stock: </b> 
                {productToView.stock} { productToView.stock>productToView.stock_minimo? <span className="text-success"><FaCircle className="pb-1"/></span> : <span className="text-danger"><FaCircle className="pb-1"/></span>}
              </p>
            </Col>
            <Col className="border-bottom" md="3" sm="6" xs="6">
              <p className="mb-1">
                <b>Precio: $</b>
                {productToView.precio}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="border-bottom" xs="12" sm="6">
              <p className="mb-1">
                <b>Categorias: </b>
                {productToView.Categoria?.map(ct=>ct.nombre+ ", ")}
              </p> 
            </Col>
            <Col className="border-bottom" xs="12" sm="6">
              <p className="mb-1">
                <b>Tipo de corte: </b>
                {productToView.Presentacions.map(pr => pr.nombre + ", ")}
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ maxHeight: "70px", overflowY: "auto" }}
              className="col-12"
            >
              <p className="mb-0">
                {`Descripción: ${productToView.descripcion}`}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row style={{ borderTop: "2px solid", marginTop: "10px" }}>
        <Col className="col-12">
          <Row>
            <Col md="6" sm="12" xs="12">
              <Form.Group>
              <Form.Label
                className={errors?.nombre?.length ? "mb-0 text-danger" : "mb-0"}
              >
                  {errors?.nombre?.length ? errors?.nombre : "Nombre"}
                </Form.Label>
                <InputGroup>
              <Form.Control
                isInvalid={errors?.nombre?.length || ""}
                type="text"
                pattern="[a-zA-Z. ]{3,30}"
                name="nombre"
                placeholder="Nombre del producto"
                aria-describedby="basic-addon2"
                value={input.nombre}
                onChange={handleChangeString}
                /> 
                  <InputGroup.Text id="basic-addon2">{ productToView.activo?  <span className="text-success"><FaEye className="pb-1"/></span> : <span className="text-danger"><FaEyeSlash className="pb-1"/></span>}</InputGroup.Text>
                  </InputGroup>
            </Form.Group>
          </Col>
          <Col md="3" sm="6" xs="6">
            <Form.Group>
                <Form.Label className="mb-0">
                  Stock 
                </Form.Label>
                <InputGroup>
              <Form.Control
                isInvalid={errors?.stock?.length || ""}
                type="number"
                pattern="^[0-9]+"
                name="stock"
                placeholder="Stock"
                aria-describedby="stock"
                value={input.stock}
                onChange={handleChangeString}
                />
                <InputGroup.Text className={ productToView.stock>productToView.stock_minimo? "text-success" : "text-danger"} id="basic-addon2"><FaCircle/></InputGroup.Text>
                  </InputGroup>
            </Form.Group>
          </Col>
          <Col md="3" sm="6" xs="6">
            <Form.Group>
              <Form.Label className="mb-0">Precio</Form.Label>
              <Form.Control
                isInvalid={errors?.precio?.length || ""}
                type="number"
                pattern="^[0-9]+"
                name="precio"
                placeholder="Precio"
                aria-describedby="precio"
                value={input.precio}
                onChange={handleChangeString}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="pt-1">
          <Col
            xs="12"
            sm="4"
            style={{
              padding: "0px",
              margin: "0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={fotos[0] || AddImageAlt}
              id="0"
              height="150"
              width="150"
              alt="Product foto 0"
              onClick={(e)=>selectFoto(e)}
              />
              
          </Col>
          <Col
            xs="12"
            sm="4"
            style={{
              padding: "0px",
              margin: "0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={fotos[1] || AddImageAlt}
              id="1"
              height="150"
              width="150"
              fluid
              alt="Product foto 1"
              onClick={(e)=>selectFoto(e)}
            />
          </Col>
          <Col
            xs="12"
            sm="4"
            style={{
              padding: "0px",
              margin: "0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={fotos[2] || AddImageAlt}
              id="2"
              height="150"
              width="150"
              fluid
              alt="Product foto 2"
              onClick={(e)=>selectFoto(e)}
            />
          </Col>
          </Row> 
          <Row hidden={ !settingFoto.show } className="mb-1">
            <Col className="col-12">
              <Form.Group>
                <Form.Label
                  className={errors["foto" + settingFoto.name]?.length ? "mb-0 text-danger" : "mb-0"} >Link Foto {settingFoto.name} {errors[`foto${settingFoto.name}`]?.length ? errors[`foto${settingFoto.name}`] : ""} </Form.Label>
              <Form.Control                
                  as="textarea"
                isInvalid={errors[`foto${settingFoto.name}`]?.length || ""}
                name={settingFoto.name}
                placeholder={settingFoto.placeholder}
                value={settingFoto.value}
                onChange={(e)=>handleFotoChange(e) }
                />
                </Form.Group>
            </Col>
          </Row>
        <Row>
          <Col className="col-12 border-top">
            <Form.Group>
              <Form.Label className="mb-0">Categorias:</Form.Label>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {storeCategories.map((c) => {
                  return (
                    <Form.Check
                      key={c.id}
                      label={c.nombre}
                      value={c.id}
                      checked={categorias.filter((ca) => ca.id === c.id).length}
                      onChange={(e) => handleCategories(e)}
                    />
                  );
                })}
              </div>
            </Form.Group>
          </Col>
          <Col hidden className="col-12 border-top">
            <Form.Group>
              <Form.Label className="mb-0">Tipos de corte:</Form.Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {storeCategories.map((c) => {
                  return (
                    <Form.Check
                      key={c.id}
                      label={c.nombre}
                      value={c.id}
                      checked={categorias.filter((ca) => ca.id === c.id).length}
                      onChange={(e) => handleTypes(e)}
                    />
                  );
                })}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg="9" sm="8" xs="12">
            <Form.Group>
              <Form.Label
                className={
                  errors?.descripcion?.length ? "mb-0 text-danger" : "mb-0"
                }
              >
                {errors?.descripcion?.length
                  ? errors?.descripcion
                  : "Descripción"}
              </Form.Label>
              <Form.Control
                isInvalid={errors?.descripcion?.length || ""}
                as="textarea"
                name="descripcion"
                pattern="[a-zA-Z ]{2,500}"
                rows="3"
                aria-describedby="descripcion"
                value={input.descripcion}
                onChange={handleChangeString}
              />
            </Form.Group>
          </Col>
          <Col lg="3" sm="4" xs="12">
              <br />
              <Col className="col-12 mb-2">
                <Row >
                  <Col className="col-8">
                    <Button
                  className="col-12"
                  disabled={input.nombre.length < 3 || Object.keys(errors)?.length }
                  onClick={input.id.length > 0 ? handleUpdate : handleCreate}
                >
                  {input.id.length > 0 ? "Aplicar" : "Crear"}
                </Button>
                  </Col>
                  <Col className="col-4" style={{paddingRight:"0px"}}>
                    <Button disabled={ productToView.activo } variant="success" className="col-12" onClick={()=>handleToggleON(product)}>                     
                      <FaEye className="pb-1"/>
                  </Button>
                  </Col>
                </Row>
                
              </Col>
              <Col className="col-12">  
                <Row>
                  <Col className="col-8" >
                    <Button
                           className="col-12"            
                      onClick={input.id.length > 0 ? () => copyFunction(product.id) : ()=>discardChanges() }
                    >
                    {input.id.length > 0 ? "Copiar" : "Cancelar"}
                  </Button>
                  </Col>
                  <Col className="col-4" style={{paddingRight:"0px"}}>
                    <Button disabled={!productToView.activo} variant="danger" className="col-12" onClick={()=>handleToggleOFF(product)}>  
                  <FaEyeSlash className="pb-1"/>
                  </Button>
                  </Col>
                     
                
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
        
      </Row>
    );
  }
}

export default EditDeleteProductForm;
