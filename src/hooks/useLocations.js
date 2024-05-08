import { useStore } from "@/store";
import { useCallback } from "react";
import useFetch from "@/hooks/useFetch";

const useLocations = () => {
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
    autoLoad: true,
  });
};

export default useLocations;
