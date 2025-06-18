import { BoxDeliveryContext } from "@/context/boxDelivery";
import { useState, useMemo, useContext } from "react";
import { normalizeString } from "@/utils";

const useTable = () => {
  const { itemListRaw, loading, error } = useContext(BoxDeliveryContext);

  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("user");

  const itemTableRaw = useMemo(() => {
    return itemListRaw.map(({ boxNumber, destinyName, itemRaw }) => {
      const { id, assigned_trade_code, first_name, last_name, title } = itemRaw;

      return {
        id,
        assigned_trade_code,
        user: `${first_name} ${last_name}`,
        last_name,
        title,
        boxNumber,
        destinyName,
      };
    });
  }, [itemListRaw]);

  const itemTableSearched = useMemo(() => {
    if (!itemTableRaw || !itemTableRaw.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return itemTableRaw.filter((item) => {
      const { user, title, destinyName } = item;

      if (keyLow === "") {
        return true;
      }
      return (
        normalizeString(
          `${user || ""} ${title || ""} ${destinyName || ""}`
        ).indexOf(keyLow) >= 0
      );
    });
  }, [itemTableRaw, searchValue]);

  const { itemTable, listJSON } = useMemo(() => {
    const listOrdered = itemTableSearched.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "user":
          return a?.last_name.toUpperCase() < b?.last_name.toUpperCase()
            ? -1 * dir
            : dir;
        case "destinyName":
          return a?.destinyName < b?.destinyName ? -1 * dir : dir;

        case "title":
          return a?.title < b?.title ? -1 * dir : dir;
        case "boxNumber":
          return a?.boxNumber < b?.boxNumber ? -1 * dir : dir;

        default:
          return 1;
      }
    });

    const listJSONdata = listOrdered.map((item) => {
      const { assigned_trade_code, user, title, boxNumber, destinyName } = item;

      return {
        Código: assigned_trade_code,
        "Nombre y apellido": user,
        Título: title,
        "Caja Nº": boxNumber || "-",
        Destino: destinyName,
      };
    });

    return {
      itemTable: listOrdered,
      listJSON: listJSONdata,
    };
  }, [itemTableSearched, order]);

  return {
    searchValue,
    setSearchValue,
    itemTable,
    listJSON,
    loading,
    error,
    order,
    setOrder,
  };
};

export default useTable;
