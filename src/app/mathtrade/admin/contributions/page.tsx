"use client";
import { useState } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import Button from "@/components/button";
import Modal from "@/components/modal";
import ConfirmModal from "@/components/confirmModal";
import I18N, { getI18Ntext } from "@/i18n";
import { formatAmount } from "@/app/mathtrade/my-data/ContributionBox";
import useContributionsReview, {
  ContributionRow,
  MissingRow,
  isMissingRow,
} from "./useContributionsReview";

// Manual approvals and their undo always go through a confirmation.
type PendingConfirm =
  | { kind: "approve"; membershipId: number; name: string }
  | { kind: "undo"; contributionId: number; name: string }
  | null;

// I18N renders text containing "<" as HTML: keep member names as text.
const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fullName = (row: { first_name: string; last_name: string }) =>
  `${row.first_name} ${row.last_name}`.trim();

/* w-full + max-w-full on mobile: native <select> min-width follows the
 * longest option (account holder + alias), which otherwise overflows ~390px. */
const selectClass =
  "border border-stroke rounded-md p-2 text-sm bg-white w-full sm:w-auto max-w-full min-w-0";

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }) : "";

const RejectModal = ({
  row,
  onClose,
  onReject,
}: {
  row: ContributionRow | null;
  onClose: () => void;
  onReject: (row: ContributionRow, reason: string, resubmit: boolean) => void;
}) => {
  const [reason, setReason] = useState("");
  return (
    <Modal size="sm" isOpen={!!row} onClose={onClose}>
      {row ? (
        <div>
          <h3 className="text-xl mb-2 font-bold text-center">
            <I18N id="adminContributions.rejectTitle" />
          </h3>
          <p className="text-sm text-gray-600 mb-3 text-center">
            {row.first_name} {row.last_name}
          </p>
          <textarea
            className="w-full border border-stroke rounded-md p-2 text-sm mb-3"
            rows={3}
            value={reason}
            placeholder={getI18Ntext("adminContributions.reasonPlaceholder")}
            onChange={(e) => setReason(e.target.value)}
          />
          {/* Stacked: three buttons don't fit side by side in a small modal. */}
          <div className="flex flex-col items-stretch gap-2">
            <Button block type="button" color="cancel" outline onClick={onClose}>
              <I18N id="btn.Cancel" />
            </Button>
            <Button
              block
              type="button"
              color="danger"
              outline
              disabled={!reason.trim()}
              onClick={() => {
                onReject(row, reason.trim(), true);
                setReason("");
              }}
            >
              <I18N id="adminContributions.rejectResubmit" />
            </Button>
            <Button
              block
              type="button"
              color="danger"
              disabled={!reason.trim()}
              onClick={() => {
                onReject(row, reason.trim(), false);
                setReason("");
              }}
            >
              <I18N id="adminContributions.rejectFinal" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            <I18N id="adminContributions.rejectHelp" />
          </p>
        </div>
      ) : null}
    </Modal>
  );
};

