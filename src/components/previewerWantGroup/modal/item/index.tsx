import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { ItemContextProvider } from "@/context/item";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import { useMemo } from "react";
import ItemUI from "./ui";

type WantGroupPreview = {
  id: number;
  name?: string;
  wants?: { id?: number }[];
};

const ItemPreview = ({ wantGroup = null }: { wantGroup?: WantGroupPreview | null }) => {
  /* LOAD ITEM ***************************/

  // A withdrawal can leave an item want with no copies (the group stays):
  // there is nothing to load, so don't request items/<empty>/.
  const itemId = wantGroup?.wants?.[0]?.id || null;

  const urlParamsItem = useMemo(() => [itemId], [itemId]);

  const [, itemRaw, loading, error] = useFetch({
    endpoint: "GET_ITEM",
    initialState: null,
    urlParams: urlParamsItem,
    autoLoad: !!itemId,
  });

  /* end LOAD ITEM ***************************/

  if (!itemId) {
    return (
      <div className="min-h-[120px] pt-7">
        {wantGroup?.name ? (
          <h3 className="text-lg font-bold mb-3">{wantGroup.name}</h3>
        ) : null}
        <p className="rounded-md border border-amber-300 bg-amber-50 text-amber-950 text-sm p-3">
          <I18N id="previewWantGroup.empty" />
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[240px]">
      {itemRaw ? (
        <ItemContextProvider itemRaw={itemRaw}>
          <ItemUI wantGroup={wantGroup} />
        </ItemContextProvider>
      ) : null}
      <ErrorAlert error={error} className="mt-7" />
      <LoadingBox loading={loading} />
    </div>
  );
};

export default ItemPreview;
