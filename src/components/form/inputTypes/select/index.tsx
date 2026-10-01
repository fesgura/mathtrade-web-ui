"use client";
import clsx from "clsx";
import useSelect from "./useSelect";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  FloatingPortal,
} from "@floating-ui/react";
import { Z } from "@/config/zIndex";

const Select = ({
  name = "",
  options = [],
  multiple = false,
  unique = false,
  translateOptions = false,
  loading = false,
  disabled = false,
  disabledInput = false,
  data = {},
  ariaLabel = "",
  onChange = undefined,
  icon = undefined,
  size = "md",
  customRenderOption = undefined,
  customRenderTag = undefined,
  onMouseOverOption = undefined,
  onMouseOut = undefined,
  noBorder = false,
  startFocus = false,
}) => {
  const {
    placeholder,
    visiblePad,
    handleVisiblePad,
    textInput,
    handleTextInput,
    optionsComplete,
    handleClickOption,
    handleRemoveOption,
    valueOutput,
    setFocus,
    inputRef,
    visibleInput,
    withGroup,
  } = useSelect(
    options || [],
    data[name] || "",
    multiple,
    translateOptions,
    onChange,
    startFocus
  );

  const { refs, floatingStyles } = useFloating({
    open: visiblePad,
    strategy: "fixed",
    placement: "bottom-start",
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.min(240, availableHeight)}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div className="flex items-stretch">
      {icon ? (
        <div
          className={clsx(
            "border border-stroke border-r-0 rounded-tl-md rounded-bl-md w-[45px] flex flex-col justify-center items-center bg-gray-100 text-gray-500 peer-focus:border-primary peer-focus:shadow-[0_0_6px_theme(colors.primary)] transition",
            {
              "border-primary shadow-[0_0_6px_theme(colors.primary)]":
                visiblePad,
            }
          )}
        >
          <Icon type={icon} />
        </div>
      ) : null}
      <div className="relative w-full" ref={refs.setReference}>
        <div
          className={clsx(
            "input block w-full  border-stroke rounded-md  pl-3 pr-6 shadow-sm transition",
            {
              "border-primary shadow-[0_0_6px_theme(colors.primary)]":
                visiblePad,
              "flex flex-wrap gap-1": multiple,
              "border-l-0 rounded-tl-none rounded-bl-none": icon,
              "bg-white": !disabled && !disabledInput,
              "bg-gray-200 cursor-not-allowed": disabled || disabledInput,
              "py-3": size === "md",
              "py-2 text-sm": size === "sm",
              border: !noBorder,
            }
          )}
        >
          {multiple && (
            <>
              <div
                className="absolute top-0 left-0 w-full h-full cursor-text"
                onClick={setFocus}
              />
              {optionsComplete.map((option) => {
                if (!option.chosen) {
                  return null;
                }
                if (customRenderTag) {
                  return customRenderTag(
                    option,
                    !loading && !disabled && !disabledInput && (
                      <div
                        className="text-right cursor-pointer w-5 relative top-[-1px]"
                        onClick={() => {
                          handleRemoveOption(option);
                        }}
                      >
                        <Icon />
                      </div>
                    )
                  );
                }
                return (
                  <div
                    className="flex relative border border-gray-300 px-2 text-gray-500 rounded-md text-sm"
                    key={option.value}
                  >
                    {option.text}
                    {!loading && !disabled && !disabledInput && (
                      <div
                        className="text-right cursor-pointer w-5 relative top-[-1px]"
                        onClick={() => {
                          handleRemoveOption(option);
                        }}
                      >
                        <Icon />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {multiple &&
          unique &&
          optionsComplete.filter((option) => option.chosen).length >
            0 ? null : (
            <input
              autoComplete="off"
              className={clsx("relative bg-transparent focus:outline-none", {
                "w-full": !multiple,
                "cursor-not-allowed": disabled || disabledInput,
                "with-icon": icon,
              })}
              type="text"
              value={textInput}
              onChange={handleTextInput}
              onFocus={handleVisiblePad}
              onBlur={handleVisiblePad}
              placeholder={placeholder}
              disabled={loading || disabled || disabledInput || !visibleInput}
              ref={inputRef}
              aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
            />
          )}
        </div>
        {!disabled && !disabledInput && (
          <div
            className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer"
            onClick={setFocus}
          >
            <Icon type={loading ? "loading" : "chevron-down"} />
          </div>
        )}

        <input
          name={name}
          type="hidden"
          value={valueOutput}
          disabled={disabled}
        />
        {!disabled && !disabledInput && visiblePad && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: Z.popover }}
              className={clsx(
                "z-popover bg-white shadow-[0_6px_20px_rgba(5,66,93,0.1),0_26px_40px_rgba(8,52,82,0.1)] py-2 overflow-y-auto animate-fadedown",
                { withGroup }
              )}
              onMouseLeave={onMouseOut}
            >
              {optionsComplete.map((option) => {
                if (option?.chosen || !option.filtered) {
                  return null;
                }
                if (option.type === "group") {
                  return (
                    <div
                      className="font-bold text-sm pl-3"
                      key={option.value}
                    >
                      {option.text}
                    </div>
                  );
                }
                return (
                  <div
                    className={clsx("cursor-pointer", {
                      "pl-6": withGroup,
                      "hover:bg-primary/20 px-2": !option?.highlighted,
                      "bg-secondary/80 text-white p-2 hover:bg-secondary":
                        option?.highlighted,
                    })}
                    key={option.value}
                    onMouseDown={() => {
                      handleClickOption(option);
                    }}
                    onMouseOver={
                      onMouseOverOption
                        ? () => {
                            onMouseOverOption(option);
                          }
                        : null
                    }
                  >
                    {customRenderOption
                      ? customRenderOption(option)
                      : option.text}
                  </div>
                );
              })}
            </div>
          </FloatingPortal>
        )}
      </div>
    </div>
  );
};

export default Select;
