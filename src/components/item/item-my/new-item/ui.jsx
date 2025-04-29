import { useContext } from "react";
import { PageContext } from "@/context/page";
import AddElementToMyItem from "../addElement";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N from "@/i18n";

const NewItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { myCollectionList } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  return myCollectionList.length ? (
    <article className="relative h-full bg-item-200 rounded-md shadow-[0_1px_8px_rgba(0,0,0,0.3)] mb-6 p-3 pt-2 border border-item-300">
      <AddElementToMyItem startOpen />
    </article>
  ) : (
    <div className="text-center text-xl py-6">
      <I18N id="addItemToItem.noElements" />
      <Link
        href={PRIVATE_ROUTES.MY_COLLECTION.path}
        className="text-primary font-bold underline hover:text-sky-700"
      >
        <I18N id="addElementToItem.collection" />
      </Link>
      .
    </div>
  );
};
export default NewItemUI;
