import { useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContextProvider } from "@/context/item";
import NewItemUI from "./ui";

const newItemData = {
  id: null,
  title: "",
  membership: null,
  copies: 1,
  elements: [],
  value: null,
  group: null,
  tags: [],
  reported: false,
  comments: 0,
  ban_id: null,
  owner: true,
};

const NewItem = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/
  return canI.offer ? (
    <ItemContextProvider itemRaw={{ ...newItemData }}>
      <NewItemUI />
    </ItemContextProvider>
  ) : null;
};
export default NewItem;
