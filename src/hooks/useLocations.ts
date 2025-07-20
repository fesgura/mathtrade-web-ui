import { useStore } from "@/store";
import { StoreState } from "@/store/types";
import { useCallback } from "react";
import useFetch from "./useFetch";

const useLocations = () => {
  const updateStore = useStore((state: StoreState) => state.updateStore);

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
    format: undefined,
    beforeLoad: undefined,
    afterError: undefined,
    method: undefined,
    path: undefined,
    urlParams: undefined,
    params: undefined,
    reloadValue: undefined,
  });
};

export default useLocations;
