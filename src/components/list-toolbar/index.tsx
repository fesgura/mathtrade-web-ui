"use client";
import type { ReactNode } from "react";
import clsx from "clsx";

const ListToolbar = ({
  leading = null,
  search = null,
  count = null,
  extra = null,
  sort = null,
  trailing = null,
  align = "center",
  className = "",
}: {
  leading?: ReactNode;
  search?: ReactNode;
  count?: ReactNode;
  extra?: ReactNode;
  sort?: ReactNode;
  trailing?: ReactNode;
  align?: "center" | "end";
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex max-w-full min-w-0 flex-wrap gap-2.5 overflow-x-hidden bg-white border-b border-gray-200 px-3 py-2 md:px-4 max-lg:flex-col max-lg:items-stretch",
        align === "end" ? "items-end" : "items-center",
        className
      )}
    >
      {leading ? (
        <div className="flex min-w-0 max-w-full flex-wrap items-center gap-1.5 max-lg:w-full">
          {leading}
        </div>
      ) : null}
      {search ? (
        <div className="w-full min-w-0 sm:w-auto sm:flex-1 max-lg:w-full">
          {search}
        </div>
      ) : null}
      {count ? (
        <span
          className={clsx(
            "max-w-full text-caption font-semibold text-gray-500 whitespace-nowrap",
            align === "end" && "h-8 flex items-center",
            "max-lg:self-start"
          )}
        >
          {count}
        </span>
      ) : null}
      {extra}
      {sort}
      {trailing ? (
        <div
          className={clsx(
            "flex min-w-0 max-w-full flex-wrap items-center justify-end gap-1.5 sm:ml-auto max-lg:w-full max-lg:justify-between max-lg:gap-2",
            align === "end" && "h-8"
          )}
        >
          {trailing}
        </div>
      ) : null}
    </div>
  );
};

export default ListToolbar;
