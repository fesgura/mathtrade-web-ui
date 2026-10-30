"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/button";
import I18N from "@/i18n";
import { shippingItemToTag } from "@/components/results/printTags/shippingTags";
import type { ShippingItem, ShippingLoc } from "./types";

// @react-pdf/renderer only runs in the browser; loading it on demand also
// keeps it out of the page bundle until the labels are opened.
const PrintTags = dynamic(() => import("@/components/results/printTags"), {
  ssr: false,
});

const SLOW_THRESHOLD = 400;

// Shipping labels (PDF) for the filtered items. PrintTags is mounted only
// after the click: it draws one canvas per page, too heavy for page load.
const LabelsPanel = ({
  items = [],
  hubId = null,
  originName = null,
}: {
  items?: ShippingItem[];
  hubId?: number | null;
  originName?: ShippingLoc | null;
}) => {
  const [includeLocal, setIncludeLocal] = useState(false);
  const [open, setOpen] = useState(false);

  const tags = useMemo(
    () =>
      items
        .filter((item) => includeLocal || item.kind !== "local")
        .map((item) => shippingItemToTag(item, hubId)),
    [items, includeLocal, hubId]
  );

  const fileName = `etiquetas_${originName?.code || originName?.name || "todos"}`;

  return (
    <div className="mt-8">
      <h2 className="font-semibold mb-2">
        <I18N id="adminShipping.labels.title" />
      </h2>
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
          <Button type="button" sm outline onClick={() => setOpen(false)}>
            <I18N id="adminShipping.labels.close" />
          </Button>
        ) : (
          <Button
            type="button"
            sm
            disabled={!tags.length}
            onClick={() => setOpen(true)}
          >
            <I18N id="adminShipping.labels.show" values={[tags.length]} />
          </Button>
        )}
      </div>
      {!originName && tags.length > SLOW_THRESHOLD ? (
        <p className="mb-3 text-sm text-amber-700">
          <I18N id="adminShipping.labels.slow" />
        </p>
      ) : null}
      {open ? <PrintTags tags={tags} fileName={fileName} /> : null}
    </div>
  );
};

export default LabelsPanel;
