import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Productos from "../Productos/Productos";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";



const Home = () => {
  let precio = 0;
  const params = useParams();
  const url = "https://apimocha.com/lettproduct/products";
  const url_cliente = "https://apimocha.com/lettproduct/clientes";
  const [cliente, setCliente] = useState([]);
  const [products, setProducts] = useState([]);




  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(json));
  }
  , []);

  useEffect(() => {
    fetch(url_cliente)
      .then((response) => response.json())
      .then((json) => setCliente(json));
  }, []);
  const tipocliente = () => {
    let tipo = 0;
    cliente
      .filter((cliente) => cliente.id === parseInt(params.idcliente))
      .map((cliente) => (tipo = cliente.tipo));
    return tipo;
  };


  const guardarprecio = (comercio, walmart, grandes, morph, prestigio) => {
    if (tipocliente() === 1) {
      precio = comercio;
    }
    if (tipocliente() === 2) {
      precio = walmart;
    }
    if (tipocliente() === 3) {
      precio = grandes;
    }
    if (tipocliente() === 4) {
      precio = morph;
    }
    if (tipocliente() === 5) {
      precio = prestigio;
    }
    if (tipocliente() === 0) {
      precio = 0;
    }
    return precio;
  };


  return (
    <>
      <Header id={params.idcliente} />
      <NavBar id={params.idcliente} />
      <Productos id={params.idcliente} />
      <div className="home-contenedor">

      <div className="home-contenedor__productos">

      {products.map((product) => (
      <motion.div className="home-contenedor__productos__item" key={product.id}
      initial={{y: 50}}
      whileInView={{y:0}}
      transition={{duration:0.5}}
      >
        <div className="home-contenedor__productos__item__header"></div>

        <Link to={`/Productos/${params.idcliente}/${product.id}`}>
          <div className="home-contenedor__productos__item__img">
            <img src={product.image} alt={product.name} />
          </div>
          <h3>{product.nombre}</h3>
          {guardarprecio(
            product.comercio, 
            product.walmart,
            product.grandes,
            product.morph,
            product.prestigio
          )}
          {precio === 0 ? (
            <p className="precio"></p>
          ) : (
            <p className="precio">${precio}</p>
          )}

          <div className="home-contenedor__productos__item__footer">
            <p> UxB: {product.uxb}</p>
            <p> UxV: {product.uxv}</p>
          </div>
         
        </Link>
        {params.idcliente === "0" ? (
          <p></p>
        ) : (
          <ItemCount onAdd={onAdd} id={product.id} precio={precio} />
        )}
      </motion.div>
    ))}
    </div>
    </div>

      
      
    </>
  );
};

export default Home;
