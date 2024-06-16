import { useStore } from "@/store";
import { useCallback, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const useLocations = (enableRender) => {
  const updateStore = useStore((state) => state.updateStore);

  const afterLoad = useCallback(
    (newLocations) => {
      updateStore("locations", newLocations);
    },
    [updateStore]
  );

  const [getLocations] = useFetch({
    endpoint: "GET_LOCATIONS",
    initialState: [],
    afterLoad,
  });

  useEffect(() => {
    if (enableRender) {
      getLocations();
    }
  }, [enableRender, getLocations]);
};

export default useLocations;
