import { PageContext } from "@/context/page";
import { useContext, lazy } from "react";
import I18N from "@/i18n";
import Dynamic from "@/components/dynamic";
import { useOptions } from "@/store";

const EarlyPayMessage = lazy(() => import("./earlyPayMessage"));

const CommitHeaderVisual = () => {
  const { mustConfirm, mustConfirmDate, canI, isUserEarlyPay } =
    useContext(PageContext);

  /* FILTER OPTIONS **********************************************/
  const filters_wants = useOptions((state) => state.filters_wants);
  /* end FILTER OPTIONS *********************************************/

  if (mustConfirm && !canI.commit) {
    return (
      <div className="max-w-3xl mx-auto text-center text-balance pb-5 text-lime-950">
        <I18N id="CommitHeader.text" />
      </div>
    );
  }

  if (mustConfirm && canI.commit) {
    return isUserEarlyPay ? (
      <Dynamic h={400}>
        <EarlyPayMessage />
      </Dynamic>
    ) : (
      <>
        <div className="max-w-3xl mx-auto text-center text-balance pb-5 font-bold text-danger">
          <I18N id="CommitHeaderVisual.text" />
        </div>
        {filters_wants.keyword ? (
          <div className="border-b-2 border-gray-300 pb-10">
            <div className="max-w-3xl mx-auto text-center text-balance font-bold">
              <I18N id="CommitFooterVisual.clearFilter" />
            </div>
          </div>
        ) : null}
      </>
    );
  }

  if (mustConfirmDate && mustConfirmDate !== "-") {
    return (
      <div className="max-w-3xl mx-auto text-center text-balance pb-5">
        <div className="">
          <I18N id="wantview.LastCommitmentDay" />
        </div>
        <strong>{mustConfirmDate}</strong>
      </div>
    );
  }

  return null;
};

export default CommitHeaderVisual;
