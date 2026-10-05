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

  // Already-offered elements can only go into a combo, not a new offer, and
  // ones still missing info can't be offered at all.
  const hasNotOffered = myCollectionList.some(
    (el: any) => !el.mathItemId && el.complete
  );

  return hasNotOffered ? (
    <article
      data-tour="myoffer.new"
      className="relative bg-white rounded-lg shadow-md mb-6 p-3 pt-2 border border-stroke min-w-0 max-w-full w-full overflow-x-hidden"
    >
      <AddElementToMyItem startOpen />
    </article>
  ) : (
    <div data-tour="myoffer.new" className="text-center text-xl py-6">
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
