import { useContext } from "react";
import I18N from "@/i18n";
import { ItemContext, ItemContextProvider } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import Previewer from "@/components/previewer";
import Avatar from "@/components/avatar";

const ItemChangeUI = ({ delivered, received }) => {
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
      {delivered ? (
        <div className="bg-red-600 text-white font-bold text-[10px] leading-normal rounded px-2">
          <I18N id="delivered.already" />
        </div>
      ) : null}
      {received ? (
        <div className="bg-green-600 text-white font-bold text-[10px] leading-normal rounded px-2">
          <I18N id="received.already" />
        </div>
      ) : null}
      <Previewer className="w-6 h-6 rounded-full" />
    </div>
  );
};

const ItemChange = ({ item, delivered, received }) => {
  return item ? (
    <ItemContextProvider itemRaw={item}>
      <ItemChangeUI delivered={delivered} received={received} />
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

const columns = [
  {
    header: "result.table.item_to",
    value: "item_to",
    sort: (a, b, dir) => {
      return a?.item_to?.title < b?.item_to?.title ? -1 * dir : dir;
    },
    render: (_, item_to) => {
      return <ItemChange item={item_to} />;
    },
    excel: ({ item_to }) => {
      return item_to?.title || "-";
    },
  },
  {
    header: "result.table.member_to",
    value: "membership_to",
    sort: (a, b, dir) => {
      return a?.membership_to?.last_name < b?.membership_to?.last_name
        ? -1 * dir
        : dir;
    },
    render: (_, membership_to) => {
      if (!membership_to) {
        return "-";
      }
      return <UserChange user={membership_to} />;
    },
    excel: ({ membership_to }) => {
      return `${membership_to?.first_name} ${membership_to?.last_name} (${membership_to?.location?.name})`;
    },
  },
  {
    header: "result.table.item_from",
    value: "item_from",
    sort: (a, b, dir) => {
      return a?.item_to?.title < b?.item_to?.title ? -1 * dir : dir;
    },
    render: (_, item_from) => {
      return <ItemChange item={item_from} />;
    },
    excel: ({ item_from }) => {
      return item_from?.title || "-";
    },
  },
  {
    header: "result.table.member_from",
    value: "membership_from",
    sort: (a, b, dir) => {
      return a?.membership_from?.last_name < b?.membership_from?.last_name
        ? -1 * dir
        : dir;
    },
    render: (_, membership_from) => {
      if (!membership_from) {
        return "-";
      }
      return <UserChange user={membership_from} />;
    },
    excel: ({ membership_from }) => {
      return `${membership_from?.first_name} ${membership_from?.last_name} (${membership_from?.location?.name})`;
    },
  },
];

export default columns;
