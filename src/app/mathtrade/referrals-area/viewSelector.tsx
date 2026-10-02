"use client";
import { useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { useReferrerView } from "@/context/referrerView";
import { Select } from "@/components/form";
import { formatLocations } from "@/utils";
import I18N, { getI18Ntext } from "@/i18n";

// Admins only: see the area as any location's referrer, in any edition.
const ViewSelector = () => {
  const {
    isAdmin,
    mathtradeId,
    setMathtradeId,
    localLocation,
    setLocationId,
    readOnly,
  } = useReferrerView();
  const locations = useStore((state) => state.locations);
  const locationOptions = useMemo(
    () => formatLocations(locations),
    [locations],
  );

  const [, mathtrades] = useFetch({
    endpoint: "GET_MATHTRADES",
    initialState: [],
    autoLoad: isAdmin,
  });

  if (!isAdmin) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 border-b border-gray-200 text-sm">
      <label className="flex items-center gap-2">
        <span className="font-bold">
          <I18N id="referral.view.edition" />:
        </span>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 bg-white"
          value={mathtradeId ?? ""}
          onChange={(e) => setMathtradeId(Number(e.target.value) || null)}
        >
          {(Array.isArray(mathtrades) ? mathtrades : []).map((mt: any) => (
            <option key={mt.id} value={mt.id}>
              {mt.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-2 min-w-[220px]">
        <span className="font-bold">
          <I18N id="referral.view.as" />:
        </span>
        <div className="grow">
          <Select
            name="as_location"
            options={locationOptions}
            data={{ as_location: localLocation }}
            size="sm"
            ariaLabel={getI18Ntext("referral.view.as")}
            onChange={(value: any) => setLocationId(Number(value) || null)}
          />
        </div>
      </div>
      {readOnly && (
        <span className="bg-warning/20 text-gray-900 rounded-full px-3 py-1 font-bold">
          <I18N id="referral.view.readOnly" />
        </span>
      )}
    </div>
  );
};

export default ViewSelector;
