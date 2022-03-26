import React, { useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiMoneyDollarCircleLine, RiEyeLine, RiMapPin2Line, RiTruckLine, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { postPedido, pagarPedido } from '../actions';
import { Resume } from './CartDetails';

function CartDetailCheckoutPaymentMethod() {

  const carrito = useSelector(state => state.cart)
  let idPedido = useSelector(state => state.idPago)
  const pedidoBack = useSelector(state => state.pedido)
  const despacho = useSelector(state => state.despacho)
  const user = useSelector((state=> state.user))
  
  const dispatch = useDispatch()

  const carritoMod = carrito.forEach(el => {
    el.peso = Number(el.peso)
    delete el.idItemFront;
  })

  console.log("eliminado", carritoMod);

  // direccion_despacho: "Union Street 266, St. Louis",
  // status: "Creada",
  // f_pedido: "02/11/2022",
  // f_entrega: "02/11/2022",
  // UsuarioCorreo: "minnie.lomeli@keyphase.com",
  // ItemsPedidos: carrito
  
  const pedidos = {

//     direccion_despacho: despacho.direccion + ", " + despacho.localidad,
//     status: "Creada",
//     f_pedido: despacho.f_pedido,
//     f_entrega: "02/11/2022",
//     UsuarioCorreo: despacho.email,

    f_pedido: despacho.f_pedido,
    f_requerida: despacho.f_requerida,
    UsuarioCorreo: user.email,
    status: "Created",
    enviado_a: `${despacho.nombre} ${despacho.apellido}`,
    direccion_despacho: `${despacho.direccion_despacho}-${despacho.localidad}-${despacho.zip}`,
    comentario: despacho.comentario,
    ItemsPedidos: carrito
    
  }

  console.log(pedidos)
  // const [datos, setDatos] = useState("")


  useEffect(() => {
    console.log(carrito)
    dispatch(postPedido(pedidos))

    // axios
    //   .get("http://localhost:3001/mercadopago")
    //   .then((data) => {
    //     setDatos(data.data)
    //     console.info('Contenido de data:', data)
    //   })
    //   .catch(err => console.error(err))

  }, [])


  const handlePago = (e) => {
    dispatch(pagarPedido({
      id: pedidoBack.id,
      ItemsPedidos: pedidoBack.ItemsPedidos
    }))
  }


  //idPedido

  return (
    <section className="py-5">
      <div className="container py-4">
        <div className="row gy-5">
          <div className="col-lg-9">
            {/* header */}
            <ul className="nav nav-pills flex-column flex-md-row nav-fill border-bottom border-primary">
              <li className="nav-item">
                <Link to={"/cartDetailsCheckout"} className="nav-link" aria-current="page">
                  <RiMapPin2Line />
                  <p className="mb-0 pt-1">Dirección</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cartDetailsCheckoutDelivery"} className="nav-link" aria-current="page">
                  <RiTruckLine />
                  <p className="mb-0 pt-1">Método de envío</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cartDetailsCheckoutReview"} className="nav-link" aria-current="page">
                  <RiEyeLine />
                  <p className="mb-0 pt-1">Revisión del pedido</p>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                  <RiMoneyDollarCircleLine />
                  <p className="mb-0 pt-1">Método de pago</p>
                </a>
              </li>
            </ul>
            {/* forma de pago */}
            <form className="py-4">
              <div className="row mb-4 gy-4">
                <div className="col-md-6">
                  <div className="bg-light p-4 p-xl-5">
                    <div className="form-check d-flex align-items-center">
                      <input className="form-check-input flex-shrink-0" id="payment1" type="radio" name="payment" onClick={handlePago}/>
                      <label className="cursor-pointer d-block ms-3" htmlFor="payment1"><span className="h4 d-block mb-1 text-uppercase">MercadoPago</span><span className="text-sm d-block mb-0 text-muted">Una vez que hagas clic en continuar, será redireccionado a MercadoPago</span></label>
                    </div>
                  </div>
                </div>
              </div>
              {/* navegacion */}
              <div className="align-items-center bg-light px-4 py-3 text-center mb-5">
                <div className="row">
                  <div className="col-md-6 text-md-start py-1">

                    <Link to={"/cartDetailsCheckoutReview"} className="btn btn-dark my-1">
                      <RiArrowLeftSLine /> Revisión del pedido
                    </Link>
                  </div>
                  <div className="col-md-6 text-md-end py-1" id="form1">
                    <a className="btn btn-primary my-1" href={idPedido.sandbox_init_point} target="_blank" type='button' disabled >Continuar <RiArrowRightSLine /></a>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Resumen */}
          <Resume />
        </div>
      </div>
    </section>
  )
}

export default CartDetailCheckoutPaymentMethod;
