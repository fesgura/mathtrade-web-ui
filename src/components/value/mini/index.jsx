import { useMemo } from "react";
import { valueToColor } from "../utils";

const ValueMini = ({ currentValue }) => {
  const { value, backgroundColor } = useMemo(() => {
    const value = parseFloat(currentValue || 0);
    return { value, backgroundColor: valueToColor(value) };
  }, [currentValue]);

  return (
    <div
      className="text-white font-bold text-[11px] w-5 h-5 rounded-full cursor-default text-center leading-5 tracking-tighter"
      style={{ backgroundColor }}
      title={value}
    >
      <span className="relative top-[1px]">{value}</span>
    </div>
  );
};

export default ValueMini;
