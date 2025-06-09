import { useContext, useState, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import { normalizeString } from "@/utils";

const useTable = () => {
  /* RESULTS CONTEXT *****************************************/
  const { MathTradeResults } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  const [searchValue, setSearchValue] = useState("");

  const [order, setOrder] = useState("name");

  const MathTradeResultsUnordered = useMemo(() => {
    if (!MathTradeResults || !MathTradeResults.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return MathTradeResults.filter((result) => {
      const { item_to, membership_to, item_from, membership_from } = result;

      if (keyLow === "") {
        return true;
      }
      return (
        normalizeString(
          `${item_to?.title || ""} ${membership_to?.first_name || ""} ${
            membership_to?.last_name || ""
          } ${membership_to?.location?.name || ""} ${item_from?.title || ""} ${
            membership_from?.first_name || ""
          } ${membership_from?.last_name || ""} ${
            membership_from?.location?.name || ""
          }`
        ).indexOf(keyLow) >= 0
      );
    });
  }, [MathTradeResults, searchValue]);

  const { list, listJSON } = useMemo(() => {
    const listOrdered = MathTradeResultsUnordered.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "item_to":
          return a?.item_to?.title < b?.item_to?.title ? -1 * dir : dir;
        case "membership_to":
          return a?.membership_to?.last_name < b?.membership_to?.last_name
            ? -1 * dir
            : dir;
        case "item_from":
          return a?.item_from?.title < b?.item_from?.title ? -1 * dir : dir;
        case "membership_from":
          return a?.membership_from?.last_name < b?.membership_from?.last_name
            ? -1 * dir
            : dir;
        default:
          return 1; //a.last_name < b.last_name ? -1 * dir : dir;
      }
    });

    const listJSONdata = listOrdered.map((res) => {
      const { item_to, membership_to, item_from, membership_from } = res;

      return {
        "Ejemplar que ENTREGO": item_to?.title,
        "ENTREGO a": `${membership_to?.first_name} ${membership_to?.last_name} (${membership_to?.location?.name})`,
        "Ejemplar que RECIBO": item_from?.title,
        "Recibo de": `${membership_from?.first_name} ${membership_from?.last_name} (${membership_from?.location?.name})`,
      };
    });

    return { list: listOrdered, listJSON: listJSONdata };
  }, [MathTradeResultsUnordered, order]);

  return {
    list,
    listJSON,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  };
};

export default useTable;
