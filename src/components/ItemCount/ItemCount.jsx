import { useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Center,
  Button,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const ItemCount = ({ onAdd, id }) => {
  const [quanti, setQuanti] = useState(1);

    const addQty = () => {
    setQuanti(quanti + 1);
    }
    
  const removeQty = () => {
    setQuanti(quanti - 1);
  };

  return (
    <div className="item_count_main">
      <ButtonGroup size="sm" isAttached variant="outline" color={"red"}>
        {quanti <= 1 ? (
          <Tooltip label="minimum stock reached" placement="bottom">
            <IconButton icon={<MinusIcon />} isDisabled />
          </Tooltip>
        ) : (
          <IconButton icon={<MinusIcon />} onClick={removeQty} />
        )}
        <Center>
          <Button
            onClick={() => onAdd(quanti, id)}
            variant="solid"
            colorScheme="blue"
          >
            Agregar al Carrito: {quanti}
          </Button>
        </Center>

          <IconButton icon={<AddIcon />} onClick={addQty} />

      </ButtonGroup>
    </div>
  );
};

export default ItemCount;