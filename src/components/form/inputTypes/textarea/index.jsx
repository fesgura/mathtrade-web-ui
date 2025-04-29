import clsx from "clsx";
import { getI18Ntext } from "@/i18n";
import { useEffect, useState } from "react";

const Textarea = ({
  name,
  placeholder,
  noTranslatePlaceholder,
  size = "md",
  disabled,
  disabledInput,
  ariaLabel,
  data,
  onChange,
  rows,
  maxlength,
  className,
}) => {
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    setValueInput((data && data[name]) || "");
  }, [data, name]);

  return (
    <textarea
      name={name}
      className={clsx(
        "input block w-full border border-stroke rounded-md shadow-sm peer focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)]   focus:outline-none",
        {
          "p-3 text-base": size === "md",
          "p-2 text-sm": size === "sm",
          "bg-gray-200 text-gray-500": disabled || disabledInput,
        },
        className
      )}
      placeholder={
        placeholder
          ? noTranslatePlaceholder
            ? placeholder
            : getI18Ntext(placeholder)
          : null
      }
      aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
      value={valueInput}
      onChange={(e) => {
        if (!disabledInput) {
          setValueInput(e.target.value);
          if (onChange) onChange(e);
        }
      }}
      rows={rows || 2}
      maxLength={maxlength}
    />
  );
};

export default Textarea;
