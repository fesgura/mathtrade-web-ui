import Valuation from "components/valuation";

const MT_ToolItem_ItemMT = ({ item, afterAnyChange }) => {
  return (
    <div className="mt_tools">
      <div className="mt_tools-container">
        <Valuation
          item={item}
          afterAnyChange={afterAnyChange}
          // className="mb-3"
        />
      </div>
    </div>
  );
};
export default MT_ToolItem_ItemMT;
