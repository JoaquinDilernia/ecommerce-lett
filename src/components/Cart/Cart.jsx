import React from "react";
import Brief from "../Brief/Brief";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./Cart.css";

const Cart = ({ isOpen, closeModal }) => {
  const params = useParams();

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={`modal ${isOpen && "modal-open"}`} onClick={closeModal}>
      <div className="modal-full" onClick={handleModalClick}>
        <div className="close-modal">
          <button className="btn-cerrar" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="link-vercarrito1">
          <Link to={`/Checkout/${params.idcliente} `}> Finalizar compra</Link>
        </div>
        <Brief />
      </div>
    </div>
  );
};

export default Cart;
