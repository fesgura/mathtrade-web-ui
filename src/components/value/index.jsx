import clsx from "clsx";
import Icon from "@/components/icon";
import useValue from "./useValue";
import I18N, { getI18Ntext } from "@/i18n";
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
import { Z } from "@/config/zIndex";

const Value = ({
  type,
  onChange = undefined,
  itemIds = undefined,
  currentValue = undefined,
  groupId = undefined,
}) => {
  const {
    isOpen,
    setIsOpen,
    backgroundColor,
    value,
    setValue,
    itemListId,
    canIEdit,
    lockedByGroup,
    mixed,
  } = useValue(type, itemIds, currentValue, groupId);

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
    <div className={clsx("w-fit relative")}>
      <button
        className={clsx(
          "bg-white font-bold flex items-center gap-1 py-1 px-2.5 text-[13px] leading-none focus:outline-none transition-opacity rounded-full border shadow-sm",
          {
            "cursor-default opacity-60": !canIEdit,
            "hover:opacity-80": canIEdit,
          }
        )}
        style={{ borderColor: backgroundColor, color: backgroundColor }}
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <span>{value}</span>
        {mixed ? (
          <span
            className="text-[11px] leading-none"
            title={getI18Ntext("value.mixedGroup")}
          >
            ≠
          </span>
        ) : null}
        {canIEdit && !lockedByGroup ? (
          <Icon type="edit" className="text-[11px] opacity-70" />
        ) : null}
      </button>

      {isOpen && canIEdit ? (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: Z.popover }}
            {...getFloatingProps()}
            className=" shadow-[0_1px_10px_rgba(0,0,0,0.2)] z-popover animate-fadein min-w-[200px] max-w-[300px] rounded-md flex bg-white"
          >
            {lockedByGroup ? (
              <p className="p-3 text-sm">
                <I18N id="value.lockedByGroup" values={[lockedByGroup.name]} />
              </p>
            ) : (
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
            )}
          </div>
        </FloatingFocusManager>
      ) : null}
    </div>
  );
};

export default Value;

/*

    
*/
