import { useEffect, useId, useState } from "react";
import { getI18Ntext } from "@/i18n";

const Checkbox = ({
  name,
  data,
  onChange,
  disabled,
  children,
  required,
  ariaLabel,
}) => {
  const id = useId();

  const [checkboxValue, setCheckboxValue] = useState(false);

  useEffect(() => {
    setCheckboxValue((data && data[name] && data[name] === true) || false);
  }, [data, name]);

  return (
    <>
      <label htmlFor={`checkbox-${id}`} className="flex items-start">
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
          className="mt-1"
        />
        <div className="pl-2 text-sm">
          {required && <span className="required mr-1">*</span>}
          {children}
        </div>
      </label>
      <input type="hidden" name={name} defaultValue={checkboxValue} />
    </>
  );
};

export default Checkbox;
