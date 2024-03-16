import Modal from "@/components/modal";
import Question from "@/components/question";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import useAutocomplete from "./useAutocomplete";
import clsx from "clsx";

const AutocompleteButton = () => {
  const { disabled, isOpen, toggleIsOpen, onSubmit, loading, error } =
    useAutocomplete();

  return (
    <>
      <button
        className={clsx("block border  rounded-full py-1 px-3 w-full text-sm", {
          "border-primary text-primary hover:bg-primary hover:text-white transition-colors":
            !disabled,
          "border-gray-300 text-gray-400 cursor-not-allowed": disabled,
        })}
        onClick={toggleIsOpen}
        disabled={disabled}
      >
        <I18N id="btn.Autocomplete" />
      </button>
      <div className="text-center leading-none">
        <span className="text-[11px]">
          <I18N id="btn.Autocomplete.subtext" />
        </span>{" "}
        <span className="text-[13px]">
          <Question text="Autocomplete.help" />
        </span>
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
              className="border border-gray-400 text-gray-600 rounded-full py-2 px-5 hover:opacity-70 transition-opacity"
              onClick={toggleIsOpen}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
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
