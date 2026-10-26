import I18N from "@/i18n";
import Avatar from "@/components/avatar";
import CommitmentPill from "./commitmentPill";
import type { ParticipantRow } from "./types";

type Props = {
  row: ParticipantRow;
  showCommitment: boolean;
  showTrades: boolean;
};

// A participant below sm, where the table is hidden.
const ParticipantCard = ({ row, showCommitment, showTrades }: Props) => (
  <li className="rounded-lg bg-white border border-stroke shadow-sm p-3">
    <div className="flex items-center gap-3">
      <div className="shrink-0">
        <Avatar avatar={row.avatar} first_name={row.first_name} />
      </div>
      <div className="min-w-0">
        <div className="font-semibold truncate">{`${row.first_name} ${row.last_name}`.trim()}</div>
        <div className="text-sm text-gray-500 truncate">{row.location?.name || "-"}</div>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
      <span>
        <span className="text-gray-500">
          <I18N id="result.userTable.ready_items" />
        </span>{" "}
        <span className="font-semibold">{row.ready_items ?? 0}</span>
      </span>
      {showCommitment ? (
        <span className="inline-flex items-center gap-1">
          <span className="text-gray-500">
            <I18N id="result.userTable.commitment" />
          </span>
          <CommitmentPill commitment={row.commitment} />
        </span>
      ) : null}
      {showTrades ? (
        <span>
          <span className="text-gray-500">
            <I18N id="result.userTable.tradesShort" />
          </span>{" "}
          <span className="font-semibold">{row.trades ?? 0}</span>
        </span>
      ) : null}
    </div>
  </li>
);

export default ParticipantCard;
