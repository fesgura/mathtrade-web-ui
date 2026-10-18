import { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import { callToAPI } from "@/hooks/useFetch/utils";

const idsFromForm = (raw: unknown): number[] =>
  String(raw || "")
    .split(",")
    .map((value) => parseInt(value, 10))
    .filter((value) => Number.isFinite(value));

const request = (args: {
  method: string;
  endpoint: string;
  urlParams?: unknown[];
  params?: unknown;
}) =>
  callToAPI({
    method: args.method,
    endpoint: args.endpoint,
    path: null,
    urlParams: args.urlParams || [],
    params: args.params ?? null,
    mathtradeId: 0,
  });

// The backend retired POST/PUT that replace the whole math_items list (410).
// Create is open + add each item. Update is PUT of destiny/comment, then add
// or remove the items that actually changed.
const saveBox = async ({
  id,
  destiny,
  comment,
  nextIds,
  prevIds,
  labels,
}: {
  id?: string;
  destiny: number;
  comment: string;
  nextIds: number[];
  prevIds: number[];
  labels: Record<number, string>;
}) => {
  let boxId = id;

  if (!boxId) {
    const [error, , created] = await request({
      method: "POST",
      endpoint: "LOGISTICS_OPEN_BOX",
      params: { destination_id: destiny, comment },
    });
    if (error) return error;
    boxId = String(created?.id || "");
    if (!boxId) return { error: true, data: { detail: "error.General" } };
    // open/ only takes destination_id; comment goes on the regular PUT.
    if (comment) {
      const [error] = await request({
        method: "PUT",
        endpoint: "LOGISTICS_PUT_BOX",
        urlParams: [boxId],
        params: { destiny, comment },
      });
      if (error) return error;
    }
  } else {
    const [error] = await request({
      method: "PUT",
      endpoint: "LOGISTICS_PUT_BOX",
      urlParams: [boxId],
      params: { destiny, comment },
    });
    if (error) return error;
  }

  const next = new Set(nextIds);
  const prev = new Set(prevIds);
  for (const tradeId of prevIds) {
    if (next.has(tradeId)) continue;
    const [error] = await request({
      method: "DELETE",
      endpoint: "LOGISTICS_REMOVE_BOX_ITEM",
      urlParams: [boxId, tradeId],
    });
    if (error) return error;
  }
  for (const tradeId of nextIds) {
    if (prev.has(tradeId)) continue;
    const [error] = await request({
      method: "POST",
      endpoint: "LOGISTICS_ADD_BOX_ITEM",
      urlParams: [boxId],
      params: { trade_id: tradeId },
    });
    if (error) {
      return { ...error, itemLabel: labels[tradeId] || `#${tradeId}` };
    }
  }
  return null;
};

const useEditor = (box: any) => {
  const { id, destiny, number, math_items, comment: commentBox } = box;

  const {
    locationOptions,
    itemList,
    localLocation,
    reloadBoxes,
    setBoxIdToEdit,
    cancelAddNewBox,
  } = useContext(BoxDeliveryContext) as any;

  const [locationId, setLocationId] = useState(`${destiny}`);
  const [comment, setComment] = useState(commentBox || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const values = (locationOptions || [])
      .filter((option: any) => option.type !== "group")
      .map((option: any) => `${option.value}`);
    if (values.length && !values.includes(`${locationId}`)) {
      setLocationId(values[0]);
    }
  }, [locationOptions, locationId]);

  // Same rule as POST /boxes/{id}/items/: member_to.location == box.destiny.
  // endDestiny (via_meeting → AMBA, or send_to) is only the shipping hop;
  // offering those here made the backend reject them on save.
  const itemOptions = useMemo(() => {
    return (itemList || []).filter((item: any) => {
      const inThisBox = Boolean(id) && item.boxId && `${item.boxId}` === `${id}`;
      if (inThisBox) return true;
      if (item.boxId) return false;
      if (`${item.origin}` !== `${localLocation}`) return false;
      return `${item.destiny}` === `${locationId}`;
    });
  }, [itemList, id, locationId, localLocation]);

  const onSubmit = useCallback(
    async (d: any) => {
      setLoading(true);
      setError(null);
      const labels: Record<number, string> = {};
      (itemList || []).forEach((item: any) => {
        const tradeId = parseInt(item.value, 10);
        if (Number.isFinite(tradeId)) {
          labels[tradeId] = String(item.text || "").split(" ➡️")[0] || `#${tradeId}`;
        }
      });
      const failed = await saveBox({
        id,
        destiny: parseInt(d.destiny, 10),
        comment: d.comment || "",
        nextIds: idsFromForm(d.math_items),
        prevIds: (math_items || []).map((value: string) => parseInt(value, 10)),
        labels,
      });
      setLoading(false);
      if (failed) {
        setError(failed);
        return;
      }
      setBoxIdToEdit(null);
      reloadBoxes();
    },
    [id, itemList, math_items, reloadBoxes, setBoxIdToEdit]
  );

  const onCancel = useCallback(() => {
    if (!id) {
      cancelAddNewBox(number);
    } else {
      setBoxIdToEdit(null);
    }
  }, [cancelAddNewBox, id, number, setBoxIdToEdit]);

  const [itemCount, setItemCount] = useState(math_items.length);

  return {
    validations: {
      destiny: ["required"],
    },
    onSubmit,
    onCancel,
    loading,
    error,
    locationOptions,
    locationId,
    setLocationId,
    id,
    number,
    math_items: math_items.join(","),
    itemOptions,
    itemCount,
    setItemCount,
    comment,
    setComment,
  };
};

export default useEditor;
