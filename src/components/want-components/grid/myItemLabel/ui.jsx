import Group from "./group";
import Item from "./item";

const MyItemLabelUI = ({ myItem }) => {
  return myItem?.isGroup ? <Group myItem={myItem} /> : <Item myItem={myItem} />;
};

export default MyItemLabelUI;
