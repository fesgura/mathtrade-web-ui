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
        "flex max-w-full min-w-0 flex-wrap items-center gap-x-2.5 gap-y-2 overflow-x-hidden bg-white border-b border-gray-200 px-3 py-2 md:px-4",
        align === "end" && "items-end",
        className
      )}
    >
      {leading ? (
        <div className="flex min-w-0 max-w-full flex-wrap items-center gap-1.5">
          {leading}
        </div>
      ) : null}
      {search ? (
        // flex-1 is basis 0, so once chips and the right-hand controls fill
        // the row the field shrinks to nothing (1920px with several filters).
        // A real minimum makes it wrap onto the next line, where it can grow.
        <div className="w-full min-w-[14rem] grow shrink-0 basis-full sm:w-auto sm:basis-[14rem]">
          {search}
        </div>
      ) : null}
      {count ? (
        <span
          className={clsx(
            "max-w-full text-caption font-semibold text-gray-500 whitespace-nowrap",
            align === "end" && "h-8 flex items-center"
          )}
        >
          {count}
        </span>
      ) : null}
      {extra}
      {sort ? <div className="max-w-full shrink-0">{sort}</div> : null}
      {trailing ? (
        <div
          className={clsx(
            "flex min-w-0 max-w-full flex-wrap items-center gap-1.5 sm:ml-auto sm:justify-end",
            // Own row on a phone, packed from the left, so two pills don't
            // stretch across the width and push the list off screen.
            "max-lg:basis-full max-lg:justify-start",
            align === "end" && "h-8 max-lg:h-auto max-lg:justify-end"
          )}
        >
          {trailing}
        </div>
      ) : null}
    </div>
  );
};

export default ListToolbar;
