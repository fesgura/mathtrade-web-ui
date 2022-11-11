import classNames from "classnames";
import Icon from "components/icon";
import { getTextColorByBackgroundColor } from "utils";

const GroupTag = ({ tag, forAdd, onClick, onDelete }) => {
  return (
    <div
      className={classNames("group-tag", { "for-add": forAdd })}
      onClick={onClick}
      style={{
        backgroundColor: tag?.color,
        color: getTextColorByBackgroundColor(tag?.color || "#000"),
      }}
    >
      {tag?.name}
      <div className="group-tag-x" onClick={onDelete}>
        <Icon type="times" />
      </div>
    </div>
  );
};
export default GroupTag;
