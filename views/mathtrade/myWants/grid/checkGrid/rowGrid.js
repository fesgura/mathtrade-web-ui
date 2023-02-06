import CheckElement from "./CheckElement";
const RowGrid = ({
  myItemElement,
  myItem,
  wantElement,
  isInnerMyItemElement,
}) => {
  return (
    <>
      <CheckElement
        myItemElement={myItemElement}
        myItem={myItem}
        wantElement={wantElement}
        wantItem={
          wantElement.type === "item" ? wantElement.availableWantItems[0] : null
        }
        isInnerMyItemElement={isInnerMyItemElement}
        isInnerWantElement={false}
      />
      {wantElement.type === "game" || wantElement.type === "group"
        ? wantElement.availableWantItems.map((wantItem, k) => {
            return (
              <CheckElement
                key={k}
                myItemElement={myItemElement}
                myItem={myItem}
                wantElement={wantElement}
                wantItem={wantItem}
                isInnerMyItemElement={isInnerMyItemElement}
                isInnerWantElement={true}
              />
            );
          })
        : null}
    </>
  );
};
export default RowGrid;
