import I18N, { getI18Ntext } from "@/i18n";
import Avatar from "@/components/avatar";
import { DateIntlFormat } from "@/utils/dateUtils";

const columns = [
  {
    header: "result.userTable.name",
    value: "name",
    sort: (a, b, dir) => {
      return a?.last_name < b?.last_name ? -1 * dir : dir;
    },
    excel: ({ first_name, last_name }) => {
      return `${first_name} ${last_name}`;
    },
    render: ({ avatar, first_name, last_name, items }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            <Avatar avatar={avatar} />
          </div>

          <div>
            <div className="font-bold leading-none">{`${first_name} ${last_name}`}</div>

            {items === 0 ? (
              <div className="uppercase font-bold leading-none text-xs text-red-600">
                Fuera del MT
              </div>
            ) : null}
          </div>
        </div>
      );
    },
  },
  {
    header: "result.userTable.phone",
    value: "phone",
    excel: (_, phone) => {
      return phone || "-";
    },
    render: (_, phone) => {
      return phone ? (
        <a href={`tel:${phone}`} className="text-sky-700 underline font-bold">
          {phone}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "result.userTable.telegram",
    value: "telegram",
    excel: (_, telegram) => {
      return telegram || "-";
    },
    sort: true,
    render: (_, telegram) => {
      return telegram ? (
        <a
          href={`https://t.me/${telegram}`}
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 underline font-bold"
        >
          {telegram}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "result.userTable.email",
    value: "email",
    excel: (_, email) => {
      return email || "-";
    },
    sort: true,
    render: (_, email) => {
      return email ? (
        <a
          href={`mailto:${email}`}
          className="text-sky-700 underline font-bold"
        >
          {email}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "result.userTable.bgg_user",
    value: "bgg_user",
    sort: true,
    excel: (_, bgg_user) => {
      return bgg_user || "-";
    },
    render: (_, bgg_user) => {
      return bgg_user ? (
        <a
          href={`https://boardgamegeek.com/user/${bgg_user}`}
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 underline font-bold"
        >
          {bgg_user}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "result.userTable.items",
    value: "items",
    excel: (_, items) => {
      return items || 0;
    },
    sort: (a, b, dir) => {
      return parseInt(a?.items, 10) < parseInt(b?.items, 10) ? -1 * dir : dir;
    },
    render: (_, items) => {
      return items || "0";
    },
  },
  {
    header: "result.userTable.trades",
    value: "trades",
    excel: (_, trades) => {
      return trades || 0;
    },
    sort: (a, b, dir) => {
      return parseInt(a?.trades, 10) < parseInt(b?.trades, 10) ? -1 * dir : dir;
    },
    render: (_, trades) => {
      return trades || "0";
    },
  },
  // {
  //   header: "result.userTable.commitment_datetime",
  //   value: "commitment_datetime",
  //   sort: true,
  //   excel: (_, commitment_datetime) => {
  //     return commitment_datetime ? DateIntlFormat(commitment_datetime) : "-";
  //   },
  //   render: (_, commitment_datetime) => {
  //     return commitment_datetime ? DateIntlFormat(commitment_datetime) : "-";
  //   },
  // },
  {
    header: "result.userTable.commitment",
    value: "commitment",
    sort: true,
    excel: (_, commitment) => {
      return commitment ? getI18Ntext("Yes") : getI18Ntext("No");
    },
    render: ({ items }, commitment) => {
      return items === 0 ? (
        "-"
      ) : commitment ? (
        <I18N id="Yes" />
      ) : (
        <I18N id="No" />
      );
    },
  },
  {
    header: "result.userTable.payment",
    value: "paid",
    sort: true,
    excel: (_, paid) => {
      return paid ? getI18Ntext("Yes") : getI18Ntext("No");
    },
    render: (_, paid) => {
      return paid ? <I18N id="Yes" /> : <I18N id="No" />;
    },
  },
];

export default columns;
