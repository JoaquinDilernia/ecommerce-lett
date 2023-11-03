import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import useModal from "../hooks/useModal";
import Cart from "../Cart/Cart";
import {motion } from "framer-motion";

import { Button } from "@chakra-ui/react";

const Header = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const url = "https://apimocha.com/lettproduct/clientes";
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setClientes(json));
  }, []);

  const vendedor = clientes
    .filter((cliente) => cliente.id === parseInt(props.id))
    .map((cliente) => cliente.vendedor);
  const usuario = clientes
    .filter((cliente) => cliente.id === parseInt(props.id))
    .map((cliente) => cliente.usuarios);

  return (
    <motion.div className="header"  
    initial={{y: -50}}
    animate={{y:0}}
    transition={{duration:0.5}}
    exit={{y:-50}}
    >
      <div className="contenedor-usuario">
        <p>{usuario}</p>

        {props.id === "0" ? (
          <Link className="cerrar-sesion" to="/">
            Iniciar Sesión
          </Link>
        ) : (
          <Link className="cerrar-sesion" to="/">
            Cerrar Sesión
          </Link>
        )}
      </div>

      <div className="conteendor-carrito">
        <Button onClick={openModal}>
          <CartWidget />
        </Button>
        <Cart isOpen={isOpenModal} closeModal={closeModal} />
      </div>
    </motion.div>
  );
};

export default Header;
