"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/button";
import I18N from "@/i18n";
import { shippingItemToTag } from "@/components/results/printTags/shippingTags";
import type { Tag } from "@/components/results/printTags/types";
import type { ShippingItem } from "./types";

// @react-pdf/renderer only runs in the browser; loading it on demand also
// keeps it out of the page bundle until the labels are opened.
const PrintTags = dynamic(() => import("@/components/results/printTags"), {
  ssr: false,
});

// Shipping labels (PDF) for the items of one origin or one sender (what that
// member sees in "Mis etiquetas", with local trades left out). Nothing is
// generated until "Ver etiquetas": PrintTags is mounted only after the click,
// and only for the exact `tags` it was opened for, so any change of filter,
// of the include-local checkbox or of tab (which unmounts this panel) hides
// the labels again. Everything at once can't be generated: hundreds of pages.
const LabelsPanel = ({
  items = [],
  hubId = null,
  labelsFor = null,
}: {
  items?: ShippingItem[];
  hubId?: number | null;
  labelsFor?: string | null;
}) => {
  const [includeLocal, setIncludeLocal] = useState(false);
  const [openFor, setOpenFor] = useState<Tag[] | null>(null);

  const tags = useMemo(
    () =>
      items
        .filter((item) => includeLocal || item.kind !== "local")
        .map((item) => shippingItemToTag(item, hubId)),
    [items, includeLocal, hubId]
  );
  const open = !!labelsFor && openFor === tags;

  const fileName = `etiquetas_${labelsFor || "todos"}`;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeLocal}
            onChange={(e) => setIncludeLocal(e.target.checked)}
          />
          <I18N id="adminShipping.labels.includeLocal" />
        </label>
        {open ? (
          <Button type="button" sm outline onClick={() => setOpenFor(null)}>
            <I18N id="adminShipping.labels.close" />
          </Button>
        ) : (
          <Button
            type="button"
            sm
            disabled={!labelsFor || !tags.length}
            onClick={() => setOpenFor(tags)}
          >
            <I18N id="adminShipping.labels.show" values={[tags.length]} />
          </Button>
        )}
        {!labelsFor ? (
          <span className="text-sm text-gray-600">
            <I18N id="adminShipping.labels.pickOrigin" />
          </span>
        ) : null}
      </div>
      {open ? <PrintTags tags={tags} fileName={fileName} /> : null}
    </div>
  );
};

export default LabelsPanel;
