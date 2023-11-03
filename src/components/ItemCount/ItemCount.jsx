import { useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Center,
  Button,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import "./ItemCount.css";

const ItemCount = ({ onAdd, id, precio }) => {
  const [quanti, setQuanti] = useState(0);

  const addQty = () => {
    setQuanti(quanti + 1);
  };

  const removeQty = () => {
    setQuanti(quanti - 1);
  };

  return (
    <div className="item_count_main">
      <ButtonGroup size="sm" isAttached variant="outline" color={"red"}>
        {quanti <= 0? (
          <Tooltip label="minimum stock reached" placement="bottom">
            <IconButton icon={<MinusIcon />} isDisabled />
          </Tooltip>
        ) : (
          <IconButton icon={<MinusIcon />} onClick={removeQty} />
        )}
        <Center>

          {quanti === 0 ? (
       <p> agregar al carrito</p>
            ) : (
              <Button className="btn_agregar"
                
                variant="outline"
                size="sm"
                onClick={() => onAdd(id, quanti)}
              >
                agregar al carrito {quanti}
              </Button>
            )  
          }




       
        </Center>

        <IconButton icon={<AddIcon />} onClick={addQty} />
      </ButtonGroup>
    </div>
  );
};

export default ItemCount;
