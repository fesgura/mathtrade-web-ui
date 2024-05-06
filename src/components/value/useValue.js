import { useMemo, useContext, useState, useEffect } from "react";
import { ItemContext } from "@/context/item";
import { GameContext } from "@/context/game";
import { TagContext } from "@/context/tag";
import { valueToColor } from "./utils";

const useValue = (type, itemIds, currentValue) => {
  /* ITEM CONTEXT **************************/
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT **************************/

  /* GAME CONTEXT **************************/
  const { game } = useContext(GameContext);
  /* end GAME CONTEXT **************************/

  /* TAG CONTEXT **************************/
  const { tag } = useContext(TagContext);
  /* end TAG CONTEXT **************************/

  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState(0);
  const [itemListId, setItemListId] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // if (!isLoaded) {
    //setIsLoaded(true);
    if (type === "item") {
      const { id, value: valueItem } = item;
      setValue(valueItem || 0);
      setItemListId([id]);
    }
    if (type === "game") {
      const { items, value: valueGame } = game;

      const { itemListId_game } = items.reduce(
        (obj, itm) => {
          const { id } = itm;
          obj.itemListId_game.push(id);
          return obj;
        },
        { itemListId_game: [] }
      );

      setValue(valueGame);
      setItemListId(itemListId_game);
    }
    if (type === "tag") {
      setValue(parseFloat(tag.value || 0));

      setItemListId(tag.items || []);
    }
    if (type === "none") {
      setValue(parseFloat(currentValue || 0));
      setItemListId(itemIds || []);
    }

    //}
  }, [type, item, game, tag, itemIds, currentValue]);

  const backgroundColor = useMemo(() => {
    return valueToColor(value);
  }, [value]);

  return { isOpen, setIsOpen, backgroundColor, value, setValue, itemListId };
};

export default useValue;