const ContributionsReviewPage = () => {
  const {
    mathtrades,
    mathtradeId,
    setMathtradeId,
    status,
    setStatus,
    account,
    setAccount,
    accounts,
    contributions,
    loading,
    error,
    approve,
    approveManual,
    undoManual,
    reject,
    rejecting,
    setRejecting,
    viewReceipt,
  } = useContributionsReview();
  const [confirm, setConfirm] = useState<PendingConfirm>(null);

  const mathtrade = mathtrades.find((mt: any) => mt.id === mathtradeId);
  const editionAmount = mathtrade?.contribution_amount
    ? formatAmount(mathtrade.contribution_amount)
    : "";
  const showingMissing = contributions.length > 0 && isMissingRow(contributions[0]);

  const askApprove = (row: MissingRow | ContributionRow) =>
    setConfirm({ kind: "approve", membershipId: row.membership_id, name: fullName(row) });

  const onConfirm = () => {
    if (confirm?.kind === "approve") approveManual(confirm.membershipId);
    if (confirm?.kind === "undo") undoManual(confirm.contributionId);
    setConfirm(null);
  };

  const renderMissing = (row: MissingRow) => (
    <div key={`m-${row.membership_id}`} className="border border-stroke rounded-lg p-4 mb-3">
      <div className="flex flex-wrap items-start justify-between gap-3 min-w-0">
        <div className="text-sm min-w-0 max-w-full break-words">
          <p className="font-bold text-base break-words">
            {row.first_name} {row.last_name}{" "}
            <span className="font-normal text-gray-500">({row.bgg_user})</span>
          </p>
          <p className="break-words">{row.email}{row.location ? ` · ${row.location}` : ""}</p>
          <p className="break-words">
            {row.account ? (
              `→ ${row.account.holder_name} (${row.account.alias})`
            ) : (
              <I18N id="adminContributions.noAccount" />
            )}
          </p>
          <p className="text-gray-500">
            <I18N id={`adminContributions.status.${row.status}`} />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button sm type="button" onClick={() => askApprove(row)}>
            <I18N id="adminContributions.manual.approve" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader title="title.AdminContributions" variant="minimal" />
      <SectionCommon loading={loading}>
        <div className="md:px-7 px-3 py-7">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-5 w-full min-w-0 max-w-full">
            <select
              className={selectClass}
              value={mathtradeId ?? ""}
              onChange={(e) => {
                setMathtradeId(Number(e.target.value));
                setAccount("");
              }}
            >
              {mathtrades.map((mt: any) => (
                <option key={mt.id} value={mt.id}>
                  {mt.name}
                </option>
              ))}
            </select>
            <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
              {["pending", "approved", "rejected", "missing", ""].map((value) => (
                <option key={value} value={value}>
                  {getI18Ntext(`adminContributions.filter.${value || "all"}`)}
                </option>
              ))}
            </select>
            <select className={selectClass} value={account} onChange={(e) => setAccount(e.target.value)}>
              <option value="">{getI18Ntext("adminContributions.filter.allAccounts")}</option>
              {accounts.map((a: any) => (
                <option key={a.id} value={a.id}>
                  {a.holder_name} ({a.alias})
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 shrink-0">
              <I18N
                id={showingMissing ? "adminContributions.countMissing" : "adminContributions.count"}
                values={[contributions.length]}
              />
            </p>
          </div>

          <ErrorAlert error={error} />

          {contributions.length === 0 && !loading ? (
            <p className="text-gray-500">
              <I18N id="adminContributions.empty" />
            </p>
          ) : null}

          {contributions.map((row) =>
            isMissingRow(row) ? renderMissing(row) : (
            <div key={row.id} className="border border-stroke rounded-lg p-4 mb-3">
              <div className="flex flex-wrap items-start justify-between gap-3 min-w-0">
                <div className="text-sm min-w-0 max-w-full break-words">
                  <p className="font-bold text-base break-words">
                    {row.first_name} {row.last_name}{" "}
                    <span className="font-normal text-gray-500">({row.bgg_user})</span>
                    {row.manual ? (
                      <span className="ml-2 align-middle text-xs font-semibold uppercase rounded px-2 py-0.5 bg-gray-200 text-gray-700">
                        <I18N id="adminContributions.manual.badge" />
                      </span>
                    ) : null}
                  </p>
                  <p className="break-words">{row.email}{row.location ? ` · ${row.location}` : ""}</p>
                  <p className="break-words">
                    {formatAmount(row.amount)} → {row.account.holder_name} ({row.account.alias})
                  </p>
                  <p className="text-gray-500">
                    <I18N id={`adminContributions.status.${row.status}`} /> · {formatDate(row.submitted_at)}
                    {row.reviewed_by ? ` · ${row.reviewed_by}` : ""}
                  </p>
                  {row.status === "rejected" && row.rejection_reason ? (
                    <p className="text-danger">
                      {row.rejection_reason}
                      {!row.resubmit_allowed ? (
                        <strong>
                          {" "}
                          (<I18N id="adminContributions.final" />)
                        </strong>
                      ) : null}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {row.manual ? (
                    row.status === "approved" ? (
                      <Button
                        sm
                        outline
                        type="button"
                        color="danger"
                        onClick={() =>
                          setConfirm({ kind: "undo", contributionId: row.id, name: fullName(row) })
                        }
                      >
                        <I18N id="adminContributions.manual.undo" />
                      </Button>
                    ) : null
                  ) : (
                    <Button sm outline type="button" onClick={() => viewReceipt(row)}>
                      <I18N id="adminContributions.viewReceipt" />
                    </Button>
                  )}
                  {row.status === "rejected" ? (
                    // The API refuses it if a newer receipt is pending/approved.
                    <Button sm outline type="button" onClick={() => askApprove(row)}>
                      <I18N id="adminContributions.manual.approve" />
                    </Button>
                  ) : null}
                  {row.status === "pending" ? (
                    <>
                      <Button sm type="button" onClick={() => approve(row)}>
                        <I18N id="adminContributions.approve" />
                      </Button>
                      <Button sm type="button" color="danger" onClick={() => setRejecting(row)}>
                        <I18N id="adminContributions.reject" />
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            )
          )}
        </div>
      </SectionCommon>
      <RejectModal row={rejecting} onClose={() => setRejecting(null)} onReject={reject} />
      <ConfirmModal
        isOpen={!!confirm}
        onCancel={() => setConfirm(null)}
        onConfirm={onConfirm}
        title={
          confirm?.kind === "undo"
            ? "adminContributions.manual.undoConfirm"
            : "adminContributions.manual.confirmTitle"
        }
        description={
          confirm?.kind === "undo"
            ? "adminContributions.manual.undoText"
            : "adminContributions.manual.confirmText"
        }
        descriptionValues={
          confirm?.kind === "undo"
            ? [escapeHtml(confirm.name)]
            : [escapeHtml(confirm?.name || ""), editionAmount]
        }
      />
    </>
  );
};

export default ContributionsReviewPage;
