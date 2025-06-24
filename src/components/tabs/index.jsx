import I18N from "@/i18n";
import clsx from "clsx";

const Tabs = ({
  list,
  onChange,
  highlighted = -1,
  value,
  min,
  className,
  toLeft,
}) => {
  return (
    <menu
      className={clsx(
        "flex flex-wrap pt-1",
        {
          "text-2xl justify-center": !min,
          "justify-center": !toLeft,
        },
        className
      )}
    >
      {list?.map((name, k) => {
        return (
          <button
            className={clsx("relative px-6 py-1 border-b-4 transition-colors", {
              "border-want cursor-default font-bold": k === value && !min,
              "border-transparent text-gray-400 hover:text-gray-900":
                k !== value && !min,
              "border-primary cursor-default font-bold": k === value && min,
              "border-transparent text-gray-600 hover:text-gray-900":
                k !== value && min,
            })}
            key={name}
            onClick={() => {
              if (onChange) onChange(k);
            }}
          >
            <I18N id={name} />
            {highlighted === k ? (
              <div className="absolute top-0 right-0 bg-red-600 text-white leading-none font-bold uppercase text-[8px] px-1 py-[2px] rounded">
                Nuevo
              </div>
            ) : null}
          </button>
        );
      })}
    </menu>
  );
};

export default Tabs;
