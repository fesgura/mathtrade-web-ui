import I18N from "@/i18n";
import Value from "@/components/value";
import MyGroupsInItem from "@/components/item-mygroups/header-groups";
import useItemHeader from "./useItemHeader";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import { LoadingBox } from "@/components/loading";

const HeaderItem = () => {
  const { deleteItem, loading, isCombo, canIoffer, elementsLength } =
    useItemHeader();

  return (
    <>
      <header className="mb-2">
        <div className="flex items-center justify-between gap-3">
          {elementsLength > 0 ? (
            <div className="flex items-center gap-3">
              <MyGroupsInItem className="" />
              <Value size="xl" type="item" />
            </div>
          ) : null}
          {canIoffer ? (
            <ButtonAlert
              className="text-red-700 font-bold text-xs hover:text-red-900 transition-colors"
              title="title.DeleteItem"
              onClick={deleteItem}
            >
              <InnerButton>
                <Icon type="trash" />
                <I18N id="btn.DeleteItem" />
              </InnerButton>
            </ButtonAlert>
          ) : null}
        </div>
        {isCombo ? (
          <h3 className="uppercase text-sm font-bold text-gray-900 border-t border-gray-400 border-dotted leading-none mt-2 pt-2">
            <I18N id="element-type-badge-0" />
          </h3>
        ) : null}
      </header>
      <LoadingBox loading={loading} min />
    </>
  );
};
export default HeaderItem;
