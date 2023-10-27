import { Flex } from "@chakra-ui/react"
import { BsCartCheck } from 'react-icons/bs'
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";

const CartWidget = ({}) => {
  const { cartQty } = useContext(CartContext);
  return (
    <>  
        <Flex>
            <BsCartCheck size="1.5em" color="black" />
            <p>{cartQty}</p>
        </Flex>     

    </>
  )
}

export default CartWidget