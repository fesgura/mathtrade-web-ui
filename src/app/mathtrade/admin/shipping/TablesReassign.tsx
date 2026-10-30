"use client";
import { useMemo, useState } from "react";
import Button from "@/components/button";
import ConfirmModal from "@/components/confirmModal";
import ErrorAlert from "@/components/errorAlert";
import I18N, { getI18Ntext } from "@/i18n";
import useFetch from "@/hooks/useFetch";
import TablesList, { NO_TABLE, indexRows } from "./TablesList";
import type { TableListRow } from "./TablesList";
import type { HubTable, HubTables, TablesParams } from "./types";

type Form = { tables: string; max: string; threshold: string };
type Body = {
  tables: number;
  max_items_per_table: number | null;
  big_user_threshold: number;
};

const toForm = (params: TablesParams | null): Form => ({
  tables: params ? String(params.tables) : "",
  max: params?.max_items_per_table ? String(params.max_items_per_table) : "",
  threshold: params ? String(params.big_user_threshold) : "",
});

const intOf = (text: string) => (/^\s*\d+\s*$/.test(text) ? Number(text) : NaN);

// The form as a request body, or the i18n id of what's wrong with it.
const toBody = (form: Form): Body | string => {
  const tables = intOf(form.tables);
  if (!(tables >= 1)) return "adminShipping.tables.reassign.invalidTables";
  const max = form.max.trim() ? intOf(form.max) : null;
  if (max !== null && !(max >= 1)) return "adminShipping.tables.reassign.invalidMax";
  const threshold = intOf(form.threshold);
  if (!(threshold >= 0)) return "adminShipping.tables.reassign.invalidThreshold";
  return { tables, max_items_per_table: max, big_user_threshold: threshold };
};

export const hubTableRows = (tables: HubTable[] = []): TableListRow[] =>
  tables.map((row) => ({
    table: row.table || NO_TABLE,
    items: row.items,
    receivers: row.users,
    members: row.members.map((member) => ({
      key: String(member.id),
      name: member.name,
      username: member.username,
      items: member.items,
    })),
  }));

const inputClass = "border border-stroke rounded-md p-2 text-sm bg-white w-full sm:w-28";

// "Reasignar mesas": new parameters → preview (dry run) → apply, after a
// confirmation. Apply is only offered for the values that were previewed.
const TablesReassign = ({
  params = null,
  onApplied = () => {},
}: {
  params?: TablesParams | null;
  onApplied?: () => void;
}) => {
  const [form, setForm] = useState<Form>(() => toForm(params));
  const [previewKey, setPreviewKey] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const body = toBody(form);
  const invalid = typeof body === "string" ? body : null;
  const bodyKey = invalid ? null : JSON.stringify(body);

  const [preview, previewData, previewing, previewError] = useFetch({
    endpoint: "POST_SHIPPING_TABLES",
    method: "POST",
  });
  const [apply, , applying, applyError] = useFetch({
    endpoint: "POST_SHIPPING_TABLES",
    method: "POST",
    afterLoad: onApplied,
  });

  const proposal = previewKey ? (previewData as HubTables | null) : null;
  const proposalRows = useMemo(
    () => indexRows(hubTableRows(proposal?.tables)),
    [proposal]
  );
  const proposalItems = proposalRows.reduce((total, row) => total + row.items, 0);
  const canApply = !!proposal && previewKey === bodyKey && !applying;

  const field = (key: keyof Form, labelId: string, helpId: string | null = null) => (
    <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
      <I18N id={labelId} />
      <input
        type="text"
        inputMode="numeric"
        className={inputClass}
        value={form[key]}
        onChange={(e) => {
          const { value } = e.target;
          setForm((current) => ({ ...current, [key]: value }));
        }}
      />
      {helpId ? (
        <span className="text-gray-400">
          <I18N id={helpId} />
        </span>
      ) : null}
    </label>
  );

  return (
    <div className="border border-gray-200 rounded-md p-3 sm:p-4 mb-6">
      <h2 className="font-semibold mb-1">
        <I18N id="adminShipping.tables.reassign.title" />
      </h2>
      <p className="text-xs text-gray-500 mb-3">
        <I18N id="adminShipping.tables.reassign.help" />
      </p>
      <div className="flex flex-wrap items-start gap-3 mb-3">
        {field("tables", "adminShipping.tables.reassign.tables")}
        {field("max", "adminShipping.tables.reassign.max", "adminShipping.tables.reassign.maxHelp")}
        {field(
          "threshold",
          "adminShipping.tables.reassign.threshold",
          "adminShipping.tables.reassign.thresholdHelp"
        )}
      </div>
      {invalid ? <p className="text-xs text-red-600 mb-2">{getI18Ntext(invalid)}</p> : null}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Button
          type="button"
          sm
          outline
          disabled={!!invalid || previewing || applying}
          onClick={() => {
            if (invalid) return;
            const key = bodyKey;
            setPreviewKey(null);
            preview({ params: { ...(body as Body), dry_run: true } }).then((data) => {
              if (data) setPreviewKey(key);
            });
          }}
        >
          <I18N id="adminShipping.tables.reassign.preview" />
        </Button>
        <Button type="button" sm disabled={!canApply} onClick={() => setConfirming(true)}>
          <I18N id="adminShipping.tables.reassign.apply" />
        </Button>
        {proposal && !canApply && !applying ? (
          <span className="text-xs text-gray-500">
            <I18N id="adminShipping.tables.reassign.stale" />
          </span>
        ) : null}
      </div>
      <ErrorAlert error={previewError || applyError} />
      {proposal ? (
        <>
          <p className="text-sm text-gray-600 mb-2">
            <I18N
              id="adminShipping.tables.reassign.summary"
              values={[proposal.params.tables, proposalItems]}
            />
          </p>
          <TablesList rows={proposalRows} />
        </>
      ) : null}
      <ConfirmModal
        isOpen={confirming}
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          if (!invalid) apply({ params: { ...(body as Body), dry_run: false } });
        }}
        title="adminShipping.tables.reassign.confirmTitle"
        description="adminShipping.tables.reassign.confirmDescription"
        confirmId="adminShipping.tables.reassign.confirm"
        variant="danger"
      />
    </div>
  );
};

export default TablesReassign;
