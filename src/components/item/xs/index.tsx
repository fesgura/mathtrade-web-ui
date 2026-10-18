import type { ReactNode } from "react";
import { ItemContextProvider } from "@/context/item";
import ItemXSUI from "./ui";

type ItemXSProps = {
  itemRaw?: any;
  hideUser?: boolean;
  hideValue?: boolean;
  hidePreview?: boolean;
  extraContent?: ReactNode;
  className?: string;
  excluded?: boolean;
};

const ItemXS = ({
  itemRaw = null,
  hideUser = false,
  hideValue = false,
  hidePreview = false,
  extraContent = null,
  className = "",
  excluded = false,
}: ItemXSProps) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemXSUI
        extraContent={extraContent}
        className={className}
        excluded={excluded}
        hideUser={hideUser}
        hideValue={hideValue}
        hidePreview={hidePreview}
      />
    </ItemContextProvider>
  );
};

export default ItemXS;
