import { ItemContextProvider } from "@/context/item";
import NewItemUI from "./ui";

const newItemData = {
  id: null,
  title: "",
  membership: null,
  copies: 1,
  elements: [{}],
  value: null,
  group: null,
  tags: [],
  reported: false,
  comments: 0,
  ban_id: null,
  owner: true,
};

const NewItemProvider = () => {
  return (
    <ItemContextProvider itemRaw={{ ...newItemData }}>
      <NewItemUI />
    </ItemContextProvider>
  );
};
export default NewItemProvider;
