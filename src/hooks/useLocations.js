import { useStore } from "@/store";
import { useCallback } from "react";
import useFetch from "@/hooks/useFetch";

const useLocations = () => {
  const token = useStore((state) => state.data.auth.token);
  const locations = useStore((state) => state.locations);
  const updateStore = useStore((state) => state.updateStore);

  const afterLoad = useCallback(
    (newLocations) => {
      updateStore("locations", newLocations);
    },
    [updateStore]
  );

  useFetch({
    endpoint: "GET_LOCATIONS",
    initialState: [],
    afterLoad,
    autoLoad: token && !locations,
  });
};

export default useLocations;
