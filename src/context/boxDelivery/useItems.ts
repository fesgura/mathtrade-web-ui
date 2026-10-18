import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import { destinyPathLabel } from "@/utils";
import { codeNumToString, formatBoxNumber } from "./utils";

const useItems = (boxes: any[], locations: any[], localLocation: number, viewParams: any) => {
  const params = useMemo(
    () => ({ ...viewParams, origin: localLocation }),
    [viewParams, localLocation],
  );
  const [, items, loadingItems, errorItems] = useFetch({
    endpoint: "LOGISTICS_GET_ITEMS",
    params,
    autoLoad: true,
    initialState: [],
  });

  const { itemList, itemListRaw, locationIdFilter, viaDestinations } = useMemo(() => {
    const locationIdFilt: Record<string, { via_meeting: boolean }> = {};
    const viaDest: Record<string, boolean> = {};
    const list = Array.isArray(items) ? items : [];
    const itemLi = [...list]
      .sort((a, b) => {
        return a?.assigned_trade_code > b?.assigned_trade_code ? 1 : -1;
      })
      .map((item) => {
        const {
          id,
          assigned_trade_code,
          title,
          location,
          send_to,
          via_meeting,
        } = item;

        const boxFound = (boxes || []).find(
          (box) => box.math_items.indexOf(`${id}`) >= 0,
        );

        // An item can already be in another city's box (e.g. AMBA packed a
        // via_meeting copy). Those boxes are not in this list, but the API
        // still marks the trade as boxed.
        const boxedElsewhere = Boolean(item.boxed) || (
          item.box_number != null && item.box_number !== ""
        );
        const boxNumber = boxFound
          ? boxFound.displayNumber ||
            formatBoxNumber(boxFound.origin_number, boxFound.number)
          : formatBoxNumber(item.box_origin_number, item.box_number) ||
            item.box_number ||
            null;
        const boxId = boxFound?.id || (boxedElsewhere ? "other" : null);
        const boxLabel = boxFound
          ? boxNumber
          : boxedElsewhere
            ? [item.box_origin_name, boxNumber].filter(Boolean).join(" Nº ") ||
              "—"
            : null;

        const endDestiny = via_meeting ? 1 : send_to || location;

        if (
          location &&
          !boxedElsewhere &&
          !boxFound &&
          `${item.origin_location}` === `${localLocation}`
        ) {
          locationIdFilt[location] = {
            via_meeting: Boolean(
              locationIdFilt[location]?.via_meeting || via_meeting
            ),
          };
        }

        const loc = (locations || []).find((l) => l.id === location);

        const destinyName = destinyPathLabel(loc ? loc.name : "", location, via_meeting);
        if (via_meeting && location) {
          viaDest[`${location}`] = true;
        }

        return {
          value: `${id}`,
          text: `${codeNumToString(assigned_trade_code)} - ${title} ➡️ ${destinyName}`,
          destiny: `${location}`,
          origin: `${item.origin_location ?? ""}`,
          destinyName,
          endDestiny: `${endDestiny}`,
          via_meeting,
          boxNumber,
          boxLabel,
          boxId,
          itemRaw: item,
          isLocal: location !== 1 && location === localLocation,
        };
      });

    // Only copies that leave this city's origin. Incoming / other cities
    // are someone else's to pack.
    const itemLiFromHere = itemLi.filter(
      (item) => `${item.origin}` === `${localLocation}`,
    );
    const itemLiNotLocal = itemLiFromHere.filter((item) => !item.isLocal);

    return {
      itemList: itemLiNotLocal,
      itemListRaw: itemLiFromHere,
      locationIdFilter: locationIdFilt,
      viaDestinations: viaDest,
    };
  }, [items, boxes, locations, localLocation]);

  return {
    itemList,
    itemListRaw,
    locationIdFilter,
    viaDestinations,
    loadingItems,
    errorItems,
  };
};
export default useItems;
