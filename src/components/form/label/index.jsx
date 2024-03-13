import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";

const Label = ({
  text = "",
  className,
  children,
  name,
  required,
  size = "md",
}) => {
  return (
    <label
      className={clsx(
        "inline-block  text-gray-600 font-bold",
        {
          "py-1 text-base": size === "md",
          "text-sm": size === "sm",
        },
        className
      )}
      htmlFor={name}
    >
      <I18N id={text} />{" "}
      {required && (
        <span
          className="text-primary"
          title={getI18Ntext("validation.required")}
        >
          *
        </span>
      )}
      {children}
    </label>
  );
};
export default Label;
