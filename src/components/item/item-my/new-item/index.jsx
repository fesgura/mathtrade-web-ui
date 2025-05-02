import { useContext, lazy } from "react";
import { PageContext } from "@/context/page";
import Dynamic from "@/components/dynamic";

const NewItemProvider = lazy(() => import("./itemProvider"));

const NewItem = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/
  return canI.offer ? (
    <Dynamic h={130}>
      <NewItemProvider />
    </Dynamic>
  ) : null;
};
export default NewItem;
