import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteCartItem, setCartItem, getPedidos, apiGetAllUsers } from '../actions';
import { Modal, Button } from 'react-bootstrap';

function Pedidos() {
    const pedidos = useSelector(state => state.pedidos);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currenuser = useSelector(store => store.user)

    useEffect(() => {
        dispatch(getPedidos(currenuser));
    }, [dispatch,currenuser])

    const handleDetailPedido = (id) => {
        navigate(`/pedido/${id}`)
      }

    return (
        <div className='container'>
            <div className="table-responsive ">
                <table className="table text-nowrap ">
                    <thead  >
                        <tr className="text-sm ">
                            <th className="border-gray-300 border-top py-3">Fecha Pedido</th>
                            <th className="border-gray-300 border-top py-3">Fecha Despacho</th>
                            <th className="border-gray-300 border-top py-3">Usuario</th>
                            <th className="border-gray-300 border-top py-3"></th>
                            <th className="border-gray-300 border-top py-3"></th>
                            <th className="border-gray-300 border-top py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedidos.length > 0 ?
                                /* Mapeo de las filas de la tabla con los items del carrito */
                                pedidos.map((p) => {
                                    return (
                                        <tr className="lead text-center fs-4 fw-normal mt-3">
                                            <td>
                                                {p.f_pedido.substring(0, 10)}
                                            </td>
                                            <td>
                                                {p.f_requerida.substring(0, 10)}
                                            </td>
                                            <td>
                                                {p.UsuarioCorreo}
                                            </td>
                                            <td>
                                                <button className="btn btn-info text-light text-decoration-none fs-6 mx-2" onClick={() => handleDetailPedido(p.id)}>Detalles</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )
                                : <tr className="lead text-center fs-4 fw-normal mt-3">
                                    <td>
                                        No hay pedidos
                                    </td>
                                </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="py-3 border-0" colSpan="5"> <span className="h5 text-gray-700 mb-0">Total</span></th>
                            <th className="py-3 border-0 text-end" colSpan="2"> <span className="h5 text-gray-700 mb-0">{pedidos.length}</span></th>
                        </tr>
                    </tfoot>
                </table>
                <div className="col-md-6 text-md-start py-1">
                  <Link to={"/shop"} className="btn btn-dark my-1">
                    <RiArrowLeftSLine /> Tienda
                  </Link>
                </div>
            </div>
        </div>
    )
}

export default Pedidos;