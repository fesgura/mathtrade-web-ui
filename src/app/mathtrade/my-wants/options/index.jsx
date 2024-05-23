import Container from "@/components/container";
import imgSrc from "./img/pils.jpg";
import Image from "next/image";
import Modal from "@/components/modal";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { PageContext } from "@/context/page";
import I18N, { getI18Ntext } from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import SuccessAlert from "@/components/successAlert";
import clsx from "clsx";
import useFetch from "@/hooks/useFetch";
import { LoadingBox } from "@/components/loading";

const Options = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);

  /* PAGE CONTEXT **********************************************/
  const { mustConfirm } = useContext(PageContext);

  /* end PAGE CONTEXT */

  /* COMMIT CHANGES ************************/
  const afterLoad = useCallback(() => {
    setDisabled(true);
    setShowSuccess(true);
    setIsOpen(false);
  }, []);

  const [commitChanges, , loading, error] = useFetch({
    endpoint: "COMMIT_CHANGES",
    method: "POST",
    afterLoad,
  });
  /* end COMMIT CHANGES ************************/

  const onClick = useCallback(() => {
    if (value.trim() !== "AUTOEXCLUIRME") {
      setShowError(true);
      return;
    }
    setShowError(false);
    commitChanges({ params: { commit: false } });
  }, [commitChanges, value]);

  return (
    <>
      <Container>
        {mustConfirm ? (
          <div className="max-w-4xl mx-auto py-9 text-center mb-9 border-2 border-teal-400 text-teal-900 font-bold text-xl rounded-lg">
            <I18N id="autoexcluir.out" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto pb-9 text-center mb-9 border-b-2 border-gray-400">
            <Image
              src={imgSrc}
              alt="Opciones"
              width={600 / 2}
              height={315 / 2}
              className="rounded-lg block mx-auto mb-4"
            />
            <p className="text-balance  mb-4">
              <I18N id="autoexcluir.description" />
            </p>

            {showSuccess ? <SuccessAlert text="autoexcluir.success" /> : null}
            <button
              className={clsx("text-white rounded-full px-4 py-2 text-2xl ", {
                "bg-red-600 hover:bg-red-900 transition-colors": !disabled,
                "bg-gray-400 cursor-not-allowed": disabled,
              })}
              onClick={() => setIsOpen(true)}
              disabled={disabled}
            >
              <I18N id="autoexcluir.btn.1" />
            </button>
          </div>
        )}
      </Container>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} size="md">
        <div className="p-4">
          <p className="text-balance mb-3 text-center">
            <I18N id="autoexcluir.explanation" />
          </p>
          <input
            type="text"
            placeholder={getI18Ntext("autoexcluir.placeholder")}
            className={clsx("w-full p-2 border-2  rounded-lg mb-3", {
              "border-gray-400": !showError,
              "border-red-400": showError,
            })}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPaste={(e) => e.preventDefault()}
          />
          {showError ? (
            <div className="text-red-500 font-bold">
              <I18N id="autoexcluir.placeholder.error" />
            </div>
          ) : null}
          <ErrorAlert error={error} />
          <div className="flex items-center justify-center">
            <button
              className=" text-gray-500 rounded-full px-9 py-2 mt-4 text-2xl hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              className="bg-red-600 text-white rounded-full px-9 py-2 mt-4 text-2xl hover:bg-red-900 transition-colors"
              onClick={onClick}
            >
              <I18N id="autoexcluir.btn" />
            </button>
          </div>
          <LoadingBox loading={loading} min />
        </div>
      </Modal>
    </>
  );
};

export default Options;
