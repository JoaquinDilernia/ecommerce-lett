import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import {
  Button,
} from "@chakra-ui/react";
import Brief from "./Brief";

const Cart = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <>
        <div className="cart_">
          <h2>El carrito esta vacio..</h2>
          <Link to={"/catalogue"}>
            <Button colorScheme="red">Ir al catálogo</Button>
          </Link>
        </div>
      </>
    );
  }
  return (
    <div className="main_cart">
      {console.log(cart)}
     <Brief/>
     <Checkout/>
    </div>
  );
};

export default Cart;