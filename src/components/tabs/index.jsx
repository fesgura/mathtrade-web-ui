import I18N from "@/i18n";
import clsx from "clsx";

const Tabs = ({ list, onChange, value }) => {
  return (
    <menu className="flex justify-center flex-wrap text-2xl pt-1">
      {list?.map((name, k) => {
        return (
          <button
            className={clsx(" px-6 py-1 border-b-4 transition-colors", {
              "border-want cursor-default font-bold": k === value,
              "border-transparent text-gray-400 hover:text-gray-900":
                k !== value,
            })}
            key={name}
            onClick={() => {
              if (onChange) onChange(k);
            }}
          >
            <I18N id={name} />
          </button>
        );
      })}
    </menu>
  );
};

export default Tabs;
// relative top-[2px]
