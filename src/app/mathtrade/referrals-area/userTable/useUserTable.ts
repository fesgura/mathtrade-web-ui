import { useState, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { useReferrerView } from "@/context/referrerView";
import { getI18Ntext } from "@/i18n";

const useUserTable = () => {
  const { isAdmin, viewLocationId, locationName, mathtradeId } =
    useReferrerView();

  // Admins can list the members of every city at once. Without a location
  // param the backend returns the whole edition.
  const [allLocations, setAllLocations] = useState(false);
  const showAll = isAdmin && allLocations;

  const params = useMemo(() => {
    return showAll ? {} : { location: viewLocationId };
  }, [showAll, viewLocationId]);

  const [, listRaw, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    params,
    mathtradeId,
    autoLoad: true,
  });

  const [showOnlyCommiters, setShowOnlyCommiters] = useState(false);

  const list = useMemo(() => {
    if (listRaw.length === 0) {
      return [];
    }

    return listRaw.filter((user) => {
      if (showOnlyCommiters) {
        return user.commitment;
      }
      return true;
    });
  }, [showOnlyCommiters, listRaw]);

  return {
    list,
    loading,
    error,
    cityName: showAll
      ? getI18Ntext("referral.users.allLocationsName")
      : locationName,
    showOnlyCommiters,
    setShowOnlyCommiters,
    isAdmin,
    allLocations: showAll,
    setAllLocations,
  };
};

export default useUserTable;
