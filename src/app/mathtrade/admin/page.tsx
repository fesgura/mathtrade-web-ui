"use client";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import useAdminPanel from "./useAdminPanel";
import EditionRow from "./EditionRow";
import Link from "next/link";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import { useMemo, useState } from "react";
import Button from "@/components/button";
import ConfirmModal from "@/components/confirmModal";
import { getI18Ntext } from "@/i18n";
import EditionForm from "./EditionForm";
import { parseAmount } from "./useAdminPanel";

const AdminPanelPage = () => {
  const {
    mathtrades,
    loadingList,
    errorList,
    locationOptions,
    editingId,
    setEditingId,
    submitEdit,
    savingMathtrade,
    errorSave,
    submitRulebook,
    uploadingRulebook,
    errorRulebook,
    creating,
    setCreating,
    submitCreate,
    savingCreate,
    errorCreate,
  } = useAdminPanel();

  const activeName = useMemo(
    () => mathtrades.find((m: any) => m.active)?.name || null,
    [mathtrades]
  );

  // A new edition starts from the latest one's settings (the list is newest
  // first); the name and the dates are left empty.
  const createInitial = useMemo(() => {
    const latest: any = mathtrades[0] || {};
    return {
      location: latest.location?.id ?? null,
      contribution_amount: latest.contribution_amount ?? "",
      rules_quiz_required: !!latest.rules_quiz_required,
      venue_name: latest.venue_name || "",
      venue_address: latest.venue_address || "",
      venue_map_url: latest.venue_map_url || "",
    };
  }, [mathtrades]);

  // Creating asks first, and lists what the new edition will still need.
  const [pendingCreate, setPendingCreate] = useState<Record<string, any> | null>(
    null
  );
  const missingList = useMemo(() => {
    if (!pendingCreate) return "";
    const missing = ["adminPanel.create.missing.rulebook"];
    if (parseAmount(pendingCreate.contribution_amount)) {
      missing.push("adminPanel.create.missing.accounts");
    }
    if (!(pendingCreate.venue_name || "").trim()) {
      missing.push("adminPanel.create.missing.venue");
    }
    return `<ul class="list-disc pl-5 text-left mt-1">${missing
      .map((id) => `<li>${getI18Ntext(id)}</li>`)
      .join("")}</ul>`;
  }, [pendingCreate]);

  return (
    <>
      <PageHeader title="title.AdminPanel" variant="minimal" />
      <SectionCommon loading={loadingList}>
        <div className="md:px-7 px-3 py-7">
          <div className="mb-4 text-right">
            <Link
              href={PRIVATE_ROUTES.ADMIN_USERS.path}
              className="text-primary underline"
            >
              <I18N id="adminUsers.link" />
            </Link>
            <Link
              href={PRIVATE_ROUTES.ADMIN_CONTRIBUTIONS.path}
              className="text-primary underline ml-4"
            >
              <I18N id="adminContributions.link" />
            </Link>
            <Link
              href={PRIVATE_ROUTES.ADMIN_RULES_QUESTIONS.path}
              className="text-primary underline ml-4"
            >
              <I18N id="adminRulesQuestions.link" />
            </Link>
            <Link
              href={PRIVATE_ROUTES.ADMIN_SELF_EXCLUDED.path}
              className="text-primary underline ml-4"
            >
              <I18N id="adminSelfExcluded.link" />
            </Link>
            <Link
              href={PRIVATE_ROUTES.ADMIN_REPORTS.path}
              className="text-primary underline ml-4"
            >
              <I18N id="adminReports.link" />
            </Link>
          </div>
          <ErrorAlert error={errorList} />
          {creating ? (
            <div className="border-2 border-primary rounded-lg p-4 mb-4">
              <h2 className="font-bold text-lg mb-3">
                <I18N id="adminPanel.create.title" />
              </h2>
              <EditionForm
                mode="create"
                initial={createInitial}
                onSubmit={(formProps) => setPendingCreate(formProps)}
                onCancel={() => setCreating(false)}
                saving={savingCreate}
                error={errorCreate}
                locationOptions={locationOptions}
              />
            </div>
          ) : (
            <div className="mb-4">
              <Button type="button" onClick={() => setCreating(true)}>
                <I18N id="adminPanel.create.button" />
              </Button>
            </div>
          )}
          <ConfirmModal
            isOpen={!!pendingCreate}
            onCancel={() => setPendingCreate(null)}
            onConfirm={() => {
              const formProps = pendingCreate;
              setPendingCreate(null);
              if (formProps) submitCreate(formProps);
            }}
            title="adminPanel.create.confirmTitle"
            titleValues={[pendingCreate?.name || ""]}
            description="adminPanel.create.warning"
            descriptionValues={[missingList]}
            confirmId="adminPanel.create.confirm"
          />
          {mathtrades.map((mathtrade: any) => (
            <EditionRow
              key={mathtrade.id}
              mathtrade={mathtrade}
              editing={editingId === mathtrade.id}
              onToggleEdit={() =>
                setEditingId(editingId === mathtrade.id ? null : mathtrade.id)
              }
              onSubmitEdit={submitEdit}
              saving={savingMathtrade}
              errorSave={errorSave}
              locationOptions={locationOptions}
              onUploadRulebook={submitRulebook}
              uploadingRulebook={uploadingRulebook}
              errorRulebook={errorRulebook}
              activeName={activeName}
            />
          ))}
        </div>
      </SectionCommon>
    </>
  );
};

export default AdminPanelPage;
