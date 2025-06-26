import { useState, useMemo } from "react";
import { normalizeString } from "@/utils";
import { getI18Ntext } from "@/i18n";

const useTable = (columns, data, searchValuesFunc, downloadExcel) => {
  const [order, setOrder] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const dataSearched = useMemo(() => {
    if (!data || !data.length) {
      return [];
    }
    if (!searchValuesFunc) {
      return data;
    }

    const keyLow = normalizeString(searchValue);

    return data.filter((item) => {
      if (keyLow === "") {
        return true;
      }

      const text = searchValuesFunc(item);

      return normalizeString(text).indexOf(keyLow) >= 0;
    });
  }, [searchValuesFunc, data, searchValue]);

  const { list, listJSON } = useMemo(() => {
    if (!columns) {
      return { list: [], listJSON: [] };
    }

    let listOrdered = [];

    const dir = order.indexOf("-") === 0 ? -1 : 1;
    const orderKey = order.replace("-", "");
    const columnSelected = columns.find((c) => c.value === orderKey);

    if (!columnSelected || !columnSelected.sort) {
      listOrdered = dataSearched;
    } else {
      listOrdered = dataSearched.sort((a, b) => {
        if (typeof columnSelected.sort === "boolean") {
          return `${a?.[orderKey]}`.toUpperCase() <
            `${b?.[orderKey]}`.toUpperCase()
            ? -1 * dir
            : dir;
        }
        return columnSelected?.sort(a, b, dir) || 1;
      });
    }

    if (!downloadExcel) {
      return {
        list: listOrdered,
        listJSON: [],
      };
    }

    const listJSONdata = listOrdered.map((tr, k) => {
      const o = {};

      columns.forEach((column) => {
        if (typeof column.excel === "boolean" && column.excel === false) {
          return;
        }
        const colName = column.noTranslateHeader
          ? column.header
          : getI18Ntext(column.header);
        if (typeof column.excel === "undefined") {
          o[colName] = tr[column.value];
          return;
        }

        o[colName] = column.excel(tr, tr[column.value], k);
      });

      const { origin_name, tracking, boxes } = tr;

      return {
        "Nº Tracking": tracking || "-",
        "Ciudad de origen": origin_name,
        "Cantidad de Cajas": boxes?.length || 0,
      };
    });

    return {
      list: listOrdered,
      listJSON: listJSONdata,
    };
  }, [columns, dataSearched, order, downloadExcel]);

  return {
    order,
    setOrder,
    searchValue,
    setSearchValue,
    list,
    listJSON,
  };
};

export default useTable;
