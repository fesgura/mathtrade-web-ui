import { useCallback, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";
import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";

const BtnQuickRemove = () => {
  /* PAGE CONTEXT **********************************************/
  const { setMyWants, setNewMyWantsNum, canI, setMustConfirm } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* WANT CONTEXT **********************************************/
  const { wantGroup, contextType } = useContext(WantGroupContext);

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

  if (!canI.want) {
    return (
      <div className="text-center">
        <div
          className={clsx(
            "rounded-full outline-none inline-block w-auto border border-gray-400 border-dashed text-gray-500 px-7 py-3 shadow-md cursor-not-allowed",
            {
              "bg-white": contextType === "tag",
            }
          )}
        >
          <InnerButton>
            <Icon type="heart" />
            <I18N id="btn.Want.Wanted" />
          </InnerButton>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div
        className={clsx(
          "rounded-full outline-none inline-block w-auto border border-want border-dashed text-want px-7 py-1 text-lg shadow-md",
          {
            "bg-white": contextType === "tag",
          }
        )}
      >
        <div className="text-xs mb-1">
          <InnerButton>
            <Icon type="heart" />
            <I18N id="btn.Want.Wanted" />
          </InnerButton>
        </div>
        <button
          className={clsx(
            "text-xs uppercase bg-red-600 text-white px-3 py-1 rounded-full",
            {
              "hover:opacity-80": !loading,
              "opacity-40": loading,
            }
          )}
          disabled={loading}
          onClick={deleteWant}
        >
          <InnerButton>
            {loading ? <Icon type="loading" /> : null}
            <I18N id="btn.Want.removeWant.md" />
          </InnerButton>
        </button>
      </div>
      <ErrorAlert error={error} className="mt-2" />
    </div>
  );
};

export default BtnQuickRemove;
