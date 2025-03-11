import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import { useMemo, useContext } from "react";
import { ItemContext } from "@/context/item";

const NewElementStep0 = ({ setStep }) => {
  // ITEM CONTEXT *************************************/
  const { item } = useContext(ItemContext);

  const itemId = item?.id || null;
  const isCombo = item?.isCombo || false;
  // end ITEM CONTEXT *************************************/

  const btnLabel = useMemo(() => {
    let label = "btn.MyCollection.addNewItem";
    if (itemId) {
      if (isCombo) {
        label = "btn.MyCollection.addNewItemToCombo";
      } else {
        label = "btn.MyCollection.addNewItemForCombo";
      }
    }
    return label;
  }, [itemId, isCombo]);

  return (
    <>
      <div className="text-center">
        <button
          className="border border-primary text-primary text-xs px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            setStep(1);
          }}
        >
          <InnerButton>
            <Icon type="plus" />
            <I18N id={btnLabel} />
          </InnerButton>
        </button>
      </div>
    </>
  );
};

export default NewElementStep0;
