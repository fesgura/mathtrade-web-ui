import { useContext } from "react";
import { PageContext } from "@/context/page";
import AddElementToMyItem from "../addElement";

const NewItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { myCollectionList } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  return myCollectionList.length ? (
    <article className="relative h-full bg-item-200 rounded-md shadow-[0_1px_8px_rgba(0,0,0,0.3)] mb-6 p-3 pt-2 border border-item-300">
      <AddElementToMyItem startOpen />
    </article>
  ) : null;
};
export default NewItemUI;
