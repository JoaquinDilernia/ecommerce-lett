import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Productos from "../Productos/Productos";


import { motion } from "framer-motion";

import { Link } from "react-router-dom";




const Home = () => {
 
  const params = useParams();

  return (
    <>
      <Header id={params.idcliente} />
      <NavBar id={params.idcliente} />
      <Productos id={params.idcliente} />
     
    </>
  );
};

export default Home;
