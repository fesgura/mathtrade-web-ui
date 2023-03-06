import classNames from "classnames";
import Icon from "components/icon";
import { getTextColorByBackgroundColor } from "utils";

const GroupTag = ({ tag, forAdd, onClick, onDelete, canEditWants }) => {
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
      {canEditWants ? (
        <div className="group-tag-x" onClick={onDelete}>
          <Icon type="times" />
        </div>
      ) : null}
    </div>
  );
};
export default GroupTag;
