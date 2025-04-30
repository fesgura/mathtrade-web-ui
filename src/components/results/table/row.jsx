import { useRef, useMemo, useContext, useCallback } from "react";
import { ItemContext, ItemContextProvider } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import Previewer from "@/components/previewer";
import Avatar from "@/components/avatar";

const ItemChangeUI = () => {
  const { item } = useContext(ItemContext);
  const { title, elements } = item;

  return (
    <div className="flex items-center gap-2">
      <Thumbnail
        elements={[elements?.[0]?.element]}
        className="w-6 rounded-md"
      />
      <h4
        className="text-[10px] leading-3 font-bold cropped cursor-default"
        title={title}
      >
        {title}
      </h4>
      <Previewer className="w-6 h-6 rounded-full" />
    </div>
  );
};

const ItemChange = ({ item }) => {
  return item ? (
    <ItemContextProvider itemRaw={item}>
      <ItemChangeUI />
    </ItemContextProvider>
  ) : null;
};

const UserChange = ({ user }) => {
  const { avatar, location, first_name, last_name } = user;

  return (
    <div className="flex items-center gap-2">
      <div className="w-6">
        <Avatar avatar={avatar} width="100%" />
      </div>
      <div className="">
        <div className="cropped leading-none font-bold text-[10px]">{`${first_name} ${last_name}`}</div>
        <div className="text-gray-600 leading-none text-[11px]">
          {location?.name || ""}
        </div>
      </div>
    </div>
  );
};

const Row = ({ result }) => {
  const { item_to, membership_to, item_from, membership_from } = result;

  return (
    <tr className="hover:bg-primary/20 border-b border-gray-300">
      <td className="py-1 px-3">
        <ItemChange item={item_to} />
      </td>
      <td className="py-1 px-3 border-r-2 border-gray-300">
        <UserChange user={membership_to} />
      </td>
      <td className="py-1 px-3">
        <ItemChange item={item_from} />
      </td>
      <td className="py-1 px-3">
        <UserChange user={membership_from} />
      </td>
    </tr>
  );
};

export default Row;
