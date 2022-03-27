import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteCartItem, setCartItem, getPedidos, apiGetAllUsers } from '../actions';
import { Modal, Button } from 'react-bootstrap';

function Pedidos() {
    const pedidos = useSelector(state => state.pedidos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPedidos());
    }, [dispatch])

    return (
        <div className="table-responsive ">
            <table className="table text-nowrap ">
                <thead  >
                    <tr className="text-sm ">
                        <th className="border-gray-300 border-top py-3">Fecha Pedido</th>
                        <th className="border-gray-300 border-top py-3">Fecha Despacho</th>
                        <th className="border-gray-300 border-top py-3">Usuario</th>
                        <th className="border-gray-300 border-top py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.length > 0 ?
                            /* Mapeo de las filas de la tabla con los items del carrito */
                            pedidos.map((p) => {
                                return (
                                    <tr className="lead text-center fs-3 fw-normal mt-3">
                                        <td>
                                            {p.f_pedido}
                                        </td>
                                        <td>
                                            {p.f_requerida}
                                        </td>
                                        <td>
                                            {p.UsuarioCorreo}
                                        </td>
                                        <td>
                                            <button>Despachar</button>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                            : <tr className="lead text-center fs-3 fw-normal mt-3">
                                <td>
                                    No tiene productos en el carrito
                                </td>
                            </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th className="py-3 border-0" colSpan="5"> <span className="h4 text-gray-700 mb-0">Total</span></th>
                        <th className="py-3 border-0 text-end" colSpan="2"> <span className="h4 text-gray-700 mb-0">$ {suma}</span></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Pedidos;