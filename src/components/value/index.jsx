import clsx from "clsx";
import Icon from "@/components/icon";
import useValue from "./useValue";
import ValueEditor from "./editor";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";

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

  const { refs, floatingStyles, context } = useFloating({
    // placement: "top",
    strategy: "fixed",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(-20), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    event: "mousedown",
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

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
        /* onClick={() => {
          setIsOpen((v) => !v);
        }} */
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={(e) => {
          e.preventDefault();
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
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 9999999 }}
            {...getFloatingProps()}
            className=" shadow-[0_1px_10px_rgba(0,0,0,0.2)] z-[999999] animate-fadein min-w-[200px] max-w-[300px] rounded-md flex bg-white"
          >
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
          </div>
        </FloatingFocusManager>
      ) : null}
    </div>
  );
};

export default Value;

/*

    
*/
