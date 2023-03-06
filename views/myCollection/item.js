import Item from "components/item/full";
import PublishInMT from "./publish_in_mt";
import AddItem from "components/pages/myItems/addItem";
import GroupHeader from "components/groupHeader";
import BtnCircle from "components/btnCircle";
import Icon from "components/icon";
import Valuation from "components/valuation";

const ItemOfCollection = ({
  IamInMathTrade,
  item,
  itemMathTradeData,
  afterAnyChange,
  editItem,
  notShowAddItem,
  withDragger,
  notHighlated,
  showGroups,
  groups,
  canEditList,
  canEditWants,
}) => {
  return (
    <Item
      item={item}
      highClassName={
        notHighlated ? null : itemMathTradeData ? "high-offered" : null
      }
      btnRowListElement={[
        (k, itemRes, elementRes) => {
          return itemMathTradeData && !canEditList ? null : (
            <BtnCircle
              key={k}
              className="btn-edit-item"
              label="element.Edit"
              onClick={() => {
                editItem(itemRes, elementRes);
              }}
            >
              <Icon type="pencil" />
            </BtnCircle>
          );
        },
      ]}
      btnRowListItem={
        IamInMathTrade
          ? [
              (k) => {
                return <Valuation key={k} items={[item]} />;
              },
              (k) => {
                return (
                  <PublishInMT
                    key={k}
                    canEditList={canEditList}
                    item={item}
                    itemMathTradeData={itemMathTradeData}
                    afterAnyChange={afterAnyChange}
                  />
                );
              },
            ]
          : []
      }
      footer={
        notShowAddItem || (itemMathTradeData && !canEditList) ? null : (
          <div className="py-2">
            <AddItem item={item} onClick={editItem} canEditList={canEditList} />
          </div>
        )
      }
      showUser={false}
      withDragger={canEditWants ? withDragger : false}
      groupHeader={
        showGroups ? (
          <GroupHeader
            canEditWants={canEditWants}
            item={item}
            groups={groups}
            afterAnyChange={afterAnyChange}
          />
        ) : null
      }
    />
  );
};

export default ItemOfCollection;
