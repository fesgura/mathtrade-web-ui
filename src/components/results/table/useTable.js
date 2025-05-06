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
      const { item_to, member_to, item_from, member_from } = result;

      if (keyLow === "") {
        return true;
      }
      return (
        normalizeString(
          `${item_to?.title || ""} ${member_to?.first_name || ""} ${
            member_to?.last_name || ""
          } ${member_to?.location?.name || ""} ${item_from?.title || ""} ${
            member_from?.first_name || ""
          } ${member_from?.last_name || ""} ${
            member_from?.location?.name || ""
          }`
        ).indexOf(keyLow) >= 0
      );
    });
  }, [MathTradeResults, searchValue]);

  const list = useMemo(() => {
    return MathTradeResultsUnordered.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "item_to":
          return a?.item_to?.title < b?.item_to?.title ? -1 * dir : dir;
        case "member_to":
          return a?.member_to?.last_name < b?.member_to?.last_name
            ? -1 * dir
            : dir;
        case "item_from":
          return a?.item_from?.title < b?.item_from?.title ? -1 * dir : dir;
        case "member_from":
          return a?.member_from?.last_name < b?.member_from?.last_name
            ? -1 * dir
            : dir;
        default:
          return 1; //a.last_name < b.last_name ? -1 * dir : dir;
      }
    });
  }, [MathTradeResultsUnordered, order]);

  return {
    list,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  };
};

export default useTable;
