import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa";
import "./Wpp.css";
import { motion } from "framer-motion";

const Wpp = () => {
  return (
    <>
      <motion.a
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="btn-wpp"
        target="blank"
        href="https://api.whatsapp.com/send?phone=1157057732"
      >
        
        <FaWhatsapp className="icon-wpp" />

        
      </motion.a>
    </>
  );
};

export default Wpp;
