import Container from "@/components/container";
import useFooter from "./useFooter";
import OrderBy from "@/components/orderBy";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import SearchForm from "./search";

const Footer = () => {
  const {
    emptyWants,
    onlyCommit,
    enabledBtn,
    onClick,
    mustConfirmDate,
    canCommit,
  } = useFooter();

  console.log(canCommit);

  if (emptyWants) {
    return null;
  }
  return (
    <div className="want-footer fixed z-[3999] bottom-0 left-0 w-full shadow-[0_-1px_4px_rgba(0,0,0,0.3)]  lg:px-6 px-3 h-[60px] flex items-stretch gap-4">
      <div className="border-r border-dotted border-gray-400 pr-4 lg:block hidden">
        <div className="flex items-center gap-4 h-[60px] py-2">
          <div>
            <SearchForm />
          </div>
          <div>
            <OrderBy
              type="wants"
              options={[
                { text: getI18Ntext("element.Type"), value: "type" },
                { text: getI18Ntext("element.Name"), value: "name" },
                { text: getI18Ntext("element.Value"), value: "value" },
                {
                  text: getI18Ntext("element.MostWanted"),
                  value: "most_wanted",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="grow flex items-center justify-center gap-3">
        <button
          className={clsx(
            "rounded-full outline-none transition-colors inline-block w-auto lg:px-7 px-2 py-2 lg:text-lg text-sm  shadow-md ",
            {
              "bg-danger text-white hover:opacity-75": enabledBtn && canCommit,
              "bg-want text-white hover:opacity-75": enabledBtn && !canCommit,
              "bg-gray-300 text-gray-400": !enabledBtn,
            }
          )}
          onClick={onClick}
          disabled={!enabledBtn}
        >
          {canCommit ? (
            <I18N
              id={`MyWants.btn.${
                onlyCommit
                  ? "MyWants.btn.CommitChanges"
                  : "MyWants.btn.SaveAndCommit"
              }`}
            />
          ) : (
            <I18N id="MyWants.btn.Save" />
          )}
        </button>
        {canCommit ? (
          <div className="text-xs text-center text-gray-800">
            {mustConfirmDate ? (
              <>
                <div className="">
                  <I18N id="wantview.LastCommitmentDay" />
                </div>

                <strong>{mustConfirmDate}</strong>
              </>
            ) : (
              <div className="text-danger font-bold">
                <I18N id="wantview.NotCommitmentYet" />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Footer;
