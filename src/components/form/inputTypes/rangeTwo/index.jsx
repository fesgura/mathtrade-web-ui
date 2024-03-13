import { useState, useEffect, useCallback, useMemo } from "react";

const RangeTwo = ({ name, data, onChange, min = 0, max = 10, step = 1 }) => {
  const [value_0, set_value_0] = useState(min);
  const [value_1, set_value_1] = useState(max);

  useEffect(() => {
    if (
      data &&
      typeof data[`${name}-from`] !== "undefined" &&
      typeof data[`${name}-to`] !== "undefined"
    ) {
      set_value_0(Math.max(min, parseInt(data[`${name}-from`], 10)));
      set_value_1(Math.min(max, parseInt(data[`${name}-to`], 10)));
    } else {
      set_value_0(min);
      set_value_1(max);
    }
  }, [data, name, min, max]);

  const positions = useMemo(() => {
    const diff = 100 / (max - min);
    return {
      p_0: diff * (value_0 - min),
      p_1: diff * (value_1 - min),
    };
  }, [value_0, value_1, min, max]);

  const onChangeInput = useCallback(
    (valInput, inputNum) => {
      switch (inputNum) {
        case 0:
          const new_value_0 = Math.min(valInput, value_1 - 1);
          set_value_0(new_value_0);
          if (onChange) onChange(`${new_value_0},${value_1}`);
          break;
        case 1:
          const new_value_1 = Math.max(valInput, value_0 + 1);
          set_value_1(new_value_1);
          if (onChange) onChange(`${value_0},${new_value_1}`);
          break;
      }
    },
    [value_0, value_1, onChange]
  );

  const linesArray = useMemo(() => {
    const list = [];
    const count = max - min;
    let d = 0;
    while (d < count) {
      list.push(d);
      d++;
    }
    return list;
  }, [min, max]);

  const nullContent = useMemo(() => {
    return value_0 === min && value_1 === max;
  }, [value_0, value_1, min, max]);

  return (
    <>
      <div className="flex items-center">
        <div className="pr-1">
          <div className="text-xs bg-white border border-gray-400 rounded-md w-12 text-center">{`${value_0} - ${value_1}`}</div>
        </div>
        <div className="relative h-[20px] flex-1">
          <div className="absolute top-0 left-0 right-[20px] h-[20px]">
            <div className="absolute top-[7px] h-[6px] left-[10px] right-[-10px] bg-primary/30 rounded-full">
              <div
                className="absolute top-0 h-full bg-primary"
                style={{
                  left: `${positions.p_0}%`,
                  right: `${100 - positions.p_1}%`,
                }}
              />
              {linesArray.map((n) => {
                if (n === 0) {
                  return null;
                }
                return (
                  <div
                    className="absolute top-0 h-full w-[1px] bg-white/70"
                    key={n}
                    style={{
                      left: `${n * (100 / linesArray.length)}%`,
                    }}
                  />
                );
              })}
            </div>
            <div
              className="absolute top-0 w-[20px] h-[20px] rounded-full bg-primary shadow-[inset_0_0_0_5px_white,0_1px_6px_rgba(0,0,0,0.3)]"
              style={{ left: `${positions.p_0}%` }}
            />
            <div
              className="absolute top-0 w-[20px] h-[20px] rounded-full bg-primary shadow-[inset_0_0_0_5px_white,0_1px_6px_rgba(0,0,0,0.3)]"
              style={{ left: `${positions.p_1}%` }}
            />
          </div>

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            className="range-multiple-input appearance-none absolute top-0 left-0 w-full opacity-0 cursor-grab"
            value={value_0}
            onChange={(e) => {
              onChangeInput(parseInt(e.target.value, 10), 0);
            }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            className="range-multiple-input appearance-none absolute top-0 left-0 w-full opacity-0 cursor-grab"
            value={value_1}
            onChange={(e) => {
              onChangeInput(parseInt(e.target.value, 10), 1);
            }}
          />
        </div>
      </div>
      <input
        name={`${name}-from`}
        type="hidden"
        value={nullContent ? "" : `${value_0}`}
      />
      <input
        name={`${name}-to`}
        type="hidden"
        value={nullContent ? "" : `${value_1}`}
      />
    </>
  );
};

export default RangeTwo;
