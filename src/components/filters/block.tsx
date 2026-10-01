"use client";
import I18N from "@/i18n";
import type { ReactNode } from "react";

const FilterBlock = ({
  titleId = "",
  hintId = "",
  children = null,
}: {
  titleId?: string;
  hintId?: string;
  children?: ReactNode;
}) => {
  return (
    <section>
      {titleId ? (
        <h3 className="m-0 mb-1.5 text-xs font-semibold text-gray-500">
          <I18N id={titleId} />
        </h3>
      ) : null}
      {hintId ? (
        <p className="m-0 mb-2 text-xs text-gray-500">
          <I18N id={hintId} />
        </p>
      ) : null}
      {children}
    </section>
  );
};

export default FilterBlock;
