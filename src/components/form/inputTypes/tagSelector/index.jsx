import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { colorTagStyles } from "@/utils/color";

const TagSelector = ({ name, data, loading, options }) => {
  const [isFocus, setFocus] = useState(false);
  const [valueOutput, setValueOutput] = useState("");

  const buttonContent = useMemo(() => {
    const defaultContent = (
      <div className="text-gray-400  py-1">
        <I18N id="form.SelectOptInstruction" />
      </div>
    );

    if (valueOutput === "") {
      return defaultContent;
    }

    const option = options.filter((opt) => opt.value === valueOutput);

    if (!option[0]) {
      return defaultContent;
    }

    const { text, color, count } = option[0];

    return (
      <div className="py-1">
        <div
          className="font-bold text-xs py-1 px-2 rounded-md flex items-center justify-between"
          style={colorTagStyles(color)}
        >
          <div>
            {text}
            {count > 0 ? <span> ({count})</span> : null}
          </div>

          <div
            className=""
            onMouseDown={() => {
              setValueOutput("");
            }}
          >
            <Icon />
          </div>
        </div>
      </div>
    );
  }, [valueOutput, options]);

  return (
    <>
      <div className="relative text-sm">
        <button
          className="text-left block w-full border border-stroke rounded-md  pl-3 pr-6 py-1 shadow-sm transition"
          onClick={(e) => {
            e.preventDefault();
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 160);
          }}
        >
          {buttonContent}

          <div className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer">
            <Icon type={loading ? "loading" : "chevron-down"} />
          </div>
        </button>
        <div
          className={clsx(
            "absolute z-[999] bg-white w-full top-[99%] shadow-[0_6px_20px_rgba(5,66,93,0.1),0_26px_40px_rgba(8,52,82,0.1)] max-h-60 py-2 overflow-y-auto animate-fadedown p-1",
            {
              block: isFocus,
              hidden: !isFocus,
            }
          )}
        >
          {(options || []).map((option) => {
            const { value, text, color, count } = option;

            return (
              <div className="py-1" key={value}>
                <div
                  className="font-bold text-xs py-1 px-2 rounded-md cursor-pointer hover:opacity-70"
                  style={colorTagStyles(color)}
                  onMouseDown={() => {
                    setValueOutput(value);
                  }}
                >
                  {text}
                  {count > 0 ? <span> ({count})</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <input name={name} type="hidden" value={valueOutput} />
    </>
  );
};

export default TagSelector;
