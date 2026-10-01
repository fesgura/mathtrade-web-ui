import I18N from "@/i18n";
import Value from "@/components/value";
import MyGroupsInItem from "@/components/item-mygroups/header-groups";
import useItemHeader from "./useItemHeader";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import Chip from "@/components/chip";
import { LoadingBox } from "@/components/loading";

const HeaderItem = ({ className = "mb-2" }) => {
  const {
    deleteItem,
    loading,
    isCombo,
    canIdelete,
    isWantPhase,
    elementsLength,
    ready,
  } = useItemHeader();

  return (
    <>
      <header className={className}>
        <div className="flex items-center justify-between gap-3">
          {elementsLength > 0 ? (
            <div className="flex items-center gap-3">
              <MyGroupsInItem className="" />
              <Value size="xl" type="item" />
              {ready === false ? (
                <Chip tone="alert">
                  <I18N id="myOffer.item.missingInfo" />
                </Chip>
              ) : null}
            </div>
          ) : null}
          {canIdelete ? (
            <ButtonAlert
              className="text-red-700 font-bold text-xs hover:text-red-900 transition-colors"
              title="title.DeleteItem"
              description={
                isWantPhase
                  ? "description.DeleteItem.wants"
                  : "description.DeleteItem"
              }
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
