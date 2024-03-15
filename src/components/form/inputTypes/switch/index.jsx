import { useEffect, useId, useState } from "react";
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";

const Switch = ({
  name = "",
  data,
  value,
  onChange,
  disabled,
  children,
  required,
  ariaLabel,
}) => {
  const id = useId();

  const [checkboxValue, setCheckboxValue] = useState(false);

  useEffect(() => {
    setCheckboxValue(
      (data && typeof data[name] === "boolean" && data[name] === true) || false
    );
  }, [data, name]);

  return (
    <>
      <label
        className={clsx("relative inline-flex items-center", {
          "cursor-pointer": !disabled,
          "cursor-not-allowed": disabled,
        })}
      >
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          checked={checkboxValue}
          onChange={({ target }) => {
            setCheckboxValue(target.checked);
            if (onChange) onChange(target.checked);
          }}
          disabled={disabled}
          aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
          className="sr-only peer"
        />
        <div
          className={clsx(
            "relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-400 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600",
            {
              "opacity-40": disabled,
            }
          )}
        ></div>
        <span className="ml-2">
          {required && <span className="required mr-1">*</span>}
          {children}
        </span>
      </label>
      <input type="hidden" name={name} defaultValue={checkboxValue} />
    </>
  );
};

export default Switch;
