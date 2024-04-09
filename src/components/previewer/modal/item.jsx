import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { ItemContextProvider } from "@/context/item";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import ItemXL from "@/components/item/item-grid/item-grid-ui/xl";
import ItemUI from "./ui";

const ItemPreview = ({ id }) => {
  /* LOAD ITEM ***************************/

  const { urlParamsItem, reported } = useMemo(() => {
    if (!id) {
      return {
        urlParamsItem: [],
        reported: false,
      };
    }
    const idArr = `${id}`.split("___");
    return {
      urlParamsItem: [parseInt(idArr[0] || "0", 10)],
      reported: idArr[1] && idArr[1] === "reported",
    };
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
        <ItemContextProvider itemRaw={{ ...itemRaw, reported }}>
          <ItemUI />
        </ItemContextProvider>
      ) : null}
      <ErrorAlert error={error} className="mt-7" />
      <LoadingBox loading={loading} />
    </div>
  );
};

export default ItemPreview;
