"use client";
import Modal from "@/components/modal";
import Question from "@/components/question";
import I18N, { getI18Ntext } from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import useAutocomplete from "./useAutocomplete";
import clsx from "clsx";

const AutocompleteButton = () => {
  const { disabled, isOpen, toggleIsOpen, onSubmit, loading, error } =
    useAutocomplete();

  return (
    <>
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          className={clsx(
            "h-[34px] px-3 rounded-full text-caption font-bold whitespace-nowrap border transition-colors",
            disabled
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-white"
          )}
          onClick={toggleIsOpen}
          disabled={disabled}
          title={getI18Ntext("btn.Autocomplete.subtext")}
        >
          <I18N id="btn.Autocomplete" />
        </button>
        <Question text="Autocomplete.help" />
      </div>
      <Modal isOpen={isOpen} onClose={toggleIsOpen} size="md">
        <div className="text-center">
          <h2 className="font-bold mb-4 text-xl text-balance">
            <I18N id="Autocomplete.modal.title" />
          </h2>
          <p className="text-balance mb-7">
            <I18N id="Autocomplete.modal.help" />
          </p>
          <ErrorAlert error={error} />
          <div className="flex justify-center items-center gap-3 font-bold">
            <button
              type="button"
              className="border border-gray-400 text-gray-600 rounded-full py-2 px-5 hover:opacity-70 transition-opacity"
              onClick={toggleIsOpen}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              type="button"
              className="text-white bg-primary rounded-full py-2 px-5 hover:opacity-70 transition-opacity"
              onClick={onSubmit}
            >
              <I18N id="btn.YesAutocomplete" />
            </button>
          </div>
        </div>
        <LoadingBox loading={loading} />
      </Modal>
    </>
  );
};

export default AutocompleteButton;
