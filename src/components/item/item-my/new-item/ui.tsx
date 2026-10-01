"use client";
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
    <article className="relative bg-white rounded-lg shadow-md mb-6 p-3 pt-2 border border-stroke">
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
