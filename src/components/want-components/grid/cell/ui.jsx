import Icon from "@/components/icon";
import useCell from "./useCell";

const CellUI = ({ wantGroup, myItem }) => {
  const {
    value,
    isIndeterminate,
    onClick,
    color: backgroundColor,
    canIwant,
    title,
  } = useCell(wantGroup, myItem);

  return (
    <div
      className="block leading-none w-8 h-8 border-b border-r border-gray-300 pt-2 text-center"
      style={backgroundColor ? { backgroundColor } : null}
    >
      {canIwant ? (
        <button
          className={
            "w-5 h-5 border rounded" +
            (value
              ? " bg-primary border-primary text-white"
              : isIndeterminate
              ? " bg-gray-200 border-gray-400 text-gray-500"
              : " bg-white border-gray-400 text-white")
          }
          onClick={onClick}
          title={title}
        >
          <Icon type={isIndeterminate ? "minus" : "check"} />
        </button>
      ) : (
        <button
          className={
            "w-5 h-5 border rounded cursor-not-allowed" +
            (value
              ? " bg-gray-400 border-gray-400 text-white"
              : isIndeterminate
              ? " bg-gray-200 border-gray-400 text-gray-500"
              : " bg-white border-gray-400 text-white")
          }
          disabled
          title={title}
        >
          <Icon type={isIndeterminate ? "minus" : "check"} />
        </button>
      )}
    </div>
  );
};

export default CellUI;
