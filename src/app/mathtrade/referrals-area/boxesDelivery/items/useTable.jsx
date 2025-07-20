import { BoxDeliveryContext } from "@/context/boxDelivery";
import { useMemo, useContext } from "react";
import { codeNumToString } from "@/context/boxDelivery/utils";

const useTable = () => {
  const { itemListRaw, loading, error } = useContext(BoxDeliveryContext);

  const itemTable = useMemo(() => {
    return itemListRaw.map(({ boxNumber, destinyName, itemRaw }) => {
      const { id, assigned_trade_code, full_name, title } = itemRaw;

      return {
        id,
        assigned_trade_code: codeNumToString(assigned_trade_code),
        user: `${full_name}`,
        last_name,
        title,
        boxNumber,
        destinyName,
      };
    });
  }, [itemListRaw]);

  return {
    itemTable,
    loading,
    error,
  };
};

export default useTable;
