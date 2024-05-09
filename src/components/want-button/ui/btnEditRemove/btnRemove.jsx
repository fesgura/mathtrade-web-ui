import { useCallback, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";
import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";

const BtnRemove = () => {
  /* PAGE CONTEXT **********************************************/
  const { setMyWants, setNewMyWantsNum, setMustConfirm } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* WANT CONTEXT **********************************************/
  const { wantGroup } = useContext(WantGroupContext);

  const { id } = wantGroup;
  /* end WANT CONTEXT **********************************************/

  /* DELETE *************************************/

  const afterLoad = useCallback(() => {
    setMustConfirm(true);
    setMyWants((oldMyWants) => {
      const oldMyWantsCopy = [...oldMyWants].filter((w) => w.id !== id);
      return oldMyWantsCopy;
    });
    setNewMyWantsNum((n) => {
      return Math.max(0, n - 1);
    });
  }, [setMyWants, setNewMyWantsNum, id, setMustConfirm]);

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
    <>
      <button
        className={clsx(
          "text-xs uppercase border-red-600 text-red-600 px-5 py-1 rounded-full transition-colors",
          {
            "hover:bg-red-600 hover:text-white": !loading,
            "opacity-40": loading, // disabled
          }
        )}
        disabled={loading}
        onClick={deleteWant}
      >
        <InnerButton>
          {loading ? <Icon type="loading" /> : null}
          <I18N id="btn.Want.removeWant.xl" disabled={loading} />
        </InnerButton>
      </button>
      <ErrorAlert error={error} className="mt-2" />
    </>
  );
};

export default BtnRemove;
