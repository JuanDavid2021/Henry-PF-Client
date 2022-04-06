import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Carousel,
  InputGroup,
} from "react-bootstrap";
import { getAllPromos, getProducts } from "../../../actions";
import PromoForm from "../../../components/PromoForm";
function Promos() {
  const storePromos = useSelector((state) => state.promos);
  const arrProductos = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const [editingId, setEditingId] = useState("");
  useEffect(() => {
    if (!storePromos.length) dispatch(getAllPromos(currentUser));
    if (!arrProductos.length) dispatch(getProducts());
  }, [storePromos, currentUser, dispatch,arrProductos]);
  const updatePromo = (promo) => {
    console.log(promo);
  };
  const selectPromo = (id) => {
    setEditingId(id);
  };
  const newPromo = {
    id: "",
    promocion: "",
    porcentaje: 5,
    f_inicio: new Date(Date.now()).toISOString(),
    f_final: new Date(Date.now()).toISOString(),
    status: true,
    dias_semana: [],
    productos:[]
  };
  const createPromo = (promo) => {
    console.log(promo)
  }
  return (
    <>
      <PromoForm
        creationForm={true}
        days={days}        
        promoToView={newPromo}
        createPromo={ createPromo }
      />
      ;
      {storePromos?.map((sP) => {
        return (
          <PromoForm            
            key={sP.id}
            editingId={editingId}
            days={days}
            selectPromo={selectPromo}
            promoToView={sP}
            updatePromo={ updatePromo }
            
          />
        );
      })}
    </>
  );
}

export default Promos;
