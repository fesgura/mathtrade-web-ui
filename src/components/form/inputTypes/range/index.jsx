import { useCallback, useMemo, useState } from "react";

const Range = ({
  name,
  initialValue,
  min = 0,
  max = 10,
  step = 1,
  onChange,
}) => {
  const [valueInternal, setValueInternal] = useState(initialValue || 0);

  const position = useMemo(() => {
    return (100 / (max - min)) * (valueInternal - min);
  }, [valueInternal, min, max]);

  const onChangeValue = useCallback(
    (w) => {
      if (!parseFloat(w) && w !== "0") {
        return;
      }
      const v = parseFloat(w);

      if (v >= min && v <= max) {
        setValueInternal(v);
        if (onChange) {
          onChange(v);
        }
      }
    },
    [onChange, min, max]
  );

  return (
    <div className="flex items-center">
      <div className="pr-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          className="text-xs bg-white border border-gray-400 rounded-md w-12 text-center focus:outline-none focus:border-primary"
          value={valueInternal}
          onChange={(e) => {
            onChangeValue(e.target.value);
          }}
        />
      </div>
      <div className="relative h-[18px] flex-1">
        <div className="absolute top-0 left-0 right-[20px] h-[20px]">
          <div className="absolute top-[3px] h-[14px] left-[3px] right-[-17px] rounded-full bg-gradient-to-r from-[#fb0900] via-[#ffca1c] to-[#0aa516]"></div>
          <div
            className="absolute top-0 w-[20px] h-[20px] rounded-full sbg-primary shadow-[inset_0_0_0_5px_white,0_1px_6px_rgba(0,0,0,0.3)]"
            style={{ left: `${position}%` }}
          />
        </div>
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          className="range-input appearance-none absolute top-0 left-0 w-full opacity-0 cursor-grab"
          value={valueInternal}
          onChange={(e) => {
            onChangeValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Range;
