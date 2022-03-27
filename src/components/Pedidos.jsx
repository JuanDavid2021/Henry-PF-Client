import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteCartItem, setCartItem, getPedidos,apiGetAllUsers } from '../actions';
import { Modal, Button } from 'react-bootstrap';

function Pedidos() {
    const pedidos = useSelector(state => state.pedidos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPedidos());
    }, [dispatch])

    return (
        <p>Hola</p>
    )
}

export default Pedidos;