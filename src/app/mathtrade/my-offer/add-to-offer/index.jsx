import { Select } from "@/components/form";
import I18N from "@/i18n";
import Thumbnail from "@/components/thumbnail";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import clsx from "clsx";
import useAddToOffer from "./useAddToOffer";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import HelpContext from "@/components/help-context";

const AddToOffer = () => {
  const { options, loading, onPublish, setItemId, item_id } = useAddToOffer();

  return options.length ? (
    <div className="mb-4 pb-4 border-b border-gray-300">
      <div className="md:flex items-center mb-2 gap-5">
        <label htmlFor="addItem" className="block md:mb-0 mb-2">
          <I18N id="btn.AddToMathTrade" />{" "}
          <Link
            href={PRIVATE_ROUTES.MY_COLLECTION.path}
            className="font-bold text-primary underline hover:text-primary/70"
          >
            <I18N id="title.MyCollection" />
          </Link>
          :
        </label>
        <HelpContext id="whyLoadFromMyCollection" />
      </div>
      <div className="sm:flex gap-1">
        <div className="grow">
          <Select
            data={{ addItem: item_id }}
            name="addItem"
            options={options}
            customRenderOption={(option) => {
              const { text, thumbnail } = option;
              return (
                <div className="flex items-center gap-2 py-1">
                  <div className="w-12">
                    <Thumbnail className="w-12" src={thumbnail} />
                  </div>
                  <div>{text}</div>
                </div>
              );
            }}
            onChange={setItemId}
            disabled={loading}
          />
        </div>

        <button
          className={clsx(
            "sm:px-5 px-10 rounded-md shadow-sm font-bold transition-colors py-2 mx-auto block sm:mt-0 mt-2",
            {
              "border border-stroke text-stroke cursor-not-allowed": !item_id,
              "bg-primary text-white hover:bg-primary/70": item_id,
              "opacity-50 cursor-not-allowed": loading,
            }
          )}
          disabled={!item_id || loading}
          onClick={onPublish}
        >
          <InnerButton>
            <Icon type={loading ? "loading" : "plus"} />
            <I18N id={`btn.${loading ? "Adding" : "Add"}`} />
          </InnerButton>
        </button>
      </div>
    </div>
  ) : null;
};
export default AddToOffer;
