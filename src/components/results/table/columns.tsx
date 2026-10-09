"use client";
import { useContext } from "react";
import clsx from "clsx";
import I18N from "@/i18n";
import { ResultsContext } from "@/context/results";
import { ItemContext, ItemContextProvider } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import Previewer from "@/components/previewer";
import Chip from "@/components/chip";
import { NewUserBadge, useAdminUser } from "@/components/adminUserModal";

const ItemChangeUI = ({
  delivered = false,
  received = false,
}: {
  delivered?: boolean;
  received?: boolean;
}) => {
  const { item } = useContext(ItemContext);
  const { title, elements } = item || {};
  const { customMathtradeId } = useContext(ResultsContext);
  const first = elements?.[0]?.element;

  return (
    <div className="flex items-center gap-2 min-w-0">
      <Thumbnail
        elements={[{ thumbnail: first?.thumbnail, name: first?.name || title }]}
        className="w-8 rounded-md shrink-0"
        contain
      />
      <h4 className="text-body font-semibold line-clamp-2 cursor-default min-w-0" title={title}>
        {title}
      </h4>
      {received ? (
        <Chip tone="want">
          <I18N id="received.already" />
        </Chip>
      ) : null}
      {delivered ? (
        <Chip tone="done">
          <I18N id="delivered.already" />
        </Chip>
      ) : null}
      <Previewer
        className="w-6 h-6 rounded-full shrink-0"
        customMathtradeId={customMathtradeId}
      />
    </div>
  );
};

const ItemChange = ({
  item = null,
  delivered = false,
  received = false,
}: {
  item?: any;
  delivered?: boolean;
  received?: boolean;
}) => {
  return item ? (
    <ItemContextProvider itemRaw={item}>
      <ItemChangeUI delivered={delivered} received={received} />
    </ItemContextProvider>
  ) : null;
};

const UserChange = ({ user = null }: { user?: any }) => {
  const { isNewUser } = useAdminUser();
  if (!user) {
    return <span className="text-gray-400">—</span>;
  }
  // membership id = the user id
  const { id, location, first_name, last_name } = user;
  return (
    <div className="text-body">
      <div className={clsx("font-semibold", { "text-violet-700": isNewUser(id) })}>
        {`${first_name || ""} ${last_name || ""}`.trim()}
        <NewUserBadge userId={id} />
      </div>
      {location?.name ? (
        <div className="text-caption text-gray-500">{location.name}</div>
      ) : null}
    </div>
  );
};

const columns = [
  {
    header: "result.table.item_from",
    value: "item_from",
    sort: (a, b, dir) =>
      a?.item_from?.title < b?.item_from?.title ? -1 * dir : dir,
    render: (result, item_from) => {
      return (
        <ItemChange item={item_from} received={result?.received} />
      );
    },
    excel: ({ item_from }) => item_from?.title || "-",
  },
  {
    header: "result.table.member_from",
    value: "membership_from",
    sort: (a, b, dir) =>
      a?.membership_from?.last_name < b?.membership_from?.last_name
        ? -1 * dir
        : dir,
    render: (_, membership_from) => <UserChange user={membership_from} />,
    excel: ({ membership_from }) =>
      membership_from
        ? `${membership_from.first_name} ${membership_from.last_name} (${membership_from?.location?.name || ""})`
        : "-",
  },
  {
    header: "result.table.item_to",
    value: "item_to",
    sort: (a, b, dir) =>
      a?.item_to?.title < b?.item_to?.title ? -1 * dir : dir,
    render: (result, item_to) => {
      return <ItemChange item={item_to} delivered={result?.delivered} />;
    },
    excel: ({ item_to }) => item_to?.title || "-",
  },
  {
    header: "result.table.member_to",
    value: "membership_to",
    sort: (a, b, dir) =>
      a?.membership_to?.last_name < b?.membership_to?.last_name
        ? -1 * dir
        : dir,
    render: (_, membership_to) => <UserChange user={membership_to} />,
    excel: ({ membership_to }) =>
      membership_to
        ? `${membership_to.first_name} ${membership_to.last_name} (${membership_to?.location?.name || ""})`
        : "-",
  },
];

export default columns;
