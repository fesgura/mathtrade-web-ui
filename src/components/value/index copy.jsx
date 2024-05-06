import clsx from "clsx";
import Icon from "@/components/icon";
import useValue from "./useValue";
import ValueEditor from "./editor";

const Value = ({
  size = "xl",
  type,
  onChange,
  itemIds,
  currentValue,
  groupId,
}) => {
  const { isOpen, setIsOpen, backgroundColor, value, setValue, itemListId } =
    useValue(type, itemIds, currentValue, groupId);
  return (
    <div
      className={clsx("w-fit", {
        "absolute bottom-0 right-0": size === "md",
        relative: size !== "md",
      })}
    >
      <button
        className={clsx(
          "text-white font-normal flex items-center gap-1  cursor-pointer py-1 px-2 focus:outline-none transition-colors",
          {
            "rounded-tl-lg rounded-br-lg": size === "md",
            "rounded-xl": size === "xl" || size === "tag",
          }
        )}
        style={{ backgroundColor }}
        onClick={() => {
          setIsOpen((v) => !v);
        }}
      >
        <div className="text-[13px] leading-[13px] h-[13px] font-bold">
          {value}
        </div>
        <div className="h-[13px]">
          <Icon type="star-o" className="block relative top-[-7px]" />
        </div>
      </button>
      {isOpen ? (
        <ValueEditor
          value={value}
          setValue={setValue}
          onClose={() => {
            setIsOpen(false);
          }}
          itemListId={itemListId}
          onChangeValue={onChange}
          type={type}
        />
      ) : null}
    </div>
  );
};

export default Value;
