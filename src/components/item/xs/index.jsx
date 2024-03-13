import { ItemContextProvider } from "@/context/item";
import ItemXSUI from "./ui";

const ItemXS = ({
  itemRaw,
  hideUser,
  hideValue,
  extraContent,
  className,
  dark,
}) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemXSUI
        extraContent={extraContent}
        className={className}
        dark={dark}
        hideUser={hideUser}
        hideValue={hideValue}
      />
    </ItemContextProvider>
  );
};

export default ItemXS;
