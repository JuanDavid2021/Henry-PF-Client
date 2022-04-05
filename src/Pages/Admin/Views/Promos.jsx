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
import { getAllPromos } from "../../../actions";
import PromoForm from "../../../components/PromoForm";
function Promos() {
  const storePromos = useSelector((state) => state.promos);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  useEffect(() => {
    if (!storePromos.length) dispatch(getAllPromos(currentUser));
  }, [storePromos, currentUser, dispatch]);

  return (
    <>
      {storePromos?.map((sP) => {
        return <PromoForm edit={true} key={sP.id} days={days} promoToView={sP} />;
      })}
    </>
  );
}

export default Promos;
