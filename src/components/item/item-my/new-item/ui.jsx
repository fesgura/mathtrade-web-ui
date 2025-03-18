import { useContext } from "react";
import { PageContext } from "@/context/page";
import AddElementToMyItem from "../addElement";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N from "@/i18n";

const NewItemUI = ({ setItemsPreviousMTvisible }) => {
  /* PAGE CONTEXT **********************************************/
  const { myCollectionList, mathtrade_history } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  return myCollectionList.length ? (
    <article className="relative h-full bg-item-200 rounded-md shadow-[0_1px_8px_rgba(0,0,0,0.3)] mb-6 p-3 pt-2 border border-item-300 flex items-end">
      <div className="grow">
        <AddElementToMyItem startOpen />
      </div>
      {mathtrade_history?.length ? (
        <div className="flex items-center">
          <div className="px-4">
            <div className="w-[2px] h-12 bg-gray-400 rotate-12"></div>
          </div>
          <div className="">
            <button
              className="text-[12px] text-balance w-40 h-12 grid place-items-center text-center rounded-md p-1 bg-primary/10 border border-primary/30 text-sky-900  transition-colors hover:bg-primary hover:text-white relative"
              onClick={() => {
                setItemsPreviousMTvisible(true);
              }}
            >
              <I18N id="myOfferPreviousMathtrades.page.link" />
              <span className="absolute -top-2 -right-2 block text-[9px] font-bold bg-red-600 text-white px-2 uppercase rounded-sm">
                <I18N id="new" />
              </span>
            </button>
          </div>
        </div>
      ) : null}
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
