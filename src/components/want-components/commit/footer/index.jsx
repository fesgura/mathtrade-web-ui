import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { useContext } from "react";
import I18N from "@/i18n";
import CommitButton from "./commitButton";
import { useOptions } from "@/store";

const CommitFooter = ({ acceptNum, changeScreenViewOffer }) => {
  const { mustConfirm, isUserEarlyPay } = useContext(PageContext);

  /* FILTER OPTIONS **********************************************/
  const filters_wants = useOptions((state) => state.filters_wants);
  /* end FILTER OPTIONS *********************************************/

  const { acceptChecksCommit, setAcceptChecksCommit, isLoadedWants } =
    useContext(MyWantsContext);

  if (isUserEarlyPay || !isLoadedWants) {
    return null;
  }

  if (filters_wants.keyword) {
    return (
      <div className="border-t-2 border-gray-300 py-10">
        <div className="max-w-3xl mx-auto text-center text-balance">
          <I18N id="CommitFooterVisual.clearFilter" />
        </div>
      </div>
    );
  }

  return mustConfirm ? (
    <div className="border-t-2 border-gray-300 py-10">
      <div className="max-w-3xl mx-auto">
        <label className="flex items-start justify-center gap-4 mb-3">
          <div className="pt-1">
            <input
              type="checkbox"
              className=""
              checked={acceptChecksCommit[`accept_${acceptNum}`]}
              onChange={(e) => {
                setAcceptChecksCommit((oldAcceptChecksCommit) => {
                  return {
                    ...oldAcceptChecksCommit,
                    [`accept_${acceptNum}`]: e.target.checked,
                  };
                });
              }}
            />
          </div>
          <div className="text-balance">
            <I18N id="CommitFooterVisual.text1" />
          </div>
        </label>
        {acceptChecksCommit[`accept_${acceptNum}`] &&
          !acceptChecksCommit[`accept_${acceptNum === "1" ? "2" : "1"}`] && (
            <p className="text-center py-3 border-2 border-primary text-balance">
              <I18N id="CommitFooterVisual.text2" />{" "}
              <strong
                className="underline text-primary cursor-pointer"
                onClick={changeScreenViewOffer}
              >
                <I18N id={`CommitFooterVisual.op.text${acceptNum}`} />
              </strong>
              .
            </p>
          )}
        {acceptChecksCommit.accept_1 && acceptChecksCommit.accept_2 && (
          <div className="py-5">
            <CommitButton />
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CommitFooter;
