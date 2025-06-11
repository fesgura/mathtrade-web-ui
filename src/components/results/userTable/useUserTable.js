import { useState, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { normalizeString } from "@/utils";
import { DateIntlFormat } from "@/utils/dateUtils";

const useUserTable = () => {
  const [searchValue, setSearchValue] = useState("");

  const [order, setOrder] = useState("name");

  const [, listRaw, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    autoLoad: true,
  });

  const listSearched = useMemo(() => {
    if (!listRaw || !listRaw.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return listRaw.filter((user) => {
      const { first_name, last_name, location } = user;

      if (keyLow === "") {
        return true;
      }
      return (
        normalizeString(
          `${first_name || ""} ${last_name || ""} ${location?.name || ""}`
        ).indexOf(keyLow) >= 0
      );
    });
  }, [listRaw, searchValue]);

  const { list, listJSON } = useMemo(() => {
    const listOrdered = listSearched.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "name":
          return a?.last_name < b?.last_name ? -1 * dir : dir;
        case "location":
          return a?.location?.name < b?.location?.name ? -1 * dir : dir;
        case "commitment_datetime":
          const aDate = new Date(a?.commitment_datetime);
          const bDate = new Date(b?.commitment_datetime);
          return aDate < bDate ? -1 * dir : dir;

        case "items":
        case "trades":
          return a?.items < b?.items ? -1 * dir : dir;

        case "commitment":
          return a?.commitment < b?.commitment ? -1 * dir : dir;
        default:
          return 1;
      }
    });

    const listJSONdata = listOrdered.map((user) => {
      const {
        first_name,
        last_name,
        location,
        items,
        trades,
        commitment_datetime,
        commitment,
      } = user;
      return {
        Nombre: `${first_name} ${last_name}`,
        Ubicación: location?.name || "-",
        Ejemplares: items || 0,
        Cambios: trades || 0,
        "Fecha de compromiso": commitment_datetime
          ? DateIntlFormat(commitment_datetime)
          : "-",
        "¿Comprometió?": commitment ? "Sí" : "No",
      };
    });

    return {
      list: listOrdered,
      listJSON: listJSONdata,
    };
  }, [listSearched, order]);

  return {
    list,
    listJSON,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  };
};

export default useUserTable;
