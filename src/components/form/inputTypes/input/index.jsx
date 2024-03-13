import clsx from "clsx";
import { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import { useEffect, useState } from "react";

const Input = ({
  type = "text",
  name,
  placeholder,
  noTranslatePlaceholder,
  size = "md",

  onChange,
  onBlur,
  onFocus,
  disabled,
  disabledInput,
  autocomplete,
  ariaLabel,
  icon,
  min,
  max,
  step,
  data,
  maxlength,
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    setValueInput((data && data[name]) || "");
  }, [data, name]);

  return (
    <div className="flex items-stretch relative">
      <input
        name={name}
        type={typeInput}
        className={clsx(
          "input block w-full border border-stroke rounded-md shadow-sm peer focus:outline-none",
          {
            "focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)]":
              !disabledInput,
            "order-2 border-l-0 rounded-tl-none rounded-bl-none": icon,
            "p-3 text-base": size === "md",
            "p-2 text-sm": size === "sm",
            "bg-gray-200 text-gray-500": disabled || disabledInput,
          }
        )}
        placeholder={
          placeholder
            ? noTranslatePlaceholder
              ? placeholder
              : getI18Ntext(placeholder)
            : null
        }
        //defaultValue={defaultValueInput}
        value={valueInput}
        onChange={(e) => {
          if (!disabledInput) {
            setValueInput(e.target.value);
            if (onChange) onChange(e);
          }
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        autoComplete={autocomplete}
        aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
        min={min}
        max={max}
        step={step}
        maxLength={maxlength}
      />
      {icon ? (
        <div
          className={clsx(
            "input-icon border text-gray-500 border-stroke order-1 border-r-0 rounded-tl-md rounded-bl-md w-[45px] flex flex-col justify-center items-center bg-gray-100",
            {
              "peer-focus:border-primary peer-focus:shadow-[0_0_6px_theme(colors.primary)]":
                !disabledInput,
            }
          )}
        >
          <Icon type={icon} />
        </div>
      ) : null}

      {type === "password" ? (
        <div
          className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
          title={getI18Ntext(
            `${typeInput === "password" ? "show" : "hide"}.password.eye`
          )}
          onClick={() => {
            setTypeInput(typeInput === "password" ? "text" : "password");
          }}
        >
          <Icon type={typeInput === "password" ? "eye" : "eye-hide"} />
        </div>
      ) : null}
    </div>
  );
};

export default Input;
