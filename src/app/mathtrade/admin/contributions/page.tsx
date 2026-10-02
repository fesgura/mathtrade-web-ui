"use client";
import { useState } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import Button from "@/components/button";
import Modal from "@/components/modal";
import I18N, { getI18Ntext } from "@/i18n";
import { formatAmount } from "@/app/mathtrade/my-data/ContributionBox";
import useContributionsReview, { ContributionRow } from "./useContributionsReview";

const selectClass = "border border-stroke rounded-md p-2 text-sm bg-white";

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
    reject,
    rejecting,
    setRejecting,
    viewReceipt,
  } = useContributionsReview();

  return (
    <>
      <PageHeader title="title.AdminContributions" variant="minimal" />
      <SectionCommon loading={loading}>
        <div className="md:px-7 px-3 py-7">
          <div className="flex flex-wrap items-center gap-3 mb-5">
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
              {["pending", "approved", "rejected", ""].map((value) => (
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
          </div>

          <ErrorAlert error={error} />

          {contributions.length === 0 && !loading ? (
            <p className="text-gray-500">
              <I18N id="adminContributions.empty" />
            </p>
          ) : null}

          {contributions.map((row) => (
            <div key={row.id} className="border border-stroke rounded-lg p-4 mb-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="text-sm">
                  <p className="font-bold text-base">
                    {row.first_name} {row.last_name}{" "}
                    <span className="font-normal text-gray-500">({row.bgg_user})</span>
                  </p>
                  <p>{row.email}{row.location ? ` · ${row.location}` : ""}</p>
                  <p>
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
                  <Button sm outline type="button" onClick={() => viewReceipt(row)}>
                    <I18N id="adminContributions.viewReceipt" />
                  </Button>
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
          ))}
        </div>
      </SectionCommon>
      <RejectModal row={rejecting} onClose={() => setRejecting(null)} onReject={reject} />
    </>
  );
};

export default ContributionsReviewPage;
