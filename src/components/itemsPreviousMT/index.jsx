import { useContext } from "react";
import { PageContext } from "@/context/page";

const ItemsPreviousMT = ({
  itemsPreviousMTvisible,
  setItemsPreviousMTvisible,
}) => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade_history } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  return <div className="">ItemsPreviousMT</div>;
};

export default ItemsPreviousMT;
