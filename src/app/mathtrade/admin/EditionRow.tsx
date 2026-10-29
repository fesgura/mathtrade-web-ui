"use client";
import { useRef, useState } from "react";
import I18N from "@/i18n";
import Button from "@/components/button";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { mathtradeRulebookPDFurl } from "@/config/rulebook";
import EditionForm from "./EditionForm";
import ConfirmModal from "@/components/confirmModal";
import ContributionAccounts from "./ContributionAccounts";

const baseURL = process.env.BASE_URL;


type Mathtrade = {
  id: number;
  name: string;
  active: boolean;
  admin_only: boolean;
  location?: { id: number } | null;
  rulebook_url?: string | null;
  contribution_amount?: string | null;
  rules_quiz_required?: boolean;
  direct_shipping_threshold?: number;
  contribution_counts?: {
    missing: number;
    pending: number;
    approved: number;
    rejected: number;
  } | null;
  [key: string]: any;
};

type EditionRowProps = {
  mathtrade: Mathtrade;
  editing: boolean;
  onToggleEdit: () => void;
  onSubmitEdit: (id: number, formProps: Record<string, any>) => void;
  saving: boolean;
  errorSave: any;
  locationOptions: { value: number; text: string }[];
  onUploadRulebook: (id: number, file: File) => void;
  uploadingRulebook: boolean;
  errorRulebook: any;
  // Name of the edition that's active today, for the activation warning.
  activeName?: string | null;
};

const EditionRow = ({
  mathtrade,
  editing,
  onToggleEdit,
  onSubmitEdit,
  saving,
  errorSave,
  locationOptions,
  onUploadRulebook,
  uploadingRulebook,
  errorRulebook,
  activeName = null,
}: EditionRowProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Activating an edition switches the whole site to it (login, rulebook,
  // logistics) and deactivates the current one: confirm first.
  const [pendingActivation, setPendingActivation] = useState<Record<
    string,
    any
  > | null>(null);
  const submit = (formProps: Record<string, any>) => {
    if (formProps.active && !mathtrade.active) {
      setPendingActivation(formProps);
      return;
    }
    onSubmitEdit(mathtrade.id, formProps);
  };

  return (
    <div className="border border-stroke rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="font-bold">{mathtrade.name}</span>
          {mathtrade.active ? (
            <span className="ml-2 uppercase text-[10px] font-bold bg-primary text-white px-2 py-[3px] rounded-full">
              <I18N id="adminPanel.active.badge" />
            </span>
          ) : null}
          {mathtrade.admin_only ? (
            <span className="ml-2 uppercase text-[10px] font-bold bg-warning text-white px-2 py-[3px] rounded-full">
              <I18N id="adminPanel.adminOnly.badge" />
            </span>
          ) : null}
        </div>
        <Button sm outline onClick={onToggleEdit} type="button">
          <I18N id="element.Edit" />
        </Button>
      </div>
      {mathtrade.contribution_counts ? (
        <p className="text-sm text-gray-600 mt-2">
          <I18N
            id="adminPanel.contribution.counts"
            values={[
              mathtrade.contribution_counts.approved,
              mathtrade.contribution_counts.pending,
              mathtrade.contribution_counts.rejected,
              mathtrade.contribution_counts.missing,
            ]}
          />
        </p>
      ) : null}

      {editing ? (
        <div className="relative mt-4 pt-4 border-t border-stroke">
          <EditionForm
            mode="edit"
            initial={mathtrade}
            onSubmit={submit}
            onCancel={onToggleEdit}
            saving={saving}
            error={errorSave}
            locationOptions={locationOptions}
          />

          <div className="mt-5 pt-4 border-t border-stroke">
            {mathtrade.rulebook_url ? (
              <a
                href={baseURL + mathtradeRulebookPDFurl(mathtrade.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline text-sm"
              >
                <I18N id="adminPanel.rulebook.current" />
              </a>
            ) : (
              <p className="text-sm text-gray-500">
                <I18N id="adminPanel.rulebook.none" />
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUploadRulebook(mathtrade.id, file);
                }}
              />
            </div>
            <ErrorAlert error={errorRulebook} />
          </div>

          <ContributionAccounts mathtradeId={mathtrade.id} />

          <ConfirmModal
            isOpen={!!pendingActivation}
            onCancel={() => setPendingActivation(null)}
            onConfirm={() => {
              const formProps = pendingActivation;
              setPendingActivation(null);
              if (formProps) onSubmitEdit(mathtrade.id, formProps);
            }}
            title="adminPanel.activate.title"
            titleValues={[mathtrade.name]}
            description={
              activeName
                ? "adminPanel.activate.warning"
                : "adminPanel.activate.warningNoCurrent"
            }
            descriptionValues={[mathtrade.name, activeName || ""]}
            confirmId="adminPanel.activate.confirm"
          />

          <LoadingBox loading={saving || uploadingRulebook} transparent />
        </div>
      ) : null}
    </div>
  );
};

export default EditionRow;
