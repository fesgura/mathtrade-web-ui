"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { openAuthenticatedFile } from "@/hooks/useFetch/utils";

type AccountRef = { id: number; holder_name: string; alias: string };

export type ContributionRow = {
  id: number;
  membership_id: number;
  user_id: number;
  manual: boolean;
  amount: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason: string;
  resubmit_allowed: boolean;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  account: AccountRef;
  first_name: string;
  last_name: string;
  email: string;
  bgg_user: string;
  location: string | null;
};

// ?status=missing returns memberships with no receipt, not contributions.
export type MissingRow = {
  membership_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  bgg_user: string;
  location: string | null;
  account: AccountRef | null;
  status: "missing" | "rejected";
};

export type ReviewRow = ContributionRow | MissingRow;

// By shape, not by the status filter: right after switching the filter the
// previous list is still shown until the new one loads.
export const isMissingRow = (row: ReviewRow): row is MissingRow => !("id" in row);

const useContributionsReview = () => {
  const activeMathtrade = useStore((state) => state.data?.mathtrade);
  const [mathtradeId, setMathtradeId] = useState<number | null>(
    activeMathtrade?.id ?? null
  );
  const [status, setStatus] = useState("pending");
  const [account, setAccount] = useState("");
  const [rejecting, setRejecting] = useState<ContributionRow | null>(null);

  const [, mathtrades] = useFetch({
    endpoint: "GET_MATHTRADES",
    initialState: [],
    autoLoad: true,
  });

  useEffect(() => {
    if (mathtradeId === null && mathtrades?.length) {
      setMathtradeId(mathtrades[0].id);
    }
  }, [mathtradeId, mathtrades]);

  // Stable references: useFetch refetches whenever urlParams changes identity.
  const urlParams = useMemo(() => [mathtradeId ?? 0], [mathtradeId]);

  const [loadAccounts, accounts] = useFetch({
    endpoint: "GET_CONTRIBUTION_ACCOUNTS",
    urlParams,
    initialState: [],
  });

  const [loadContributions, contributions, loading, errorList] = useFetch({
    endpoint: "GET_CONTRIBUTIONS",
    urlParams,
    initialState: [],
  });

  const reload = useCallback(() => {
    if (!mathtradeId) return;
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (account) params.account = account;
    loadContributions({ params });
  }, [mathtradeId, status, account, loadContributions]);

  useEffect(() => {
    if (mathtradeId) loadAccounts();
  }, [mathtradeId, loadAccounts]);

  useEffect(() => {
    reload();
  }, [reload]);

  const afterReview = useCallback(() => {
    setRejecting(null);
    reload();
  }, [reload]);

  const [approveApi, , approving, errorApprove] = useFetch({
    endpoint: "POST_CONTRIBUTION_APPROVE",
    method: "POST",
    urlParams,
    afterLoad: afterReview,
  });

  const [rejectApi, , rejectingLoading, errorReject] = useFetch({
    endpoint: "POST_CONTRIBUTION_REJECT",
    method: "POST",
    urlParams,
    afterLoad: afterReview,
  });

  const [approveManualApi, , approvingManual, errorApproveManual] = useFetch({
    endpoint: "POST_CONTRIBUTION_APPROVE_MANUAL",
    method: "POST",
    urlParams,
    afterLoad: reload,
  });

  const [undoManualApi, , undoingManual, errorUndoManual] = useFetch({
    endpoint: "POST_CONTRIBUTION_UNDO_MANUAL",
    method: "POST",
    urlParams,
    afterLoad: reload,
  });

  // Callers confirm first (ConfirmModal): these send right away.
  const approveManual = useCallback(
    (membershipId: number) =>
      approveManualApi({ params: { membership_id: membershipId } }),
    [approveManualApi]
  );

  const undoManual = useCallback(
    (contributionId: number) => undoManualApi({ urlParams: [contributionId] }),
    [undoManualApi]
  );

  const approve = useCallback(
    (row: ContributionRow) => approveApi({ urlParams: [row.id] }),
    [approveApi]
  );

  const reject = useCallback(
    (row: ContributionRow, reason: string, resubmit: boolean) =>
      rejectApi({ urlParams: [row.id], params: { reason, resubmit } }),
    [rejectApi]
  );

  const viewReceipt = useCallback(
    (row: ContributionRow) =>
      openAuthenticatedFile({
        endpoint: "GET_CONTRIBUTION_RECEIPT",
        urlParams: [mathtradeId, row.id],
      }),
    [mathtradeId]
  );

  return {
    mathtrades: mathtrades || [],
    mathtradeId,
    setMathtradeId,
    status,
    setStatus,
    account,
    setAccount,
    accounts: accounts || [],
    contributions: (contributions || []) as ReviewRow[],
    loading:
      loading || approving || rejectingLoading || approvingManual || undoingManual,
    error:
      errorList || errorApprove || errorReject || errorApproveManual || errorUndoManual,
    approve,
    approveManual,
    undoManual,
    reject,
    rejecting,
    setRejecting,
    viewReceipt,
  };
};

export default useContributionsReview;
