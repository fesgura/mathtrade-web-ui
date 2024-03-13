import I18N from "@/i18n";
import clsx from "clsx";
import Container from "../container";

const Tabs = ({ list, onChange, value }) => {
  return (
    <Container>
      <menu className="flex justify-center text-2xl border-b border-gray-300 mb-4">
        {list?.map((name, k) => {
          return (
            <button
              className={clsx(
                "relative top-[2px] px-6 py-1 border-b-4 transition-colors",
                {
                  "border-want cursor-default font-bold": k === value,
                  "border-transparent text-gray-400 hover:text-gray-900":
                    k !== value,
                }
              )}
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
    </Container>
  );
};

export default Tabs;
