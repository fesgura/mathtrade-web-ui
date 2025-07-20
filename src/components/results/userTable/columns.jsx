import I18N, { getI18Ntext } from "@/i18n";
import useUserTable from "./useUserTable";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { DateIntlFormat } from "@/utils/dateUtils";
import XlsButtonBtn from "@/components/xlsButton";
import { render } from "@react-pdf/renderer";

const columns = [
  {
    header: "result.userTable.name",
    value: "name",
    sort: (a, b, dir) => {
      return a?.last_name < b?.last_name ? -1 * dir : dir;
    },
    excel: ({ full_name}) => {
      return `${full_name}`;
    },
    render: ({ avatar, first_name, last_name }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            <Avatar avatar={avatar} />
          </div>

          <div>
            <div className="font-bold leading-none">{`${full_name}`}</div>
          </div>
        </div>
      );
    },
  },
  {
    header: "result.userTable.location",
    value: "location",
    sort: (a, b, dir) => {
      return a?.location?.name < b?.location?.name ? -1 * dir : dir;
    },
    excel: (_, location) => {
      return location?.name || "-";
    },
    render: (_, location) => {
      return location?.name || "-";
    },
  },
  {
    header: "result.userTable.items",
    value: "items",
    sort: (a, b, dir) => {
      return parseInt(a?.items, 10) < parseInt(b?.items, 10) ? -1 * dir : dir;
    },
    excel: (_, items) => {
      return items || 0;
    },
    render: (_, items) => {
      return items || "0";
    },
  },
  {
    header: "result.userTable.trades",
    value: "trades",
    sort: (a, b, dir) => {
      return parseInt(a?.trades, 10) < parseInt(b?.trades, 10) ? -1 * dir : dir;
    },
    excel: (_, trades) => {
      return trades || 0;
    },
    render: (_, trades) => {
      return trades || "0";
    },
  },
  {
    header: "result.userTable.commitment_datetime",
    value: "commitment_datetime",
    sort: true,
    excel: (_, commitment_datetime) => {
      return commitment_datetime ? DateIntlFormat(commitment_datetime) : "-";
    },
    render: (_, commitment_datetime) => {
      return commitment_datetime ? DateIntlFormat(commitment_datetime) : "-";
    },
  },
  {
    header: "result.userTable.commitment",
    value: "commitment",
    sort: true,
    excel: (_, commitment) => {
      return commitment ? getI18Ntext("Yes") : getI18Ntext("No");
    },
    render: (_, commitment) => {
      return commitment ? getI18Ntext("Yes") : getI18Ntext("No");
    },
  },
];
export default columns;
