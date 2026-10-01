"use client";
import { useCallback, useContext, useState } from "react";
import { PageContext } from "@/context/page";
import { useStore } from "@/store";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import Button from "@/components/button";
import Modal from "@/components/modal";
import ErrorAlert from "@/components/errorAlert";
import { PUBLIC_ROUTES } from "@/config/routes";
import Link from "next/link";

// Accepted with or without capitals and accent: "Autoexclusión",
// "autoexclusion", "AUTOEXCLUSIÓN"…
const CONFIRM_WORD = "autoexclusion";
const normalizeWord = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const ProvisionalExclude = () => {
  const { canI } = useContext(PageContext);
  const updateStore = useStore((state) => state.updateStore);
  const [open, setOpen] = useState(false);
  // Two steps: "¿Confirmás?" (No / Sí), then typing the word.
  const [step, setStep] = useState<"ask" | "type">("ask");
  const [typed, setTyped] = useState("");
  // Optional, doesn't change anything about the self-exclusion.
  const [reason, setReason] = useState("");
  const confirmed = normalizeWord(typed) === CONFIRM_WORD;

  const close = useCallback(() => {
    setOpen(false);
    setStep("ask");
    setTyped("");
    setReason("");
  }, []);

  const afterLoad = useCallback(() => {
    const current = useStore.getState().data;
    updateStore("data", {
      ...current,
      membership: {
        ...current.membership,
        self_excluded: true,
      },
    });
    close();
  }, [updateStore, close]);

  const [selfExclude, , loading, error] = useFetch({
    endpoint: "POST_SELF_EXCLUDE",
    method: "POST",
    afterLoad,
  });

  if (!canI.selfExclude) {
    return null;
  }

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <ErrorAlert error={error} />
      <Button
        type="button"
        color="danger"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <I18N id="provisional.exclude.cta" />
      </Button>
      <Modal
        isOpen={open}
        onClose={close}
        size="sm"
        className="py-8 px-6 w-full"
      >
        <h2 className="text-lg font-bold mb-3">
          <I18N id="provisional.exclude.modal.title" />
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          <I18N id="provisional.exclude.modal.body" />
          <Link
            href={PUBLIC_ROUTES.TERMS_CONDITIONS.path}
            className="underline hover:opacity-75"
          >
            <I18N id="provisional.exclude.reglamento" />
          </Link>
          .
        </p>
        {step === "ask" ? (
          <div className="flex flex-wrap gap-3">
            <Button type="button" color="cancel" outline onClick={close}>
              <I18N id="provisional.exclude.modal.no" />
            </Button>
            <Button type="button" color="danger" onClick={() => setStep("type")}>
              <I18N id="provisional.exclude.modal.btn" />
            </Button>
          </div>
        ) : (
          <div>
            <label className="block text-sm text-gray-800 mb-1">
              <I18N id="provisional.exclude.modal.reasonLabel" />
            </label>
            <p className="text-xs text-gray-600 mb-2">
              <I18N id="provisional.exclude.modal.reasonHelp" />
            </p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={1000}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-primary"
            />
            <label className="block text-sm text-gray-800 mb-2">
              <I18N id="provisional.exclude.modal.typeLabel" />
            </label>
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoFocus
              autoComplete="off"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-danger"
              placeholder="autoexclusión"
            />
            <div className="flex flex-wrap gap-3">
              <Button type="button" color="cancel" outline onClick={close}>
                <I18N id="provisional.exclude.modal.no" />
              </Button>
              <Button
                type="button"
                color="danger"
                disabled={!confirmed || loading}
                onClick={() =>
                  selfExclude({ params: reason.trim() ? { reason: reason.trim() } : {} })
                }
              >
                <I18N id="provisional.exclude.modal.confirm" />
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProvisionalExclude;
