import React from "react";
import Brief from "../Brief/Brief";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/ShoppingCartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA3hK_dngP0EX1goxTYupHZCDWYHFHKKAI",
  authDomain: "pedidos-lett-2.firebaseapp.com",
  projectId: "pedidos-lett-2",
  storageBucket: "pedidos-lett-2.appspot.com",
  messagingSenderId: "459720672669",
  appId: "1:459720672669:web:9cdbd5329a4cc1c7219b74",
};

// Initialize Firebase
const db = getFirestore(initializeApp(firebaseConfig));

import logo from "../../assets/logo.png";

import "./Checkout.css";

const Checkout = () => {
  const url = "https://apimocha.com/lettproduct/clientes";
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setClientes(json));
  }, []);

  // buscar la ultima venta en la base de datos de firebase y generar el id de la venta

  const [idVenta, setIdVenta] = useState(0);

  useEffect(() => {
    const getVentas = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      querySnapshot.forEach((doc) => {
        setIdVenta(doc.data().idventa);
      });
    };
    getVentas();
  }, []);

  // enviar los datos del formulario a la base de datos de firebase

  const handleCheckout = (e) => {
    e.preventDefault();
    const idventa = idVenta + 1;
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const telefono = e.target.telefono.value;
    const observacion = e.target.observacion.value;
    const estado = "Pendiente";
    const idcliente = params.idcliente;
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();
    const fechaActual = `${dia}/${mes}/${año}`;

    const order = {
      nombre,
      cart,
      totalAmount,
      apellido,
      telefono,
      observacion,
      idcliente,
      fechaActual,
      estado,
      idventa,
    };

    console.log(order);
    addDoc(collection(db, "orders"), order)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    e.target.reset();
    console.log(totalAmount);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Orden enviada</p>,
      text: " Gracias por tu compra. Un vendedor se comunicara para terminar la orden",

      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#000",
    });
  };

  const params = useParams();
  const { cart, totalAmount } = useContext(CartContext);

  return (
    <>
      <div className="contenedor-checkout">
        <div className="contenedor-logo">
          <Link to={`/Home/${params.idcliente}/1`}>
            {" "}
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="contenedor-checkout-2">
          <div className="contenedor-brief">
            <h1>Resumen de compra</h1>
            <Brief />
          </div>
          <div className="contenedor-form">
            <form onSubmit={handleCheckout}>
              <h1>Datos del cliente</h1>
              <div className="contenedor-inputs">
                <input type="text" name="nombre" placeholder="Nombre" required />
                <input type="text" name="apellido" placeholder="Apellido"  required/>
                <input type="text" name="telefono" placeholder="Telefono" required />
                <input
                  type="text"
                  name="observacion"
                  placeholder="Observacion"
                />
              </div>
              <div className="contenedor-btn">
                <button type="submit">Finalizar compra</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
