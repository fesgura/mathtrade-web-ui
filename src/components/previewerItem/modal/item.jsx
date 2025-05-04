import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { ItemContextProvider } from "@/context/item";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import ItemUI from "./ui";

const ItemPreview = ({ id }) => {
  /* LOAD ITEM ***************************/

  const urlParamsItem = useMemo(() => {
    return [id || ""];
  }, [id]);

  const [, itemRaw, loading, error] = useFetch({
    endpoint: "GET_ITEM",
    initialState: null,
    urlParams: urlParamsItem,
    autoLoad: true,
  });

  /* end LOAD ITEM ***************************/

  return (
    <div className="min-h-[240px]">
      {itemRaw ? (
        <ItemContextProvider itemRaw={itemRaw}>
          <ItemUI />
        </ItemContextProvider>
      ) : null}
      <ErrorAlert error={error} className="mt-7" />
      <LoadingBox loading={loading} />
    </div>
  );
};

export default ItemPreview;
