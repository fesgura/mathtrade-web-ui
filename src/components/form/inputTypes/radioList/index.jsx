import { getI18Ntext } from "@/i18n";
import { useMemo } from "react";

const RadioList = ({ name, data, onChange, options, translateOptions }) => {
  const n = useMemo(() => {
    return name;
  }, [name]);

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-centers gap-3 cursor-pointer"
          onClick={() => (onChange ? onChange(option.value) : null)}
        >
          <input
            type="radio"
            name={n}
            value={option.value}
            defaultChecked={data ? data[name] === option.value : false}
            //checked={value === option.value}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
          />
          <div className="hover:opacity-80 transition-opacity">
            {translateOptions ? getI18Ntext(option.text) : option.text}
          </div>
        </label>
      ))}
      <input
        type="radio"
        name={n}
        value=""
        defaultChecked={data ? data[name] === "" : false}
        //checked={value === option.value}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1 hidden"
      />
    </div>
  );
};

export default RadioList;
