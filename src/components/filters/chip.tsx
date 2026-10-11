"use client";
import clsx from "clsx";
import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  ghost?: boolean;
  color?: string;
  onRemove?: () => void;
  children?: ReactNode;
};

const FilterChip = ({
  selected = false,
  ghost = false,
  color = "",
  onRemove,
  children = null,
  className = "",
  type = "button",
  ...rest
}: FilterChipProps) => {
  const colored = Boolean(selected && color);
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex max-w-full items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold",
        ghost && "border border-dashed border-gray-400 bg-transparent text-gray-600",
        selected && ghost && "border-primary bg-primary/10 text-primary",
        selected && !colored && !ghost && "bg-primary text-white",
        !selected && !ghost && "bg-gray-100 text-gray-600",
        className
      )}
      style={colored ? colorTagStyles(color) : undefined}
      {...rest}
    >
      <span className="truncate">{children}</span>
      {onRemove ? (
        <Icon type="close" className="text-[11px] shrink-0 opacity-80" />
      ) : null}
    </button>
  );
};

export default FilterChip;
