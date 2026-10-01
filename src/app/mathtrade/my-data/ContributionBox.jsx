"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Button from "@/components/button";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import useFetch from "@/hooks/useFetch";
import { openAuthenticatedFile } from "@/hooks/useFetch/utils";

export const formatAmount = (amount) => {
  const value = Number(amount);
  if (!Number.isFinite(value)) return amount;
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  });
};

const RECEIPT_ACCEPT = "application/pdf,image/png,image/jpeg,image/webp";

const CopyValue = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <div>
        <span className="text-gray-500 text-sm">
          <I18N id={label} />:
        </span>{" "}
        <span className="font-bold break-all">{value}</span>
      </div>
      <button
        type="button"
        className="text-sky-600 hover:text-sky-800 text-sm whitespace-nowrap"
        title={getI18Ntext("copy")}
        onClick={() => {
          if (copy(value)) setCopied(true);
        }}
      >
        {copied ? <I18N id="contribution.copied" /> : <Icon type="copy" />}
      </button>
    </div>
  );
};

const AccountCard = ({ amount, account }) =>
  account ? (
    <>
      <p className="mb-2">
        <I18N id="contribution.transferTo" values={[formatAmount(amount)]} />
      </p>
      <div className="bg-white border border-stroke rounded-md px-3 py-2 mb-4">
        <CopyValue label="contribution.account.holder" value={account.holder_name} />
        <CopyValue label="contribution.account.alias" value={account.alias} />
        <CopyValue label="contribution.account.cbu" value={account.cbu} />
        <CopyValue label="contribution.account.bank" value={account.bank} />
      </div>
    </>
  ) : (
    <p className="text-sm">
      <I18N id="contribution.noAccount" />
    </p>
  );

const ReceiptUpload = ({ onUploaded }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const afterLoad = useCallback(() => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onUploaded();
  }, [onUploaded]);

  const [sendReceipt, , sending, error] = useFetch({
    endpoint: "POST_CONTRIBUTION",
    method: "POST",
    afterLoad,
  });

  return (
    <div className="relative">
      <p className="text-sm font-bold mb-1">
        <I18N id="contribution.upload.label" />
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={RECEIPT_ACCEPT}
        className="text-sm mb-2 block"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <p className="text-xs text-gray-500 mb-3">
        <I18N id="contribution.upload.help" />
      </p>
      <Button
        sm
        type="button"
        disabled={!file || sending}
        onClick={() => {
          const formData = new FormData();
          formData.append("file", file);
          sendReceipt({ params: formData });
        }}
      >
        <I18N id="contribution.upload.btn" />
      </Button>
      <ErrorAlert error={error} />
      <LoadingBox loading={sending} transparent min />
    </div>
  );
};

const ViewReceipt = ({ mathtradeId, contributionId }) => (
  <button
    type="button"
    className="text-primary underline text-sm"
    onClick={() =>
      openAuthenticatedFile({
        endpoint: "GET_CONTRIBUTION_RECEIPT",
        urlParams: [mathtradeId, contributionId],
      })
    }
  >
    <I18N id="contribution.viewReceipt" />
  </button>
);

const STATUS_STYLE = {
  missing: "border-warning bg-yellow-50",
  rejected: "border-danger bg-red-50",
  pending: "border-sky-400 bg-sky-50",
  approved: "border-green-500 bg-green-50",
};

const ContributionBox = ({
  isMembership,
  contribution,
  contributionAmount,
  mathtradeId,
  onChanged,
}) => {
  if (!isMembership) {
    if (!contributionAmount) return null;
    return (
      <div className="border border-stroke rounded-lg p-4 mb-6 bg-gray-50">
        <p className="mb-2">
          <I18N
            id="contribution.signupAmount"
            values={[formatAmount(contributionAmount)]}
          />
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <I18N id="contribution.explanation" />
        </p>
        <p className="text-sm text-gray-600">
          <I18N id="contribution.afterSignup" />
        </p>
      </div>
    );
  }

  if (!contribution) return null;
  const { amount, account, status, rejection_reason, id } = contribution;
  const needsReceipt = status === "missing" || status === "rejected";

  return (
    <div className={clsx("border rounded-lg p-4 mb-6", STATUS_STYLE[status])}>
      <p className="font-bold mb-2">
        <I18N id={`contribution.status.${status}`} />
      </p>
      {status === "rejected" && rejection_reason ? (
        <p className="mb-3">
          {/* Plain text on purpose: I18N renders HTML, and the reason is
              free text typed by an admin. */}
          <I18N id="contribution.rejectionReason" /> {rejection_reason}
        </p>
      ) : null}
      {needsReceipt ? (
        <>
          <p className="text-sm text-gray-600 mb-3">
            <I18N id="contribution.explanation" />
          </p>
          <AccountCard amount={amount} account={account} />
          {account ? <ReceiptUpload onUploaded={onChanged} /> : null}
        </>
      ) : null}
      {id && !needsReceipt ? (
        <ViewReceipt mathtradeId={mathtradeId} contributionId={id} />
      ) : null}
    </div>
  );
};

export default ContributionBox;
