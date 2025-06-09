import { useCallback, useContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import { LoadingBox } from "@/components/loading";

const RemoveButton = ({ wantGroup }) => {
  const [showDelete, setShowDelete] = useState(false);

  const { setDeletedWantgroupIds, setAcceptChecksCommit } =
    useContext(MyWantsContext);

  /* PAGE CONTEXT **********************************************/
  const { setMyWants, tooglePreviewWantGroupModal, setMustConfirm } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  const { id } = wantGroup;

  /* DELETE *************************************/

  const afterLoad = useCallback(() => {
    setMustConfirm(true);
    setAcceptChecksCommit({
      accept_1: false,
      accept_2: false,
    });
    setMyWants((oldMyWants) => {
      const oldMyWantsCopy = [...oldMyWants].filter((w) => w.id !== id);
      return oldMyWantsCopy;
    });
    if (setDeletedWantgroupIds) {
      setDeletedWantgroupIds((oldDeletedWantgroupIds) => {
        const oldDeletedWantgroupIdsCopy = { ...oldDeletedWantgroupIds };
        oldDeletedWantgroupIdsCopy[id] = true;
        return oldDeletedWantgroupIdsCopy;
      });
    }

    tooglePreviewWantGroupModal();
  }, [
    setMyWants,
    id,
    tooglePreviewWantGroupModal,
    setDeletedWantgroupIds,
    setMustConfirm,
    setAcceptChecksCommit,
  ]);

  const urlParams = useMemo(() => {
    return [id];
  }, [id]);

  const [deleteWant, , loading, error] = useFetch({
    endpoint: "DELETE_MYWANTS",
    urlParams,
    method: "DELETE",
    afterLoad,
  });

  /* end DELETE *************************************/

  return (
    <div className="text-center">
      {showDelete ? (
        <div className="animate-fadein border border-gray-300 py-2 px-4 w-fit mx-auto rounded shadow">
          <h3 className="font-bold mb-4">
            <I18N id="want.removeFrom.answer" />
          </h3>
          <div className="flex items-center justify-center gap-3">
            <button
              className="text-xs uppercase border border-gray-400 text-gray-500 px-5 py-1 rounded-full transition-colors"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              className="text-xs uppercase border-red-600 bg-red-600 text-white px-5 py-1 rounded-full transition-colors"
              onClick={deleteWant}
            >
              <I18N id="btn.YesQuit" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className={clsx(
            "text-xs uppercase border-red-600 text-red-600 px-5 py-1 rounded-full transition-colors",
            {
              "hover:bg-red-600 hover:text-white": !loading,
              "opacity-40": loading, // disabled
            }
          )}
          disabled={loading}
          //
          onClick={() => {
            setShowDelete(true);
          }}
        >
          <InnerButton>
            {loading ? <Icon type="loading" /> : null}
            <I18N id="btn.Want.removeWant.xl" disabled={loading} />
          </InnerButton>
        </button>
      )}

      <ErrorAlert error={error} className="mt-2" />
      <LoadingBox loading={loading} />
    </div>
  );
};

export default RemoveButton;
