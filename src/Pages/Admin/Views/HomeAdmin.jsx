import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPedidos } from '../../../actions';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables
} from 'chart.js';


ChartJS.register(...registerables,  
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function HomeAdmin() {
  
  const pedidos = useSelector(state => state.pedidos)
  const currenuser = useSelector(store => store.user)
  
  const pedidos1 = pedidos?.filter(p => p.status === "Dispatched")
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPedidos(currenuser));
  }, [dispatch,currenuser])

  let items = []

  pedidos1?.forEach(item => {
    for (let i = 0; i < item.ItemsPedidos.length; i++) {
      items.push(item.ItemsPedidos[i])
    }
  }); 

  let arrSuma = []

  items?.forEach(el => {
    let index = arrSuma?.findIndex(e => e.nombre === el.Producto.nombre)
    
    if (index !== -1) {
      arrSuma[index] = {
        ...arrSuma[index],
        monto: arrSuma[index].monto + Number(el.cantidad * el.precioTotal)/10000,
        vecesComprado: arrSuma[index].vecesComprado + 1,
        kilos: Number(arrSuma[index].kilos) + Number(el.peso * el.cantidad)
      }
    }else{
      arrSuma.push({
        nombre: el.Producto.nombre,
        monto: Number(el.cantidad * el.precioTotal)/10000,
        vecesComprado: 1, 
        kilos: Number(el.peso * el.cantidad)
      })
    }

  })

  let nombres = arrSuma?.map(e => e.nombre)

  let montos = arrSuma?.map(e => e.monto)
  let vecesComprado = arrSuma?.map(e => e.vecesComprado)
  let kilosComprados = arrSuma?.map(e => e.kilos)

  const dataVentas = {
    labels: nombres,
    datasets:[{
      label:"Veces comprado",
      backgroundColor: "#198754ba",
      borderColor:"#0d6efdba",
      borderWidth: 1,
      hoverBackgroundColor: "#198754",
      hoverBorderColor: "#0d6efd",
      data: vecesComprado,
    }]
  }

  const optionsVentas = {
    responsive: true,
    maintainAspectRatio: true,
    scales:{
      y: {
        ticks: {
          color: "#000000",
          font: {
            size: 14,
          }
        }
      },
      x: {
        ticks: {
          color: "#000000",
          font: {
            size: 14,
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  }


  const dataMontoKilos = {
    labels: nombres,
    datasets:[
      {
        label:"Monto(x10000)",
        backgroundColor: "#198754ba",
        borderColor:"#198754ba",
        borderWidth: 1,
        hoverBackgroundColor: "#198754",
        hoverBorderColor: "#198754",
        data: montos
      },
      {
        label:"Kilos",
        backgroundColor: "#0d6efdba",
        borderColor:"#0d6efdba",
        borderWidth: 1,
        hoverBackgroundColor: "#0d6efd",
        hoverBorderColor: "#0d6efd",
        data: kilosComprados
      }
    ]
  }

  const optionsMontoKilos = {
    responsive: true,
    maintainAspectRatio: true,
    scales:{
      y: {
        ticks: {
          color: "#000000",
          font: {
            size: 14
          }
        }
      },
      x: {
        ticks: {
          color: "#000000",
          font: {
            size: 14,
            rotate: 0
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
    }
  }

return (
  <div className="container" >
    <h5 className="my-2">Datos referidos a ventas concluidas</h5>
    <Row className="my-5" style={{ display: "flex" ,justifyContent: "center" }}>
      <div style={{ width:"60em", overflow:"auto", overflowX: "visible" }}>
        <Col sm={12} className="col py-3" style={{ width:"60em" }}>
          <Bar options={optionsVentas} data={dataVentas} />
        </Col>
      </div>
    </Row>
    <Row className="my-5" style={{ display: "flex" ,justifyContent: "center" }}>
      <div  style={{ width:"60em", overflow:"auto" }}>
        <Col sm={12} className="col" style={{ width:"60em" }}>
          <Bar options={optionsMontoKilos} data={dataMontoKilos} />
        </Col>
      </div>
    </Row>
  </div>
  )
}

export default HomeAdmin
