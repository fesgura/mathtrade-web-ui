import { useState, useMemo, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { normalizeString } from "@/utils";
import { PageContext } from "@/context/page";

const useUserTable = () => {
  const [searchValue, setSearchValue] = useState("");

  const { referrer } = useContext(PageContext);

  const location = 2;

  const [order, setOrder] = useState("name");

  const params = useMemo(() => {
    return { location: referrer?.id };
  }, [referrer]);

  const [, listRaw, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    params,
    autoLoad: true,
  });

  const listSearched = useMemo(() => {
    if (!listRaw || !listRaw.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return listRaw.filter((user) => {
      const { first_name, last_name, email, telegram, bgg_user } = user;

      if (keyLow === "") {
        return true;
      }
      return (
        normalizeString(
          `${first_name || ""} ${last_name || ""} ${email || ""} ${
            telegram || ""
          } ${bgg_user || ""}`
        ).indexOf(keyLow) >= 0
      );
    });
  }, [listRaw, searchValue]);

  const list = useMemo(() => {
    return listSearched.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "name":
          return a?.last_name < b?.last_name ? -1 * dir : dir;

        case "telegram":
          return a?.telegram < b?.telegram ? -1 * dir : dir;

        case "email":
          return a?.email < b?.email ? -1 * dir : dir;

        case "bgg_user":
          return a?.bgg_user < b?.bgg_user ? -1 * dir : dir;

        case "location":
          return a?.location?.name < b?.location?.name ? -1 * dir : dir;
        case "commitment_datetime":
          const aDate = new Date(a?.commitment_datetime);
          const bDate = new Date(b?.commitment_datetime);
          return aDate < bDate ? -1 * dir : dir;

        case "items":
          return a?.items < b?.items ? -1 * dir : dir;
        case "trades":
          return a?.trades < b?.trades ? -1 * dir : dir;

        case "commitment":
          return a?.commitment < b?.commitment ? -1 * dir : dir;
        default:
          return 1;
      }
    });
  }, [listSearched, order]);

  return {
    list,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
    cityName: referrer?.name || "",
  };
};

export default useUserTable;
