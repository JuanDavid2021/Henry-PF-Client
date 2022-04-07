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
import swal from "sweetalert";
import {
  getAllPromos,
  getProducts,
  putPromo,
  addPromo,
} from "../../../actions";
import PromoForm from "../../../components/PromoForm";
function Promos() {
  const storePromos = useSelector((state) => state.promos);
  const arrProductos = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const [editingId, setEditingId] = useState("");
  const newPromo = {
    id: "",
    promocion: "",
    porcentaje: "5",
    f_inicio: new Date(Date.now()).toISOString(),
    f_final: new Date(Date.now()).toISOString(),
    status: true,
    dias_semana: [0, 1, 2, 3, 4, 5, 6],
    productos: [],
  };
  useEffect(() => {
    if (!storePromos.length) dispatch(getAllPromos(currentUser));
    if (!arrProductos.length) dispatch(getProducts());
  }, [storePromos, currentUser, dispatch, arrProductos]);
  const updatePromo = async (promo) => {    
    if (!promo.dias_semana.length) {
      promo.dias_semana=[0,1,2,3,4,5,6]
    }
    let toPut = {
      data: promo,
      currentUser: currentUser,
    };    
    const updated = await dispatch(putPromo(toPut));    
    if (updated.status === 200) {
      swal(
        updated.data.status
          ? "Correcto! Promocion Activada!"
          : "Correcto! Promoción Desactivada!",
        {
          icon: updated.data.status ? "success" : "info",
          timer: 1000,
          buttons: false,
        }
      );
      dispatch(getProducts());
    } else {
      swal("Existen errores!", {
        icon: "warning",
        timer: 2000,
        buttons: false,
      });
    }
  };
  const selectPromo = (id) => {
    setEditingId(id);
  };
  
  const createPromo = async (promo) => {
    delete promo.id
    if (!promo.dias_semana.length) {
      promo.dias_semana = [0,1,2,3,4,5,6]
    }
    let toAdd = {
      data: promo,
      currentUser: currentUser,
    };    
    const created = await dispatch(addPromo(toAdd));
    if (created.status === 200) {
      swal(
        created.data.status
          ? "Creada! Promocion Activada!"
          : "Creada! Promoción Desactivada!",
        {
          icon: created.data.status ? "success" : "info",
          timer: 1000,
          buttons: false,
        }
      );
      dispatch(getProducts());
    } else {
      swal("Existen errores!", {
        icon: "warning",
        timer: 2000,
        buttons: false,
      });
    }
  };
  return (
    <>
      <PromoForm
        creationForm={true}
        days={days}
        promoToView={newPromo}
        createPromo={createPromo}
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
            updatePromo={updatePromo}
          />
        );
      })}
    </>
  );
}

export default Promos;
