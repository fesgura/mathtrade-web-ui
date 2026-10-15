import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { ItemContextProvider } from "@/context/item";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import ItemUI from "./ui";
import { ReportablePreviewContext } from "@/components/reportButton";

type ItemPreviewProps = {
  id?: number | string | null;
  customMathtradeId?: number | string | null;
};

const ItemPreview = ({ id = null, customMathtradeId = null }: ItemPreviewProps) => {
  /* LOAD ITEM ***************************/

  const urlParamsItem = useMemo(() => {
    const list = [];
    if (!id) {
      return list;
    }
    if (customMathtradeId) {
      list.push(customMathtradeId);
    }
    list.push(id || 0);

    return list;
  }, [customMathtradeId, id]);

  const [, itemRaw, loading, error] = useFetch({
    endpoint: customMathtradeId ? "GET_ITEM_FROM_HISTORIAL" : "GET_ITEM",
    initialState: null,
    urlParams: urlParamsItem,
    autoLoad: true,
  });

  /* end LOAD ITEM ***************************/

  return (
    <div className="min-h-[240px]">
      {itemRaw ? (
        // The preview modal (item permalinks included) can be opened from any
        // page, so it allows "Reportar" itself instead of relying on the
        // host page's pageType. Past-edition items are never reportable.
        <ReportablePreviewContext.Provider value={!customMathtradeId}>
          <ItemContextProvider itemRaw={itemRaw}>
            <ItemUI />
          </ItemContextProvider>
        </ReportablePreviewContext.Provider>
      ) : null}
      <ErrorAlert error={error} className="mt-7" />
      <LoadingBox loading={loading} />
    </div>
  );
};

export default ItemPreview;
