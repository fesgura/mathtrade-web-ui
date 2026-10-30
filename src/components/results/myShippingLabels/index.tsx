"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import I18N from "@/i18n";
import { shippingItemToTag } from "@/components/results/printTags/shippingTags";
import type { ShippingItem, ShippingLoc } from "@/app/mathtrade/admin/shipping/types";

// @react-pdf/renderer only runs in the browser; loading it on demand also
// keeps it out of the results bundle for members without labels.
const PrintTags = dynamic(() => import("@/components/results/printTags"), {
  ssr: false,
});

export type MyShippingLabelsData = {
  published: boolean;
  hub: ShippingLoc | null;
  items: ShippingItem[];
};

// The labels of the items the member sends (published by the admins).
const MyShippingLabels = ({ data = null }: { data?: MyShippingLabelsData | null }) => {
  const hubId = data?.hub?.id ?? null;
  const tags = useMemo(
    () => (data?.items || []).map((item) => shippingItemToTag(item, hubId)),
    [data, hubId]
  );

  return (
    <div className="md:px-7 px-3 py-7">
      <p className="mb-4 text-balance">
        <I18N id="results.tags.intro" />
      </p>
      <PrintTags tags={tags} fileName="mis_etiquetas" />
    </div>
  );
};

export default MyShippingLabels;
