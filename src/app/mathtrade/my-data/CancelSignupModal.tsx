"use client";
import { useState } from "react";
import Modal from "@/components/modal";
import Button from "@/components/button";
import I18N from "@/i18n";

// Signing out deletes the membership and everything loaded for this edition.
// Typing the word makes it a deliberate act, not a stray click.
const CONFIRM_WORD = "DESINSCRIBIRME";

const CancelSignupModal = ({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  contributionStatus = "",
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  contributionStatus?: string;
}) => {
  const [typed, setTyped] = useState("");
  const confirmed = typed.trim().toUpperCase() === CONFIRM_WORD;
  const hasContribution = ["pending", "approved"].includes(contributionStatus);

  const close = () => {
    setTyped("");
    onClose();
  };

  return (
    <Modal size="sm" isOpen={isOpen} onClose={close}>
      <div className="text-center">
        <h3 className="text-xl mb-3 font-bold text-balance">
          <I18N id="cancelSignup.title" />
        </h3>
        <p className="text-sm text-gray-700 text-balance mb-2">
          <I18N id="cancelSignup.text" />
        </p>
        {hasContribution ? (
          <p className="text-sm text-gray-700 text-balance mb-2">
            <I18N id="cancelSignup.contribution" />
          </p>
        ) : null}
        <label
          htmlFor="cancel-signup-confirm"
          className="block text-sm text-gray-800 mt-4 mb-2"
        >
          <I18N id="cancelSignup.type" />
        </label>
        <input
          id="cancel-signup-confirm"
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          autoFocus
          autoComplete="off"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 text-center focus:outline-none focus:border-danger"
          placeholder={CONFIRM_WORD}
        />
        <div className="flex items-center justify-center gap-3">
          <Button type="button" color="cancel" outline onClick={close}>
            <I18N id="btn.Cancel" />
          </Button>
          <Button
            type="button"
            color="danger"
            className="px-6"
            disabled={!confirmed}
            onClick={() => {
              if (!confirmed) return;
              close();
              onConfirm();
            }}
          >
            <I18N id="cancelSignup.confirm" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelSignupModal;
